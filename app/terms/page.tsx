import type { Metadata } from 'next'
import LegalPageView from '@/components/sections/legal/LegalPageView'
import { getLiveContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for use of the AJRG and Associates website.',
}

export default async function TermsPage() {
  const content = await getLiveContent()
  return <LegalPageView content={content} docKey="terms" />
}
