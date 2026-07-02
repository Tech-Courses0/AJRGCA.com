import { google } from 'googleapis'
import { getSql } from './db'

const SCOPES = ['https://www.googleapis.com/auth/calendar.events']

function getOAuthClient(redirectUri: string) {
  return new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectUri)
}

export function getGoogleAuthUrl(redirectUri: string) {
  const client = getOAuthClient(redirectUri)
  return client.generateAuthUrl({ access_type: 'offline', prompt: 'consent', scope: SCOPES })
}

export async function storeGoogleTokensFromCode(code: string, redirectUri: string) {
  const client = getOAuthClient(redirectUri)
  const { tokens } = await client.getToken(code)
  if (!tokens.refresh_token) {
    throw new Error('Google did not return a refresh token — revoke prior access at myaccount.google.com/permissions and reconnect.')
  }
  const sql = getSql()
  if (!sql) throw new Error('DATABASE_URL not configured — cannot store Google tokens.')
  await sql`
    insert into google_tokens (id, refresh_token)
    values (1, ${tokens.refresh_token})
    on conflict (id) do update set refresh_token = excluded.refresh_token
  `
}

async function getAuthorizedClient() {
  const sql = getSql()
  if (!sql) return null
  const rows = await sql`select refresh_token from google_tokens where id = 1`
  const refreshToken = rows[0]?.refresh_token as string | undefined
  if (!refreshToken) return null
  const client = getOAuthClient(process.env.GOOGLE_REDIRECT_URI || '')
  client.setCredentials({ refresh_token: refreshToken })
  return client
}

type MeetEventArgs = {
  summary: string
  description: string
  date: string // YYYY-MM-DD
  time: string // HH:MM (24h, Asia/Kolkata)
  attendeeEmails: string[]
}

/** Creates a 1-hour Calendar event with a Google Meet link. Returns null if Google isn't connected (falls back gracefully — no video link, meeting still confirmed). */
export async function createMeetEvent({ summary, description, date, time, attendeeEmails }: MeetEventArgs): Promise<string | null> {
  const auth = await getAuthorizedClient()
  if (!auth) {
    console.log('[google-calendar][dev] not connected — would create event:', { summary, date, time, attendeeEmails })
    return null
  }

  const calendar = google.calendar({ version: 'v3', auth })
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  // Date.UTC is only used as a timezone-neutral calculator for the +1hr offset —
  // the resulting fields are re-assembled as a naive local string below, paired
  // with an explicit timeZone, so the server's own local timezone never leaks in.
  const endMs = Date.UTC(year, month - 1, day, hour, minute) + 60 * 60 * 1000
  const endDate = new Date(endMs)
  const startLocal = `${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`
  const endLocal = `${endDate.getUTCFullYear()}-${String(endDate.getUTCMonth() + 1).padStart(2, '0')}-${String(endDate.getUTCDate()).padStart(2, '0')}T${String(endDate.getUTCHours()).padStart(2, '0')}:${String(endDate.getUTCMinutes()).padStart(2, '0')}:00`

  const { data } = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: {
      summary,
      description,
      start: { dateTime: startLocal, timeZone: 'Asia/Kolkata' },
      end: { dateTime: endLocal, timeZone: 'Asia/Kolkata' },
      attendees: attendeeEmails.map((email) => ({ email })),
      conferenceData: {
        createRequest: { requestId: `ajrg-${Date.now()}`, conferenceSolutionKey: { type: 'hangoutsMeet' } },
      },
    },
  })

  return data.hangoutLink ?? null
}
