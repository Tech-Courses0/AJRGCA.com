import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import IndustryCard from '@/components/ui/IndustryCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { industries } from '@/data'

export const metadata: Metadata = {
  title: 'Who We Serve',
  description: 'AJRG and Associates serves growing enterprises, startups & MSMEs, established organisations, promoter-driven businesses, professional firms, and exporters across India.',
}

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <section className="pt-36 pb-16 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-8xl mx-auto relative">
          <SectionHeader label="Who We Serve" title="Expertise tailored to your business stage and sector." />
          <p className="mt-4 text-[0.95rem] text-[var(--ink-3)] max-w-2xl font-light leading-relaxed">
            We work with growing enterprises, established organisations, startups, promoter-driven businesses, and professional firms across India.
          </p>
        </div>
      </section>
      <section className="py-16 px-8 bg-white">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>
      </section>

      {/* ── Our Speciality (from the firm profile) ── */}
      <section className="on-dark py-20 px-8 bg-royal-wash relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true" />
        <div className="max-w-8xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent-light)] mb-3">Our Speciality</p>
            <span className="gold-rule mb-5" />
            <h2 className="font-serif-display font-normal text-[clamp(1.8rem,3.4vw,2.6rem)] text-white leading-tight">
              Where we add the most value.
            </h2>
            <p className="mt-4 text-[0.95rem] text-white/60 font-light leading-relaxed max-w-md">
              Serving clients across India — strong regional expertise with a global outlook.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Financial Visibility for Promoters',
              'Building Structured Accounting Systems',
              'Strengthening Internal Financial Controls',
              'Compliance Health Check & Risk Mitigation',
              'Reconciliations & Process Implementation',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 bg-white/[0.05] border border-white/[0.08] rounded-lg p-4 text-[0.84rem] text-white/80 leading-snug">
                <span className="w-4 h-px bg-[var(--accent)] flex-shrink-0 mt-2.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </>
  )
}
