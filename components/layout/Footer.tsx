import Link from 'next/link'
import { MapPin, Mail } from 'lucide-react'
import { site, registeredOfficeText } from '@/config/site'

const services = [
  'Audit & Assurance',
  'Tax & Regulatory Compliance',
  'Strategic & Business Advisory',
  'Secretarial & ROC Compliance',
  'IBC Advisory',
  'Succession Planning',
]

const company = ['About Us', 'Approach', 'Industries', 'Knowledge Center', 'Contact']
const companyHrefs = ['/about', '/approach', '/industries', '/insights', '/contact']

const legal = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Cookie Policy', href: '/cookies' },
]

export default function Footer() {
  return (
    <footer className="on-dark bg-[var(--ink)] pt-16 pb-8 px-8">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand + statutory identity */}
          <div>
            <div className="font-syne font-extrabold text-xl tracking-[0.08em] text-white">
              AJRG<span className="gold-text">CA</span>
            </div>
            <span className="gold-rule mt-4" />
            <p className="text-[0.8rem] text-white/45 mt-3 leading-relaxed">
              {site.legalName}. {site.tagline}
            </p>

            {/* Firm Registration Number — ICAI required */}
            <p className="text-[0.72rem] text-white/35 mt-4">
              <span className="text-white/50">Firm Registration No. (FRN):</span> {site.frn}
            </p>

            {/* Registered office — ICAI required */}
            <p className="flex items-start gap-1.5 text-[0.72rem] text-white/35 mt-2 leading-relaxed">
              <MapPin size={11} className="mt-0.5 flex-shrink-0 text-[var(--accent)]" aria-hidden="true" />
              <span>
                <span className="text-white/50">Registered Office:</span> {registeredOfficeText()}
              </span>
            </p>
            <p className="text-[0.72rem] text-white/30 mt-2">{site.citiesLine}</p>
          </div>

          {/* Services */}
          <div>
            <div className="font-syne font-bold text-[0.72rem] tracking-[0.1em] uppercase text-white/40 mb-5">
              Services
            </div>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-[0.82rem] text-white/55 no-underline transition-colors duration-200 hover:text-white"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-syne font-bold text-[0.72rem] tracking-[0.1em] uppercase text-white/40 mb-5">
              Firm
            </div>
            <ul className="flex flex-col gap-2.5">
              {company.map((c, i) => (
                <li key={c}>
                  <Link
                    href={companyHrefs[i]}
                    className="text-[0.82rem] text-white/55 no-underline transition-colors duration-200 hover:text-white"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect + Legal */}
          <div>
            <div className="font-syne font-bold text-[0.72rem] tracking-[0.1em] uppercase text-white/40 mb-5">
              Connect
            </div>
            <ul className="flex flex-col gap-2.5 mb-6">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-1.5 text-[0.82rem] text-white/55 no-underline transition-colors duration-200 hover:text-white"
                >
                  <Mail size={12} className="text-[var(--accent)]" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
            <div className="font-syne font-bold text-[0.72rem] tracking-[0.1em] uppercase text-white/40 mb-3">
              Legal
            </div>
            <ul className="flex flex-col gap-2">
              {legal.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-[0.78rem] text-white/45 no-underline transition-colors duration-200 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DPDP Act 2023 notice */}
        <div className="py-5 border-b border-white/10">
          <p className="text-[0.7rem] text-white/30 leading-relaxed max-w-4xl">
            <strong className="text-white/40">Data Protection:</strong> {site.dpdpNote}
          </p>
        </div>

        {/* Professional disclaimer — ICAI required */}
        <div className="py-5 border-b border-white/10">
          <p className="text-[0.7rem] text-white/25 leading-relaxed max-w-4xl">
            <strong className="text-white/35">Professional Disclaimer:</strong> {site.disclaimer}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <p className="text-[0.72rem] text-white/30">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {legal.map((l) => (
              <Link key={l.label} href={l.href} className="text-[0.68rem] text-white/25 no-underline hover:text-white/50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
