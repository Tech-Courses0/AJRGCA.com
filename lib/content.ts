import { getSql } from '@/lib/db'
import { site } from '@/config/site'
import { industries, partners, stats } from '@/data'
import { services } from '@/data/services'
import { articles } from '@/data/articles'
import { leadership, mentors } from '@/data/team'
import { deepMerge } from '@/lib/objectPath'
import { commitContentToGithub } from '@/lib/github'
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
      buttons: [
        { label: 'Book a Consultation', href: '/book', variant: 'primary' },
        { label: 'Explore Services', href: '/services', variant: 'secondary' },
      ],
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

/** Copies draft -> live, records the version in site_content_history (powers
 *  the editor's History panel), then mirrors it to GitHub as a commit — both
 *  best-effort, a failure there doesn't undo the publish which has already
 *  gone live in the DB. */
export async function publishContent(message: string): Promise<void> {
  const draft = await getDraftContent()
  await writeRow('live', draft)
  const sql = getSql()
  if (sql) {
    try {
      await sql`insert into site_content_history (message, data) values (${message}, ${JSON.stringify(draft)})`
    } catch (err) {
      console.error('Failed to record content history:', err)
    }
  }
  try {
    await commitContentToGithub(draft, message)
  } catch (err) {
    console.error('GitHub commit failed:', err)
  }
}

export interface ContentHistoryEntry {
  id: number
  message: string
  createdAt: string
}

/** Most recent published versions, newest first — the editor's History panel. */
export async function listContentHistory(limit = 5): Promise<ContentHistoryEntry[]> {
  const sql = getSql()
  if (!sql) return []
  const rows = await sql`
    select id, message, created_at from site_content_history
    order by created_at desc, id desc
    limit ${limit}
  `
  return rows.map((r) => ({ id: r.id as number, message: r.message as string, createdAt: (r.created_at as Date).toISOString() }))
}

/** Loads a past published version back into the draft for review — it isn't
 *  live again until the owner hits Publish, same as any other edit. */
export async function revertToHistory(id: number): Promise<void> {
  const sql = getSql()
  if (!sql) throw new Error('DATABASE_URL not configured — cannot revert.')
  const rows = await sql`select data from site_content_history where id = ${id}`
  const stored = rows[0]?.data as Partial<SiteContent> | undefined
  if (!stored) throw new Error('That version no longer exists.')
  await writeRow('draft', deepMerge(defaultContent(), stored))
}

/** Wipes every admin edit ever made — draft and live both reset straight to
 *  the site's original launch content, live immediately (not staged as a
 *  draft to review first, unlike revertToHistory). Still recorded in history
 *  and mirrored to GitHub so it's itself a reversible step. */
export async function revertToOriginal(): Promise<void> {
  const original = defaultContent()
  await writeRow('draft', original)
  await writeRow('live', original)
  const sql = getSql()
  if (sql) {
    try {
      await sql`insert into site_content_history (message, data) values ('Reverted to original', ${JSON.stringify(original)})`
    } catch (err) {
      console.error('Failed to record content history:', err)
    }
  }
  try {
    await commitContentToGithub(original, 'Reverted to original')
  } catch (err) {
    console.error('GitHub commit failed:', err)
  }
}
