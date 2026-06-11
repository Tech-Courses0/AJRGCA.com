import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import SectionHeader from '@/components/ui/SectionHeader'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { partners } from '@/data'
import { leadership, mentors } from '@/data/team'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'AJRG and Associates is a Chartered Accountant firm providing financial advisory, audit, tax, and compliance services. Learn about our partners, qualifications, and practice.',
}

const values = [
  { num: '01', title: 'Financial Clarity', desc: 'We bring accuracy, discipline, and transparency to your numbers — so you have a clear picture of where your business stands.' },
  { num: '02', title: 'Strong Compliance', desc: 'Our approach is rooted in structured systems and professional execution to support regulatory compliance requirements.' },
  { num: '03', title: 'Smarter Decisions', desc: 'We combine compliance services with strategic advisory — supporting better-informed financial and business decisions.' },
  { num: '04', title: 'Professional Partnership', desc: 'We work closely with promoters, management teams, and finance functions to address financial and compliance requirements.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="pt-36 pb-20 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-8xl mx-auto relative">
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4">About AJRG and Associates</p>
          <h1 className="font-serif-display font-normal text-[clamp(2.5rem,5vw,3.8rem)] leading-[1.1] max-w-4xl text-[var(--ink)]">
            A Chartered Accountant firm providing{' '}
            <em className="italic gold-text">financial advisory, audit, and compliance services.</em>
          </h1>
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeader label="Who We Are" title="Professional advisory. Structured practice." />
            <div className="mt-8 flex flex-col gap-5 text-[0.95rem] text-[var(--ink-3)] leading-relaxed font-light">
              <p>
                A professional firm providing Strategic Financial Advisory, Audit & Assurance, and Compliance Services to businesses across sectors.
              </p>
              <p>
                We help organisations build strong financial foundations — bringing accuracy, discipline and transparency to their numbers, with a focus on structured systems and dependable execution.
              </p>
            </div>
          </div>
          <div className="on-dark bg-[var(--ink)] p-10">
            <p className="text-[0.7rem] tracking-[0.1em] uppercase text-[var(--accent-light)] mb-4">Our Vision</p>
            <h3 className="font-serif-display font-normal text-[1.6rem] text-white leading-[1.3]">
              To be a dependable financial growth partner for businesses, combining{' '}
              <em className="italic gold-text">strong compliance with strategic finance leadership.</em>
            </h3>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-[0.75rem] text-white/40 tracking-[0.08em] uppercase">Our Presence</p>
              <p className="text-white/70 text-sm mt-2">Mumbai | Noida | Ahmedabad* | Bangalore</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-[var(--section)]">
        <div className="max-w-8xl mx-auto mb-12">
          <SectionHeader label="Our Values" title="The principles that govern every engagement." />
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.num} className="bg-white p-8 border border-[var(--border)]">
              <div className="font-syne font-extrabold text-[2rem] text-[var(--border-dark)] mb-4">{v.num}</div>
              <h3 className="font-syne font-bold text-base text-[var(--ink)] mb-2">{v.title}</h3>
              <p className="text-[0.82rem] text-[var(--ink-3)] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-8xl mx-auto mb-12">
          <SectionHeader label="Our Partners" title="Subject-matter experts behind every engagement." />
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((p) => (
            <div key={p.name} className="border border-[var(--border)] rounded-card overflow-hidden flex flex-col sm:flex-row">
              {/* Large portrait — face clearly visible once a real photo is added */}
              <div className="sm:w-[42%] flex-shrink-0 relative min-h-[300px]">
                <ImagePlaceholder
                  label={`Photo — ${p.name}`}
                  hint="Head & shoulders portrait"
                  aspect=""
                  className="!rounded-none absolute inset-0"
                />
              </div>

              <div className="p-7 flex flex-col">
                <h3 className="font-serif-display font-normal text-2xl text-[var(--ink)]">{p.name}</h3>
                <p className="text-[0.76rem] text-[var(--accent-dark)] tracking-[0.04em] uppercase mt-1.5 font-semibold">{p.role}</p>
                <p className="text-[0.74rem] text-[var(--ink-3)] mt-1">{p.qualifications}</p>

                <p className="text-[0.86rem] text-[var(--ink-3)] leading-relaxed mt-5">{p.bio[0]}</p>

                <div className="mt-auto pt-5">
                  <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[var(--accent-dark)] mb-2">Focus Areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.sectors.map((s) => (
                      <span key={s} className="text-[0.68rem] font-medium tracking-[0.03em] bg-[var(--royal-tint)] text-[var(--royal)] px-2.5 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-8xl mx-auto mt-6">
          <p className="text-[0.76rem] text-[var(--ink-4)] italic">
            All partners are members of the Institute of Chartered Accountants of India (ICAI). Membership and registration details available on request.
          </p>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="py-20 px-8 bg-[var(--section)]">
        <div className="max-w-8xl mx-auto mb-12">
          <SectionHeader
            label="Our Leadership Team"
            title="The professionals behind every engagement."
            subtitle="A team of qualified professionals supporting our partners across audit, taxation, compliance and advisory."
          />
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((member) => (
            <div key={member.name} className="bg-white border border-[var(--border)] rounded-card overflow-hidden flex flex-col">
              <ImagePlaceholder
                label="Photo"
                aspect="aspect-[4/5]"
                className="!rounded-none w-full"
              />
              <div className="p-5 flex flex-col">
                <h3 className="font-syne font-bold text-[0.95rem] text-[var(--ink)] leading-snug">{member.name}</h3>
                <p className="text-[0.7rem] text-[var(--accent-dark)] tracking-[0.03em] mt-1 mb-3">{member.role}</p>
                {member.bio && <p className="text-[0.76rem] text-[var(--ink-3)] leading-relaxed">{member.bio}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-8xl mx-auto mt-6">
          <p className="text-[0.74rem] text-[var(--ink-4)] italic">
            Names and bios are from the firm profile. Real photographs to be supplied before launch.
          </p>
        </div>
      </section>

      {/* ── Associates & Mentors ── */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-8xl mx-auto mb-12">
          <SectionHeader
            label="Associates & Mentors"
            title="Senior advisors guiding our practice."
          />
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentors.map((m) => (
            <div key={m.name} className="border border-[var(--border)] rounded-card overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-[38%] flex-shrink-0 relative min-h-[180px]">
                <ImagePlaceholder label="Photo" aspect="" className="!rounded-none absolute inset-0" />
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="font-syne font-bold text-[0.95rem] text-[var(--ink)] leading-snug">{m.name}</h3>
                <p className="text-[0.7rem] text-[var(--accent-dark)] tracking-[0.03em] mt-1 mb-3">{m.role}</p>
                {m.bio && <p className="text-[0.76rem] text-[var(--ink-3)] leading-relaxed">{m.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title={<>Get in touch with<br /><em className="italic gold-text">our partners.</em></>}
        subtitle="Contact us to learn more about our services and whether they may be relevant to your requirements."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
      <Footer />
    </>
  )
}
