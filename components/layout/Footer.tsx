'use client'

import Link from 'next/link'
import { MapPin, Mail, Linkedin, Twitter, Facebook, Instagram, Youtube, Github, Globe, type LucideIcon } from 'lucide-react'
import { formatOffice } from '@/config/site'
import { footerDefault, defaultSiteBrand } from '@/data/chrome'
import EditableText from '@/components/editable/EditableText'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import { useEditor } from '@/components/editable/EditorContext'
import type { SiteContent, FooterLink, SocialLink } from '@/types/content'

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
  mail: Mail,
  globe: Globe,
}

export default function Footer({ content }: { content?: SiteContent }) {
  const { isEditing, content: liveContent } = useEditor()
  const active = isEditing && liveContent ? liveContent : content
  const site = active?.site ?? defaultSiteBrand
  const footer = active?.footer ?? footerDefault
  const social = site.social ?? []

  return (
    <footer className="on-dark bg-[var(--ink)] pt-16 pb-8 px-8">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand + statutory identity */}
          <div>
            <div className="font-syne font-extrabold text-xl tracking-[0.08em] text-white">
              {site.logoImage ? (
                <img src={site.logoImage} alt={site.logoAlt || site.wordmark} className="h-7 w-auto object-contain" />
              ) : (
                <span>{site.wordmark}</span>
              )}
            </div>
            <span className="gold-rule mt-4" />
            <p className="text-[0.8rem] text-white/45 mt-3 leading-relaxed">
              {site.legalName}. {site.tagline}
            </p>

            <p className="text-[0.72rem] text-white/35 mt-4">
              <span className="text-white/50"><EditableRichText path="footer.frnLabel" value={footer.frnLabel} as="span" /></span> {site.frn}
            </p>

            <p className="flex items-start gap-1.5 text-[0.72rem] text-white/35 mt-2 leading-relaxed">
              <MapPin size={11} className="mt-0.5 flex-shrink-0 text-[var(--accent)]" aria-hidden="true" />
              <span>
                <span className="text-white/50"><EditableRichText path="footer.registeredOfficeLabel" value={footer.registeredOfficeLabel} as="span" /></span> {formatOffice(site.registeredOffice)}
              </span>
            </p>
            <p className="text-[0.72rem] text-white/30 mt-2">{site.citiesLine}</p>

            {/* Social links */}
            {social.length > 0 && (
              <div className="flex items-center gap-3 mt-5">
                {social.map((s: SocialLink, i) => {
                  const Icon = SOCIAL_ICONS[s.platform?.toLowerCase()] ?? Globe
                  return (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform} className="text-white/45 hover:text-[var(--accent)] transition-colors">
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Content columns (Services, Firm) */}
          {footer.columns.map((col, ci) => (
            <div key={ci}>
              <div className="font-syne font-bold text-[0.72rem] tracking-[0.1em] uppercase text-white/40 mb-5">
                <EditableRichText path={`footer.columns.${ci}.heading`} value={col.heading} as="span" />
              </div>
              <ul className="flex flex-col gap-2.5">
                <EditableRepeater<FooterLink>
                  path={`footer.columns.${ci}.links`}
                  items={col.links}
                  newItem={() => ({ label: 'New link', href: '/' })}
                  addLabel="Add link"
                  renderItem={(l, li) => (
                    <li key={li}>
                      <Link href={l.href} className="text-[0.82rem] text-white/55 no-underline transition-colors duration-200 hover:text-white">
                        <EditableText
                          path={`footer.columns.${ci}.links.${li}.label`}
                          value={l.label}
                          as="span"
                          hrefPath={`footer.columns.${ci}.links.${li}.href`}
                          hrefValue={l.href}
                        />
                      </Link>
                    </li>
                  )}
                />
              </ul>
            </div>
          ))}

          {/* Connect + Legal */}
          <div>
            <div className="font-syne font-bold text-[0.72rem] tracking-[0.1em] uppercase text-white/40 mb-5">
              <EditableRichText path="footer.connectHeading" value={footer.connectHeading} as="span" />
            </div>
            <ul className="flex flex-col gap-2.5 mb-6">
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 text-[0.82rem] text-white/55 no-underline transition-colors duration-200 hover:text-white">
                  <Mail size={12} className="text-[var(--accent)]" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
            <div className="font-syne font-bold text-[0.72rem] tracking-[0.1em] uppercase text-white/40 mb-3">
              <EditableRichText path="footer.legalHeading" value={footer.legalHeading} as="span" />
            </div>
            <ul className="flex flex-col gap-2">
              {footer.legalLinks.map((l, li) => (
                <li key={li}>
                  <Link href={l.href} className="text-[0.78rem] text-white/45 no-underline transition-colors duration-200 hover:text-white">
                    <EditableText
                      path={`footer.legalLinks.${li}.label`}
                      value={l.label}
                      as="span"
                      hrefPath={`footer.legalLinks.${li}.href`}
                      hrefValue={l.href}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DPDP Act 2023 notice */}
        <div className="py-5 border-b border-white/10">
          <p className="text-[0.7rem] text-white/30 leading-relaxed max-w-4xl">
            <strong className="text-white/40"><EditableRichText path="footer.dpdpLabel" value={footer.dpdpLabel} as="span" /></strong>{' '}
            {site.dpdpNote}
          </p>
        </div>

        {/* Professional disclaimer */}
        <div className="py-5 border-b border-white/10">
          <p className="text-[0.7rem] text-white/25 leading-relaxed max-w-4xl">
            <strong className="text-white/35"><EditableRichText path="footer.disclaimerLabel" value={footer.disclaimerLabel} as="span" /></strong>{' '}
            {site.disclaimer}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <p className="text-[0.72rem] text-white/30">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {footer.legalLinks.map((l, li) => (
              <Link key={li} href={l.href} className="text-[0.68rem] text-white/25 no-underline hover:text-white/50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
