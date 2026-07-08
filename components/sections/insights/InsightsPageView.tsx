import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionHeader from '@/components/ui/SectionHeader'
import EditableRichText from '@/components/editable/EditableRichText'
import InsightsCards from './InsightsCards'
import type { SiteContent } from '@/types/content'

export default function InsightsPageView({ content }: { content: SiteContent }) {
  const p = content.pages.insights
  return (
    <>
      <Navbar content={content} />
      <section className="pt-36 pb-16 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-8xl mx-auto relative">
          <SectionHeader
            label={<EditableRichText path="pages.insights.header.label" value={p.header.label} as="span" />}
            title={<EditableRichText path="pages.insights.header.title" value={p.header.title} as="span" />}
          />
          <EditableRichText path="pages.insights.header.intro" value={p.header.intro} as="p" className="mt-4 text-[0.95rem] text-[var(--ink-3)] max-w-2xl font-light leading-relaxed" />
        </div>
      </section>
      <section className="py-16 px-8 bg-white">
        <div className="max-w-8xl mx-auto">
          <InsightsCards articles={content.articles} />
        </div>
      </section>
      <Footer content={content} />
    </>
  )
}
