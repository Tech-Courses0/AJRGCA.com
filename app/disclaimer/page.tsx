import type { Metadata } from 'next'
import LegalPageView from '@/components/sections/legal/LegalPageView'
import { getLiveContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for AJRG and Associates website. Information on this site is for general purposes only and does not constitute professional advice.',
}

export default async function DisclaimerPage() {
  const content = await getLiveContent()
  return <LegalPageView content={content} docKey="disclaimer" />
}
