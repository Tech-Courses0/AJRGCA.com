import type { ComponentType } from 'react'
import ComplianceCalendar from '@/components/sections/ComplianceCalendar'
import HeroSection from './HeroSection'
import StatsStripSection from './StatsStripSection'
import BentoSection from './BentoSection'
import PracticeStandardsSection from './PracticeStandardsSection'
import CTASectionBlock from './CTASectionBlock'
import type { SiteContent, HomeSectionType } from '@/types/content'

export const HOME_SECTION_LABELS: Record<HomeSectionType, string> = {
  hero: 'Hero',
  stats: 'Stats Strip',
  bento: 'Service Pillars',
  calendar: 'Compliance Calendar',
  standards: 'Practice Standards',
  cta: 'Call to Action',
}

export const HOME_SECTION_REGISTRY: Record<HomeSectionType, ComponentType<{ content: SiteContent }>> = {
  hero: HeroSection,
  stats: StatsStripSection,
  bento: BentoSection,
  calendar: ComplianceCalendar,
  standards: PracticeStandardsSection,
  cta: CTASectionBlock,
}
