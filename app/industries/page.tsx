import type { Metadata } from 'next'
import IndustriesPageView from '@/components/sections/industries/IndustriesPageView'
import { getLiveContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Who We Serve',
  description: 'AJRG and Associates serves growing enterprises, startups & MSMEs, established organisations, promoter-driven businesses, professional firms, and exporters across India.',
}

export default async function IndustriesPage() {
  const content = await getLiveContent()
  return <IndustriesPageView content={content} />
}
