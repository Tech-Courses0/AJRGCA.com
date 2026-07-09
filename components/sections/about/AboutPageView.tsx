'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTASection from '@/components/sections/CTASection'
import SectionHeader from '@/components/ui/SectionHeader'
import EditableImage from '@/components/editable/EditableImage'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import type { SiteContent } from '@/types/content'
import type { TeamMember } from '@/types'

type Value = { num: string; title: string; desc: string }

export default function AboutPageView({ content }: { content: SiteContent }) {
  const { partners } = content
  const p = content.pages.about
  const newMember = (): TeamMember => ({ name: 'New member', role: 'Role', bio: '', photo: null })

  return (
    <>
      <Navbar content={content} />
      <section className="pt-36 pb-20 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-8xl mx-auto relative">
          <EditableRichText path="pages.about.heroEyebrow" value={p.heroEyebrow} as="p" className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4" />
          <h1 className="font-serif-display font-normal text-[clamp(2.5rem,5vw,3.8rem)] leading-[1.1] max-w-4xl text-[var(--ink)]">
            <EditableRichText path="pages.about.heroTitleLead" value={p.heroTitleLead} as="span" />{' '}
            <em className="italic gold-text"><EditableRichText path="pages.about.heroTitleAccent" value={p.heroTitleAccent} as="span" /></em>
          </h1>
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeader
              label={<EditableRichText path="pages.about.whoWeAre.label" value={p.whoWeAre.label} as="span" />}
              title={<EditableRichText path="pages.about.whoWeAre.title" value={p.whoWeAre.title} as="span" />}
            />
            <div className="mt-8 flex flex-col gap-5 text-[0.95rem] text-[var(--ink-3)] leading-relaxed font-light">
              {p.whoWeAre.paras.map((para, i) => (
                <EditableRichText key={i} path={`pages.about.whoWeAre.paras.${i}`} value={para} as="p" />
              ))}
            </div>
          </div>
          <div className="on-dark bg-[var(--ink)] p-10">
            <EditableRichText path="pages.about.vision.label" value={p.vision.label} as="p" className="text-[0.7rem] tracking-[0.1em] uppercase text-[var(--accent-light)] mb-4" />
            <h3 className="font-serif-display font-normal text-[1.6rem] text-white leading-[1.3]">
              <EditableRichText path="pages.about.vision.title" value={p.vision.title} as="span" />{' '}
              <em className="italic gold-text"><EditableRichText path="pages.about.vision.titleAccent" value={p.vision.titleAccent} as="span" /></em>
            </h3>
            <div className="mt-8 pt-8 border-t border-white/10">
              <EditableRichText path="pages.about.vision.presenceLabel" value={p.vision.presenceLabel} as="p" className="text-[0.75rem] text-white/40 tracking-[0.08em] uppercase" />
              <EditableRichText path="pages.about.vision.presenceValue" value={p.vision.presenceValue} as="p" className="text-white/70 text-sm mt-2" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-[var(--section)]">
        <div className="max-w-8xl mx-auto mb-12">
          <SectionHeader label={<EditableRichText path="pages.about.valuesHeader.label" value={p.valuesHeader.label} as="span" />} title={<EditableRichText path="pages.about.valuesHeader.title" value={p.valuesHeader.title} as="span" />} />
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditableRepeater<Value>
            path="pages.about.values"
            items={p.values}
            newItem={() => ({ num: String(p.values.length + 1).padStart(2, '0'), title: 'New value', desc: 'Describe this value.' })}
            addLabel="Add value"
            renderItem={(v, i) => (
              <div key={i} className="bg-white p-8 border border-[var(--border)]">
                <EditableRichText path={`pages.about.values.${i}.num`} value={v.num} as="div" className="font-syne font-extrabold text-[2rem] text-[var(--border-dark)] mb-4" />
                <EditableRichText path={`pages.about.values.${i}.title`} value={v.title} as="h3" className="font-syne font-bold text-base text-[var(--ink)] mb-2" />
                <EditableRichText path={`pages.about.values.${i}.desc`} value={v.desc} as="p" className="text-[0.82rem] text-[var(--ink-3)] leading-relaxed" />
              </div>
            )}
          />
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-8xl mx-auto mb-12">
          <SectionHeader label={<EditableRichText path="pages.about.partnersHeader.label" value={p.partnersHeader.label} as="span" />} title={<EditableRichText path="pages.about.partnersHeader.title" value={p.partnersHeader.title} as="span" />} />
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, pi) => (
            <div key={partner.name} className="border border-[var(--border)] rounded-card overflow-hidden flex flex-col sm:flex-row">
              <div className="sm:w-[42%] flex-shrink-0 relative min-h-[300px]">
                <EditableImage
                  path={`partners.${pi}.photo`}
                  value={partner.photo}
                  alt={partner.name}
                  altPath={`partners.${pi}.photoAlt`}
                  className="!rounded-none absolute inset-0 w-full h-full"
                  placeholderLabel={`Photo — ${partner.name}`}
                />
              </div>
              <div className="p-7 flex flex-col">
                <EditableRichText path={`partners.${pi}.name`} value={partner.name} as="h3" className="font-serif-display font-normal text-2xl text-[var(--ink)]" />
                <EditableRichText path={`partners.${pi}.role`} value={partner.role} as="p" className="text-[0.76rem] text-[var(--accent-dark)] tracking-[0.04em] uppercase mt-1.5 font-semibold" />
                <EditableRichText path={`partners.${pi}.qualifications`} value={partner.qualifications} as="p" className="text-[0.74rem] text-[var(--ink-3)] mt-1" />
                <EditableRichText path={`partners.${pi}.bio.0`} value={partner.bio[0]} as="p" className="text-[0.86rem] text-[var(--ink-3)] leading-relaxed mt-5" />
                <div className="mt-auto pt-5">
                  <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[var(--accent-dark)] mb-2">Focus Areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    <EditableRepeater<string>
                      path={`partners.${pi}.sectors`}
                      items={partner.sectors}
                      newItem={() => 'New tag'}
                      addLabel="Add tag"
                      itemClassName="inline-flex"
                      renderItem={(s, si) => (
                        <span className="text-[0.68rem] font-medium tracking-[0.03em] bg-[var(--royal-tint)] text-[var(--royal)] px-2.5 py-1 rounded">
                          <EditableRichText path={`partners.${pi}.sectors.${si}`} value={s} as="span" />
                        </span>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-8xl mx-auto mt-6">
          <EditableRichText path="pages.about.partnersNote" value={p.partnersNote} as="p" className="text-[0.76rem] text-[var(--ink-4)] italic" />
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="py-20 px-8 bg-[var(--section)]">
        <div className="max-w-8xl mx-auto mb-12">
          <SectionHeader
            label={<EditableRichText path="pages.about.leadershipHeader.label" value={p.leadershipHeader.label} as="span" />}
            title={<EditableRichText path="pages.about.leadershipHeader.title" value={p.leadershipHeader.title} as="span" />}
            subtitle={<EditableRichText path="pages.about.leadershipHeader.subtitle" value={p.leadershipHeader.subtitle} as="span" />}
          />
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <EditableRepeater<TeamMember>
            path="team.leadership"
            items={content.team.leadership}
            newItem={newMember}
            addLabel="Add member"
            renderItem={(member, i) => (
              <div key={i} className="bg-white border border-[var(--border)] rounded-card overflow-hidden flex flex-col">
                <EditableImage path={`team.leadership.${i}.photo`} value={member.photo} alt={member.name} altPath={`team.leadership.${i}.photoAlt`} className="aspect-[4/5] w-full" placeholderLabel="Photo" />
                <div className="p-5 flex flex-col">
                  <EditableRichText path={`team.leadership.${i}.name`} value={member.name} as="h3" className="font-syne font-bold text-[0.95rem] text-[var(--ink)] leading-snug" />
                  <EditableRichText path={`team.leadership.${i}.role`} value={member.role} as="p" className="text-[0.7rem] text-[var(--accent-dark)] tracking-[0.03em] mt-1 mb-3" />
                  {member.bio !== undefined && <EditableRichText path={`team.leadership.${i}.bio`} value={member.bio ?? ''} as="p" className="text-[0.76rem] text-[var(--ink-3)] leading-relaxed" />}
                </div>
              </div>
            )}
          />
        </div>
        <div className="max-w-8xl mx-auto mt-6">
          <EditableRichText path="pages.about.leadershipNote" value={p.leadershipNote} as="p" className="text-[0.74rem] text-[var(--ink-4)] italic" />
        </div>
      </section>

      {/* ── Associates & Mentors ── */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-8xl mx-auto mb-12">
          <SectionHeader label={<EditableRichText path="pages.about.mentorsHeader.label" value={p.mentorsHeader.label} as="span" />} title={<EditableRichText path="pages.about.mentorsHeader.title" value={p.mentorsHeader.title} as="span" />} />
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <EditableRepeater<TeamMember>
            path="team.mentors"
            items={content.team.mentors}
            newItem={newMember}
            addLabel="Add mentor"
            renderItem={(m, i) => (
              <div key={i} className="border border-[var(--border)] rounded-card overflow-hidden flex flex-col sm:flex-row">
                <div className="sm:w-[38%] flex-shrink-0 relative min-h-[180px]">
                  <EditableImage path={`team.mentors.${i}.photo`} value={m.photo} alt={m.name} altPath={`team.mentors.${i}.photoAlt`} className="!rounded-none absolute inset-0 w-full h-full" placeholderLabel="Photo" />
                </div>
                <div className="p-6 flex flex-col">
                  <EditableRichText path={`team.mentors.${i}.name`} value={m.name} as="h3" className="font-syne font-bold text-[0.95rem] text-[var(--ink)] leading-snug" />
                  <EditableRichText path={`team.mentors.${i}.role`} value={m.role} as="p" className="text-[0.7rem] text-[var(--accent-dark)] tracking-[0.03em] mt-1 mb-3" />
                  {m.bio !== undefined && <EditableRichText path={`team.mentors.${i}.bio`} value={m.bio ?? ''} as="p" className="text-[0.76rem] text-[var(--ink-3)] leading-relaxed" />}
                </div>
              </div>
            )}
          />
        </div>
      </section>

      <CTASection
        title={<><EditableRichText path="pages.about.cta.titleLead" value={p.cta.titleLead} as="span" /><br /><em className="italic gold-text"><EditableRichText path="pages.about.cta.titleAccent" value={p.cta.titleAccent} as="span" /></em></>}
        subtitle={<EditableRichText path="pages.about.cta.subtitle" value={p.cta.subtitle} as="span" />}
        buttonsPath="pages.about.cta.buttons"
        buttons={p.cta.buttons}
      />
      <Footer content={content} />
    </>
  )
}
