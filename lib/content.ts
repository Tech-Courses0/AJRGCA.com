import { getSql } from '@/lib/db'
import { site } from '@/config/site'
import { industries, partners, stats } from '@/data'
import { services } from '@/data/services'
import { articles } from '@/data/articles'
import { leadership, mentors } from '@/data/team'
import { deepMerge } from '@/lib/objectPath'
import { DEFAULT_THEME } from '@/lib/themes'
import { navDefault, footerDefault } from '@/data/chrome'
import { pagesDefault } from '@/data/pages'
import { complianceDeadlines } from '@/data/calendar'
import type { SiteContent } from '@/types/content'

/** Seed content — today's static data/*.ts + config/site.ts values, unchanged. */
export function defaultContent(): SiteContent {
  return {
    site: {
      ...site,
      // Brand/contact fields the editor owns; seeded from today's hardcoded UI.
      wordmark: 'AJRGCA',
      logoImage: null,
      favicon: null,
      phone: '',
      whatsapp: '',
      social: [],
    },
    theme: DEFAULT_THEME,
    nav: navDefault,
    footer: footerDefault,
    hero: {
      eyebrow: 'Chartered Accountants & Financial Advisors',
      titleLine1: 'Financial Clarity.',
      titleLine2: 'Strong Compliance.',
      titleLine3: 'Smarter',
      titleAccent: 'Decisions.',
      subtitle: 'Advisory, audit and compliance for businesses across sectors — under qualified partner oversight.',
      facts: [
        { value: '4', label: 'Cities Across India' },
        { value: '10', label: 'Practice Areas' },
        { value: 'FCA', label: 'Partner-Qualified' },
        { value: 'ICAI', label: 'Registered Practice' },
      ],
      primaryLabel: 'Book a Consultation',
      primaryHref: '/book',
      secondaryLabel: 'Explore Services',
      secondaryHref: '/services',
    },
    stats,
    services,
    industries,
    partners,
    team: { leadership, mentors },
    articles,
    calendar: {
      name: 'Compliance Calendar',
      title: 'Key statutory deadlines, kept in view.',
      subtitle: 'Upcoming GST, Income Tax, TDS and MCA due dates. For general reference — confirm against the latest notifications.',
      footerPrompt: 'Need help meeting a deadline?',
      footerLinkLabel: 'Talk to our team',
      deadlines: complianceDeadlines,
    },
    pages: pagesDefault,
    layout: {
      home: [
        { id: 'hero', type: 'hero' },
        { id: 'stats', type: 'stats' },
        { id: 'bento', type: 'bento' },
        { id: 'calendar', type: 'calendar' },
        { id: 'standards', type: 'standards' },
        { id: 'cta', type: 'cta' },
      ],
    },
  }
}

async function readRow(id: 'draft' | 'live'): Promise<SiteContent | null> {
  const sql = getSql()
  if (!sql) return null
  const rows = await sql`select data from site_content where id = ${id}`
  const stored = rows[0]?.data as Partial<SiteContent> | undefined
  if (!stored) return null
  // Overlay stored values on the current defaults so a row written before a
  // schema field existed still renders (missing keys fall back to defaults;
  // arrays replace wholesale so deletes/reorders stick). See lib/objectPath.deepMerge.
  return deepMerge(defaultContent(), stored)
}

async function writeRow(id: 'draft' | 'live', data: SiteContent): Promise<void> {
  const sql = getSql()
  if (!sql) throw new Error('DATABASE_URL not configured — cannot save content.')
  await sql`
    insert into site_content (id, data, updated_at)
    values (${id}, ${JSON.stringify(data)}, now())
    on conflict (id) do update set data = excluded.data, updated_at = now()
  `
}

/** Public site reads this on every request — Neon reads are cheap enough for
 *  this site's traffic that an extra cache layer (and its invalidation) isn't
 *  worth the complexity. */
export async function getLiveContent(): Promise<SiteContent> {
  return (await readRow('live')) ?? defaultContent()
}

/** Editor reads/writes this. Falls back to live content, then defaults, so
 *  opening the editor for the first time seeds a sensible starting draft. */
export async function getDraftContent(): Promise<SiteContent> {
  return (await readRow('draft')) ?? (await readRow('live')) ?? defaultContent()
}

export async function saveDraftContent(content: SiteContent): Promise<void> {
  await writeRow('draft', content)
}

/** Copies draft -> live. */
export async function publishContent(): Promise<void> {
  const draft = await getDraftContent()
  await writeRow('live', draft)
}

/** Throws away unpublished edits: overwrites the draft with the live row
 *  (or defaults if nothing is live yet). */
export async function discardDraft(): Promise<void> {
  await writeRow('draft', await getLiveContent())
}
