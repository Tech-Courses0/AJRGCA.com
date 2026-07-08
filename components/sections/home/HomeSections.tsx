'use client'

import EditableRepeater from '@/components/editable/EditableRepeater'
import { HOME_SECTION_REGISTRY } from './registry'
import type { SiteContent, SectionRef } from '@/types/content'

export default function HomeSections({ content }: { content: SiteContent }) {
  return (
    <EditableRepeater<SectionRef>
      path="layout.home"
      items={content.layout.home}
      // Sections are a fixed set — reorder/delete only, no adding or duplicating
      // whole sections (adding items happens *inside* a section, e.g. a stat/date).
      allowAdd={false}
      allowDuplicate={false}
      newItem={() => ({ id: `cta-${Date.now()}`, type: 'cta' })}
      renderItem={(ref) => {
        const Section = HOME_SECTION_REGISTRY[ref.type]
        return <Section key={ref.id} content={content} />
      }}
    />
  )
}
