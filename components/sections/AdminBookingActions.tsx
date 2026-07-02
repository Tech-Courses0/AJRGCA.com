'use client'

import { useState } from 'react'

type Props = { ownerToken: string }

type Result = { status: 'confirmed' | 'countered' | 'rejected' } | null

export default function AdminBookingActions({ ownerToken }: Props) {
  const [mode, setMode] = useState<'idle' | 'countering'>('idle')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result>(null)

  async function send(body: object) {
    setBusy(true)
    setError('')
    try {
      const res = await fetch(`/api/bookings/${ownerToken}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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

  const field = 'w-full border border-[var(--border)] rounded-md px-3 py-2 text-[0.85rem]'

  if (result) {
    const label = { confirmed: 'Approved and confirmed.', countered: 'New time proposed to client.', rejected: 'Request rejected.' }[result.status]
    return <p className="text-[0.9rem] font-medium text-[var(--accent-dark)]">{label}</p>
  }

  if (mode === 'countering') {
    return (
      <div className="flex flex-col gap-3 max-w-sm">
        <label className="text-[0.78rem] font-semibold">
          Proposed date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={field} />
        </label>
        <label className="text-[0.78rem] font-semibold">
          Proposed time
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={field} />
        </label>
        <label className="text-[0.78rem] font-semibold">
          Note to client (optional)
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} className={field} />
        </label>
        <div className="flex gap-2">
          <button
            disabled={busy || !date || !time}
            onClick={() => send({ action: 'counter', date, time, note })}
            className="bg-[var(--ink)] text-white text-[0.78rem] font-semibold px-5 py-2.5 rounded-md disabled:opacity-60"
          >
            Send proposal
          </button>
          <button onClick={() => setMode('idle')} className="text-[0.78rem] font-semibold px-5 py-2.5">Cancel</button>
        </div>
        {error && <p className="text-[0.78rem] text-red-600">{error}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <button
          disabled={busy}
          onClick={() => send({ action: 'approve' })}
          className="bg-[var(--ink)] text-white text-[0.78rem] font-semibold px-5 py-2.5 rounded-md disabled:opacity-60"
        >
          Approve as requested
        </button>
        <button
          disabled={busy}
          onClick={() => setMode('countering')}
          className="border border-[var(--border)] text-[0.78rem] font-semibold px-5 py-2.5 rounded-md disabled:opacity-60"
        >
          Propose different time
        </button>
        <button
          disabled={busy}
          onClick={() => send({ action: 'reject' })}
          className="text-[0.78rem] font-semibold px-5 py-2.5 text-red-600 disabled:opacity-60"
        >
          Reject
        </button>
      </div>
      {error && <p className="text-[0.78rem] text-red-600">{error}</p>}
    </div>
  )
}
