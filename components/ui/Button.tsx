import Link from 'next/link'
import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
}: ButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center overflow-hidden text-[0.78rem] font-semibold tracking-[0.08em] uppercase cursor-pointer no-underline transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px'

  const variants = {
    primary: 'bg-[var(--ink)] text-white px-8 py-3.5 hover:bg-[var(--royal)] hover:shadow-[var(--elev-2)]',
    secondary: 'bg-transparent text-[var(--ink)] border border-[var(--border-dark)] px-8 py-3.5 hover:border-[var(--ink)] hover:bg-[var(--royal-tint)]',
    ghost: 'bg-transparent text-[var(--ink)] border border-[var(--border-dark)] px-8 py-3.5 hover:border-[var(--ink)] hover:bg-[var(--royal-tint)]',
  }

  const classes = clsx(base, variants[variant], className)

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <>
          {/* discovered liquid-gold strip resting inside the button */}
          <span className="gold-reveal absolute left-0 bottom-0 h-[2px] w-full opacity-90 transition-all duration-300 group-hover:h-[3px]" />
        </>
      )}
      {variant !== 'primary' && (
        /* a hairline of gold that flows in on hover */
        <span className="gold-reveal absolute left-0 bottom-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" />
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
