'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu, X, ChevronDown, ArrowRight,
  TrendingUp, BookOpen, ShieldCheck, FileText,
  Building2, Package, Scale, Users, Lightbulb,
  Gavel, ChevronRight, Briefcase, MapPin,
  Rocket, Globe,
} from 'lucide-react'
import clsx from 'clsx'

/* ── data ── */

/* Mega-menu taxonomy — ICAI-appropriate, "How we solve" framing.
   Five categories per the SaaS mega-menu architecture: four service pillars
   surfaced as columns + Insights surfaced in the featured panel. */
const serviceGroups = [
  {
    label: 'Audit & Assurance',
    services: [
      {
        icon: ShieldCheck,
        title: 'Audit & Assurance',
        desc: 'Independent assurance over your numbers — statutory, internal, and concurrent audit, IFC and fraud review.',
        href: '/services',
      },
      {
        icon: BookOpen,
        title: 'Finance & Accounting',
        desc: 'Reliable books and decision-grade MIS — managed finance, reporting, and financial controls.',
        href: '/services',
      },
    ],
  },
  {
    label: 'Tax Advisory',
    services: [
      {
        icon: FileText,
        title: 'Strategic Indirect & Direct Tax',
        desc: 'Seamless GST and income-tax compliance, litigation handling, transfer pricing and transaction structuring.',
        href: '/services',
      },
      {
        icon: Package,
        title: 'Customs & Trade Advisory',
        desc: 'MOOWR, RoDTEP, Free Trade Zone and AEO advisory for manufacturers and exporters.',
        href: '/services',
      },
    ],
  },
  {
    label: 'Regulatory & Compliance',
    services: [
      {
        icon: Building2,
        title: 'Secretarial & ROC Compliance',
        desc: 'Incorporation, ROC filings, CSR & ESG, and secretarial audits under the Companies Act, 2013.',
        href: '/services',
      },
      {
        icon: Scale,
        title: 'IBC Advisory',
        desc: 'CIRP advisory, financial position assessment and coordination with resolution professionals.',
        href: '/services',
      },
    ],
  },
  {
    label: 'Specialised Services',
    services: [
      {
        icon: TrendingUp,
        title: 'Strategic & Business Advisory',
        desc: 'Fractional CFO, financial modelling, valuation, M&A and transaction advisory.',
        href: '/services',
      },
      {
        icon: Users,
        title: 'Succession Planning',
        desc: 'Wills, family-business succession, trust structuring and tax-efficient wealth transition.',
        href: '/services',
      },
      {
        icon: Gavel,
        title: 'Legal Advisory & Dispute',
        desc: 'Commercial suits, arbitration, mediation and consumer-forum disputes.',
        href: '/services',
      },
      {
        icon: Lightbulb,
        title: 'Intellectual Property Rights',
        desc: 'Patents, trademarks, copyright and strategic IP portfolio management.',
        href: '/services',
      },
    ],
  },
]

const clientTypes = [
  { icon: TrendingUp, title: 'Growing Enterprises', desc: 'Scaling businesses that need structured finance', href: '/industries' },
  { icon: Rocket, title: 'Startups & MSMEs', desc: 'ESOP, fundraising & investor-ready compliance', href: '/industries' },
  { icon: Building2, title: 'Established Organisations', desc: 'Audit, tax planning & strategic advisory', href: '/industries' },
  { icon: Users, title: 'Promoter-Driven Businesses', desc: 'Financial visibility & succession planning', href: '/industries' },
  { icon: Briefcase, title: 'Professional Firms', desc: 'GST, ROC & practice management support', href: '/industries' },
  { icon: Globe, title: 'Exporters & Manufacturers', desc: 'MOOWR, RoDTEP, FTZ & AEO advisory', href: '/industries' },
]

