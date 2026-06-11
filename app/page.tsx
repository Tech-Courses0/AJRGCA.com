import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import BentoGrid from '@/components/sections/BentoGrid'
import ComplianceCalendar from '@/components/sections/ComplianceCalendar'
import Button from '@/components/ui/Button'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import SectionHeader from '@/components/ui/SectionHeader'
import FadeIn from '@/components/ui/FadeIn'
import { stats } from '@/data'

export const metadata: Metadata = {
  title: 'AJRG and Associates — Chartered Accountants',
  description:
    'AJRG and Associates is a Chartered Accountant firm providing Strategic Financial Advisory, Audit, Tax & Compliance services across India.',
}

const heroFacts = [
  { value: '4', label: 'Cities Across India' },
  { value: '10', label: 'Practice Areas' },
  { value: 'FCA', label: 'Partner-Qualified' },
  { value: 'ICAI', label: 'Registered Practice' },
]

export default function HomePage() {
  return (
    <main>
      <Navbar />

      {/* ── Hero — Royal Minimalist on a clean canvas, framed by an architectural grid ── */}
      <section className="relative min-h-screen flex items-center pt-16 bg-[var(--cream)] overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-60 pointer-events-none" aria-hidden="true" />
        {/* soft deck-purple glow — gives the clean canvas depth without imagery */}
        <span
          className="absolute right-[-160px] top-1/3 w-[720px] h-[720px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(104,48,120,0.12), rgba(104,48,120,0) 68%)' }}
          aria-hidden="true"
        />
        <div className="absolute right-[-220px] top-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full border border-[var(--border)] opacity-60 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-[-90px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[var(--border)] opacity-40 pointer-events-none" aria-hidden="true" />
        {/* gentle settle into the navy stats strip below */}
        <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--cream)] pointer-events-none" aria-hidden="true" />

        <div className="max-w-8xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full py-24 relative">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-white border border-[var(--border)] text-[var(--accent-dark)] text-[0.72rem] font-semibold tracking-[0.1em] uppercase px-4 py-2 mb-8 shadow-[var(--elev-1)]">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              Chartered Accountants &amp; Financial Advisors
            </div>

            <h1 className="font-serif-display font-normal text-[clamp(2.8rem,5vw,4.2rem)] leading-[1.08] text-[var(--ink)] mb-6">
              Financial Clarity.<br />
              Strong Compliance.<br />
              Smarter<br />
              <em className="italic gold-text">Decisions.</em>
            </h1>

            <p className="text-[1.05rem] leading-relaxed text-[var(--ink-3)] max-w-md mb-10 font-light">
              Advisory, audit and compliance for businesses across sectors — under qualified partner oversight.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Button href="/book">Book a Consultation</Button>
              <Button href="/services" variant="secondary">Explore Services</Button>
            </div>

            <p className="text-[0.72rem] text-[var(--ink-3)] mt-6 tracking-[0.06em]">
              Mumbai &nbsp;|&nbsp; Noida &nbsp;|&nbsp; Ahmedabad* &nbsp;|&nbsp; Bangalore
            </p>
          </FadeIn>

          <FadeIn delay={0.3} direction="left" className="hidden lg:block">
            <div className="relative p-3">
              <span className="gold-corner top-0 left-0" />
              <span className="gold-corner gold-corner--br bottom-0 right-0" />
              <div className="grid grid-cols-2 gap-4">
                {heroFacts.map((f, i) => (
                  <div
                    key={f.label}
                    className={i === 1
                      ? 'on-dark group relative bg-royal-wash p-6 overflow-hidden transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[var(--elev-2)]'
                      : 'group relative bg-white border border-[var(--border)] p-6 shadow-[var(--elev-1)] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--border-dark)] hover:shadow-[var(--elev-2)]'}
                  >
                    {i === 1 && <span className="gold-reveal absolute left-0 top-0 h-full w-[2px]" />}
                    <div className="font-syne font-extrabold text-[2.4rem] gold-text leading-none">
                      {f.value}
                    </div>
                    <div className={i === 1
                      ? 'text-[0.78rem] text-white/60 tracking-[0.04em] mt-1'
                      : 'text-[0.78rem] text-[var(--ink-3)] tracking-[0.04em] mt-1'}>
                      {f.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* quiet scroll cue — a gold tick drifting down a hairline rail */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2.5 pointer-events-none" aria-hidden="true">
          <span className="text-[0.58rem] tracking-[0.22em] uppercase text-[var(--ink-4)]">Scroll</span>
          <span className="relative h-9 w-px bg-[var(--border-dark)] overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-3 bg-[var(--accent)] motion-safe:animate-[scrollCue_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
          </span>
        </div>
      </section>

      {/* ── Stats strip (navy) ── */}
      <div className="on-dark relative bg-[var(--ink)] py-12 px-8">
        <span className="gold-divider absolute top-0 left-0" />
        <div className="max-w-8xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} direction="up">
              <div className="text-center">
                <AnimatedCounter
                  value={stat.value}
                  className="block font-syne font-extrabold text-[2rem] text-white"
                />
                <div className="text-[0.75rem] text-white/50 tracking-[0.06em] uppercase mt-1">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* ── Bento grid of core service pillars ── */}
      <section className="py-28 px-8 bg-white">
        <FadeIn delay={0.1}>
          <div className="max-w-8xl mx-auto mb-14 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <SectionHeader
              label="How We Solve"
              title="Service pillars, built around outcomes."
            />
            <p className="text-[0.95rem] text-[var(--ink-3)] leading-relaxed max-w-xs font-light">
              Ten practice areas, partner-led. Each links to a technical deep-dive.
            </p>
          </div>
        </FadeIn>
        <div className="max-w-8xl mx-auto">
          <BentoGrid />
        </div>
      </section>

      {/* ── Interactive compliance calendar ── */}
      <ComplianceCalendar />

      {/* ── Practice Standards (ICAI-compliant; replaces testimonials) ── */}
      <section className="on-dark relative py-28 px-8 bg-[var(--ink)]">
        <span className="gold-divider absolute top-0 left-0" />
        <div className="max-w-8xl mx-auto">
          <SectionHeader label="Our Practice" title="A registered, regulated professional firm." light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: 'ICAI Registered Practice',
                body: 'Registered with the ICAI; every engagement follows applicable professional and ethical standards.',
              },
              {
                title: 'Partner-Qualified Professionals',
                body: 'Partners hold ICAI Chartered Accountant qualifications. Full credentials are on the About page.',
              },
              {
                title: 'Standards-Based Delivery',
                body: 'Delivered per applicable Standards on Auditing, Accounting Standards and ICAI pronouncements.',
              },
            ].map((item) => (
              <FadeIn key={item.title} delay={0.1}>
                <div className="bg-white/[0.04] border border-white/[0.08] p-8 h-full">
                  <h3 className="font-syne font-bold text-[0.95rem] text-white mb-4">{item.title}</h3>
                  <p className="text-[0.85rem] text-white/60 leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={<>Contact us to discuss your<br /><em className="italic gold-text">requirements.</em></>}
        subtitle="Get in touch with our partners to discuss your firm's requirements and learn how we may be of service."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />

      <Footer />
    </main>
  )
}
