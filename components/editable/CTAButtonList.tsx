'use client'

import clsx from 'clsx'
import Button from '@/components/ui/Button'
import EditableText from './EditableText'
import EditableRepeater from './EditableRepeater'
import type { CTAButton } from '@/types/content'

/** Renders a CTA button row as an EditableRepeater collection — add,
 *  reorder, duplicate, delete, and a per-button colour swatch, all from the
 *  control bar. Shared by the Hero section and every page's closing
 *  CTASection so "Book a Consultation", "Contact Us", etc. all work the
 *  same way. */
export default function CTAButtonList({ path, buttons, justify = 'start' }: { path: string; buttons: CTAButton[]; justify?: 'start' | 'center' }) {
  return (
    <div className={clsx('flex items-center gap-4 flex-wrap', justify === 'center' && 'justify-center')}>
      <EditableRepeater<CTAButton>
        path={path}
        items={buttons}
        addLabel="Add button"
        itemClassName="inline-flex"
        colorPath={(_, i) => `${path}.${i}.color`}
        newItem={() => ({ label: 'New button', href: '/', variant: 'secondary' })}
        renderItem={(b, i) => (
          <Button
            href={b.href}
            variant={b.variant === 'secondary' ? 'secondary' : 'primary'}
            style={b.color ? { backgroundColor: b.color, color: '#fff', borderColor: 'transparent' } : undefined}
          >
            <EditableText
              path={`${path}.${i}.label`}
              value={b.label}
              as="span"
              hrefPath={`${path}.${i}.href`}
              hrefValue={b.href}
            />
          </Button>
        )}
      />
    </div>
  )
}
