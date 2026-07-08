'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [secret, setSecret] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, secret }),
      })
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Login failed' }))
        setError(error ?? 'Login failed')
        return
      }
      router.push('/admin/editor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--cream)] px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-[var(--border)] shadow-[var(--elev-1)] p-8">
        <div className="font-syne font-extrabold text-[1.1rem] tracking-[0.08em] text-[var(--ink)] mb-1">
          AJRG<span className="gold-text">CA</span>
        </div>
        <p className="text-[0.82rem] text-[var(--ink-3)] mb-6">Site editor</p>

        <label className="block text-[0.72rem] font-semibold tracking-[0.05em] uppercase text-[var(--ink-3)] mb-2">
          Username
        </label>
        <input
          type="text"
          autoFocus
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-[var(--border)] px-3 py-2.5 text-[0.9rem] mb-4 focus:outline-none focus:border-[var(--accent)]"
        />

        <label className="block text-[0.72rem] font-semibold tracking-[0.05em] uppercase text-[var(--ink-3)] mb-2">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full border border-[var(--border)] px-3 py-2.5 text-[0.9rem] mb-4 focus:outline-none focus:border-[var(--accent)]"
        />

        {error && <p className="text-[0.78rem] text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading || !username || !secret}
          className="w-full bg-[var(--ink)] text-white text-[0.78rem] font-semibold tracking-[0.08em] uppercase px-5 py-3 hover:bg-[var(--accent)] transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
