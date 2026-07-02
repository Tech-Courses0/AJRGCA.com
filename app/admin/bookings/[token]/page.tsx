import { getBookingByOwnerToken } from '@/lib/bookings'
import AdminBookingActions from '@/components/sections/AdminBookingActions'

export default async function AdminBookingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const booking = await getBookingByOwnerToken(token)

  if (!booking) {
    return (
      <main className="min-h-screen flex items-center justify-center px-8">
        <p className="text-[0.9rem] text-[var(--ink-3)]">Booking not found, or Postgres isn&apos;t configured in this environment.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-8 py-16 max-w-2xl mx-auto">
      <h1 className="font-serif-display text-[1.6rem] text-[var(--ink)] mb-1">Consultation request</h1>
      <p className="text-[0.85rem] text-[var(--ink-3)] mb-8">Status: <span className="font-semibold">{booking.status}</span></p>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[0.86rem] mb-8">
        <div><dt className="text-[var(--ink-4)] text-[0.72rem] uppercase tracking-wide">Name</dt><dd>{booking.name}</dd></div>
        <div><dt className="text-[var(--ink-4)] text-[0.72rem] uppercase tracking-wide">Organisation</dt><dd>{booking.organisation || '—'}</dd></div>
        <div><dt className="text-[var(--ink-4)] text-[0.72rem] uppercase tracking-wide">Email</dt><dd>{booking.email}</dd></div>
        <div><dt className="text-[var(--ink-4)] text-[0.72rem] uppercase tracking-wide">Phone</dt><dd>{booking.phone}</dd></div>
        <div><dt className="text-[var(--ink-4)] text-[0.72rem] uppercase tracking-wide">Business type</dt><dd>{booking.business_type || '—'}</dd></div>
        <div><dt className="text-[var(--ink-4)] text-[0.72rem] uppercase tracking-wide">Service area</dt><dd>{booking.service_area || '—'}</dd></div>
        <div><dt className="text-[var(--ink-4)] text-[0.72rem] uppercase tracking-wide">Preferred mode</dt><dd>{booking.mode || '—'}</dd></div>
        <div><dt className="text-[var(--ink-4)] text-[0.72rem] uppercase tracking-wide">Preferred slot</dt><dd>{booking.requested_date || '—'} · {booking.requested_time || '—'}</dd></div>
      </dl>

      <p className="text-[0.72rem] text-[var(--ink-4)] uppercase tracking-wide mb-1">Requirement</p>
      <p className="text-[0.86rem] text-[var(--ink-2)] mb-8 whitespace-pre-wrap">{booking.message}</p>

      {booking.status === 'pending' ? (
        <AdminBookingActions ownerToken={token} />
      ) : (
        <p className="text-[0.86rem] text-[var(--ink-3)]">This request has already been responded to.</p>
      )}
    </main>
  )
}
