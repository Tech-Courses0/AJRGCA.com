import { getBookingByClientToken } from '@/lib/bookings'
import ClientBookingResponse from '@/components/sections/ClientBookingResponse'

export default async function ClientBookingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const booking = await getBookingByClientToken(token)

  if (!booking) {
    return (
      <main className="min-h-screen flex items-center justify-center px-8">
        <p className="text-[0.9rem] text-[var(--ink-3)]">Booking not found, or Postgres isn&apos;t configured in this environment.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-8 py-16 max-w-lg mx-auto">
      <h1 className="font-serif-display text-[1.6rem] text-[var(--ink)] mb-6">Your consultation request</h1>

      {booking.status === 'pending' && (
        <p className="text-[0.9rem] text-[var(--ink-3)]">
          Pending — we will confirm a slot within one business day. You requested{' '}
          {booking.requested_date || 'no specific date'} · {booking.requested_time || 'any time'} ({booking.mode || 'video call'}).
        </p>
      )}

      {booking.status === 'countered' && (
        <>
          <p className="text-[0.9rem] text-[var(--ink-2)] mb-4">
            We proposed a different time: <strong>{booking.proposed_date} at {booking.proposed_time} (IST)</strong>.
            {booking.proposed_note && <span className="block mt-2 text-[var(--ink-3)]">{booking.proposed_note}</span>}
          </p>
          <ClientBookingResponse clientToken={token} />
        </>
      )}

      {booking.status === 'confirmed' && (
        <p className="text-[0.9rem] text-[var(--ink-2)]">
          Confirmed for <strong>{booking.final_date} at {booking.final_time} (IST)</strong>.
          {booking.meet_link && (
            <> Join via <a href={booking.meet_link} className="text-[var(--accent-dark)] underline">{booking.meet_link}</a>.</>
          )}
        </p>
      )}

      {booking.status === 'rejected' && (
        <p className="text-[0.9rem] text-[var(--ink-3)]">
          We were unable to accommodate this request. Please <a href="/book" className="text-[var(--accent-dark)] underline">submit a new one</a>.
        </p>
      )}

      {booking.status === 'declined' && (
        <p className="text-[0.9rem] text-[var(--ink-3)]">
          You declined the proposed time. Please <a href="/book" className="text-[var(--accent-dark)] underline">submit a new request</a> if you would still like a consultation.
        </p>
      )}
    </main>
  )
}
