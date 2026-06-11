import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import FadeIn from '@/components/ui/FadeIn'
import { services } from '@/data/services'
import { getIcon } from '@/lib/icons'

export const metadata: Metadata = {
  title: 'Services',
  description: 'AJRG and Associates provides professional Chartered Accountant services across strategic advisory, finance & accounting, audit & assurance, tax compliance, IBC advisory, succession planning, and more.',
}

const categoryOrder = ['Advisory', 'Compliance', 'Specialised'] as const

const categoryMeta: Record<string, { label: string; blurb: string }> = {
  Advisory: {
    label: 'Advisory',
    blurb: 'Strategic finance advisory covering financial planning, audit, assurance, and management reporting.',
  },
  Compliance: {
    label: 'Compliance',
    blurb: 'Tax, regulatory, secretarial, and customs compliance services.',
  },
  Specialised: {
    label: 'Specialised',
    blurb: 'Advisory for complex or specialised situations including insolvency, succession, legal, and IPR matters.',
  },
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="on-dark pt-36 pb-20 px-8 bg-[var(--ink)] relative overflow-hidden">
        <div className="absolute right-[-180px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-white/10 pointer-events-none" />
        <span className="gold-divider absolute bottom-0 left-0" />
        <div className="max-w-8xl mx-auto relative">
          <FadeIn>
            <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent-light)] mb-4">
              Our Services
            </p>
            <h1 className="font-serif-display font-normal text-[clamp(2.5rem,5vw,3.8rem)] leading-[1.1] max-w-3xl text-white">
              Financial advisory services across{' '}
              <em className="italic gold-text">our practice areas.</em>
            </h1>
            <p className="mt-6 text-[0.98rem] text-white/65 max-w-xl font-light leading-relaxed">
              Ten practice areas, from statutory compliance to strategic advisory — under qualified partner oversight.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {[
                { value: '10', label: 'Practice Areas' },
                { value: '3', label: 'Service Categories' },
                { value: '4', label: 'Cities Across India' },
                { value: '2', label: 'Qualified Partners' },
              ].map((s) => (
                <div key={s.label} className="bg-[var(--ink)] p-6">
                  <div className="font-syne font-extrabold text-[1.9rem] text-white leading-none">{s.value}</div>
                  <div className="text-[0.72rem] text-white/45 tracking-[0.05em] uppercase mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Service categories ── */}
      {categoryOrder.map((category) => {
        const group = services.filter((s) => s.category === category)
        const meta = categoryMeta[category]
        return (
          <section key={category} className="py-24 px-8 bg-white border-b border-[var(--border)] last:border-b-0">
            <div className="max-w-8xl mx-auto">
              <FadeIn>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 pb-6 border-b border-[var(--border)]">
                  <div className="flex items-baseline gap-5">
                    <span className="font-syne font-extrabold text-[0.8rem] text-[var(--accent)] tracking-[0.1em]">
                      {String(categoryOrder.indexOf(category) + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-serif-display font-normal text-[clamp(1.8rem,3.5vw,2.6rem)] text-[var(--ink)] leading-tight">
                      {meta.label}
                    </h2>
                  </div>
                  <p className="text-[0.9rem] text-[var(--ink-3)] font-light max-w-sm md:text-right">
                    {meta.blurb}
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
                {group.map((service, i) => {
                  const Icon = getIcon(service.icon)
                  return (
                  <FadeIn key={service.id} delay={i * 0.08} fullWidth>
                    <div className="relative group h-full bg-white p-8 lg:p-10 overflow-hidden transition-colors duration-300 hover:bg-[var(--section)]">
                      <span className="gold-reveal absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" />
                      <div className="flex items-start justify-between mb-5">
                        <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--accent-light)] text-[var(--accent-dark)]">
                          <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                        </span>
                        <span className="font-syne font-extrabold text-[0.72rem] tracking-[0.1em] text-[var(--border-dark)]">
                          {service.category}
                        </span>
                      </div>
                      <h3 className="font-syne font-bold text-[1.15rem] text-[var(--ink)] mb-3 leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-[0.88rem] text-[var(--ink-3)] leading-relaxed mb-6 font-light">
                        {service.shortDesc}
                      </p>
                      <div className="pt-5 border-t border-[var(--border)]">
                        <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[var(--accent-dark)] mb-3">
                          Key areas
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.points.slice(0, 5).map((point) => (
                            <span
                              key={point}
                              className="text-[0.72rem] text-[var(--ink-2)] bg-[var(--cream)] border border-[var(--border)] rounded-full px-3 py-1 leading-snug"
                            >
                              {point}
                            </span>
                          ))}
                          {service.points.length > 5 && (
                            <span className="text-[0.72rem] text-[var(--ink-4)] px-3 py-1">
                              +{service.points.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}

      {/* ── Approach pointer ── */}
      <section className="py-20 px-8 bg-[var(--section)]">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-3">
              How We Work
            </p>
            <h2 className="font-serif-display font-normal text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--ink)] leading-tight max-w-xl">
              A structured methodology behind every engagement.
            </h2>
          </div>
          <a
            href="/approach"
            className="inline-flex items-center gap-2 bg-[var(--ink)] text-white text-[0.75rem] font-semibold tracking-[0.08em] uppercase px-6 py-3.5 no-underline transition-colors duration-200 hover:bg-[var(--accent)] flex-shrink-0"
          >
            Explore Our Approach →
          </a>
        </div>
      </section>

      <CTASection
        title={<>Get in touch to discuss your<br /><em className="italic gold-text">requirements.</em></>}
        subtitle="Contact our partners to learn more about our services and whether they may be relevant to your requirements."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Our Approach"
        secondaryHref="/approach"
      />
      <Footer />
    </>
  )
}
