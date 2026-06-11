import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import InsightCard from '@/components/ui/InsightCard'
import SectionHeader from '@/components/ui/SectionHeader'
import { articles } from '@/data/articles'

/* ISR — listing revalidates hourly so new articles appear without a redeploy. */
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Knowledge Center',
  description: 'Articles and updates from AJRG and Associates on strategic finance, IBC advisory, succession planning, compliance, and financial clarity for growing businesses.',
}

export default function KnowledgeCenterPage() {
  return (
    <>
      <Navbar />
      <section className="pt-36 pb-16 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-8xl mx-auto relative">
          <SectionHeader label="Knowledge Center" title="Practical perspectives for growing businesses." />
          <p className="mt-4 text-[0.95rem] text-[var(--ink-3)] max-w-2xl font-light leading-relaxed">
            Factual, partner-authored perspectives on financial advisory, compliance, and strategic decision-making — provided for general reference, not as professional advice.
          </p>
        </div>
      </section>
      <section className="py-16 px-8 bg-white">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a) => (
            <Link key={a.slug} href={`/insights/${a.slug}`} className="no-underline">
              <InsightCard insight={a} />
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}
