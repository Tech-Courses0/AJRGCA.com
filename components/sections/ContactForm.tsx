'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { site } from '@/config/site'
import FadeIn from '@/components/ui/FadeIn'

type Status = 'idle' | 'sending' | 'sent' | 'error'

function mailtoFallback(name: string, org: string, email: string, message: string) {
  const subject = encodeURIComponent(`Website enquiry — ${name || 'New enquiry'}`)
  const body = encodeURIComponent(`Name: ${name}\nOrganisation: ${org}\nEmail: ${email}\n\n${message}`)
  return `mailto:${site.email}?subject=${subject}&body=${body}`
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [fallbackHref, setFallbackHref] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const organisation = String(data.get('organisation') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    const website = String(data.get('website') || '')

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'contact', name, organisation, email, message, website }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setFallbackHref(mailtoFallback(name, organisation, email, message))
      setStatus('error')
    }
  }

  const field =
    'w-full bg-white border border-[var(--border)] rounded-md px-4 py-3 text-[0.88rem] text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--accent)] transition-colors'
  const labelCls = 'block text-[0.72rem] font-semibold tracking-[0.04em] uppercase text-[var(--ink-3)] mb-2'

  if (status === 'sent') {
    return (
      <FadeIn direction="none" className="border border-[var(--border)] rounded-card p-10 bg-[var(--section)] flex flex-col items-center text-center gap-3">
        <CheckCircle2 size={36} className="text-[var(--accent)]" aria-hidden="true" />
        <h3 className="font-serif-display font-normal text-[1.3rem] text-[var(--ink)]">Enquiry sent</h3>
        <p className="text-[0.88rem] text-[var(--ink-3)]" aria-live="polite">
          Thank you — we will respond at the earliest.
        </p>
      </FadeIn>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-org" className={labelCls}>Organisation</label>
          <input id="cf-org" name="organisation" type="text" autoComplete="organization" className={field} placeholder="Company / firm" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className={labelCls}>Email</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="cf-message" className={labelCls}>How can we help?</label>
        <textarea id="cf-message" name="message" required rows={5} className={field} placeholder="Briefly describe your requirement" />
      </div>

      {/* Honeypot — hidden from sighted/keyboard users, visible to basic bots */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group inline-flex items-center justify-center gap-2 bg-[var(--ink)] text-white text-[0.78rem] font-semibold tracking-[0.08em] uppercase px-7 py-3.5 rounded-md hover:bg-[var(--royal)] transition-colors duration-200 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : 'Send Enquiry'} <Send size={14} aria-hidden="true" />
      </button>

      <p className="text-[0.72rem] text-[var(--ink-4)] leading-relaxed" aria-live="polite">
        {status === 'error' ? (
          <>
            Something went wrong sending your enquiry. Please{' '}
            <a href={fallbackHref} className="text-[var(--accent-dark)] underline">email us directly</a> instead.
          </>
        ) : (
          `By submitting, you consent to us processing your details to respond to your enquiry, per our Privacy Policy.`
        )}
      </p>
    </form>
  )
}
