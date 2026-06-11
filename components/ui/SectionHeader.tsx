import clsx from 'clsx'

interface SectionHeaderProps {
  label: string
  title: React.ReactNode
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={clsx(centered && 'text-center', light && 'on-dark')}>
      <p
        className={clsx(
          'text-[0.72rem] font-semibold tracking-[0.12em] uppercase mb-2',
          light ? 'text-[var(--accent-light)]' : 'text-[var(--accent)]'
        )}
      >
        {label}
      </p>
      <span className={clsx('gold-rule mb-4', centered && 'mx-auto')} />
      <h2
        className={clsx(
          'font-serif-display font-normal leading-[1.1]',
          'text-[clamp(2rem,4vw,3rem)]',
          light ? 'text-white' : 'text-[var(--ink)]',
          centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'text-[0.95rem] leading-relaxed mt-4 font-light',
            centered ? 'mx-auto max-w-xl' : 'max-w-xl',
            light ? 'text-white/60' : 'text-[var(--ink-3)]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
