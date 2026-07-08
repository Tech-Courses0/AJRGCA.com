import type { Metadata } from 'next'
import LegalPageView from '@/components/sections/legal/LegalPageView'
import { getLiveContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AJRG and Associates. Understand how we collect, use, and protect personal information.',
}

export default async function PrivacyPolicyPage() {
  const content = await getLiveContent()
  return <LegalPageView content={content} docKey="privacy" />
}
