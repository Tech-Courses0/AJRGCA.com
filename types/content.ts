import type { Office } from '@/config/site'
import type { IconKey } from '@/lib/icons'
import type { Industry, Stat, Partner, Service, TeamMember, ComplianceDeadline, ArticleBlock, Article } from '@/types'

/** A social link rendered in the footer. `platform` is a lucide icon key. */
export interface SocialLink {
  platform: string
  url: string
}

/** Plain-data mirror of config/site.ts's `site` object (excludes its helper
 *  functions), plus editor-owned brand/contact/social fields. This one object
 *  is the "global settings" surface. */
export interface SiteConfig {
  name: string
  shortName: string
  legalName: string
  tagline: string
  url: string
  frn: string
  registeredOffice: Office
  branchOffice: Office
  email: string
  consultationCalendarUrl: string
  cities: readonly string[]
  citiesLine: string
  disclaimer: string
  dpdpNote: string
  presence: string

  /* ── Brand & contact (editor-owned; seeded from today's hardcoded values) ── */
  wordmark: string
  logoImage: string | null
  /** Optional alt-text override for the logo image; falls back to `wordmark` when unset. */
  logoAlt?: string
  favicon: string | null
  phone: string
  whatsapp: string
  social: SocialLink[]
}

/** The editable CSS-var subset the theme editor exposes. Keys map to the
 *  `--*` custom properties defined in app/globals.css. */
export interface ThemeTokens {
  ink: string
  ink3: string
  accent: string
  accentDark: string
  royal: string
  royalLight: string
  cream: string
  border: string
  royalWashFrom: string
  royalWashTo: string
}

/** `presetId` selects a curated palette (lib/themes.ts); `tokens` holds only
 *  the per-token overrides the owner set on top. Resolved = preset + tokens. */
export interface ThemeContent {
  presetId: string
  tokens: Partial<ThemeTokens>
}

/** The homepage hero's editable text runs — line breaks and the gold-accent
 *  word stay as static JSX structure; only the words themselves are editable. */
