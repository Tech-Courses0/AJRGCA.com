'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { complianceCategories, complianceDeadlines } from '@/data/calendar'
import type { ComplianceCategory } from '@/types'

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

export default function ComplianceCalendar() {
  const [filter, setFilter] = useState<Filter>('All')

  const upcoming = useMemo(() => {
    return complianceDeadlines
      .filter((d) => daysUntil(d.date) >= 0)
      .filter((d) => filter === 'All' || d.category === filter)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 8)
  }, [filter])

  const filters: Filter[] = ['All', ...complianceCategories]

  return (
    <section className="py-28 px-8 bg-[var(--cream)]">
      <div className="max-w-8xl mx-auto">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent-dark)] mb-3">
              <CalendarDays size={14} aria-hidden="true" /> Compliance Calendar
            </p>
            <span className="gold-rule mb-4" />
            <h2 className="font-serif-display font-normal text-[clamp(1.9rem,3.6vw,2.7rem)] leading-[1.1] text-[var(--ink)] max-w-xl">
              Key statutory deadlines, kept in view.
            </h2>
            <p className="mt-4 text-[0.92rem] text-[var(--ink-3)] font-light max-w-md leading-relaxed">
              Upcoming GST, Income Tax, TDS and MCA due dates. For general reference — confirm against the latest notifications.
            </p>
          </div>

          {/* filter tabs */}
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
        </div>

        {/* list */}
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
                {/* date block */}
                <div className="flex-shrink-0 w-14 text-center">
                  <div className="font-syne font-extrabold text-[1.6rem] leading-none text-[var(--ink)]">
                    {String(dt.getDate()).padStart(2, '0')}
                  </div>
                  <div className="text-[0.66rem] tracking-[0.08em] uppercase text-[var(--ink-4)] mt-1">
                    {MONTHS[dt.getMonth()]} {dt.getFullYear()}
                  </div>
                </div>

                <span className="w-px self-stretch bg-[var(--border)]" aria-hidden="true" />

                {/* details */}
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

                {/* countdown */}
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

        <p className="mt-5 text-[0.72rem] text-[var(--ink-4)] flex items-center gap-1.5">
          Need help meeting a deadline?
          <a href="/contact" className="inline-flex items-center gap-1 text-[var(--accent-dark)] font-semibold no-underline hover:gap-1.5 transition-all">
            Talk to our team <ArrowRight size={12} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  )
}
