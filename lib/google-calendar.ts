import { google } from 'googleapis'
import { getSql } from './db'

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/gmail.send',
]

function hasGoogleCredentials() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
}

function getOAuthClient(redirectUri: string) {
  if (!hasGoogleCredentials()) {
    throw new Error('Google Calendar credentials are not configured.')
  }
  return new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectUri)
}

export function getGoogleAuthUrl(redirectUri: string, state: string) {
  const client = getOAuthClient(redirectUri)
  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
    state,
    include_granted_scopes: true,
  })
}

export async function storeGoogleTokensFromCode(code: string, redirectUri: string) {
  const client = getOAuthClient(redirectUri)
  const { tokens } = await client.getToken(code)
  if (!tokens.refresh_token) {
    throw new Error('Google did not return a refresh token. Remove AJRGCA from your Google Account permissions, then reconnect.')
  }
  const sql = getSql()
  if (!sql) throw new Error('DATABASE_URL is not configured, so the Google connection cannot be saved.')
  await sql`
    insert into google_tokens (id, refresh_token, connected_at)
    values (1, ${tokens.refresh_token}, now())
    on conflict (id) do update
      set refresh_token = excluded.refresh_token, connected_at = excluded.connected_at
  `
}

export type GoogleCalendarStatus = {
  credentialsConfigured: boolean
  databaseConfigured: boolean
  connected: boolean
  connectedAt: string | null
  error: string | null
}

export async function getGoogleCalendarStatus(): Promise<GoogleCalendarStatus> {
  const credentialsConfigured = hasGoogleCredentials()
  const sql = getSql()
  if (!sql) {
    return { credentialsConfigured, databaseConfigured: false, connected: false, connectedAt: null, error: null }
  }

  try {
    const rows = await sql`select connected_at from google_tokens where id = 1`
    const connectedAt = rows[0]?.connected_at
    return {
      credentialsConfigured,
      databaseConfigured: true,
      connected: Boolean(rows[0]),
      connectedAt: connectedAt ? new Date(connectedAt as string | Date).toISOString() : null,
      error: null,
    }
  } catch {
    return {
      credentialsConfigured,
      databaseConfigured: true,
      connected: false,
      connectedAt: null,
      error: 'The google_tokens table is missing. Run scripts/init-db.sql against the production database.',
    }
  }
}

export async function disconnectGoogleCalendar() {
  const sql = getSql()
  if (!sql) throw new Error('DATABASE_URL is not configured.')
  await sql`delete from google_tokens where id = 1`
}

export async function getAuthorizedGoogleClient() {
  if (!hasGoogleCredentials()) return null
  const sql = getSql()
  if (!sql) return null
  const rows = await sql`select refresh_token from google_tokens where id = 1`
  const refreshToken = rows[0]?.refresh_token as string | undefined
  if (!refreshToken) return null
  const client = getOAuthClient('')
  client.setCredentials({ refresh_token: refreshToken })
  return client
}

type CalendarEventArgs = {
  eventId: string
  summary: string
  description: string
  date: string // YYYY-MM-DD
  time: string // HH:MM (24h, Asia/Kolkata)
  location: string
  attendeeEmails: string[]
  addGoogleMeet: boolean
}

export type CalendarEventResult = {
  eventLink: string | null
  meetLink: string | null
}

function eventTimes(date: string, time: string) {
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  if (![year, month, day, hour, minute].every(Number.isFinite)) {
    throw new Error('The booking date or time is invalid.')
  }

  // Date.UTC is a timezone-neutral calculator for the +1 hour duration. The
  // values are reassembled as local wall-clock strings with an explicit zone.
  const end = new Date(Date.UTC(year, month - 1, day, hour, minute) + 60 * 60 * 1000)
  const startLocal = `${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`
  const endLocal = `${end.getUTCFullYear()}-${String(end.getUTCMonth() + 1).padStart(2, '0')}-${String(end.getUTCDate()).padStart(2, '0')}T${String(end.getUTCHours()).padStart(2, '0')}:${String(end.getUTCMinutes()).padStart(2, '0')}:00`
  return { startLocal, endLocal }
}

/** Creates one idempotent Calendar event for a confirmed consultation. */
export async function createCalendarEvent({
  eventId,
  summary,
  description,
  date,
  time,
  location,
  attendeeEmails,
  addGoogleMeet,
}: CalendarEventArgs): Promise<CalendarEventResult | null> {
  const auth = await getAuthorizedGoogleClient()
  if (!auth) {
    console.log('[google-calendar][dev] not connected — would create event:', { eventId, summary, date, time })
    return null
  }

  const calendar = google.calendar({ version: 'v3', auth })
  const { startLocal, endLocal } = eventTimes(date, time)
  const requestBody = {
    id: eventId,
    summary,
    description,
    location,
    start: { dateTime: startLocal, timeZone: 'Asia/Kolkata' },
    end: { dateTime: endLocal, timeZone: 'Asia/Kolkata' },
    attendees: [...new Set(attendeeEmails.map((email) => email.trim().toLowerCase()).filter(Boolean))]
      .map((email) => ({ email })),
    ...(addGoogleMeet
      ? {
          conferenceData: {
            createRequest: {
              requestId: `${eventId}-meet`,
              conferenceSolutionKey: { type: 'hangoutsMeet' as const },
            },
          },
        }
      : {}),
  }

  try {
    const { data } = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: addGoogleMeet ? 1 : 0,
      sendUpdates: 'all',
      requestBody,
    })
    return { eventLink: data.htmlLink ?? null, meetLink: data.hangoutLink ?? null }
  } catch (error) {
    // The deterministic event id makes retries safe if Calendar succeeded but
    // the booking database update did not. Reuse the existing event on 409.
    if ((error as { code?: number }).code === 409) {
      const { data } = await calendar.events.get({ calendarId: 'primary', eventId })
      return { eventLink: data.htmlLink ?? null, meetLink: data.hangoutLink ?? null }
    }
    const code = (error as { code?: number }).code
    if (code === 401 || code === 403) {
      throw new Error('Google Calendar access has expired or was revoked. Reconnect it in the site editor and try again.')
    }
    throw error
  }
}
