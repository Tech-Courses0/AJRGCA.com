'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { site } from '@/config/site'

/**
 * Enquiry form. Uses a mailto: action so it works with no backend on day one.
 * TODO (see TODO.txt): wire to a proper form service (e.g. Resend / Formspree)
 * for inbox delivery, spam protection, and DPDP-compliant consent logging.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const org = String(data.get('organisation') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')

    const subject = encodeURIComponent(`Website enquiry — ${name || 'New enquiry'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nOrganisation: ${org}\nEmail: ${email}\n\n${message}`
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const field =
    'w-full bg-white border border-[var(--border)] rounded-md px-4 py-3 text-[0.88rem] text-[var(--ink)] placeholder:text-[var(--ink-4)] focus:outline-none focus:border-[var(--accent)] transition-colors'
  const labelCls = 'block text-[0.72rem] font-semibold tracking-[0.04em] uppercase text-[var(--ink-3)] mb-2'

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

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 bg-[var(--ink)] text-white text-[0.78rem] font-semibold tracking-[0.08em] uppercase px-7 py-3.5 rounded-md hover:bg-[var(--royal)] transition-colors duration-200 w-full sm:w-auto"
      >
        Send Enquiry <Send size={14} aria-hidden="true" />
      </button>

      <p className="text-[0.72rem] text-[var(--ink-4)] leading-relaxed" aria-live="polite">
        {sent
          ? 'Your email client should now open with your enquiry — please review and send.'
          : `This form opens your email client to send to ${site.email}. By submitting, you consent to us processing your details to respond to your enquiry, per our Privacy Policy.`}
      </p>
    </form>
  )
}
