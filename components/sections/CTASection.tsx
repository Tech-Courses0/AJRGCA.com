import CTAButtonList from '@/components/editable/CTAButtonList'
import type { CTAButton } from '@/types/content'

interface CTASectionProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  /** Dot-path to the buttons array, e.g. "pages.home.cta.buttons". */
  buttonsPath: string
  buttons: CTAButton[]
}

export default function CTASection({ title, subtitle, buttonsPath, buttons }: CTASectionProps) {
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
        <CTAButtonList path={buttonsPath} buttons={buttons} justify="center" />
      </div>
    </section>
  )
}
