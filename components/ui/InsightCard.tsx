import type { Insight } from '@/types'

interface InsightCardProps {
  insight: Insight
}

export default function InsightCard({ insight }: InsightCardProps) {
  return (
    <article className="group cursor-pointer border-b-2 border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-200 pb-6">
      <div className="w-full aspect-video flex items-center justify-center mb-5 overflow-hidden" style={!insight.image ? { backgroundColor: insight.bgColor } : undefined}>
        {insight.image ? (
          <img
            src={insight.image}
            alt={insight.imageAlt || insight.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <span
            className="font-serif-display text-2xl text-center leading-snug px-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ color: insight.textColor }}
          >
            {insight.label}
          </span>
        )}
      </div>
      <p className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--accent-dark)] mb-2">
        {insight.category}
      </p>
      <h3 className="font-syne font-bold text-[0.95rem] text-[var(--ink)] leading-[1.4] mb-2 group-hover:text-[var(--ink-2)] transition-colors">
        {insight.title}
      </h3>
      <p className="text-[0.72rem] text-[var(--ink-3)]">
        {insight.date} · {insight.readTime}
      </p>
    </article>
  )
}
