import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomeSections from '@/components/sections/home/HomeSections'
import { getLiveContent } from '@/lib/content'

// Content is edited/published at runtime via the DB, not at build time —
// render per-request so a Publish click shows up without a redeploy.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AJRG and Associates — Chartered Accountants',
  description:
    'AJRG and Associates is a Chartered Accountant firm providing Strategic Financial Advisory, Audit, Tax & Compliance services across India.',
}

export default async function HomePage() {
  const content = await getLiveContent()
  return (
    <main>
      <Navbar content={content} />
      <HomeSections content={content} />
      <Footer content={content} />
    </main>
  )
}
