'use client'

import { useEffect, useState } from 'react'
import { CalendarClock, X } from 'lucide-react'
import { getBookingStatusUrl, clearBookingStatusUrl } from '@/lib/booking-storage'

export default function ExistingBookingBanner() {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    setUrl(getBookingStatusUrl())
  }, [])

  if (!url) return null

  return (
    <div className="flex items-center justify-between gap-4 border border-[var(--border)] rounded-card px-5 py-4 bg-[var(--section)] mb-8">
      <div className="flex items-center gap-3">
        <CalendarClock size={18} className="text-[var(--accent)] flex-shrink-0" aria-hidden="true" />
        <p className="text-[0.85rem] text-[var(--ink-2)]">
          You already have a consultation request on this browser.{' '}
          <a href={url} className="text-[var(--accent-dark)] underline font-medium">View status</a>
        </p>
      </div>
      <button
        onClick={() => {
          clearBookingStatusUrl()
          setUrl(null)
        }}
        aria-label="Dismiss"
        className="text-[var(--ink-4)] hover:text-[var(--ink-2)] flex-shrink-0"
      >
        <X size={16} />
      </button>
    </div>
  )
}
