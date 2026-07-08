'use client'

import FadeIn from '@/components/ui/FadeIn'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import EditableRepeater from '@/components/editable/EditableRepeater'
import EditableText from '@/components/editable/EditableText'
import EditableRichText from '@/components/editable/EditableRichText'
import { useEditor } from '@/components/editable/EditorContext'
import type { SiteContent } from '@/types/content'
import type { Stat } from '@/types'

export default function StatsStripSection({ content }: { content: SiteContent }) {
  const { isEditing } = useEditor()
  return (
    <div className="on-dark relative bg-[var(--ink)] py-12 px-8">
      <span className="gold-divider absolute top-0 left-0" />
      <div className="max-w-8xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <EditableRepeater<Stat>
          path="stats"
          items={content.stats}
          addLabel="Add stat"
          newItem={() => ({ value: '0', label: 'New Stat' })}
          renderItem={(stat, i) => (
            <FadeIn key={i} delay={i * 0.1} direction="up">
              <div className="text-center">
                {/* Editable inline while editing; animated count-up on the public site. */}
                {isEditing ? (
                  <EditableText
                    path={`stats.${i}.value`}
                    value={stat.value}
                    as="div"
                    className="block font-syne font-extrabold text-[2rem] text-white"
                  />
                ) : (
                  <AnimatedCounter value={stat.value} className="block font-syne font-extrabold text-[2rem] text-white" />
                )}
                <EditableRichText
                  path={`stats.${i}.label`}
                  value={stat.label}
                  as="div"
                  className="text-[0.75rem] text-white/50 tracking-[0.06em] uppercase mt-1"
                />
              </div>
            </FadeIn>
          )}
        />
      </div>
    </div>
  )
}
