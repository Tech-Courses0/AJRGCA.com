import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { pagesDefault } from '@/data/pages'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import IconField from '@/components/editable/IconField'
import type { SiteContent } from '@/types/content'
import type { BentoPillar } from '@/types/content'

/* Core service pillars, "How we solve" framing — laid out as a bespoke Bento
 * grid whose asymmetric col/row spans (p.className/p.feature) travel with
 * each card, so reordering/duplicating/deleting stays visually coherent —
 * EditableRepeater applies that per-item className to the grid cell wrapper
 * it renders (see its itemClassName function form), not to the <Link> below. */
export default function BentoGrid({ content }: { content?: SiteContent }) {
  const pillars = content?.pages.home.bentoPillars ?? pagesDefault.home.bentoPillars
  const deepDiveLabel = content?.pages.home.bentoDeepDiveLabel ?? pagesDefault.home.bentoDeepDiveLabel
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(0,1fr)] gap-4">
      <EditableRepeater<BentoPillar>
        path="pages.home.bentoPillars"
        items={pillars}
        addLabel="Add card"
        itemClassName={(p) => p.className ?? ''}
        colorPath={(_, i) => `pages.home.bentoPillars.${i}.bg`}
        newItem={() => ({
          icon: 'shield-check',
          eyebrow: 'New pillar',
          title: 'New pillar title',
          body: 'Describe this service pillar.',
          href: '/services',
          className: 'md:col-span-1',
        })}
        renderItem={(p, i) => {
          // No custom colour picked: the feature card keeps its default
          // purple gradient, the rest stay white. Pick a colour from the
          // repeater's swatch and it overrides that — any card, any colour.
          const isDark = p.feature || !!p.bg
          return (
          <Link
            href={p.href}
            style={p.bg ? { background: p.bg } : undefined}
            className={clsx(
              'group relative flex flex-col justify-between rounded-card p-7 lg:p-8 overflow-hidden no-underline transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[var(--elev-2)] h-full',
              isDark ? clsx('text-white', !p.bg && 'bg-royal-wash') : 'bg-white border border-[var(--border)] hover:border-[var(--border-dark)]'
            )}
          >
            {p.feature && !p.bg && <span className="bg-architectural absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true" />}
            <span className="gold-reveal absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" />

            <div className="relative">
              <span
                className={clsx(
                  'flex items-center justify-center rounded-lg mb-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105',
                  isDark ? 'w-14 h-14 bg-white/10 text-[var(--accent-light)]' : 'w-12 h-12 bg-[var(--accent-light)] text-[var(--accent-dark)] group-hover:bg-[var(--accent)] group-hover:text-white'
                )}
              >
                <IconField path={`pages.home.bentoPillars.${i}.icon`} value={p.icon} size={isDark ? 26 : 22} strokeWidth={1.6} />
              </span>
              <EditableRichText
                path={`pages.home.bentoPillars.${i}.eyebrow`}
                value={p.eyebrow}
                as="p"
                className={clsx('text-[0.66rem] font-bold tracking-[0.14em] uppercase mb-3', isDark ? 'text-[var(--accent-light)]' : 'text-[var(--accent-dark)]')}
              />
              <EditableRichText
                path={`pages.home.bentoPillars.${i}.title`}
                value={p.title}
                as="h3"
                className={clsx('font-serif-display font-normal leading-[1.2] mb-3', isDark ? 'text-[1.7rem] lg:text-[2rem] text-white' : 'text-[1.15rem] text-[var(--ink)]')}
              />
              <EditableRichText
                path={`pages.home.bentoPillars.${i}.body`}
                value={p.body}
                as="p"
                className={clsx('leading-relaxed font-light', isDark ? 'text-[0.95rem] text-white/70 max-w-md' : 'text-[0.84rem] text-[var(--ink-3)]')}
              />
            </div>

            <span
              className={clsx(
                'relative flex items-center gap-1.5 text-[0.74rem] font-semibold tracking-[0.04em] mt-6 transition-all duration-200 group-hover:gap-2.5',
                isDark ? 'text-[var(--accent-light)]' : 'text-[var(--accent-dark)]'
              )}
            >
              <EditableRichText path="pages.home.bentoDeepDiveLabel" value={deepDiveLabel} as="span" /> <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
          )
        }}
      />
    </div>
  )
}
