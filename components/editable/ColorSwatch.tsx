'use client'

import { useRef } from 'react'
import { X } from 'lucide-react'
import { useEditor } from './EditorContext'

/** Standalone colour-swatch control for editable elements that aren't inside
 *  an EditableRepeater (e.g. a single CTA button) — same native
 *  `<input type="color">` + reset pattern as the repeater's per-item swatch,
 *  just rendered inline instead of in a control bar. Renders nothing outside
 *  the editor. */
export default function ColorSwatch({ path, label = 'Colour' }: { path: string; label?: string }) {
  const { isEditing, getValue, setValue } = useEditor()
  const inputRef = useRef<HTMLInputElement>(null)
  const raw = getValue(path) as string | undefined
  const current = raw || '#ffffff'

  if (!isEditing) return null

  return (
    <span className="inline-flex items-center gap-0.5 align-middle ml-2">
      <span className="relative inline-flex">
        <button
          type="button"
          title={label}
          onClick={() => inputRef.current?.click()}
          className="w-5 h-5 rounded-full border border-[var(--border-dark)] flex-shrink-0"
          style={{ backgroundColor: current }}
        />
        <input
          ref={inputRef}
          type="color"
          value={current}
          onChange={(e) => setValue(path, e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        />
      </span>
      {raw && (
        <button
          type="button"
          title="Reset to default colour"
          onClick={() => setValue(path, undefined)}
          className="p-0.5 rounded hover:bg-blue-50 text-[var(--ink-3)]"
        >
          <X size={11} />
        </button>
      )}
    </span>
  )
}
