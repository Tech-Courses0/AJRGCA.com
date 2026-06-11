import Link from 'next/link'
import {
  ShieldCheck, TrendingUp, FileText, Scale, Users, Building2, ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import clsx from 'clsx'

interface Pillar {
  icon: LucideIcon
  eyebrow: string
  title: string
  body: string
  href: string
  className: string
  feature?: boolean
}

/* Core service pillars, "How we solve" framing — laid out as a Bento grid. */
const pillars: Pillar[] = [
  {
    icon: ShieldCheck,
    eyebrow: 'Audit & Assurance',
    title: 'Independent assurance that stands up to scrutiny',
    body: 'Statutory, internal and concurrent audit, IFC and fraud review — under direct partner oversight.',
    href: '/services',
    className: 'md:col-span-2 md:row-span-2',
    feature: true,
  },
  {
    icon: TrendingUp,
    eyebrow: 'Strategic Advisory',
    title: 'A CFO perspective, without the full-time cost',
    body: 'Fractional CFO, financial modelling, valuation and transaction advisory.',
    href: '/services',
    className: 'md:col-span-2',
  },
  {
    icon: FileText,
    eyebrow: 'Tax Advisory',
    title: 'Seamless tax in a shifting regulatory landscape',
    body: 'GST and income-tax compliance, litigation and transaction structuring.',
    href: '/services',
    className: 'md:col-span-1',
  },
  {
    icon: Scale,
    eyebrow: 'IBC Advisory',
    title: 'Clarity through insolvency proceedings',
    body: 'CIRP advisory, financial assessment and resolution coordination.',
    href: '/services',
    className: 'md:col-span-1',
  },
  {
    icon: Building2,
    eyebrow: 'Regulatory & ROC',
    title: 'Corporate compliance, handled end to end',
    body: 'Incorporation, ROC filings, CSR & ESG and secretarial audits.',
    href: '/services',
    className: 'md:col-span-2',
  },
  {
    icon: Users,
    eyebrow: 'Succession Planning',
    title: 'Protecting wealth across generations',
    body: 'Wills, family-business succession, trusts and wealth transition.',
    href: '/services',
    className: 'md:col-span-2',
  },
]

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(0,1fr)] gap-4">
      {pillars.map((p) => {
        const Icon = p.icon
        return (
          <Link
            key={p.eyebrow}
            href={p.href}
            className={clsx(
              'group relative flex flex-col justify-between rounded-card p-7 lg:p-8 overflow-hidden no-underline transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[var(--elev-2)]',
              p.feature
                ? 'bg-royal-wash text-white'
                : 'bg-white border border-[var(--border)] hover:border-[var(--border-dark)]',
              p.className
            )}
          >
            {/* faint architectural grid on the feature card */}
            {p.feature && <span className="bg-architectural absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true" />}
            <span className="gold-reveal absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" />

            <div className="relative">
              <span
                className={clsx(
                  'flex items-center justify-center rounded-lg mb-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105',
                  p.feature ? 'w-14 h-14 bg-white/10 text-[var(--accent-light)]' : 'w-12 h-12 bg-[var(--accent-light)] text-[var(--accent-dark)] group-hover:bg-[var(--accent)] group-hover:text-white'
                )}
              >
                <Icon size={p.feature ? 26 : 22} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <p className={clsx('text-[0.66rem] font-bold tracking-[0.14em] uppercase mb-3', p.feature ? 'text-[var(--accent-light)]' : 'text-[var(--accent-dark)]')}>
                {p.eyebrow}
              </p>
              <h3
                className={clsx(
                  'font-serif-display font-normal leading-[1.2] mb-3',
                  p.feature ? 'text-[1.7rem] lg:text-[2rem] text-white' : 'text-[1.15rem] text-[var(--ink)]'
                )}
              >
                {p.title}
              </h3>
              <p className={clsx('leading-relaxed font-light', p.feature ? 'text-[0.95rem] text-white/70 max-w-md' : 'text-[0.84rem] text-[var(--ink-3)]')}>
                {p.body}
              </p>
            </div>

            <span
              className={clsx(
                'relative flex items-center gap-1.5 text-[0.74rem] font-semibold tracking-[0.04em] mt-6 transition-all duration-200 group-hover:gap-2.5',
                p.feature ? 'text-[var(--accent-light)]' : 'text-[var(--accent-dark)]'
              )}
            >
              Technical Deep-Dive <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}
