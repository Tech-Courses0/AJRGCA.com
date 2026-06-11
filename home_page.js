import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServiceCard from '@/components/ui/ServiceCard'
import IndustryCard from '@/components/ui/IndustryCard'
import TestimonialCard from '@/components/ui/TestimonialCard'
import CTASection from '@/components/sections/CTASection'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import { services } from '@/data/services'
import { industries, testimonials, stats } from '@/data/index'

export const metadata: Metadata = {
  title: 'KRGSCA — Chartered Accountants & Financial Consultants',
  description:
    'Building financial confidence for businesses that want to scale. Premium CA firm offering Tax, GST, Audit, NRI & Startup Advisory services across India.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex items-center pt-16 bg-white relative overflow-hidden">
        <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--border)] opacity-60 pointer-events-none" />
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-[var(--border)] opacity-40 pointer-events-none" />

        <div className="max-w-8xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full py-24">
          <div>
            <div className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent-dark)] text-[0.72rem] font-semibold tracking-[0.1em] uppercase px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
              Chartered Accountants &amp; Consultants
            </div>

            <h1 className="font-serif-display font-normal text-[clamp(2.8rem,5vw,4.2rem)] leading-[1.08] text-[var(--ink)] mb-6">
              Building Financial<br />
              Confidence for<br />
              Businesses that<br />
              want to <em className="italic text-[var(--accent)]">Scale.</em>
            </h1>

            <p className="text-base leading-relaxed text-[var(--ink-3)] max-w-lg mb-10 font-light">
              We provide strategic financial and compliance advisory to enterprises, startups, and professionals—with the rigour of a global firm and the agility of a specialist partner.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Button href="/contact">Book a Consultation</Button>
              <Button href="/services" variant="secondary">Explore Services</Button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--section)] p-6">
                <div className="font-syne font-extrabold text-[2.4rem] text-[var(--ink)] leading-none">15+</div>
                <div className="text-[0.78rem] text-[var(--ink-3)] tracking-[0.04em] mt-1">Years of Practice</div>
              </div>
              <div className="bg-[var(--section)] p-6">
                <div className="font-syne font-extrabold text-[2.4rem] text-[var(--ink)] leading-none">500+</div>
                <div className="text-[0.78rem] text-[var(--ink-3)] tracking-[0.04em] mt-1">Clients Served</div>
              </div>
            </div>
            <div className="bg-[var(--ink)] p-6">
              <div className="font-syne font-extrabold text-[2.4rem] text-[var(--accent)] leading-none">₹200Cr+</div>
              <div className="text-[0.78rem] text-white/50 tracking-[0.04em] mt-1">Tax Returns Filed Annually</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--section)] p-6">
                <div className="font-syne font-extrabold text-[2.4rem] text-[var(--ink)] leading-none">300+</div>
                <div className="text-[0.78rem] text-[var(--ink-3)] tracking-[0.04em] mt-1">Incorporations</div>
              </div>
              <div className="bg-[var(--accent-light)] p-6">
                <div className="font-syne font-extrabold text-[2.4rem] text-[var(--accent-dark)] leading-none">98%</div>
                <div className="text-[0.78rem] text-[var(--accent-dark)]/60 tracking-[0.04em] mt-1">Client Retention</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-[var(--ink)] py-12 px-8">
        <div className="max-w-8xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-syne font-extrabold text-[2rem] text-white">{stat.value}</div>
              <div className="text-[0.75rem] text-white/50 tracking-[0.06em] uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="py-28 px-8 bg-white">
        <div className="max-w-8xl mx-auto mb-14 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <SectionHeader
            label="Our Expertise"
            title="Comprehensive financial advisory across every discipline."
          />
          <p className="text-[0.95rem] text-[var(--ink-3)] leading-relaxed max-w-sm font-light">
            From statutory compliance to strategic tax planning—delivered with precision and commercial intelligence.
          </p>
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-2 md:grid-cols-4 border border-[var(--border)] divide-x divide-y divide-[var(--border)]">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* WHY KRGSCA */}
      <section className="py-28 px-8 bg-[var(--section)]">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <SectionHeader
              label="Why KRGSCA"
              title="A firm built on rigour. Sustained by relationships."
            />
            <div className="mt-8 divide-y divide-[var(--border)] border-t border-[var(--border)]">
              {[
                {
                  num: '01',
                  title: 'Partner-Led Delivery',
                  desc: 'Every engagement is led by a qualified CA—not delegated down. You receive senior attention on every matter, every time.',
                },
                {
                  num: '02',
                  title: 'Commercial Intelligence',
                  desc: 'We combine technical accuracy with business insight—ensuring compliance advice is always commercially viable.',
                },
                {
                  num: '03',
                  title: 'Technology-Enabled Practice',
                  desc: 'Digital workflows, real-time dashboards, and secure document management for a seamless client experience.',
                },
                {
                  num: '04',
                  title: 'Proactive Communication',
                  desc: "No deadline surprises. We monitor, remind, and act before due dates—so your business never faces penalties.",
                },
              ].map((pillar) => (
                <div key={pillar.num} className="py-6 flex gap-5">
                  <span className="font-syne font-extrabold text-[0.75rem] text-[var(--accent)] min-w-[28px] mt-0.5">
                    {pillar.num}
                  </span>
                  <div>
                    <h3 className="font-syne font-bold text-[0.9rem] text-[var(--ink)] mb-1">{pillar.title}</h3>
                    <p className="text-[0.82rem] text-[var(--ink-3)] leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--ink)] p-12 flex flex-col justify-between min-h-[480px]">
            <div>
              <p className="text-[0.7rem] tracking-[0.1em] uppercase text-[var(--accent)] mb-4">Our Commitment</p>
              <h3 className="font-serif-display font-normal text-[2rem] text-white leading-[1.2]">
                The precision of process. The agility of a{' '}
                <em className="italic text-[var(--accent)]">trusted advisor.</em>
              </h3>
            </div>
            <ul className="flex flex-col gap-3 my-8">
              {[
                'ICAI registered and regulated practice',
                'Multi-city presence across major Indian metros',
                'Active across 12+ industry verticals',
                'Dedicated relationship manager for every client',
                '24-hour response commitment on all queries',
              ].map((item) => (
                <li key={item} className="text-[0.82rem] text-white/60 flex items-center gap-3">
                  <span className="w-5 h-px bg-[var(--accent)] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-white/10 flex justify-between items-center">
              <span className="text-[0.72rem] text-white/40 tracking-[0.08em] uppercase">Est. 2009</span>
              <span className="font-syne font-extrabold text-[1.25rem] text-white">KRGSCA</span>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-28 px-8 bg-white">
        <div className="max-w-8xl mx-auto mb-10">
          <SectionHeader
            label="Industries We Serve"
            title="Sector-specific expertise across India's growth economy."
          />
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-8 bg-[var(--ink)]">
        <div className="max-w-8xl mx-auto">
          <SectionHeader label="Client Perspectives" title="What our clients say." light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={<>Ready to elevate your<br />financial <em className="italic text-[var(--accent)]">strategy?</em></>}
        subtitle="Schedule a complimentary consultation with our senior advisors. We'll assess your current position and outline a roadmap tailored to your business goals."
        primaryLabel="Book Consultation"
        primaryHref="/contact"
        secondaryLabel="View All Services"
        secondaryHref="/services"
      />

      <Footer />
    </>
  )
}