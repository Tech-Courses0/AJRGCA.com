import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import EditableRichText from '@/components/editable/EditableRichText'
import type { SiteContent } from '@/types/content'

export default function PracticeStandardsSection({ content }: { content: SiteContent }) {
  const s = content.pages.home.standards
  return (
    <section className="on-dark relative py-28 px-8 bg-[var(--ink)]">
      <span className="gold-divider absolute top-0 left-0" />
      <div className="max-w-8xl mx-auto">
        <SectionHeader
          label={<EditableRichText path="pages.home.standards.label" value={s.label} as="span" />}
          title={<EditableRichText path="pages.home.standards.title" value={s.title} as="span" />}
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {s.items.map((item, i) => (
            <FadeIn key={i} delay={0.1}>
              <div className="bg-white/[0.04] border border-white/[0.08] p-8 h-full">
                <EditableRichText path={`pages.home.standards.items.${i}.title`} value={item.title} as="h3" className="font-syne font-bold text-[0.95rem] text-white mb-4" />
                <EditableRichText path={`pages.home.standards.items.${i}.body`} value={item.body} as="p" className="text-[0.85rem] text-white/60 leading-relaxed" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
