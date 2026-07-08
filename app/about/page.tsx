import type { Metadata } from 'next'
import AboutPageView from '@/components/sections/about/AboutPageView'
import { getLiveContent } from '@/lib/content'

// Content is edited/published at runtime via the DB, not at build time —
// render per-request so a Publish click shows up without a redeploy.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'AJRG and Associates is a Chartered Accountant firm providing financial advisory, audit, tax, and compliance services. Learn about our partners, qualifications, and practice.',
}

export default async function AboutPage() {
  const content = await getLiveContent()
  return <AboutPageView content={content} />
}
