import type { Metadata } from 'next'
import InsightsPageView from '@/components/sections/insights/InsightsPageView'
import { getLiveContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Knowledge Center',
  description: 'Articles and updates from AJRG and Associates on strategic finance, IBC advisory, succession planning, compliance, and financial clarity for growing businesses.',
}

export default async function KnowledgeCenterPage() {
  const content = await getLiveContent()
  return <InsightsPageView content={content} />
}
