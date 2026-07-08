import { CalendarClock } from 'lucide-react'
import { site } from '@/config/site'

/**
 * Live slot scheduler. When `site.consultationCalendarUrl` is set to a
 * Cal.com / Calendly embed URL, it renders the booking calendar inline.
 * Until then it shows a tidy fallback that points to the request form above —
 * so the page is complete and on-brand from day one.
 */
export default function ConsultationCalendar() {
  const url = site.consultationCalendarUrl

  if (!url) {
    return (
      <div className="rounded-card border border-[var(--border)] bg-[var(--cream)] p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-white border border-[var(--border)] flex items-center justify-center mx-auto mb-4">
          <CalendarClock size={20} className="text-[var(--accent)]" aria-hidden="true" />
        </div>
        <p className="font-serif-display text-[1.15rem] text-[var(--ink)] mb-2">
          Self-scheduling is being set up
        </p>
        <p className="text-[0.85rem] text-[var(--ink-3)] leading-relaxed max-w-md mx-auto">
          For now, share your preferred date and time in the request form above —
          we will confirm your consultation within {site.responseTime}.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-card overflow-hidden border border-[var(--border)] shadow-sm bg-white">
      <iframe
        src={url}
        title="Book a consultation slot with AJRG and Associates"
        className="w-full h-[680px] block border-0"
        loading="lazy"
      />
    </div>
  )
}
