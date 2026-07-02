'use client'

import { useState } from 'react'
import { CalendarCheck, CheckCircle2 } from 'lucide-react'
import { site } from '@/config/site'
import FadeIn from '@/components/ui/FadeIn'

type Status = 'idle' | 'sending' | 'sent' | 'error'

function mailtoFallback(g: (k: string) => string) {
  const name = g('name')
  const subject = encodeURIComponent(`Consultation request — ${name || 'New request'}`)
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Organisation: ${g('organisation')}`,
      `Email: ${g('email')}`,
      `Phone: ${g('phone')}`,
      `Business type: ${g('businessType')}`,
      `Service area: ${g('serviceArea')}`,
      `Preferred mode: ${g('mode')}`,
      `Preferred date: ${g('date')}`,
      `Preferred time: ${g('time')}`,
      '',
      'Requirement:',
      g('message'),
    ].join('\n')
  )
  return `mailto:${site.email}?subject=${subject}&body=${body}`
}

export default function ConsultationForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [fallbackHref, setFallbackHref] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const d = new FormData(form)
    const g = (k: string) => String(d.get(k) || '').trim()

    const payload = {
      formType: 'consultation' as const,
      name: g('name'),
      organisation: g('organisation'),
      email: g('email'),
      phone: g('phone'),
      businessType: g('businessType'),
      serviceArea: g('serviceArea'),
      mode: g('mode'),
      date: g('date'),
      time: g('time'),
      message: g('message'),
      consent: d.get('consent') === 'on',
      website: g('website'),
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setFallbackHref(mailtoFallback(g))
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
        <h3 className="font-serif-display font-normal text-[1.3rem] text-[var(--ink)]">Request received</h3>
        <p className="text-[0.88rem] text-[var(--ink-3)]" aria-live="polite">
          We will confirm a slot within one business day.
        </p>
      </FadeIn>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="bk-name" className={labelCls}>Name</label>
          <input id="bk-name" name="name" type="text" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="bk-org" className={labelCls}>Organisation</label>
          <input id="bk-org" name="organisation" type="text" autoComplete="organization" className={field} placeholder="Company / firm" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="bk-email" className={labelCls}>Email</label>
          <input id="bk-email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="bk-phone" className={labelCls}>Phone</label>
          <input id="bk-phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="+91 ..." />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="bk-biz" className={labelCls}>Business type</label>
          <select id="bk-biz" name="businessType" className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            <option>Growing Enterprise</option>
            <option>Startup / MSME</option>
            <option>Established Organisation</option>
            <option>Promoter-Driven Business</option>
            <option>Professional Firm</option>
            <option>Exporter / Manufacturer</option>
            <option>Individual / Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="bk-service" className={labelCls}>Service area</label>
          <select id="bk-service" name="serviceArea" className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            <option>Audit &amp; Assurance</option>
            <option>Tax — Direct &amp; Indirect</option>
            <option>Regulatory &amp; ROC Compliance</option>
            <option>IBC Advisory</option>
            <option>Strategic / CFO Advisory</option>
            <option>Succession Planning</option>
            <option>Not sure / Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="bk-mode" className={labelCls}>Preferred mode</label>
          <select id="bk-mode" name="mode" className={field} defaultValue="Video call">
            <option>Video call</option>
            <option>Mumbai office</option>
            <option>Noida office</option>
          </select>
        </div>
        <div>
          <label htmlFor="bk-date" className={labelCls}>Preferred date</label>
          <input id="bk-date" name="date" type="date" className={field} />
        </div>
        <div>
          <label htmlFor="bk-time" className={labelCls}>Preferred time</label>
          <select id="bk-time" name="time" className={field} defaultValue="">
            <option value="" disabled>Select…</option>
            <option>Morning (10am–1pm)</option>
            <option>Afternoon (2pm–5pm)</option>
            <option>Evening (5pm–7pm)</option>
            <option>Any time</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bk-message" className={labelCls}>Briefly, what would you like to discuss?</label>
        <textarea id="bk-message" name="message" required rows={4} className={field} placeholder="A few lines about your requirement helps us assign the right partner." />
      </div>

      {/* Honeypot — hidden from sighted/keyboard users, visible to basic bots */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="bk-website">Website</label>
        <input id="bk-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor="bk-consent" className="flex items-start gap-2.5 text-[0.76rem] text-[var(--ink-3)] leading-relaxed">
        <input id="bk-consent" name="consent" type="checkbox" required className="mt-0.5 accent-[var(--accent)]" />
        <span>
          I consent to AJRG and Associates processing the details above to respond to and arrange my consultation, in line with the{' '}
          <a href="/privacy-policy" className="text-[var(--accent-dark)] underline">Privacy Policy</a>.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group inline-flex items-center justify-center gap-2 bg-[var(--ink)] text-white text-[0.78rem] font-semibold tracking-[0.08em] uppercase px-7 py-3.5 rounded-md hover:bg-[var(--royal)] transition-colors duration-200 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : 'Request Consultation'} <CalendarCheck size={15} aria-hidden="true" />
      </button>

      <p className="text-[0.72rem] text-[var(--ink-4)] leading-relaxed" aria-live="polite">
        {status === 'error' ? (
          <>
            Something went wrong sending your request. Please{' '}
            <a href={fallbackHref} className="text-[var(--accent-dark)] underline">email us directly</a> instead.
          </>
        ) : (
          'Submitting sends your request to our team. We typically confirm a slot within one business day.'
        )}
      </p>
    </form>
  )
}
