import type { Metadata } from 'next'
import LegalPageView from '@/components/sections/legal/LegalPageView'
import { getLiveContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for AJRG and Associates website.',
}

export default async function CookiesPage() {
  const content = await getLiveContent()
  return <LegalPageView content={content} docKey="cookies" />
}
