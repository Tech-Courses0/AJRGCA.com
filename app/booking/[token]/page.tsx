import { Clock, CalendarClock, CheckCircle2, XCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getBookingByClientToken } from '@/lib/bookings'
import ClientBookingResponse from '@/components/sections/ClientBookingResponse'

export default async function ClientBookingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const booking = await getBookingByClientToken(token)

  if (!booking) {
    return (
      <>
        <Navbar />
        <section className="pt-36 pb-24 px-8 bg-[var(--cream)] flex items-center justify-center">
          <p className="text-[0.9rem] text-[var(--ink-3)]">Booking not found, or Postgres isn&apos;t configured in this environment.</p>
        </section>
        <Footer />
      </>
    )
  }

  const isConfirmed = booking.status === 'confirmed'

  return (
    <>
      <Navbar />
      <section className="pt-36 pb-24 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-lg mx-auto relative">
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4">Consultation</p>
          <h1 className="font-serif-display font-normal text-[clamp(1.8rem,3.5vw,2.4rem)] text-[var(--ink)] leading-tight mb-8">Your consultation request</h1>

          <div
            className={
              isConfirmed
                ? 'on-dark bg-royal-wash rounded-card p-8 sm:p-10 relative overflow-hidden'
                : 'border border-[var(--border)] rounded-card p-8 sm:p-10 bg-white shadow-sm'
            }
          >
            {isConfirmed && <span className="gold-corner gold-corner--tr top-3 right-3" />}

            {booking.status === 'pending' && (
              <div className="flex flex-col items-center text-center gap-3">
                <Clock size={32} className="text-[var(--accent)]" aria-hidden="true" />
                <h2 className="font-serif-display font-normal text-[1.2rem] text-[var(--ink)]">Pending</h2>
                <p className="text-[0.88rem] text-[var(--ink-3)]">
                  We will confirm a slot within one business day. You requested{' '}
                  <strong className="text-[var(--ink-2)]">{booking.requested_date || 'no specific date'} · {booking.requested_time || 'any time'} ({booking.mode || 'video call'})</strong>.
                </p>
              </div>
            )}

            {booking.status === 'countered' && (
              <div className="flex flex-col items-center text-center gap-3">
                <CalendarClock size={32} className="text-[var(--accent)]" aria-hidden="true" />
                <h2 className="font-serif-display font-normal text-[1.2rem] text-[var(--ink)]">A different time was proposed</h2>
                <p className="text-[0.88rem] text-[var(--ink-2)]">
                  <strong>{booking.proposed_date} at {booking.proposed_time} (IST)</strong>
                </p>
                {booking.proposed_note && <p className="text-[0.85rem] text-[var(--ink-3)]">{booking.proposed_note}</p>}
                <div className="mt-2">
                  <ClientBookingResponse clientToken={token} />
                </div>
              </div>
            )}

            {isConfirmed && (
              <div className="flex flex-col items-center text-center gap-3">
                <CheckCircle2 size={36} className="text-[var(--accent-light)]" aria-hidden="true" />
                <h2 className="font-serif-display font-normal text-[1.3rem] text-white">Confirmed</h2>
                <p className="text-white/80 text-[0.9rem]">
                  <strong className="text-white">{booking.final_date} at {booking.final_time} (IST)</strong>
                </p>
                {booking.meet_link && (
                  <a href={booking.meet_link} className="text-[var(--accent-light)] underline text-[0.86rem]">{booking.meet_link}</a>
                )}
              </div>
            )}

            {booking.status === 'rejected' && (
              <div className="flex flex-col items-center text-center gap-3">
                <XCircle size={32} className="text-[var(--ink-4)]" aria-hidden="true" />
                <h2 className="font-serif-display font-normal text-[1.2rem] text-[var(--ink)]">Unable to accommodate</h2>
                <p className="text-[0.88rem] text-[var(--ink-3)]">
                  We were unable to accommodate this request. Please <a href="/book" className="text-[var(--accent-dark)] underline">submit a new one</a>.
                </p>
              </div>
            )}

            {booking.status === 'declined' && (
              <div className="flex flex-col items-center text-center gap-3">
                <XCircle size={32} className="text-[var(--ink-4)]" aria-hidden="true" />
                <h2 className="font-serif-display font-normal text-[1.2rem] text-[var(--ink)]">Time declined</h2>
                <p className="text-[0.88rem] text-[var(--ink-3)]">
                  You declined the proposed time. Please <a href="/book" className="text-[var(--accent-dark)] underline">submit a new request</a> if you would still like a consultation.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
