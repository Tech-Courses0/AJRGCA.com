'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import SectionHeader from '@/components/ui/SectionHeader'
import FadeIn from '@/components/ui/FadeIn'
import EditableText from '@/components/editable/EditableText'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import ColorSwatch from '@/components/editable/ColorSwatch'
import { useLiveValue } from '@/components/editable/EditorContext'
import type { SiteContent } from '@/types/content'

type Stage = { num: string; title: string; desc: string }
type Why = { title: string; desc: string }

export default function ApproachPageView({ content }: { content: SiteContent }) {
  const p = content.pages.approach
  const ctaPrimaryColor = useLiveValue('pages.approach.cta.primaryColor', p.cta.primaryColor)
  const ctaSecondaryColor = useLiveValue('pages.approach.cta.secondaryColor', p.cta.secondaryColor)
  return (
    <>
      <Navbar content={content} />

      {/* ── Hero ── */}
      <section className="pt-44 pb-20 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-8xl mx-auto relative">
          <FadeIn>
            <EditableRichText path="pages.approach.hero.eyebrow" value={p.hero.eyebrow} as="p" className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4" />
            <h1 className="font-serif-display font-normal text-[clamp(2.5rem,5vw,3.8rem)] leading-[1.1] max-w-4xl text-[var(--ink)]">
              <EditableRichText path="pages.approach.hero.titleLead" value={p.hero.titleLead} as="span" />{' '}
              <em className="italic gold-text"><EditableRichText path="pages.approach.hero.titleAccent" value={p.hero.titleAccent} as="span" /></em>
            </h1>
            <EditableRichText path="pages.approach.hero.subtitle" value={p.hero.subtitle} as="p" className="mt-6 text-[0.98rem] text-[var(--ink-3)] max-w-xl font-light leading-relaxed" />
          </FadeIn>
        </div>
      </section>

      {/* ── Methodology + Commitment ── */}
      <section className="pb-28 px-8 bg-white">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <FadeIn>
              <SectionHeader
                label={<EditableRichText path="pages.approach.methodologyHeader.label" value={p.methodologyHeader.label} as="span" />}
                title={<EditableRichText path="pages.approach.methodologyHeader.title" value={p.methodologyHeader.title} as="span" />}
              />
            </FadeIn>
            <div className="mt-8 divide-y divide-[var(--border)] border-t border-[var(--border)]">
              <EditableRepeater<Stage>
                path="pages.approach.methodology"
                items={p.methodology}
                newItem={() => ({ num: String(p.methodology.length + 1).padStart(2, '0'), title: 'New stage', desc: 'Describe this stage.' })}
                addLabel="Add stage"
                renderItem={(stage, i) => (
                  <div key={i} className="py-6 flex gap-5">
                    <EditableRichText path={`pages.approach.methodology.${i}.num`} value={stage.num} as="span" className="font-syne font-extrabold text-[0.75rem] text-[var(--accent)] min-w-[28px] mt-0.5" />
                    <div>
                      <EditableRichText path={`pages.approach.methodology.${i}.title`} value={stage.title} as="h3" className="font-syne font-bold text-[0.95rem] text-[var(--ink)] mb-1" />
                      <EditableRichText path={`pages.approach.methodology.${i}.desc`} value={stage.desc} as="p" className="text-[0.84rem] text-[var(--ink-3)] leading-relaxed" />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>

          <FadeIn delay={0.2} direction="left">
            <div className="on-dark bg-[var(--ink)] p-12 flex flex-col justify-between min-h-[560px] lg:sticky lg:top-24">
              <div>
                <EditableRichText path="pages.approach.focus.label" value={p.focus.label} as="p" className="text-[0.7rem] tracking-[0.1em] uppercase text-[var(--accent-light)] mb-4" />
                <h3 className="font-serif-display font-normal text-[2rem] text-white leading-[1.2]">
                  <EditableRichText path="pages.approach.focus.heading" value={p.focus.heading} as="span" />{' '}
                  <em className="italic gold-text"><EditableRichText path="pages.approach.focus.headingAccent" value={p.focus.headingAccent} as="span" /></em>
                </h3>
              </div>
              <ul className="flex flex-col gap-3 my-8">
                <EditableRepeater<string>
                  path="pages.approach.focus.commitments"
                  items={p.focus.commitments}
                  newItem={() => 'New commitment'}
                  addLabel="Add item"
                  renderItem={(item, i) => (
                    <li key={i} className="text-[0.84rem] text-white/60 flex items-center gap-3">
                      <span className="w-5 h-px bg-white/25 flex-shrink-0" />
                      <EditableRichText path={`pages.approach.focus.commitments.${i}`} value={item} as="span" />
                    </li>
                  )}
                />
              </ul>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <EditableRichText path="pages.approach.focus.footerLocations" value={p.focus.footerLocations} as="span" className="text-[0.72rem] text-white/40 tracking-[0.08em] uppercase" />
                <span className="font-syne font-extrabold text-[1.25rem] text-white">{content.site.wordmark}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="py-24 px-8 bg-[var(--section)]">
        <div className="max-w-8xl mx-auto">
          <FadeIn>
            <SectionHeader
              label={<EditableRichText path="pages.approach.whyItMatters.label" value={p.whyItMatters.label} as="span" />}
              title={<EditableRichText path="pages.approach.whyItMatters.title" value={p.whyItMatters.title} as="span" />}
            />
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <EditableRepeater<Why>
              path="pages.approach.whyItMatters.items"
              items={p.whyItMatters.items}
              newItem={() => ({ title: 'New reason', desc: 'Describe why it matters.' })}
              addLabel="Add card"
              renderItem={(item, i) => (
                <FadeIn key={i} delay={i * 0.1} fullWidth>
                  <div className="relative group h-full bg-white p-8 border border-[var(--border)] overflow-hidden transition-all duration-300 hover:border-[var(--border-dark)] hover:shadow-[var(--elev-2)] hover:-translate-y-1">
                    <span className="gold-reveal absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" />
                    <EditableRichText path={`pages.approach.whyItMatters.items.${i}.title`} value={item.title} as="h3" className="font-syne font-bold text-base text-[var(--ink)] mb-3" />
                    <EditableRichText path={`pages.approach.whyItMatters.items.${i}.desc`} value={item.desc} as="p" className="text-[0.85rem] text-[var(--ink-3)] leading-relaxed" />
                  </div>
                </FadeIn>
              )}
            />
          </div>
        </div>
      </section>

      <CTASection
        title={<><EditableRichText path="pages.approach.cta.titleLead" value={p.cta.titleLead} as="span" /><br /><em className="italic gold-text"><EditableRichText path="pages.approach.cta.titleAccent" value={p.cta.titleAccent} as="span" /></em></>}
        subtitle={<EditableRichText path="pages.approach.cta.subtitle" value={p.cta.subtitle} as="span" />}
        primaryLabel={<EditableText path="pages.approach.cta.primaryLabel" value={p.cta.primaryLabel} as="span" hrefPath="pages.approach.cta.primaryHref" hrefValue={p.cta.primaryHref} />}
        primaryHref={p.cta.primaryHref}
        primaryColor={ctaPrimaryColor}
        primarySwatch={<ColorSwatch path="pages.approach.cta.primaryColor" label="Button colour" />}
        secondaryLabel={<EditableText path="pages.approach.cta.secondaryLabel" value={p.cta.secondaryLabel} as="span" hrefPath="pages.approach.cta.secondaryHref" hrefValue={p.cta.secondaryHref} />}
        secondaryHref={p.cta.secondaryHref}
        secondaryColor={ctaSecondaryColor}
        secondarySwatch={<ColorSwatch path="pages.approach.cta.secondaryColor" label="Button colour" />}
      />
      <Footer content={content} />
    </>
  )
}
