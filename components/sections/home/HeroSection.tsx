import Button from '@/components/ui/Button'
import FadeIn from '@/components/ui/FadeIn'
import clsx from 'clsx'
import EditableText from '@/components/editable/EditableText'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import type { SiteContent, HeroFact } from '@/types/content'

export default function HeroSection({ content }: { content: SiteContent }) {
  const { hero } = content
  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-[var(--cream)] overflow-hidden">
      <span className="bg-architectural absolute inset-0 opacity-60 pointer-events-none" aria-hidden="true" />
      {/* soft deck-purple glow — gives the clean canvas depth without imagery */}
      <span
        className="absolute right-[-160px] top-1/3 w-[720px] h-[720px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(104,48,120,0.12), rgba(104,48,120,0) 68%)' }}
        aria-hidden="true"
      />
      <div className="absolute right-[-220px] top-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full border border-[var(--border)] opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-[-90px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[var(--border)] opacity-40 pointer-events-none" aria-hidden="true" />
      {/* gentle settle into the navy stats strip below */}
      <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--cream)] pointer-events-none" aria-hidden="true" />

      <div className="max-w-8xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full py-24 relative">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 bg-white border border-[var(--border)] text-[var(--accent-dark)] text-[0.72rem] font-semibold tracking-[0.1em] uppercase px-4 py-2 mb-8 shadow-[var(--elev-1)]">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </span>
            <EditableRichText path="hero.eyebrow" value={hero.eyebrow} as="span" />
          </div>

          <h1 className="font-serif-display font-normal text-[clamp(2.8rem,5vw,4.2rem)] leading-[1.08] text-[var(--ink)] mb-6">
            <EditableRichText path="hero.titleLine1" value={hero.titleLine1} as="span" /><br />
            <EditableRichText path="hero.titleLine2" value={hero.titleLine2} as="span" /><br />
            <EditableRichText path="hero.titleLine3" value={hero.titleLine3} as="span" /><br />
            <em className="italic gold-text">
              <EditableRichText path="hero.titleAccent" value={hero.titleAccent} as="span" />
            </em>
          </h1>

          <EditableRichText
            path="hero.subtitle"
            value={hero.subtitle}
            as="p"
            className="text-[1.05rem] leading-relaxed text-[var(--ink-3)] max-w-md mb-10 font-light"
          />

          <div className="flex items-center gap-4 flex-wrap">
            <Button href={hero.primaryHref}>
              <EditableText path="hero.primaryLabel" value={hero.primaryLabel} as="span" hrefPath="hero.primaryHref" hrefValue={hero.primaryHref} />
            </Button>
            <Button href={hero.secondaryHref} variant="secondary">
              <EditableText path="hero.secondaryLabel" value={hero.secondaryLabel} as="span" hrefPath="hero.secondaryHref" hrefValue={hero.secondaryHref} />
            </Button>
          </div>

          <p className="text-[0.72rem] text-[var(--ink-3)] mt-6 tracking-[0.06em]">
            Mumbai &nbsp;|&nbsp; Noida &nbsp;|&nbsp; Ahmedabad* &nbsp;|&nbsp; Bangalore
          </p>
        </FadeIn>

        <FadeIn delay={0.3} direction="left" className="hidden lg:block">
          <div className="relative p-3">
            <span className="gold-corner top-0 left-0" />
            <span className="gold-corner gold-corner--br bottom-0 right-0" />
            <div className="grid grid-cols-2 gap-4">
              <EditableRepeater<HeroFact>
                path="hero.facts"
                items={hero.facts}
                newItem={() => ({ value: '0', label: 'New fact' })}
                addLabel="Add box"
                colorPath={(_, i) => `hero.facts.${i}.bg`}
                renderItem={(f, i) => {
                  // No custom colour picked: box 2 keeps its default purple
                  // gradient (today's look), the rest stay white. Pick a
                  // colour from the repeater's swatch and it overrides that —
                  // any box, any colour, flat background + light text.
                  const isDark = i === 1 || !!f.bg
                  return (
                    <div
                      key={i}
                      style={f.bg ? { background: f.bg } : undefined}
                      className={clsx(
                        'group relative p-6 transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[var(--elev-2)]',
                        isDark
                          ? clsx('on-dark overflow-hidden', !f.bg && 'bg-royal-wash')
                          : 'bg-white border border-[var(--border)] shadow-[var(--elev-1)] hover:border-[var(--border-dark)]'
                      )}
                    >
                      {isDark && <span className="gold-reveal absolute left-0 top-0 h-full w-[2px]" />}
                      <EditableRichText
                        path={`hero.facts.${i}.value`}
                        value={f.value}
                        as="div"
                        className="font-syne font-extrabold text-[2.4rem] gold-text leading-none"
                      />
                      <EditableRichText
                        path={`hero.facts.${i}.label`}
                        value={f.label}
                        as="div"
                        className={isDark
                          ? 'text-[0.78rem] text-white/60 tracking-[0.04em] mt-1'
                          : 'text-[0.78rem] text-[var(--ink-3)] tracking-[0.04em] mt-1'}
                      />
                    </div>
                  )
                }}
              />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* quiet scroll cue — a gold tick drifting down a hairline rail */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2.5 pointer-events-none" aria-hidden="true">
        <span className="text-[0.58rem] tracking-[0.22em] uppercase text-[var(--ink-4)]">Scroll</span>
        <span className="relative h-9 w-px bg-[var(--border-dark)] overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-[var(--accent)] motion-safe:animate-[scrollCue_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
        </span>
      </div>
    </section>
  )
}
