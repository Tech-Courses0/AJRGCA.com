import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import SectionHeader from '@/components/ui/SectionHeader'
import FadeIn from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'AJRG and Associates follows a structured five-stage engagement methodology. Learn how we work with promoters, management teams, and finance functions across our service areas.',
}

const methodology = [
  {
    num: '01',
    title: 'Understand Business Vision',
    desc: 'We start with your goals, culture and direction, so the advisory fits your business.',
  },
  {
    num: '02',
    title: 'Gap Analysis: AS-IS vs TO-BE',
    desc: 'We map current systems against where they need to be, and surface the gaps.',
  },
  {
    num: '03',
    title: 'Strengthen Processes & Controls',
    desc: 'We design SOPs and internal controls that build discipline and reduce risk.',
  },
  {
    num: '04',
    title: 'Enhance Financial Visibility',
    desc: 'Clear MIS and structured reporting give promoters real financial visibility.',
  },
  {
    num: '05',
    title: 'Support Informed Decisions',
    desc: 'Structured data and reporting support better-informed business decisions.',
  },
]

const commitments = [
  'Financial Reporting for Promoters',
  'Building Structured Accounting Systems',
  'Strengthening Internal Financial Controls',
  'Compliance Health Check & Risk Assessment',
  'Reconciliations & Process Implementation',
  'ICAI registered and regulated practice',
]

export default function ApproachPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-36 pb-20 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-8xl mx-auto relative">
          <FadeIn>
            <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4">
              Our Approach
            </p>
            <h1 className="font-serif-display font-normal text-[clamp(2.5rem,5vw,3.8rem)] leading-[1.1] max-w-4xl text-[var(--ink)]">
              A structured methodology.{' '}
              <em className="italic gold-text">Professional execution.</em>
            </h1>
            <p className="mt-6 text-[0.98rem] text-[var(--ink-3)] max-w-xl font-light leading-relaxed">
              A five-stage process, adapted to each engagement — understand, assess, strengthen, inform.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Methodology + Commitment ── */}
      <section className="pb-28 px-8 bg-white">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <FadeIn>
              <SectionHeader
                label="The Methodology"
                title="Five stages of structured engagement."
              />
            </FadeIn>
            <div className="mt-8 divide-y divide-[var(--border)] border-t border-[var(--border)]">
              {methodology.map((pillar, i) => (
                <FadeIn key={pillar.num} delay={i * 0.08}>
                  <div className="py-6 flex gap-5">
                    <span className="font-syne font-extrabold text-[0.75rem] text-[var(--accent)] min-w-[28px] mt-0.5">
                      {pillar.num}
                    </span>
                    <div>
                      <h3 className="font-syne font-bold text-[0.95rem] text-[var(--ink)] mb-1">{pillar.title}</h3>
                      <p className="text-[0.84rem] text-[var(--ink-3)] leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.2} direction="left">
            <div className="on-dark bg-[var(--ink)] p-12 flex flex-col justify-between min-h-[560px] lg:sticky lg:top-24">
              <div>
                <p className="text-[0.7rem] tracking-[0.1em] uppercase text-[var(--accent-light)] mb-4">Our Focus Areas</p>
                <h3 className="font-serif-display font-normal text-[2rem] text-white leading-[1.2]">
                  We work closely with promoters, management teams and finance functions to address real-world challenges with{' '}
                  <em className="italic gold-text">clarity and precision.</em>
                </h3>
              </div>
              <ul className="flex flex-col gap-3 my-8">
                {commitments.map((item) => (
                  <li key={item} className="text-[0.84rem] text-white/60 flex items-center gap-3">
                    <span className="w-5 h-px bg-white/25 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-[0.72rem] text-white/40 tracking-[0.08em] uppercase">Mumbai | Noida | Ahmedabad* | Bangalore</span>
                <span className="font-syne font-extrabold text-[1.25rem] text-white">AJRGCA</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="py-24 px-8 bg-[var(--section)]">
        <div className="max-w-8xl mx-auto">
          <FadeIn>
            <SectionHeader
              label="Why It Matters"
              title="Process supports consistent professional delivery."
            />
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Aligned from the outset',
                desc: 'We start with your goals, so every engagement is relevant to your situation.',
              },
              {
                title: 'System-based approach',
                desc: 'SOPs and controls create a foundation for consistent reporting and compliance.',
              },
              {
                title: 'Structured reporting',
                desc: 'Accurate, timely MIS underpins sound business decisions.',
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="bg-white p-8 border border-[var(--border)] h-full">
                  <h3 className="font-syne font-bold text-base text-[var(--ink)] mb-3">{item.title}</h3>
                  <p className="text-[0.85rem] text-[var(--ink-3)] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={<>Get in touch to discuss your<br /><em className="italic gold-text">requirements.</em></>}
        subtitle="Contact our partners to learn more about our services and whether they may be relevant to your requirements."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />
      <Footer />
    </>
  )
}
