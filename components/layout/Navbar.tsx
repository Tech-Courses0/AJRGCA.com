'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ArrowRight, ChevronRight, MapPin } from 'lucide-react'
import clsx from 'clsx'
import { getIcon } from '@/lib/icons'
import { navDefault } from '@/data/chrome'
import EditableText from '@/components/editable/EditableText'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import IconField from '@/components/editable/IconField'
import { useEditor } from '@/components/editable/EditorContext'
import type { SiteContent, NavMenuItem, NavTopLevelItem } from '@/types/content'

const newMenuItem = (): NavMenuItem => ({ icon: 'trending-up', title: 'New item', desc: 'Description', href: '/services' })
const newTopLevelItem = (): NavTopLevelItem => ({ id: `item-${Date.now().toString(36)}`, label: 'New link', href: '/', kind: 'link' })

export default function Navbar({ content }: { content?: SiteContent }) {
  // In the editor, structural reads follow the live draft so panel/repeater
  // edits reflect instantly; on the public site we use the passed prop.
  const { isEditing, content: liveContent } = useEditor()
  const active = isEditing && liveContent ? liveContent : content
  const nav = active?.nav ?? navDefault
  const wordmark = active?.site?.wordmark ?? 'AJRGCA'
  const logoImage = active?.site?.logoImage ?? null
  const logoAlt = active?.site?.logoAlt || wordmark
  // Mega menu mirrors the real services/categories (Services page "Manage"
  // panels) instead of a separately-curated nav.serviceGroups list, so it
  // can't drift out of sync with what's actually on the Services page.
  const serviceCategories = active?.pages.services.categories ?? []
  const services = active?.services ?? []

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
          'fixed left-0 right-0 z-50 transition-all duration-300',
          // In the editor the 48px toolbar owns the very top; sit below it.
          isEditing ? 'top-12' : 'top-0',
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm'
            : 'bg-white border-b border-[var(--border)]'
        )}
      >
        <div className="max-w-8xl mx-auto px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="font-syne font-extrabold text-[1.1rem] tracking-[0.08em] text-[var(--ink)] no-underline flex-shrink-0">
            {logoImage ? (
              <img src={logoImage} alt={logoAlt} className="h-7 w-auto object-contain" />
            ) : (
              // Wordmark is settings-only (Global settings → Brand) — not inline-editable.
              <span>{wordmark}</span>
            )}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <EditableRepeater<NavTopLevelItem>
              path="nav.topLevel"
              items={nav.topLevel}
              newItem={newTopLevelItem}
              addLabel="Add nav item"
              allowDuplicate={false}
              renderItem={(item, i) => {
                const base = `nav.topLevel.${i}`
                if (item.kind === 'services' || item.kind === 'clients') {
                  return (
                    <div className="relative" onMouseEnter={() => openMenu(item.kind as 'services' | 'clients')} onMouseLeave={scheduleClose}>
                      <button
                        className={clsx(
                          'flex items-center gap-1 text-[0.78rem] font-medium tracking-[0.05em] uppercase px-4 py-2 transition-colors duration-200 rounded-sm',
                          activeMenu === item.kind || pathname === item.href ? 'text-[var(--ink)]' : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
                        )}
                      >
                        <EditableText path={`${base}.label`} value={item.label} as="span" />
                        <ChevronDown size={13} className={clsx('transition-transform duration-200', activeMenu === item.kind && 'rotate-180')} />
                      </button>
                    </div>
                  )
                }
                return (
                  <Link
                    href={item.href}
                    className={clsx(
                      'text-[0.78rem] font-medium tracking-[0.05em] uppercase px-4 py-2 transition-colors duration-200 no-underline rounded-sm',
                      pathname === item.href ? 'text-[var(--ink)]' : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
                    )}
                  >
                    <EditableText path={`${base}.label`} value={item.label} as="span" hrefPath={`${base}.href`} hrefValue={item.href} />
                  </Link>
                )
              }}
            />
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/book"
              className="bg-[var(--ink)] text-white text-[0.75rem] font-semibold tracking-[0.08em] uppercase px-5 py-2.5 no-underline transition-colors duration-200 hover:bg-[var(--accent)]"
            >
              <EditableText path="nav.labels.cta" value={nav.labels.cta} as="span" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 text-[var(--ink)]" onClick={() => setMobileOpen((p) => !p)} aria-label="Toggle menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ── SERVICES MEGA MENU ── */}
        <div
          className={clsx(
            'absolute top-full left-0 right-0 bg-white border-b border-[var(--border)] shadow-xl z-40',
            'transition-all duration-200 origin-top',
            activeMenu === 'services' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="max-w-8xl mx-auto px-8 py-8">
            <div className="flex gap-8">

              {/* Service-pillar columns — one per real category, mirroring the
                  Services page exactly. Read-only here: edit categories and
                  services from their "Manage" panels on /services. */}
              <div
                className="grid gap-x-8 flex-1"
                style={{ gridTemplateColumns: `repeat(${Math.max(serviceCategories.length, 1)}, minmax(0, 1fr))` }}
              >
                {serviceCategories.map((cat) => {
                  const catServices = services.filter((s) => s.category === cat.id)
                  return (
                    <div key={cat.id}>
                      <p className="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-[var(--accent-dark)] mb-3 pb-3 border-b border-[var(--border)]">
                        {cat.label}
                      </p>
                      <div className="flex flex-col gap-0.5">
                        {catServices.map((svc) => {
                          const Icon = getIcon(svc.icon)
                          return (
                            <Link
                              key={svc.id}
                              href={`/services#${svc.id}`}
                              className="group flex items-start gap-3 p-2.5 rounded-md hover:bg-[var(--section)] transition-colors duration-150 no-underline"
                            >
                              <div className="w-7 h-7 rounded-md bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--accent)] transition-colors duration-150">
                                <Icon size={13} className="text-[var(--accent-dark)] group-hover:text-white transition-colors duration-150" aria-hidden="true" />
                              </div>
                              <div>
                                <p className="text-[0.8rem] font-semibold text-[var(--ink)] leading-snug mb-0.5 group-hover:text-[var(--accent-dark)] transition-colors duration-150">
                                  {svc.title}
                                </p>
                                <p className="text-[0.7rem] text-[var(--ink-3)] leading-relaxed">{svc.shortDesc}</p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Featured panel — Insights + CTA */}
              <div className="on-dark w-72 flex-shrink-0 bg-royal-wash rounded-card p-6 flex flex-col justify-between relative overflow-hidden">
                <span className="gold-corner gold-corner--tr top-3 right-3" />
                <div>
                  <p className="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-[var(--accent-light)] mb-3">
                    <EditableRichText path="nav.featured.eyebrow" value={nav.featured.eyebrow} as="span" />
                  </p>
                  <h3 className="font-serif-display font-normal text-[1.15rem] text-white leading-[1.3] mb-3">
                    <EditableRichText path="nav.featured.headingLead" value={nav.featured.headingLead} as="span" />{' '}
                    <span className="gold-text"><EditableRichText path="nav.featured.headingAccent" value={nav.featured.headingAccent} as="span" /></span>
                  </h3>
                  <p className="text-white/55 text-[0.72rem] leading-relaxed mb-5">
                    <EditableRichText path="nav.featured.body" value={nav.featured.body} as="span" />
                  </p>
                  <div className="flex items-center gap-1.5 text-white/40 text-[0.68rem] mb-5">
                    <MapPin size={10} aria-hidden="true" />
                    <EditableRichText path="nav.featured.citiesLine" value={nav.featured.citiesLine} as="span" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/insights"
                    className="bg-[var(--accent)] text-white text-[0.72rem] font-semibold tracking-[0.08em] uppercase px-4 py-2.5 text-center no-underline hover:bg-white hover:text-[var(--royal)] transition-colors duration-200"
                  >
                    <EditableRichText path="nav.featured.primaryLabel" value={nav.featured.primaryLabel} as="span" />
                  </Link>
                  <Link
                    href="/book"
                    className="flex items-center justify-center gap-1 text-white/50 text-[0.72rem] hover:text-white transition-colors duration-200 no-underline pt-1"
                  >
                    <EditableRichText path="nav.featured.secondaryLabel" value={nav.featured.secondaryLabel} as="span" /> <ArrowRight size={11} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-6 pt-5 border-t border-[var(--border)] flex items-center justify-between">
              <p className="text-[0.72rem] text-[var(--ink-3)]">
                <EditableRichText path="nav.servicesBottomNote" value={nav.servicesBottomNote} as="span" />
              </p>
              <Link href="/services" className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[var(--accent)] no-underline hover:gap-2.5 transition-all duration-150">
                <EditableRichText path="nav.exploreAllLabel" value={nav.exploreAllLabel} as="span" /> <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── WHO WE SERVE DROPDOWN ── */}
        <div
          className={clsx(
            'absolute top-full left-0 right-0 bg-white border-b border-[var(--border)] shadow-xl z-40',
            'transition-all duration-200 origin-top',
            activeMenu === 'clients' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="max-w-8xl mx-auto px-8 py-8">
            <div className="grid grid-cols-3 gap-x-8 gap-y-1">
              <EditableRepeater<NavMenuItem>
                path="nav.clientTypes"
                items={nav.clientTypes}
                newItem={newMenuItem}
                addLabel="Add client type"
                renderItem={(client, ci) => {
                  return (
                    <Link key={ci} href={client.href} className="group flex items-start gap-3 p-3 rounded-sm hover:bg-[var(--section)] transition-colors duration-150 no-underline">
                      <div className="w-7 h-7 rounded-md bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--accent)] transition-colors duration-150">
                        <IconField path={`nav.clientTypes.${ci}.icon`} value={client.icon} size={13} className="text-[var(--accent-dark)] group-hover:text-white transition-colors duration-150" />
                      </div>
                      <div>
                        <EditableText path={`nav.clientTypes.${ci}.title`} value={client.title} as="p" className="text-[0.82rem] font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-150" hrefPath={`nav.clientTypes.${ci}.href`} hrefValue={client.href} />
                        <EditableRichText path={`nav.clientTypes.${ci}.desc`} value={client.desc} as="p" className="text-[0.72rem] text-[var(--ink-3)]" />
                      </div>
                    </Link>
                  )
                }}
              />
            </div>
            <div className="mt-5 pt-4 border-t border-[var(--border)]">
              <Link href="/industries" className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[var(--accent)] no-underline hover:gap-2.5 transition-all duration-150">
                <EditableRichText path="nav.clientsAllLabel" value={nav.clientsAllLabel} as="span" /> <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-white max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col px-6 py-4">
              {nav.topLevel.map((item) => {
                if (item.kind === 'services' || item.kind === 'clients') {
                  return (
                    <div key={item.id} className="border-b border-[var(--border)]">
                      <button className="w-full flex items-center justify-between py-3 text-[0.85rem] font-medium text-[var(--ink-2)]" onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}>
                        {item.label}
                        <ChevronDown size={15} className={clsx('transition-transform duration-200', mobileExpanded === item.id && 'rotate-180')} />
                      </button>
                      {mobileExpanded === item.id && (
                        <div className="pb-3 flex flex-col gap-0">
                          {item.kind === 'services' ? (
                            serviceCategories.map((cat) => (
                              <div key={cat.id} className="mb-3">
                                <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[var(--accent)] px-2 mb-1">{cat.label}</p>
                                {services.filter((s) => s.category === cat.id).map((svc) => (
                                  <Link key={svc.id} href={`/services#${svc.id}`} className="flex items-center gap-2 px-2 py-2 text-[0.8rem] text-[var(--ink-3)] no-underline hover:text-[var(--ink)]">
                                    <ChevronRight size={12} className="text-[var(--border-dark)] flex-shrink-0" />
                                    {svc.title}
                                  </Link>
                                ))}
                              </div>
                            ))
                          ) : (
                            nav.clientTypes.map((c, ci) => (
                              <Link key={ci} href={c.href} className="flex items-center gap-2 px-2 py-2 text-[0.8rem] text-[var(--ink-3)] no-underline hover:text-[var(--ink)]">
                                <ChevronRight size={12} className="text-[var(--border-dark)] flex-shrink-0" />
                                {c.title}
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <Link key={item.id} href={item.href} className="text-[0.85rem] font-medium text-[var(--ink-2)] no-underline py-3 border-b border-[var(--border)]">
                    {item.label}
                  </Link>
                )
              })}
              <Link href="/book" className="mt-4 bg-[var(--ink)] text-white text-[0.75rem] font-semibold tracking-[0.08em] uppercase px-5 py-3 text-center no-underline">{nav.labels.cta}</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay to close menus on outside click */}
      {activeMenu && (
        <div className="fixed inset-0 z-40 bg-transparent" style={{ top: isEditing ? '112px' : '64px' }} onClick={() => setActiveMenu(null)} />
      )}
    </>
  )
}
