import type { Metadata } from 'next'
import ContactPageView from '@/components/sections/contact/ContactPageView'
import { getLiveContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact AJRG and Associates, Chartered Accountants, for professional services enquiries.',
}

export default async function ContactPage() {
  const content = await getLiveContent()
  return <ContactPageView content={content} />
}
