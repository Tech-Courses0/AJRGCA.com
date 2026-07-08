import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import BentoGrid from '@/components/sections/BentoGrid'
import EditableRichText from '@/components/editable/EditableRichText'
import type { SiteContent } from '@/types/content'

export default function BentoSection({ content }: { content: SiteContent }) {
  const h = content.pages.home.bentoHeader
  return (
    <section className="py-28 px-8 bg-white">
      <FadeIn delay={0.1}>
        <div className="max-w-8xl mx-auto mb-14 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <SectionHeader
            label={<EditableRichText path="pages.home.bentoHeader.label" value={h.label} as="span" />}
            title={<EditableRichText path="pages.home.bentoHeader.title" value={h.title} as="span" />}
          />
          <EditableRichText
            path="pages.home.bentoHeader.sideNote"
            value={h.sideNote}
            as="p"
            className="text-[0.95rem] text-[var(--ink-3)] leading-relaxed max-w-xs font-light"
          />
        </div>
      </FadeIn>
      <div className="max-w-8xl mx-auto">
        <BentoGrid content={content} />
      </div>
    </section>
  )
}
