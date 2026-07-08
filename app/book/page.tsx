import type { Metadata } from 'next'
import BookPageView from '@/components/sections/book/BookPageView'
import { getLiveContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description:
    'Request a confidential, no-obligation consultation with a partner at AJRG and Associates, Chartered Accountants — by video call or at our Mumbai or Noida office.',
}

export default async function BookConsultationPage() {
  const content = await getLiveContent()
  return <BookPageView content={content} />
}