export interface HeroFact {
  value: string
  label: string
}
export interface HeroContent {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  titleLine3: string
  titleAccent: string
  subtitle: string
  facts: HeroFact[]
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

/** Interactive compliance-calendar section: editable header + an extendible
 *  list of statutory deadlines (they change every FY / new ones appear). */
export interface CalendarContent {
  name: string
  title: string
  subtitle: string
  footerPrompt: string
  footerLinkLabel: string
  deadlines: ComplianceDeadline[]
}

/* ── Navigation ── */
export interface NavMenuItem {
  icon: string // IconKey (lib/icons) OR a lucide name resolved in Navbar
  title: string
  desc: string
  href: string
}
export interface NavServiceGroup {
  label: string
  services: NavMenuItem[]
}
/** One top-level nav bar item. `kind: 'link'` navigates directly (href
 *  editable via the label's link-chip); `'services'`/`'clients'` open the
 *  matching mega-menu instead (their href is unused). */
export interface NavTopLevelItem {
  id: string
  label: string
  href: string
  kind: 'link' | 'services' | 'clients'
}
export interface NavContent {
  labels: {
    about: string
    services: string
    approach: string
    whoWeServe: string
    insights: string
    contact: string
    cta: string
  }
  topLevel: NavTopLevelItem[]
  serviceGroups: NavServiceGroup[]
  clientTypes: NavMenuItem[]
  featured: {
    eyebrow: string
    headingLead: string
    headingAccent: string
    body: string
    citiesLine: string
    primaryLabel: string
    secondaryLabel: string
  }
  servicesBottomNote: string
  exploreAllLabel: string
  clientsAllLabel: string
}

/* ── Footer ── */
export interface FooterLink {
  label: string
  href: string
}
export interface FooterColumn {
  heading: string
  links: FooterLink[]
}
export interface FooterContent {
  frnLabel: string
  registeredOfficeLabel: string
  columns: FooterColumn[]
  connectHeading: string
  legalHeading: string
  legalLinks: FooterLink[]
  dpdpLabel: string
  disclaimerLabel: string
}

/** Homepage section order — duplicate/delete/reorder operates on this list;
 *  each section component reads its own data straight off `SiteContent`. */
export type HomeSectionType = 'hero' | 'stats' | 'bento' | 'calendar' | 'standards' | 'cta'

export interface SectionRef {
  id: string
  type: HomeSectionType
}

/* ── Page copy ── */
export interface BentoPillar {
  icon: string
  eyebrow: string
  title: string
  body: string
  href: string
  feature?: boolean
  className: string
}
export interface HomePageContent {
  bentoHeader: { label: string; title: string; sideNote: string }
  bentoDeepDiveLabel: string
  bentoPillars: BentoPillar[]
  standards: { label: string; title: string; items: { title: string; body: string }[] }
  cta: {
    titleLead: string
    titleAccent: string
    subtitle: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
  }
}

export interface PageHero {
  eyebrow: string
  titleLead: string
  titleAccent: string
  subtitle: string
}
export interface ServicesPageContent {
  hero: PageHero
  heroStats: { value: string; label: string }[]
  categories: { id: string; label: string; blurb: string }[]
  keyAreasLabel: string
  approachPointer: { label: string; title: string; ctaLabel: string; ctaHref: string }
  cta: {
    titleLead: string
    titleAccent: string
    subtitle: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
  }
}

export interface ApproachPageContent {
  hero: PageHero
  methodologyHeader: { label: string; title: string }
  methodology: { num: string; title: string; desc: string }[]
  focus: { label: string; heading: string; headingAccent: string; footerLocations: string; commitments: string[] }
  whyItMatters: { label: string; title: string; items: { title: string; desc: string }[] }
  cta: {
    titleLead: string
    titleAccent: string
    subtitle: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
  }
}

export interface IndustriesPageContent {
  header: { label: string; title: string; intro: string }
  speciality: { label: string; title: string; body: string; items: string[] }
}

export interface ContactPageContent {
  hero: { label: string; title: string; subtitle: string }
  formHeading: string
  getInTouchLabel: string
  whatsappNote: string
  officesLabel: string
  regOfficeLabel: string
  branchLabel: string
  alsoServingNote: string
  officeInProgressNote: string
  mapLabel: string
  mapEmbedUrl: string
  openInMapsLabel: string
  openInMapsUrl: string
  privacyNotice: string
  disclaimerNotice: string
}

export interface InsightsPageContent {
  header: { label: string; title: string; intro: string }
}

/** A badge: a short label with a pickable icon (icon selected via IconField). */
export interface BadgeItem {
  label: string
  icon: IconKey
}
export interface BookPageContent {
  hero: PageHero
  badges: BadgeItem[]
  stepsLabel: string
  steps: { title: string; desc: string; icon: IconKey }[]
  faqsLabel: string
  faqsTitle: string
  faqs: { q: string; a: string }[]
  /** Rendered as rich text (bold city names, etc.) — see EditableRichText. */
  officesNote: string
  /** Rendered as rich text — keeps the inline Privacy Policy link editable. */
  complianceNote: string
}

export interface AboutPageContent {
  heroEyebrow: string
  heroTitleLead: string
  heroTitleAccent: string
  whoWeAre: { label: string; title: string; paras: string[] }
  vision: { label: string; title: string; titleAccent: string; presenceLabel: string; presenceValue: string }
  valuesHeader: { label: string; title: string }
  values: { num: string; title: string; desc: string }[]
  partnersHeader: { label: string; title: string }
  partnersNote: string
  leadershipHeader: { label: string; title: string; subtitle: string }
  leadershipNote: string
  mentorsHeader: { label: string; title: string }
  cta: {
    titleLead: string
    titleAccent: string
    subtitle: string
    primaryLabel: string
    primaryHref: string
  }
}

export interface LegalDocContent {
  eyebrow: string
  title: string
  lastUpdated: string
  body: ArticleBlock[]
}
export type LegalKey = 'privacy' | 'terms' | 'disclaimer' | 'cookies'
export type LegalPagesContent = Record<LegalKey, LegalDocContent>

export interface PagesContent {
  home: HomePageContent
  services: ServicesPageContent
  approach: ApproachPageContent
  industries: IndustriesPageContent
  contact: ContactPageContent
  insights: InsightsPageContent
  about: AboutPageContent
  legal: LegalPagesContent
  book: BookPageContent
}

export interface SiteContent {
  site: SiteConfig
  theme: ThemeContent
  nav: NavContent
  footer: FooterContent
  hero: HeroContent
  stats: Stat[]
  services: Service[]
  industries: Industry[]
  partners: Partner[]
  team: {
    leadership: TeamMember[]
    mentors: TeamMember[]
  }
  /** Knowledge Center posts — cards on /insights and the /insights/[slug] body. */
  articles: Article[]
  calendar: CalendarContent
  pages: PagesContent
  layout: {
    home: SectionRef[]
  }
}
