'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import IndustryCard from '@/components/ui/IndustryCard'
import SectionHeader from '@/components/ui/SectionHeader'
import EditableText from '@/components/editable/EditableText'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import { useEditor } from '@/components/editable/EditorContext'
import type { SiteContent } from '@/types/content'
import type { Industry } from '@/types'

const newIndustry = (): Industry => ({
  id: `industry-${Date.now().toString(36)}`,
  icon: 'building',
  name: 'New industry',
  description: 'Short description shown on the card.',
  tags: [],
})

export default function IndustriesPageView({ content }: { content: SiteContent }) {
  const { isEditing } = useEditor()
  const { industries } = content
  const p = content.pages.industries
  return (
    <>
      <Navbar content={content} />
      <section className="pt-36 pb-16 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-8xl mx-auto relative">
          <SectionHeader
            label={<EditableRichText path="pages.industries.header.label" value={p.header.label} as="span" />}
            title={<EditableRichText path="pages.industries.header.title" value={p.header.title} as="span" />}
          />
          <EditableRichText path="pages.industries.header.intro" value={p.header.intro} as="p" className="mt-4 text-[0.95rem] text-[var(--ink-3)] max-w-2xl font-light leading-relaxed" />
        </div>
      </section>
      {/* ── Manage industries (editor-only): add/remove/reorder, and edit
          name/description/tags. The card grid below is a read-only live
          preview of the same data — not a second edit surface. ── */}
      {isEditing && (
        <section className="py-12 px-8 bg-[var(--section)] border-b border-[var(--border)]">
          <div className="max-w-8xl mx-auto">
            <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[var(--accent-dark)] mb-1">Manage industries</p>
            <p className="text-[0.76rem] text-[var(--ink-4)] mb-6">Add, remove, reorder, or edit an industry here — the grid below just shows how it will look.</p>
            <div className="flex flex-col gap-3">
              <EditableRepeater<Industry>
                path="industries"
                items={industries}
                newItem={newIndustry}
                addLabel="Add industry"
                renderItem={(industry, ii) => (
                  <div className="bg-white border border-[var(--border)] rounded-md p-4 flex flex-col gap-2.5">
                    <EditableText path={`industries.${ii}.name`} value={industry.name} as="span" className="font-syne font-bold text-[0.88rem] text-[var(--ink)]" />
                    <EditableText path={`industries.${ii}.description`} value={industry.description} as="p" className="text-[0.78rem] text-[var(--ink-3)]" />
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--ink-4)] mr-1">Tags</span>
                      <EditableRepeater<string>
                        path={`industries.${ii}.tags`}
                        items={industry.tags}
                        newItem={() => 'New tag'}
                        addLabel="Add"
                        itemClassName="inline-flex"
                        renderItem={(tag, ti) => (
                          <span className="text-[0.7rem] text-[var(--ink-2)] bg-[var(--cream)] border border-[var(--border)] rounded-full px-2.5 py-1">
                            <EditableText path={`industries.${ii}.tags.${ti}`} value={tag} as="span" />
                          </span>
                        )}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-8 bg-white">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>
      </section>

      {/* ── Our Speciality ── */}
      <section className="on-dark py-20 px-8 bg-royal-wash relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true" />
        <div className="max-w-8xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <EditableRichText path="pages.industries.speciality.label" value={p.speciality.label} as="p" className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent-light)] mb-3" />
            <span className="gold-rule mb-5" />
            <EditableRichText path="pages.industries.speciality.title" value={p.speciality.title} as="h2" className="font-serif-display font-normal text-[clamp(1.8rem,3.4vw,2.6rem)] text-white leading-tight" />
            <EditableRichText path="pages.industries.speciality.body" value={p.speciality.body} as="p" className="mt-4 text-[0.95rem] text-white/60 font-light leading-relaxed max-w-md" />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <EditableRepeater<string>
              path="pages.industries.speciality.items"
              items={p.speciality.items}
              newItem={() => 'New speciality'}
              addLabel="Add item"
              renderItem={(item, i) => (
                <li key={i} className="flex items-start gap-3 bg-white/[0.05] border border-white/[0.08] rounded-lg p-4 text-[0.84rem] text-white/80 leading-snug">
                  <span className="w-4 h-px bg-[var(--accent)] flex-shrink-0 mt-2.5" aria-hidden="true" />
                  <EditableRichText path={`pages.industries.speciality.items.${i}`} value={item} as="span" />
                </li>
              )}
            />
          </ul>
        </div>
      </section>

      <Footer content={content} />
    </>
  )
}
