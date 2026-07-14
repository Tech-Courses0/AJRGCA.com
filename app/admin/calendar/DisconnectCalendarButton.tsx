'use client'

import { useState } from 'react'

export default function DisconnectCalendarButton() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function disconnect() {
    if (!window.confirm('Disconnect Google? Website email and automatic Calendar events will stop until it is reconnected.')) return
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/api/admin/google/disconnect', { method: 'POST' })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Could not disconnect Google Calendar.')
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not disconnect Google Calendar.')
      setBusy(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={disconnect}
        disabled={busy}
        className="border border-green-300 px-4 py-2.5 text-[0.76rem] font-semibold text-green-800 hover:bg-white disabled:opacity-60"
      >
        {busy ? 'Disconnecting…' : 'Disconnect'}
      </button>
      {error && <p className="mt-2 text-[0.75rem] text-red-700">{error}</p>}
    </div>
  )
}
