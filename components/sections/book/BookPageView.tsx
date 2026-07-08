'use client'

import { CalendarCheck, MapPin } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionHeader from '@/components/ui/SectionHeader'
import BookRequestSection from '@/components/sections/BookRequestSection'
import ConsultationCalendar from '@/components/sections/ConsultationCalendar'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import IconField from '@/components/editable/IconField'
import { getIcon, type IconKey } from '@/lib/icons'
import type { SiteContent, BadgeItem } from '@/types/content'

type Step = { title: string; desc: string; icon: IconKey }
type Faq = { q: string; a: string }

export default function BookPageView({ content }: { content: SiteContent }) {
  const p = content.pages.book

  return (
    <>
      <Navbar content={content} />

      {/* ── Hero ── */}
      <section className="pt-36 pb-14 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-5xl mx-auto relative">
          <SectionHeader
            label={<EditableRichText path="pages.book.hero.eyebrow" value={p.hero.eyebrow} as="span" />}
            title={<>
              <EditableRichText path="pages.book.hero.titleLead" value={p.hero.titleLead} as="span" />{' '}
              <span className="gold-text"><EditableRichText path="pages.book.hero.titleAccent" value={p.hero.titleAccent} as="span" /></span>
            </>}
            subtitle={<EditableRichText path="pages.book.hero.subtitle" value={p.hero.subtitle} as="span" />}
          />
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
            <EditableRepeater<BadgeItem>
              path="pages.book.badges"
              items={p.badges}
              newItem={() => ({ label: 'New badge', icon: 'star' })}
              addLabel="Add badge"
              itemClassName="inline-flex"
              renderItem={(badge, i) => {
                // Tolerate a legacy string badge (drafts saved before badges
                // grew an icon): render it with a fallback icon, no picker.
                const legacy = typeof badge === 'string'
                const b = badge as BadgeItem | string
                const label = legacy ? (b as string) : (b as BadgeItem).label
                const FallbackIcon = getIcon(undefined)
                return (
                  <span className="inline-flex items-center gap-2 text-[0.8rem] font-medium text-[var(--ink-2)]">
                    {legacy ? (
                      <FallbackIcon size={15} className="text-[var(--accent)]" aria-hidden="true" />
                    ) : (
                      <IconField path={`pages.book.badges.${i}.icon`} value={(b as BadgeItem).icon} size={15} className="text-[var(--accent)]" />
                    )}
                    <EditableRichText path={legacy ? `pages.book.badges.${i}` : `pages.book.badges.${i}.label`} value={label} as="span" />
                  </span>
                )
              }}
            />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 px-8 bg-white border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <EditableRichText path="pages.book.stepsLabel" value={p.stepsLabel} as="p" className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-2" />
          <span className="gold-rule mb-8 block" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            <EditableRepeater<Step>
              path="pages.book.steps"
              items={p.steps}
              newItem={() => ({ title: 'New step', desc: 'Describe this step.', icon: 'clipboard-list' })}
              addLabel="Add step"
              renderItem={(step, i) => {
                return (
                  <div className="relative">
                    <span className="font-serif-display text-[2.4rem] leading-none text-[var(--accent-light)] block mb-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-2.5 mb-2">
                      <IconField path={`pages.book.steps.${i}.icon`} value={step.icon} size={17} className="text-[var(--accent)]" />
                      <EditableRichText path={`pages.book.steps.${i}.title`} value={step.title} as="h3" className="text-[0.95rem] font-semibold text-[var(--ink)]" />
                    </div>
                    <EditableRichText path={`pages.book.steps.${i}.desc`} value={step.desc} as="p" className="text-[0.82rem] text-[var(--ink-3)] leading-relaxed" />
                  </div>
                )
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Request form + What to expect ── */}
      <section className="py-20 px-8 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto">
          <BookRequestSection />
        </div>
      </section>

      {/* ── Pick a time (live calendar / fallback) ── */}
      <section className="py-20 px-8 bg-white border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 mb-2">
            <CalendarCheck size={16} className="text-[var(--accent)]" aria-hidden="true" />
            <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)]">Prefer to pick a time?</p>
          </div>
          <h2 className="font-serif-display font-normal text-[1.7rem] text-[var(--ink)] mb-6 max-w-xl">
            Choose a slot that suits you and we will meet you there.
          </h2>
          <ConsultationCalendar />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-8 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            label={<EditableRichText path="pages.book.faqsLabel" value={p.faqsLabel} as="span" />}
            title={<EditableRichText path="pages.book.faqsTitle" value={p.faqsTitle} as="span" />}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <EditableRepeater<Faq>
              path="pages.book.faqs"
              items={p.faqs}
              newItem={() => ({ q: 'New question?', a: 'Answer this question.' })}
              addLabel="Add FAQ"
              renderItem={(faq, i) => (
                <div className="bg-white border border-[var(--border)] rounded-card p-6">
                  <EditableRichText path={`pages.book.faqs.${i}.q`} value={faq.q} as="h3" className="text-[0.92rem] font-semibold text-[var(--ink)] mb-2" />
                  <EditableRichText path={`pages.book.faqs.${i}.a`} value={faq.a} as="p" className="text-[0.83rem] text-[var(--ink-3)] leading-relaxed" />
                </div>
              )}
            />
          </div>

          {/* Offices quick line */}
          <p className="flex items-center justify-center gap-2 text-[0.8rem] text-[var(--ink-3)] mt-10">
            <MapPin size={14} className="text-[var(--accent)]" aria-hidden="true" />
            <EditableRichText path="pages.book.officesNote" value={p.officesNote} as="span" />
          </p>
        </div>
      </section>

      {/* ── Compliance note ── */}
      <section className="pb-24 px-8 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto p-6 bg-white border border-[var(--border)] rounded-card">
          <EditableRichText path="pages.book.complianceNote" value={p.complianceNote} as="p" className="text-[0.78rem] text-[var(--ink-3)] leading-relaxed" />
        </div>
      </section>

      <Footer content={content} />
    </>
  )
}