/* ── component ── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [activeMenu, setActiveMenu] = useState<'services' | 'clients' | null>(null)
  const pathname = usePathname()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [pathname])

  const openMenu = useCallback((menu: 'services' | 'clients') => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(menu)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm'
            : 'bg-white border-b border-[var(--border)]'
        )}
      >
        <div className="max-w-8xl mx-auto px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="font-syne font-extrabold text-[1.1rem] tracking-[0.08em] text-[var(--ink)] no-underline flex-shrink-0">
            AJRG<span className="gold-text">CA</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">

            {/* About */}
            <Link
              href="/about"
              className={clsx(
                'text-[0.78rem] font-medium tracking-[0.05em] uppercase px-4 py-2 transition-colors duration-200 no-underline rounded-sm',
                pathname === '/about' ? 'text-[var(--ink)]' : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
              )}
            >
              About
            </Link>

            {/* Services mega trigger */}
            <div
              className="relative"
              onMouseEnter={() => openMenu('services')}
              onMouseLeave={scheduleClose}
            >
              <button
                className={clsx(
                  'flex items-center gap-1 text-[0.78rem] font-medium tracking-[0.05em] uppercase px-4 py-2 transition-colors duration-200 rounded-sm',
                  activeMenu === 'services' || pathname === '/services'
                    ? 'text-[var(--ink)]'
                    : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
                )}
              >
                Services
                <ChevronDown
                  size={13}
                  className={clsx('transition-transform duration-200', activeMenu === 'services' && 'rotate-180')}
                />
              </button>
            </div>

            {/* Approach */}
            <Link
              href="/approach"
              className={clsx(
                'text-[0.78rem] font-medium tracking-[0.05em] uppercase px-4 py-2 transition-colors duration-200 no-underline rounded-sm',
                pathname === '/approach' ? 'text-[var(--ink)]' : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
              )}
            >
              Approach
            </Link>

            {/* Who We Serve dropdown trigger */}
            <div
              className="relative"
              onMouseEnter={() => openMenu('clients')}
              onMouseLeave={scheduleClose}
            >
              <button
                className={clsx(
                  'flex items-center gap-1 text-[0.78rem] font-medium tracking-[0.05em] uppercase px-4 py-2 transition-colors duration-200 rounded-sm',
                  activeMenu === 'clients' || pathname === '/industries'
                    ? 'text-[var(--ink)]'
                    : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
                )}
              >
                Who We Serve
                <ChevronDown
                  size={13}
                  className={clsx('transition-transform duration-200', activeMenu === 'clients' && 'rotate-180')}
                />
              </button>
            </div>

            {/* Insights */}
            <Link
              href="/insights"
              className={clsx(
                'text-[0.78rem] font-medium tracking-[0.05em] uppercase px-4 py-2 transition-colors duration-200 no-underline rounded-sm',
                pathname === '/insights' ? 'text-[var(--ink)]' : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
              )}
            >
              Insights
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={clsx(
                'text-[0.78rem] font-medium tracking-[0.05em] uppercase px-4 py-2 transition-colors duration-200 no-underline rounded-sm',
                pathname === '/contact' ? 'text-[var(--ink)]' : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
              )}
            >
              Contact
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/book"
              className="bg-[var(--ink)] text-white text-[0.75rem] font-semibold tracking-[0.08em] uppercase px-5 py-2.5 no-underline transition-colors duration-200 hover:bg-[var(--accent)]"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[var(--ink)]"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── SERVICES MEGA MENU ── */}
        <div
          className={clsx(
            'absolute top-full left-0 right-0 bg-white border-b border-[var(--border)] shadow-xl z-40',
            'transition-all duration-200 origin-top',
            activeMenu === 'services'
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="max-w-8xl mx-auto px-8 py-8">
            <div className="flex gap-8">

              {/* Four service-pillar columns */}
              <div className="grid grid-cols-4 gap-x-8 flex-1">
                {serviceGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-[var(--accent-dark)] mb-3 pb-3 border-b border-[var(--border)]">
                      {group.label}
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {group.services.map((svc) => {
                        const Icon = svc.icon
                        return (
                          <Link
                            key={svc.title}
                            href={svc.href}
                            className="group flex items-start gap-3 p-2.5 rounded-md hover:bg-[var(--section)] transition-colors duration-150 no-underline"
                          >
                            <div className="w-7 h-7 rounded-md bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--accent)] transition-colors duration-150">
                              <Icon size={13} className="text-[var(--accent-dark)] group-hover:text-white transition-colors duration-150" aria-hidden="true" />
                            </div>
                            <div>
                              <p className="text-[0.8rem] font-semibold text-[var(--ink)] leading-snug mb-0.5 group-hover:text-[var(--accent-dark)] transition-colors duration-150">
                                {svc.title}
                              </p>
                              <p className="text-[0.7rem] text-[var(--ink-3)] leading-relaxed">
                                {svc.desc}
                              </p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured panel — Insights (the 5th category) + CTA, on the royal wash */}
              <div className="on-dark w-72 flex-shrink-0 bg-royal-wash rounded-card p-6 flex flex-col justify-between relative overflow-hidden">
                <span className="gold-corner gold-corner--tr top-3 right-3" />
                <div>
                  <p className="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-[var(--accent-light)] mb-3">
                    Insights
                  </p>
                  <h3 className="font-serif-display font-normal text-[1.15rem] text-white leading-[1.3] mb-3">
                    From our <span className="gold-text">Knowledge Center</span>
                  </h3>
                  <p className="text-white/55 text-[0.72rem] leading-relaxed mb-5">
                    Factual perspectives on tax, audit, IBC and succession — written by our partners.
                  </p>
                  <div className="flex items-center gap-1.5 text-white/40 text-[0.68rem] mb-5">
                    <MapPin size={10} aria-hidden="true" />
                    <span>Mumbai · Noida · Ahmedabad · Bangalore</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/insights"
                    className="bg-[var(--accent)] text-white text-[0.72rem] font-semibold tracking-[0.08em] uppercase px-4 py-2.5 text-center no-underline hover:bg-white hover:text-[var(--royal)] transition-colors duration-200"
                  >
                    Read the Knowledge Center
                  </Link>
                  <Link
                    href="/book"
                    className="flex items-center justify-center gap-1 text-white/50 text-[0.72rem] hover:text-white transition-colors duration-200 no-underline pt-1"
                  >
                    Book a consultation <ArrowRight size={11} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-6 pt-5 border-t border-[var(--border)] flex items-center justify-between">
              <p className="text-[0.72rem] text-[var(--ink-3)]">
                10 service verticals · Partner-led delivery · ICAI registered practice
              </p>
              <Link
                href="/services"
                className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[var(--accent)] no-underline hover:gap-2.5 transition-all duration-150"
              >
                Explore all services <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── WHO WE SERVE DROPDOWN ── */}
        <div
          className={clsx(
            'absolute top-full left-0 right-0 bg-white border-b border-[var(--border)] shadow-xl z-40',
            'transition-all duration-200 origin-top',
            activeMenu === 'clients'
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="max-w-8xl mx-auto px-8 py-8">
            <div className="grid grid-cols-3 gap-x-8 gap-y-1">
              {clientTypes.map((client) => {
                const Icon = client.icon
                return (
                  <Link
                    key={client.title}
                    href={client.href}
                    className="group flex items-start gap-3 p-3 rounded-sm hover:bg-[var(--section)] transition-colors duration-150 no-underline"
                  >
                    <div className="w-7 h-7 rounded-md bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--accent)] transition-colors duration-150">
                      <Icon size={13} className="text-[var(--accent-dark)] group-hover:text-white transition-colors duration-150" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[0.82rem] font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-150">
                        {client.title}
                      </p>
                      <p className="text-[0.72rem] text-[var(--ink-3)]">{client.desc}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className="mt-5 pt-4 border-t border-[var(--border)]">
              <Link
                href="/industries"
                className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[var(--accent)] no-underline hover:gap-2.5 transition-all duration-150"
              >
                View all client types <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-white max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col px-6 py-4">

              <Link href="/about" className="text-[0.85rem] font-medium text-[var(--ink-2)] no-underline py-3 border-b border-[var(--border)]">
                About
              </Link>

              {/* Mobile Services accordion */}
              <div className="border-b border-[var(--border)]">
                <button
                  className="w-full flex items-center justify-between py-3 text-[0.85rem] font-medium text-[var(--ink-2)]"
                  onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                >
                  Services
                  <ChevronDown
                    size={15}
                    className={clsx('transition-transform duration-200', mobileExpanded === 'services' && 'rotate-180')}
                  />
                </button>
                {mobileExpanded === 'services' && (
                  <div className="pb-3 flex flex-col gap-0">
                    {serviceGroups.map((group) => (
                      <div key={group.label} className="mb-3">
                        <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[var(--accent)] px-2 mb-1">
                          {group.label}
                        </p>
                        {group.services.map((svc) => (
                          <Link
                            key={svc.title}
                            href={svc.href}
                            className="flex items-center gap-2 px-2 py-2 text-[0.8rem] text-[var(--ink-3)] no-underline hover:text-[var(--ink)]"
                          >
                            <ChevronRight size={12} className="text-[var(--border-dark)] flex-shrink-0" />
                            {svc.title}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/approach" className="text-[0.85rem] font-medium text-[var(--ink-2)] no-underline py-3 border-b border-[var(--border)]">
                Approach
              </Link>

              {/* Mobile Who We Serve accordion */}
              <div className="border-b border-[var(--border)]">
                <button
                  className="w-full flex items-center justify-between py-3 text-[0.85rem] font-medium text-[var(--ink-2)]"
                  onClick={() => setMobileExpanded(mobileExpanded === 'clients' ? null : 'clients')}
                >
                  Who We Serve
                  <ChevronDown
                    size={15}
                    className={clsx('transition-transform duration-200', mobileExpanded === 'clients' && 'rotate-180')}
                  />
                </button>
                {mobileExpanded === 'clients' && (
                  <div className="pb-3 flex flex-col gap-0">
                    {clientTypes.map((c) => (
                      <Link
                        key={c.title}
                        href={c.href}
                        className="flex items-center gap-2 px-2 py-2 text-[0.8rem] text-[var(--ink-3)] no-underline hover:text-[var(--ink)]"
                      >
                        <ChevronRight size={12} className="text-[var(--border-dark)] flex-shrink-0" />
                        {c.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/insights" className="text-[0.85rem] font-medium text-[var(--ink-2)] no-underline py-3 border-b border-[var(--border)]">
                Insights
              </Link>

              <Link href="/contact" className="text-[0.85rem] font-medium text-[var(--ink-2)] no-underline py-3 border-b border-[var(--border)]">
                Contact
              </Link>

              <Link
                href="/book"
                className="mt-4 bg-[var(--ink)] text-white text-[0.75rem] font-semibold tracking-[0.08em] uppercase px-5 py-3 text-center no-underline"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay to close menus on outside click */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          style={{ top: '64px' }}
          onClick={() => setActiveMenu(null)}
        />
      )}
    </>
  )
}
