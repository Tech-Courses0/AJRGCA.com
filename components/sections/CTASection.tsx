import Button from '@/components/ui/Button'
import type { ReactNode } from 'react'

interface CTASectionProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  primaryLabel?: React.ReactNode
  primaryHref?: string
  secondaryLabel?: React.ReactNode
  secondaryHref?: string
  /** Custom button backgrounds — unset keeps each button's default look. */
  primaryColor?: string
  secondaryColor?: string
  /** Colour-swatch controls rendered next to each button (editor-only). */
  primarySwatch?: ReactNode
  secondarySwatch?: ReactNode
}

export default function CTASection({
  title,
  subtitle,
  primaryLabel = 'Book Consultation',
  primaryHref = '/book',
  secondaryLabel,
  secondaryHref,
  primaryColor,
  secondaryColor,
  primarySwatch,
  secondarySwatch,
}: CTASectionProps) {
  return (
    <section className="relative py-28 px-8 bg-white">
      {/* premium liquid-gold divider crowning the closing section */}
      <span className="gold-divider absolute top-0 left-0" />
      <div className="max-w-3xl mx-auto text-center">
        <span className="gold-rule mx-auto mb-8" />
        <h2 className="font-serif-display font-normal text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-[var(--ink)] mb-4">
          {title}
        </h2>
        <p className="text-[0.95rem] text-[var(--ink-3)] leading-relaxed mb-10 font-light max-w-xl mx-auto">
          {subtitle}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="inline-flex items-center">
            <Button
              href={primaryHref}
              style={primaryColor ? { backgroundColor: primaryColor, color: '#fff', borderColor: 'transparent' } : undefined}
            >
              {primaryLabel}
            </Button>
            {primarySwatch}
          </span>
          {secondaryLabel && secondaryHref && (
            <span className="inline-flex items-center">
              <Button
                href={secondaryHref}
                variant="secondary"
                style={secondaryColor ? { backgroundColor: secondaryColor, color: '#fff', borderColor: 'transparent' } : undefined}
              >
                {secondaryLabel}
              </Button>
              {secondarySwatch}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
