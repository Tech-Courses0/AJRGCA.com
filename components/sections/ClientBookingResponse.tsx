'use client'

import { useState } from 'react'

type Props = { clientToken: string }
type Result = { status: 'confirmed' | 'declined' } | null

export default function ClientBookingResponse({ clientToken }: Props) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result>(null)

  async function respond(accept: boolean) {
    setBusy(true)
    setError('')
    try {
      const res = await fetch(`/api/bookings/${clientToken}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accept }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong.')
      setResult({ status: data.status })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  if (result) {
    return (
      <p className="text-[0.9rem] font-medium text-[var(--accent-dark)]">
        {result.status === 'confirmed' ? 'Confirmed — see the details above. A confirmation email is on its way.' : 'You have declined this time.'}
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          disabled={busy}
          onClick={() => respond(true)}
          className="bg-[var(--ink)] text-white text-[0.78rem] font-semibold px-5 py-2.5 rounded-md disabled:opacity-60"
        >
          Accept this time
        </button>
        <button
          disabled={busy}
          onClick={() => respond(false)}
          className="border border-[var(--border)] text-[0.78rem] font-semibold px-5 py-2.5 rounded-md disabled:opacity-60"
        >
          Decline
        </button>
      </div>
      {error && <p className="text-[0.78rem] text-red-600">{error}</p>}
    </div>
  )
}
