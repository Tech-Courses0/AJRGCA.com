import type { Metadata } from 'next'
import ApproachPageView from '@/components/sections/approach/ApproachPageView'
import { getLiveContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'AJRG and Associates follows a structured five-stage engagement methodology. Learn how we work with promoters, management teams, and finance functions across our service areas.',
}

export default async function ApproachPage() {
  const content = await getLiveContent()
  return <ApproachPageView content={content} />
}
