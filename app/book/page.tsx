import type { Metadata } from 'next'
import {
  UserCheck, ShieldCheck, CheckCircle2, ClipboardList,
  Users, CalendarCheck, MapPin,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionHeader from '@/components/ui/SectionHeader'
import BookRequestSection from '@/components/sections/BookRequestSection'
import ConsultationCalendar from '@/components/sections/ConsultationCalendar'

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description:
    'Request a confidential, no-obligation consultation with a partner at AJRG and Associates, Chartered Accountants — by video call or at our Mumbai or Noida office.',
}

const steps = [
  { icon: ClipboardList, title: 'Share your requirement', desc: 'Tell us briefly what you need and how you would like to meet.' },
  { icon: Users, title: 'We match the right partner', desc: 'Your query is routed to the partner best suited to it.' },
  { icon: CalendarCheck, title: 'Confirmed within a day', desc: 'We confirm the date, time and meeting link or office.' },
  { icon: CheckCircle2, title: 'Meet & plan next steps', desc: 'A focused, confidential discussion with clear next steps.' },
]

const faqs = [
  {
    q: 'Is the consultation chargeable?',
    a: 'The initial discussion is no-obligation. Any chargeable engagement begins only after a formal professional engagement letter is agreed.',
  },
  {
    q: 'What should I prepare?',
    a: 'Anything relevant to your query — recent financial statements, returns, notices or filings — helps us give you a more useful discussion. Not mandatory.',
  },
  {
    q: 'Where do we meet?',
    a: 'By video call, or in person at our registered office in Mumbai (Chembur) or our branch in Noida (Sector 132).',
  },
  {
    q: 'Is my information kept confidential?',
    a: 'Yes. All discussions and any data you share are treated as strictly confidential, in line with applicable ICAI professional standards and the DPDP Act, 2023.',
  },
]

export default function BookConsultationPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-36 pb-14 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-5xl mx-auto relative">
          <SectionHeader
            label="Consultation"
            title={<>Book a consultation with a <span className="gold-text">partner</span>.</>}
            subtitle="Request a confidential, no-obligation discussion of your requirement. We will match you to the right partner and confirm a slot within one business day."
          />
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
            {[
              { icon: UserCheck, label: 'Partner-led' },
              { icon: ShieldCheck, label: 'Confidential' },
              { icon: CheckCircle2, label: 'No obligation' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-[0.8rem] font-medium text-[var(--ink-2)]">
                <Icon size={15} className="text-[var(--accent)]" aria-hidden="true" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 px-8 bg-white border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-2">How it works</p>
          <span className="gold-rule mb-8 block" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="relative">
                  <span className="font-serif-display text-[2.4rem] leading-none text-[var(--accent-light)] block mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon size={17} className="text-[var(--accent)]" aria-hidden="true" />
                    <h3 className="text-[0.95rem] font-semibold text-[var(--ink)]">{s.title}</h3>
                  </div>
                  <p className="text-[0.82rem] text-[var(--ink-3)] leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Request form + What to expect ── */}
      <section className="py-20 px-8 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto">
          <BookRequestSection />
        </div>
      </section>

      {/* ── Pick a time (live calendar / fallback) ── */}
      <section className="py-20 px-8 bg-white border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 mb-2">
            <CalendarCheck size={16} className="text-[var(--accent)]" aria-hidden="true" />
            <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)]">Prefer to pick a time?</p>
          </div>
          <h2 className="font-serif-display font-normal text-[1.7rem] text-[var(--ink)] mb-6 max-w-xl">
            Choose a slot that suits you and we will meet you there.
          </h2>
          <ConsultationCalendar />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-8 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="Good to know" title="Before you book." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white border border-[var(--border)] rounded-card p-6">
                <h3 className="text-[0.92rem] font-semibold text-[var(--ink)] mb-2">{f.q}</h3>
                <p className="text-[0.83rem] text-[var(--ink-3)] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          {/* Offices quick line */}
          <p className="flex items-center justify-center gap-2 text-[0.8rem] text-[var(--ink-3)] mt-10">
            <MapPin size={14} className="text-[var(--accent)]" aria-hidden="true" />
            In person at <span className="text-[var(--ink-2)] font-medium">Mumbai</span> or <span className="text-[var(--ink-2)] font-medium">Noida</span> · or by video, anywhere.
          </p>
        </div>
      </section>

      {/* ── Compliance note ── */}
      <section className="pb-24 px-8 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto p-6 bg-white border border-[var(--border)] rounded-card">
          <p className="text-[0.78rem] text-[var(--ink-3)] leading-relaxed">
            <strong className="text-[var(--ink)]">Please note:</strong> Personal data you submit is processed solely to arrange and respond to your consultation, in line with the DPDP Act, 2023 — see our{' '}
            <a href="/privacy-policy" className="text-[var(--accent-dark)] underline">Privacy Policy</a>. This page is not an advertisement or solicitation of work; all engagements are conducted in accordance with applicable ICAI standards and the Chartered Accountants Act, 1949.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
