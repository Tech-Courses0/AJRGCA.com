import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionHeader from '@/components/ui/SectionHeader'
import ContactForm from '@/components/sections/ContactForm'
import { site, registeredOfficeText, branchOfficeText } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact AJRG and Associates, Chartered Accountants, for professional services enquiries.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-36 pb-14 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-5xl mx-auto relative">
          <SectionHeader
            label="Contact"
            title="Get in touch with our team."
            subtitle="Share your requirements and we will respond at the earliest."
          />
        </div>
      </section>

      {/* ── Form + details ── */}
      <section className="pb-24 px-8 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="font-serif-display font-normal text-[1.6rem] text-[var(--ink)] mb-6">Send us an enquiry</h2>
            <ContactForm />
          </div>

          {/* Details */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="border border-[var(--border)] rounded-card p-7 bg-[var(--section)]">
              <p className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--accent-dark)] mb-4">Get In Touch</p>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-[0.88rem] text-[var(--ink-2)] no-underline hover:text-[var(--accent-dark)] transition-colors">
                <Mail size={15} className="text-[var(--accent)]" aria-hidden="true" /> {site.email}
              </a>
              <p className="flex items-center gap-2.5 text-[0.88rem] text-[var(--ink-3)] mt-3">
                <MessageCircle size={15} className="text-[var(--accent)]" aria-hidden="true" /> WhatsApp — available on request
              </p>
            </div>

            <div className="border border-[var(--border)] rounded-card p-7 bg-[var(--section)]">
              <p className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--accent-dark)] mb-4">Our Offices</p>

              <div className="flex items-start gap-2.5 mb-4">
                <MapPin size={15} className="text-[var(--accent)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[0.72rem] font-semibold text-[var(--ink-2)] uppercase tracking-[0.04em]">Registered Office — Mumbai</p>
                  <p className="text-[0.84rem] text-[var(--ink-3)] leading-relaxed mt-1">{registeredOfficeText()}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 mb-4">
                <MapPin size={15} className="text-[var(--accent)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[0.72rem] font-semibold text-[var(--ink-2)] uppercase tracking-[0.04em]">Branch — Noida</p>
                  <p className="text-[0.84rem] text-[var(--ink-3)] leading-relaxed mt-1">{branchOfficeText()}</p>
                </div>
              </div>

              <p className="text-[0.78rem] text-[var(--ink-3)] mt-2">
                Also serving <span className="text-[var(--ink-2)] font-medium">Bangalore</span> · <span className="text-[var(--ink-2)] font-medium">Ahmedabad*</span>
              </p>
              <p className="text-[0.72rem] text-[var(--ink-4)] mt-2 italic">*Office in progress</p>
            </div>
          </div>
        </div>

        {/* ── Map — Noida branch office, full-width rectangle ── */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="flex items-center gap-2.5 mb-4">
            <MapPin size={15} className="text-[var(--accent)] flex-shrink-0" aria-hidden="true" />
            <p className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--accent-dark)]">
              Find Us — Noida Branch
            </p>
          </div>
          <div className="rounded-card overflow-hidden border border-[var(--border)] shadow-sm">
            <iframe
              title="AJRG & Associates — Noida branch office at Logix Technova, Sector 132"
              src="https://maps.google.com/maps?q=Logix%20Technova%2C%20Tower%20B%2C%20Sector%20132%2C%20Noida&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[360px] md:h-[440px] block border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            href="https://www.google.com/maps/place/Logix+Technova/@28.5076002,77.3800379,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-[0.78rem] text-[var(--accent-dark)] underline"
          >
            Open in Google Maps
          </a>
        </div>

        {/* Notices */}
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 bg-[var(--cream)] border border-[var(--border)] rounded-card">
            <p className="text-[0.78rem] text-[var(--ink-3)] leading-relaxed">
              <strong className="text-[var(--ink)]">Privacy Notice:</strong> Information you share is used solely to respond to your enquiry and provide requested professional services, processed in line with the DPDP Act, 2023. See our{' '}
              <a href="/privacy-policy" className="text-[var(--accent-dark)] underline">Privacy Policy</a>.
            </p>
          </div>
          <div className="p-6 bg-[var(--cream)] border border-[var(--border)] rounded-card">
            <p className="text-[0.78rem] text-[var(--ink-3)] leading-relaxed">
              <strong className="text-[var(--ink)]">Disclaimer:</strong> Content on this website is for general information only and does not constitute professional advice. See our{' '}
              <a href="/disclaimer" className="text-[var(--accent-dark)] underline">full Disclaimer</a>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
