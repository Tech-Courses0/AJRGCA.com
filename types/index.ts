import type { IconKey } from '@/lib/icons'

export interface Service {
  id: string
  icon: IconKey
  category: string
  title: string
  shortDesc: string
  fullDesc: string
  points: string[]
}

export interface Industry {
  id: string
  icon: IconKey
  name: string
  description: string
  tags: string[]
}

export interface Insight {
  slug: string
  category: string
  title: string
  date: string
  readTime: string
  bgColor: string
  textColor: string
  label: string
  image?: string | null
  imageAlt?: string
}

export interface Stat {
  value: string
  label: string
}

export interface NavLink {
  label: string
  href: string
}

/* ── Compliance calendar ── */
export type ComplianceCategory = 'GST' | 'Income Tax' | 'TDS' | 'MCA'

export interface ComplianceDeadline {
  date: string // ISO yyyy-mm-dd
  category: ComplianceCategory
  title: string
  authority: 'CBDT' | 'CBIC' | 'MCA'
  recurring: 'Monthly' | 'Quarterly' | 'Annual'
}

/* ── Knowledge Center articles (ISR) ── */
export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'list' | 'section'
  text?: string
  items?: string[]
  /** `type: 'section'` only — the clause number label (e.g. "12."). Number +
   *  content live in one block so a numbered clause drags as a single unit
   *  instead of a heading block plus N separate paragraph blocks. */
  number?: string
}

export interface Article {
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  author: string
  label: string
  bgColor: string
  textColor: string
  body: ArticleBlock[]
  /** Optional real photo for the card/hero — falls back to the colored
   *  label tile (bgColor/textColor/label) when unset. */
  image?: string | null
  imageAlt?: string
}

/* ── Our Team ── */
export interface TeamMember {
  name: string
  role: string
  /** Short factual bio (from the firm pitch deck). */
  bio?: string
  /** Path under /public once a real photo is supplied; null shows a placeholder. */
  photo: string | null
  /** Optional alt-text override; falls back to `name` when unset. */
  photoAlt?: string
}

/* ── Team / partner bios ── */
export interface Partner {
  name: string
  role: string
  qualifications: string
  sectors: string[]
  expertise: string[]
  bio: string[]
  icaiNote: string
  /** Path under /public once a real photo is supplied; null shows a placeholder. */
  photo: string | null
  /** Optional alt-text override; falls back to `name` when unset. */
  photoAlt?: string
}
