'use client'

import { useState } from 'react'
import clsx from 'clsx'
import LegalPageView from './LegalPageView'
import type { SiteContent, LegalKey } from '@/types/content'

const DOCS: { key: LegalKey; label: string }[] = [
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'terms', label: 'Terms' },
  { key: 'disclaimer', label: 'Disclaimer' },
  { key: 'cookies', label: 'Cookie Policy' },
]

/** Editor-only wrapper: a sub-tab bar to pick which of the four legal docs to
 *  edit, then renders that doc's LegalPageView. Public pages render a single
 *  LegalPageView directly. */
export default function LegalEditorView({ content }: { content: SiteContent }) {
  const [doc, setDoc] = useState<LegalKey>('privacy')
  return (
    <div>
      {/* Navbar renders `fixed top-12` in edit mode, so this bar sits fixed
          just below it (top-28 = 48px toolbar + 64px navbar) rather than
          `sticky top-12`, which would be painted over by Navbar's higher
          z-index and made unreachable — LegalPageView adds matching top
          padding below to keep its content clear of this bar. */}
      <div className="fixed top-28 left-0 right-0 z-40 h-11 bg-[var(--cream)] border-b border-[var(--border)] px-8 flex items-center gap-1.5">
        {DOCS.map((d) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setDoc(d.key)}
            className={clsx(
              'text-[0.72rem] font-medium px-3 py-1.5 rounded transition-colors',
              doc === d.key ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink-3)] hover:bg-white'
            )}
          >
            {d.label}
          </button>
        ))}
      </div>
      <LegalPageView key={doc} content={content} docKey={doc} />
    </div>
  )
}
