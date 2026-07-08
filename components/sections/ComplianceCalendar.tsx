'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { complianceCategories, complianceDeadlines } from '@/data/calendar'
import EditableText from '@/components/editable/EditableText'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import { useEditor } from '@/components/editable/EditorContext'
import type { SiteContent, CalendarContent } from '@/types/content'
import type { ComplianceCategory, ComplianceDeadline } from '@/types'

type Filter = 'All' | ComplianceCategory

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const categoryStyle: Record<ComplianceCategory, string> = {
  GST: 'bg-[var(--accent-light)] text-[var(--accent-dark)]',
  'Income Tax': 'bg-[var(--royal-tint)] text-[var(--royal)]',
  TDS: 'bg-[#ECE8F3] text-[var(--ink)]',
  MCA: 'bg-[#EDEAE2] text-[var(--ink-2)]',
}

function daysUntil(iso: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(`${iso}T00:00:00`)
  return Math.round((due.getTime() - today.getTime()) / 86_400_000)
}

const newDeadline = (): ComplianceDeadline => ({
  date: new Date().toISOString().slice(0, 10),
  category: 'GST',
  title: 'New deadline',
  authority: 'CBIC',
  recurring: 'Monthly',
})

export default function ComplianceCalendar({ content }: { content?: SiteContent }) {
  const { isEditing } = useEditor()
  const cal: CalendarContent = content?.calendar ?? {
    name: 'Compliance Calendar',
    title: 'Key statutory deadlines, kept in view.',
    subtitle: 'Upcoming GST, Income Tax, TDS and MCA due dates. For general reference — confirm against the latest notifications.',
    footerPrompt: 'Need help meeting a deadline?',
    footerLinkLabel: 'Talk to our team',
    deadlines: complianceDeadlines,
  }
  const [filter, setFilter] = useState<Filter>('All')

  const upcoming = useMemo(() => {
    return cal.deadlines
      .filter((d) => daysUntil(d.date) >= 0)
      .filter((d) => filter === 'All' || d.category === filter)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 8)
  }, [cal.deadlines, filter])

  const filters: Filter[] = ['All', ...complianceCategories]

  return (
    <section className="py-28 px-8 bg-[var(--cream)]">
      <div className="max-w-8xl mx-auto">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent-dark)] mb-3">
              <CalendarDays size={14} aria-hidden="true" /> <EditableRichText path="calendar.name" value={cal.name} as="span" />
            </p>
            <span className="gold-rule mb-4" />
            <EditableRichText
              path="calendar.title"
              value={cal.title}
              as="h2"
              className="font-serif-display font-normal text-[clamp(1.9rem,3.6vw,2.7rem)] leading-[1.1] text-[var(--ink)] max-w-xl"
            />
            <EditableRichText
              path="calendar.subtitle"
              value={cal.subtitle}
              as="p"
              className="mt-4 text-[0.92rem] text-[var(--ink-3)] font-light max-w-md leading-relaxed"
            />
          </div>

          {/* filter tabs — hidden while editing so every row is reachable */}
          {!isEditing && (
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter deadlines by category">
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={clsx(
                    'text-[0.72rem] font-semibold tracking-[0.04em] px-4 py-2 rounded-full transition-colors duration-200',
                    filter === f
                      ? 'bg-[var(--ink)] text-white'
                      : 'bg-white border border-[var(--border)] text-[var(--ink-3)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── EDITING: full editable list (add / edit / delete / reorder every deadline) ── */}
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <p className="text-[0.72rem] text-[var(--ink-4)] mb-1">
              Editing all deadlines. On the live site only upcoming dates show, sorted and filtered.
            </p>
            <EditableRepeater<ComplianceDeadline>
              path="calendar.deadlines"
              items={cal.deadlines}
              newItem={newDeadline}
              addLabel="Add deadline"
              renderItem={(d, i) => (
                <div key={i} className="grid grid-cols-[130px_110px_1fr] gap-2 items-center bg-white border border-[var(--border)] rounded-md p-2">
                  <DateField path={`calendar.deadlines.${i}.date`} value={d.date} />
                  <CategoryField path={`calendar.deadlines.${i}.category`} value={d.category} />
                  <div className="flex flex-col gap-1">
                    <EditableText path={`calendar.deadlines.${i}.title`} value={d.title} as="p" className="text-[0.84rem] font-semibold text-[var(--ink)]" />
                    <div className="flex gap-2">
                      <TextField path={`calendar.deadlines.${i}.authority`} value={d.authority} placeholder="Authority (CBDT/CBIC/MCA)" />
                      <TextField path={`calendar.deadlines.${i}.recurring`} value={d.recurring} placeholder="Monthly/Quarterly/Annual" />
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        ) : (
          /* ── PUBLIC: upcoming-only, sorted, with countdown ── */
          <div className="border border-[var(--border)] rounded-card overflow-hidden bg-white">
            {upcoming.length === 0 && (
              <p className="p-8 text-[0.85rem] text-[var(--ink-3)]">No upcoming deadlines in this category for the current cycle.</p>
            )}
            {upcoming.map((d, i) => {
              const dt = new Date(`${d.date}T00:00:00`)
              const days = daysUntil(d.date)
              return (
                <motion.div
                  key={`${d.date}-${d.title}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  className="group flex items-center gap-5 px-5 md:px-7 py-5 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--section)] transition-colors duration-150"
                >
                  <div className="flex-shrink-0 w-14 text-center">
                    <div className="font-syne font-extrabold text-[1.6rem] leading-none text-[var(--ink)]">
                      {String(dt.getDate()).padStart(2, '0')}
                    </div>
                    <div className="text-[0.66rem] tracking-[0.08em] uppercase text-[var(--ink-4)] mt-1">
                      {MONTHS[dt.getMonth()]} {dt.getFullYear()}
                    </div>
                  </div>

                  <span className="w-px self-stretch bg-[var(--border)]" aria-hidden="true" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={clsx('text-[0.62rem] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded', categoryStyle[d.category])}>
                        {d.category}
                      </span>
                      <span className="text-[0.62rem] tracking-[0.06em] uppercase text-[var(--ink-4)]">
                        {d.authority} · {d.recurring}
                      </span>
                    </div>
                    <p className="text-[0.88rem] font-semibold text-[var(--ink)] leading-snug truncate">
                      {d.title}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <div className="font-syne font-bold text-[0.95rem] text-[var(--accent-dark)] leading-none">
                      {days === 0 ? 'Today' : `${days}d`}
                    </div>
                    {days !== 0 && (
                      <div className="text-[0.62rem] tracking-[0.06em] uppercase text-[var(--ink-4)] mt-1">remaining</div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        <p className="mt-5 text-[0.72rem] text-[var(--ink-4)] flex items-center gap-1.5">
          <EditableRichText path="calendar.footerPrompt" value={cal.footerPrompt} as="span" />
          <a href="/contact" className="inline-flex items-center gap-1 text-[var(--accent-dark)] font-semibold no-underline hover:gap-1.5 transition-all">
            <EditableRichText path="calendar.footerLinkLabel" value={cal.footerLinkLabel} as="span" /> <ArrowRight size={12} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  )
}

/* ── small edit-mode field helpers (bound to a content path) ── */

function DateField({ path, value }: { path: string; value: string }) {
  const { getValue, setValue } = useEditor()
  const v = (getValue(path) as string | undefined) ?? value
  return (
    <input
      type="date"
      value={v}
      onChange={(e) => setValue(path, e.target.value)}
      className="text-[0.78rem] border border-[var(--border)] rounded px-1.5 py-1 focus:outline-none focus:border-[var(--accent)]"
    />
  )
}

function CategoryField({ path, value }: { path: string; value: string }) {
  const { getValue, setValue } = useEditor()
  const v = (getValue(path) as string | undefined) ?? value
  return (
    <select
      value={v}
      onChange={(e) => setValue(path, e.target.value)}
      className="text-[0.78rem] border border-[var(--border)] rounded px-1.5 py-1 focus:outline-none focus:border-[var(--accent)] bg-white"
    >
      {complianceCategories.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  )
}

function TextField({ path, value, placeholder }: { path: string; value: string; placeholder?: string }) {
  const { getValue, setValue } = useEditor()
  const v = (getValue(path) as string | undefined) ?? value
  return (
    <input
      type="text"
      value={v}
      placeholder={placeholder}
      onChange={(e) => setValue(path, e.target.value)}
      className="flex-1 min-w-0 text-[0.7rem] border border-[var(--border)] rounded px-1.5 py-1 focus:outline-none focus:border-[var(--accent)]"
    />
  )
}
