import type { Industry } from '@/types'
import { getIcon } from '@/lib/icons'

interface IndustryCardProps {
  industry: Industry
}

export default function IndustryCard({ industry }: IndustryCardProps) {
  const Icon = getIcon(industry.icon)

  return (
    <div className="relative group bg-[var(--section)] p-8 cursor-pointer overflow-hidden border border-[var(--border)] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--ink)] hover:-translate-y-1 hover:shadow-[var(--elev-2)]">
      <span className="gold-reveal absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" />
      <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-[var(--accent-light)] text-[var(--accent-dark)] mb-4 group-hover:bg-white/10 group-hover:text-[var(--accent-light)] transition-colors duration-300">
        <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <h3 className="font-syne font-bold text-base text-[var(--ink)] group-hover:text-white transition-colors duration-300 mb-2">
        {industry.name}
      </h3>
      <p className="text-[0.8rem] text-[var(--ink-3)] group-hover:text-white/60 leading-relaxed transition-colors duration-300">
        {industry.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {industry.tags.map((tag) => (
          <span
            key={tag}
            className="text-[0.68rem] font-medium tracking-[0.06em] uppercase bg-[var(--border)] text-[var(--ink-3)] group-hover:bg-white/10 group-hover:text-white/70 px-2.5 py-1 transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
