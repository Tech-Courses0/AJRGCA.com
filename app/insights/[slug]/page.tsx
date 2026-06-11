import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import { articles, getArticle } from '@/data/articles'

/* ── Incremental Static Regeneration ──
   Pages are statically generated at build time and transparently revalidated
   at most once per hour, so edits to data/articles.ts go live without a full
   redeploy. New slugs are generated on-demand on first request. */
export const revalidate = 3600
export const dynamicParams = true

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: 'article' },
  }
}

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2)

  return (
    <>
      <Navbar />

      {/* ── Article hero ── */}
      <header className="on-dark pt-36 pb-14 px-8 bg-royal-wash relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true" />
        <span className="gold-divider absolute bottom-0 left-0" />
        <div className="max-w-3xl mx-auto relative">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-[0.04em] text-white/60 no-underline hover:text-white transition-colors mb-8">
            <ArrowLeft size={14} aria-hidden="true" /> Knowledge Center
          </Link>
          <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[var(--accent-light)] mb-4">
            {article.category}
          </p>
          <h1 className="font-serif-display font-normal text-[clamp(2rem,4.2vw,3.1rem)] leading-[1.12] text-white">
            {article.title}
          </h1>
          <div className="flex items-center gap-5 mt-6 text-[0.78rem] text-white/55">
            <span className="flex items-center gap-1.5"><CalendarDays size={13} aria-hidden="true" /> {article.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} aria-hidden="true" /> {article.readTime}</span>
            <span>By {article.author}</span>
          </div>
        </div>
      </header>

      {/* ── Article body ── */}
      <article className="py-16 px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          {article.body.map((block, i) => {
            if (block.type === 'heading') {
              return (
                <h2 key={i} className="font-serif-display font-normal text-[1.5rem] text-[var(--ink)] mt-10 mb-4 leading-snug">
                  {block.text}
                </h2>
              )
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className="my-5 flex flex-col gap-2.5">
                  {block.items?.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.95rem] text-[var(--ink-3)] leading-relaxed">
                      <span className="w-3.5 h-px bg-[var(--accent)] flex-shrink-0 mt-[0.7rem]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={i} className="text-[1rem] text-[var(--ink-2)] leading-[1.85] mb-5">
                {block.text}
              </p>
            )
          })}

          <div className="mt-12 pt-6 border-t border-[var(--border)]">
            <p className="text-[0.75rem] text-[var(--ink-4)] italic leading-relaxed">
              This article is provided for general informational purposes only and does not constitute professional advice. Please obtain advice specific to your circumstances before acting.
            </p>
          </div>
        </div>
      </article>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="py-16 px-8 bg-[var(--cream)]">
          <div className="max-w-3xl mx-auto">
            <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[var(--accent-dark)] mb-6">
              More from the Knowledge Center
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/insights/${a.slug}`}
                  className="group block bg-white border border-[var(--border)] rounded-card p-6 no-underline hover:border-[var(--border-dark)] hover:shadow-royal transition-all duration-200"
                >
                  <p className="text-[0.66rem] font-bold tracking-[0.1em] uppercase text-[var(--accent-dark)] mb-2">{a.category}</p>
                  <h3 className="font-syne font-bold text-[0.95rem] text-[var(--ink)] leading-snug group-hover:text-[var(--royal)] transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-[0.72rem] text-[var(--ink-4)] mt-2">{a.date} · {a.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={<>Have a question on this<br /><em className="italic gold-text">topic?</em></>}
        subtitle="Our partners are available to discuss how these considerations may apply to your business."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
      <Footer />
    </>
  )
}
