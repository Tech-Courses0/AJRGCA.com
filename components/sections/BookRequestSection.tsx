'use client'

import { useState } from 'react'
import { Clock, ShieldCheck, FileText, Video, CheckCircle2, Calendar } from 'lucide-react'
import ConsultationForm, { ConsultationSummary } from './ConsultationForm'
import ExistingBookingBanner from './ExistingBookingBanner'
import FadeIn from '@/components/ui/FadeIn'
import { site } from '@/config/site'

const expect = [
  { icon: Clock, text: 'A focused discussion, partner-led.' },
  { icon: ShieldCheck, text: 'Confidential and entirely no-obligation.' },
  { icon: FileText, text: 'Keep recent filings or financials handy, if relevant.' },
  { icon: Video, text: 'By video call, or in person at our Mumbai / Noida office.' },
]

export default function BookRequestSection() {
  const [summary, setSummary] = useState<ConsultationSummary | null>(null)

  if (summary) {
    return (
      <FadeIn direction="none" className="on-dark bg-royal-wash rounded-card p-12 relative overflow-hidden flex flex-col items-center text-center gap-3">
        <span className="gold-corner gold-corner--tr top-3 right-3" />
        <span className="gold-corner gold-corner--bl bottom-3 left-3" />
        <CheckCircle2 size={40} className="text-[var(--accent-light)]" aria-hidden="true" />
        <h2 className="font-serif-display font-normal text-[1.5rem] text-white">Request received, {summary.name.split(' ')[0]}.</h2>
        <p className="text-white/75 text-[0.9rem] max-w-md">
          We will confirm a slot within {site.responseTime} — you will receive an email once it is confirmed.
        </p>
        {(summary.date || summary.time || summary.mode) && (
          <div className="flex items-center gap-2 text-white/60 text-[0.8rem] mt-2 pt-4 border-t border-white/10">
            <Calendar size={14} className="text-[var(--accent-light)]" aria-hidden="true" />
            Requested — {[summary.mode, summary.date, summary.time].filter(Boolean).join(' · ')}
          </div>
        )}
      </FadeIn>
    )
  }

  return (
    <div>
      <ExistingBookingBanner />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
      {/* Form */}
      <div className="lg:col-span-3">
        <h2 className="font-serif-display font-normal text-[1.7rem] text-[var(--ink)] mb-1">Request your consultation</h2>
        <p className="text-[0.85rem] text-[var(--ink-3)] mb-7">A few details help us assign the right partner and confirm a time.</p>
        <ConsultationForm onSent={setSummary} />
      </div>

      {/* What to expect — royal wash panel */}
      <div className="on-dark lg:col-span-2 bg-royal-wash rounded-card p-8 relative overflow-hidden">
        <span className="gold-corner gold-corner--tr top-3 right-3" />
        <p className="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-[var(--accent-light)] mb-3">What to expect</p>
        <h3 className="font-serif-display font-normal text-[1.3rem] text-white leading-snug mb-6">
          A clear, factual discussion — <span className="gold-text">no hard sell</span>.
        </h3>
        <ul className="flex flex-col gap-4">
          {expect.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-white/75 text-[0.84rem] leading-relaxed">
              <Icon size={16} className="text-[var(--accent-light)] flex-shrink-0 mt-0.5" aria-hidden="true" /> {text}
            </li>
          ))}
        </ul>
        <p className="text-white/45 text-[0.72rem] leading-relaxed mt-7 pt-5 border-t border-white/10">
          Engagement of services is subject to a formal professional engagement letter.
        </p>
      </div>
      </div>
    </div>
  )
}
