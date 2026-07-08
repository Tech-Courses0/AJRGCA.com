import type { Metadata } from 'next'
import ServicesPageView from '@/components/sections/services/ServicesPageView'
import { getLiveContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Services',
  description: 'AJRG and Associates provides professional Chartered Accountant services across strategic advisory, finance & accounting, audit & assurance, tax compliance, IBC advisory, succession planning, and more.',
}

export default async function ServicesPage() {
  const content = await getLiveContent()
  return <ServicesPageView content={content} />
}
