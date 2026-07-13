import Link from 'next/link'
import { CalendarCheck, CircleAlert, ExternalLink } from 'lucide-react'
import { getGoogleCalendarStatus } from '@/lib/google-calendar'
import DisconnectCalendarButton from './DisconnectCalendarButton'

const MESSAGES: Record<string, { tone: 'success' | 'error' | 'neutral'; text: string }> = {
  connected: { tone: 'success', text: 'Google services are connected. Form emails and confirmed consultation events are handled automatically.' },
  cancelled: { tone: 'neutral', text: 'Google connection was cancelled. Nothing changed.' },
  'invalid-state': { tone: 'error', text: 'That Google connection attempt expired or was invalid. Please try again.' },
  'missing-code': { tone: 'error', text: 'Google did not return an authorization code. Please try again.' },
  'not-configured': { tone: 'error', text: 'Finish the configuration items below before connecting Google services.' },
  failed: { tone: 'error', text: 'Google services could not be connected. Check the server logs and configuration, then try again.' },
}

export default async function AdminCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ google?: string }>
}) {
  const { google } = await searchParams
  const status = await getGoogleCalendarStatus()
  const message = google ? MESSAGES[google] : undefined
  const ready = status.credentialsConfigured && status.databaseConfigured && !status.error

  return (
    <main className="min-h-screen bg-[var(--cream)] px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/admin/editor" className="text-[0.78rem] font-semibold text-[var(--ink-3)] hover:text-[var(--accent)]">
          ← Back to site editor
        </Link>

        <section className="mt-6 border border-[var(--border)] bg-white p-8 shadow-[var(--elev-1)]">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--cream)] text-[var(--accent)]">
              <CalendarCheck size={22} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[var(--ink-4)]">Integrations</p>
              <h1 className="font-serif-display text-[clamp(1.7rem,4vw,2.25rem)] text-[var(--ink)]">Google Gmail &amp; Calendar</h1>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-[var(--ink-3)]">
                Website enquiries are sent through the connected Gmail account. Every confirmed consultation is added to its primary calendar; video calls also receive a Google Meet link.
              </p>
            </div>
          </div>

          {message && (
            <div className={`mb-6 border px-4 py-3 text-[0.82rem] ${message.tone === 'success' ? 'border-green-200 bg-green-50 text-green-800' : message.tone === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-[var(--border)] bg-[var(--cream)] text-[var(--ink-3)]'}`}>
              {message.text}
            </div>
          )}

          {status.connected ? (
            <div className="rounded-md border border-green-200 bg-green-50 p-5">
              <div className="flex items-center gap-2 font-semibold text-green-800">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" aria-hidden="true" />
                Connected
              </div>
              {status.connectedAt && (
                <p className="mt-1 text-[0.78rem] text-green-700">
                  Linked {new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date(status.connectedAt))}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="/api/admin/google/connect" className="inline-flex items-center gap-1.5 bg-[var(--ink)] px-4 py-2.5 text-[0.76rem] font-semibold text-white hover:bg-[var(--accent)]">
                  Reconnect account <ExternalLink size={13} aria-hidden="true" />
                </a>
                <DisconnectCalendarButton />
              </div>
              <p className="mt-4 text-[0.78rem] leading-relaxed text-green-800">
                After Gmail support is first deployed, enable the Gmail API in Google Cloud and use “Reconnect account” once to grant email permission.
              </p>
            </div>
          ) : ready ? (
            <a href="/api/admin/google/connect" className="inline-flex items-center gap-2 bg-[var(--ink)] px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-white hover:bg-[var(--accent)]">
              Connect Google services <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-5 text-amber-900">
              <p className="flex items-center gap-2 font-semibold"><CircleAlert size={17} aria-hidden="true" /> Setup required</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.82rem] leading-relaxed">
                {!status.credentialsConfigured && <li>Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET on the host.</li>}
                {!status.databaseConfigured && <li>Set DATABASE_URL on the host.</li>}
                {status.error && <li>{status.error}</li>}
              </ul>
            </div>
          )}

          <div className="mt-7 border-t border-[var(--border)] pt-5 text-[0.78rem] leading-relaxed text-[var(--ink-4)]">
            Enable the Gmail API and Google Calendar API in Google Cloud. Google Cloud must allow <code className="bg-[var(--cream)] px-1.5 py-0.5">https://ajrgcacom.vercel.app/api/google/callback</code> as an OAuth redirect URI. AJRGCA stores only the refresh token needed to send email and create consultation events.
          </div>
        </section>
      </div>
    </main>
  )
}
