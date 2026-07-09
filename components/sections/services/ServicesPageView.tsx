'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import FadeIn from '@/components/ui/FadeIn'
import EditableText from '@/components/editable/EditableText'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import IconField from '@/components/editable/IconField'
import { useEditor } from '@/components/editable/EditorContext'
import { getIcon } from '@/lib/icons'
import type { SiteContent } from '@/types/content'
import type { Service, Stat } from '@/types'

const newService = (defaultCategory: string): Service => ({
  id: `service-${Date.now().toString(36)}`,
  icon: 'file-text',
  category: defaultCategory,
  title: 'New service',
  shortDesc: 'Short description shown on the card.',
  fullDesc: 'Full description.',
  points: [],
})

export default function ServicesPageView({ content }: { content: SiteContent }) {
  const { isEditing, setValue, getValue } = useEditor()
  const { services } = content
  const p = content.pages.services
  const indexed = services.map((s, i) => ({ s, i }))

  return (
    <>
      <Navbar content={content} />

      {/* ── Hero ── */}
      <section className="on-dark pt-36 pb-20 px-8 bg-[var(--ink)] relative overflow-hidden">
        <div className="absolute right-[-180px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-white/10 pointer-events-none" />
        <span className="gold-divider absolute bottom-0 left-0" />
        <div className="max-w-8xl mx-auto relative">
          <FadeIn>
            <EditableRichText path="pages.services.hero.eyebrow" value={p.hero.eyebrow} as="p" className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent-light)] mb-4" />
            <h1 className="font-serif-display font-normal text-[clamp(2.5rem,5vw,3.8rem)] leading-[1.1] max-w-3xl text-white">
              <EditableRichText path="pages.services.hero.titleLead" value={p.hero.titleLead} as="span" />{' '}
              <em className="italic gold-text"><EditableRichText path="pages.services.hero.titleAccent" value={p.hero.titleAccent} as="span" /></em>
            </h1>
            <EditableRichText path="pages.services.hero.subtitle" value={p.hero.subtitle} as="p" className="mt-6 text-[0.98rem] text-white/65 max-w-xl font-light leading-relaxed" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
              <EditableRepeater<Stat>
                path="pages.services.heroStats"
                items={p.heroStats}
                addLabel="Add stat"
                newItem={() => ({ value: '0', label: 'New Stat' })}
                renderItem={(s, i) => (
                  <div className="bg-[var(--ink)] p-6">
                    <EditableRichText path={`pages.services.heroStats.${i}.value`} value={s.value} as="div" className="font-syne font-extrabold text-[1.9rem] text-white leading-none" />
                    <EditableRichText path={`pages.services.heroStats.${i}.label`} value={s.label} as="div" className="text-[0.72rem] text-white/45 tracking-[0.05em] uppercase mt-2" />
                  </div>
                )}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Manage categories (editor-only): add/remove/reorder the category
          list itself (Advisory / Compliance / Specialised / …), so it's not
          a fixed set — services below pick from whatever exists here. ── */}
      {isEditing && (
        <section className="py-12 px-8 bg-[var(--section)] border-b border-[var(--border)]">
          <div className="max-w-8xl mx-auto">
            <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[var(--accent-dark)] mb-1">Manage categories</p>
            <p className="text-[0.76rem] text-[var(--ink-4)] mb-6">Add, remove, reorder, or rename a service category here.</p>
            <div className="flex flex-col gap-3">
              <EditableRepeater<{ id: string; label: string; blurb: string }>
                path="pages.services.categories"
                items={p.categories}
                newItem={() => ({ id: `cat-${Date.now().toString(36)}`, label: 'New category', blurb: 'Short description of this category.' })}
                addLabel="Add category"
                renderItem={(cat, ci) => (
                  <div className="bg-white border border-[var(--border)] rounded-md p-4 flex flex-col gap-2">
                    <EditableText path={`pages.services.categories.${ci}.label`} value={cat.label} as="span" className="font-syne font-bold text-[0.88rem] text-[var(--ink)]" />
                    <EditableRichText path={`pages.services.categories.${ci}.blurb`} value={cat.blurb} as="p" className="text-[0.78rem] text-[var(--ink-3)]" />
                  </div>
                )}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Manage services (editor-only): add/remove/reorder/recategorize,
          and edit title/description/key areas. The grouped display below is a
          read-only live preview of the same data — not a second edit surface. ── */}
      {isEditing && (
        <section className="py-12 px-8 bg-[var(--section)] border-b border-[var(--border)]">
          <div className="max-w-8xl mx-auto">
            <p className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[var(--accent-dark)] mb-1">Manage services</p>
            <p className="text-[0.76rem] text-[var(--ink-4)] mb-6">Add, remove, reorder, recategorize, and edit title, description and key areas here — the preview below just shows how it will look.</p>
            <div className="flex flex-col gap-3">
              <EditableRepeater<Service>
                path="services"
                items={services}
                newItem={() => newService(p.categories[0]?.id ?? '')}
                addLabel="Add service"
                renderItem={(service, si) => (
                  <div className="bg-white border border-[var(--border)] rounded-md p-4 flex flex-col gap-2.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="w-7 h-7 rounded-md bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 text-[var(--accent-dark)]">
                        <IconField path={`services.${si}.icon`} value={service.icon} size={14} />
                      </span>
                      <EditableText path={`services.${si}.title`} value={service.title} as="span" className="font-syne font-bold text-[0.88rem] text-[var(--ink)]" />
                      <select
                        value={service.category}
                        onChange={(e) => setValue(`services.${si}.category`, e.target.value)}
                        className="text-[0.72rem] border border-[var(--border)] rounded px-2 py-1 focus:outline-none focus:border-[var(--accent)]"
                      >
                        {p.categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <EditableText path={`services.${si}.shortDesc`} value={service.shortDesc} as="p" className="text-[0.78rem] text-[var(--ink-3)]" />
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[0.6rem] uppercase tracking-[0.08em] text-[var(--ink-4)] mr-1">Key areas</span>
                      <EditableRepeater<string>
                        path={`services.${si}.points`}
                        items={service.points}
                        newItem={() => 'New point'}
                        addLabel="Add"
                        itemClassName="inline-flex"
                        renderItem={(point, pi) => (
                          <span className="text-[0.7rem] text-[var(--ink-2)] bg-[var(--cream)] border border-[var(--border)] rounded-full px-2.5 py-1">
                            <EditableText path={`services.${si}.points.${pi}`} value={point} as="span" />
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

      {/* ── Service categories ── */}
      {p.categories.map((cat, ci) => {
        const group = indexed.filter(({ s }) => s.category === cat.id)
        const cols = group.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
        return (
          <section key={cat.id} className="py-24 px-8 bg-white border-b border-[var(--border)] last:border-b-0">
            <div className="max-w-8xl mx-auto">
              <FadeIn>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 pb-6 border-b border-[var(--border)]">
                  <div className="flex items-baseline gap-5">
                    <span className="font-syne font-extrabold text-[0.8rem] text-[var(--accent)] tracking-[0.1em]">
                      {String(ci + 1).padStart(2, '0')}
                    </span>
                    <EditableText path={`pages.services.categories.${ci}.label`} value={cat.label} as="h2" className="font-serif-display font-normal text-[clamp(1.8rem,3.5vw,2.6rem)] text-[var(--ink)] leading-tight" />
                  </div>
                  <EditableRichText path={`pages.services.categories.${ci}.blurb`} value={cat.blurb} as="p" className="text-[0.9rem] text-[var(--ink-3)] font-light max-w-sm md:text-right" />
                </div>
              </FadeIn>

              <div className={`grid grid-cols-1 ${cols} gap-px bg-[var(--border)] border border-[var(--border)]`}>
                {group.map(({ s: service, i: gi }, idx) => {
                  const Icon = getIcon(service.icon)
                  return (
                    <FadeIn key={service.id} delay={idx * 0.08} fullWidth>
                      <div id={service.id} className="relative group h-full bg-white p-8 lg:p-10 overflow-hidden transition-colors duration-300 hover:bg-[var(--section)] scroll-mt-24">
                        <span className="gold-reveal absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" />
                        <div className="flex items-start justify-between mb-5">
                          <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--accent-light)] text-[var(--accent-dark)]">
                            <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                          </span>
                          <span className="font-syne font-extrabold text-[0.72rem] tracking-[0.1em] text-[var(--border-dark)]">
                            {cat.label}
                          </span>
                        </div>
                        <h3 className="font-syne font-bold text-[1.15rem] text-[var(--ink)] mb-3 leading-snug">
                          {(getValue(`services.${gi}.title`) as string | undefined) ?? service.title}
                        </h3>
                        <p className="text-[0.88rem] text-[var(--ink-3)] leading-relaxed mb-6 font-light">
                          {(getValue(`services.${gi}.shortDesc`) as string | undefined) ?? service.shortDesc}
                        </p>
                        <div className="pt-5 border-t border-[var(--border)]">
                          <EditableRichText path="pages.services.keyAreasLabel" value={p.keyAreasLabel} as="p" className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[var(--accent-dark)] mb-3" />
                          <div className="flex flex-wrap gap-1.5">
                            {service.points.slice(0, 5).map((point, pi) => (
                              <span key={pi} className="text-[0.72rem] text-[var(--ink-2)] bg-[var(--cream)] border border-[var(--border)] rounded-full px-3 py-1 leading-snug">
                                {(getValue(`services.${gi}.points.${pi}`) as string | undefined) ?? point}
                              </span>
                            ))}
                            {service.points.length > 5 && (
                              <span className="text-[0.72rem] text-[var(--ink-4)] px-3 py-1">
                                +{service.points.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}

      {/* ── Approach pointer ── */}
      <section className="py-20 px-8 bg-[var(--section)]">
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <EditableRichText path="pages.services.approachPointer.label" value={p.approachPointer.label} as="p" className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-3" />
            <EditableRichText path="pages.services.approachPointer.title" value={p.approachPointer.title} as="h2" className="font-serif-display font-normal text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--ink)] leading-tight max-w-xl" />
          </div>
          <a href={p.approachPointer.ctaHref} className="inline-flex items-center gap-2 bg-[var(--ink)] text-white text-[0.75rem] font-semibold tracking-[0.08em] uppercase px-6 py-3.5 no-underline transition-colors duration-200 hover:bg-[var(--accent)] flex-shrink-0">
            <EditableText path="pages.services.approachPointer.ctaLabel" value={p.approachPointer.ctaLabel} as="span" hrefPath="pages.services.approachPointer.ctaHref" hrefValue={p.approachPointer.ctaHref} />
          </a>
        </div>
      </section>

      <CTASection
        title={<><EditableRichText path="pages.services.cta.titleLead" value={p.cta.titleLead} as="span" /><br /><em className="italic gold-text"><EditableRichText path="pages.services.cta.titleAccent" value={p.cta.titleAccent} as="span" /></em></>}
        subtitle={<EditableRichText path="pages.services.cta.subtitle" value={p.cta.subtitle} as="span" />}
        buttonsPath="pages.services.cta.buttons"
        buttons={p.cta.buttons}
      />
      <Footer content={content} />
    </>
  )
}
