import { ImageIcon } from 'lucide-react'
import clsx from 'clsx'

interface ImagePlaceholderProps {
  /** What real image goes here — shown as a caption so the brief is unambiguous. */
  label: string
  /** Optional secondary hint, e.g. a recommended size or source. */
  hint?: string
  /** Tailwind aspect ratio utility, e.g. 'aspect-square', 'aspect-[4/3]'. */
  aspect?: string
  /** Render as a circular avatar. */
  avatar?: boolean
  className?: string
}

/**
 * On-brand placeholder for imagery that must be supplied by the firm (real
 * photos should not be AI-generated). Renders an architectural-tinted box that
 * clearly states what image is expected, so designers/clients know what to add.
 *
 * Swap for next/image once the real asset is in /public.
 */
export default function ImagePlaceholder({
  label,
  hint,
  aspect = 'aspect-[4/3]',
  avatar = false,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={clsx(
        'relative flex flex-col items-center justify-center text-center overflow-hidden bg-[var(--royal-tint)] border border-dashed border-[var(--border-dark)]',
        avatar ? 'rounded-full aspect-square' : 'rounded-card',
        !avatar && aspect,
        className
      )}
    >
      <span className="bg-architectural absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true" />
      <ImageIcon
        size={avatar ? 22 : 26}
        strokeWidth={1.5}
        className="relative text-[var(--royal-light)] mb-2"
        aria-hidden="true"
      />
      {!avatar && (
        <span className="relative px-4 text-[0.72rem] font-semibold text-[var(--royal)] leading-snug">
          {label}
        </span>
      )}
      {!avatar && hint && (
        <span className="relative px-4 mt-1 text-[0.62rem] text-[var(--ink-4)]">{hint}</span>
      )}
    </div>
  )
}
