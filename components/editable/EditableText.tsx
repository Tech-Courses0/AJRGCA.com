'use client'

import { createElement, useCallback, useRef, useState, type ClipboardEvent } from 'react'
import { Link2, TriangleAlert, X } from 'lucide-react'
import clsx from 'clsx'
import { useEditor } from './EditorContext'

interface EditableTextProps {
  /** Dot-path into SiteContent, e.g. "hero.subtitle". */
  path: string
  /** Current value — used directly on the public site; used as a fallback
   *  before the first edit inside the editor. */
  value: string
  as?: string
  className?: string
  /** If this text is also a hyperlink, pass the dot-path to its URL. In the
   *  editor a persistent link chip appears and a warned URL editor opens when
   *  the text is clicked or the chip is pressed. */
  hrefPath?: string
  hrefValue?: string
}

// Selection uses a lighter tint (not the same #3b82f6 as the border) so a
// fully-selected field's fill doesn't visually swallow its own outline.
// Outline COLOR is applied per-state below (see clsx), NOT baked in here:
// `outline-transparent` and `outline-[#3b82f6]` are the same Tailwind utility
// at equal specificity, and Tailwind emits `outline-transparent` last — so if
// both are on the element, transparent always wins and the dirty border never
// paints. Emit exactly one color at a time to keep the blue border alive
// without depending on the fragile `:focus` pseudo (which also needs OS/window
// focus and doesn't reliably match mid-selection).
const EDIT_OUTLINE =
  'outline outline-2 rounded-sm outline-offset-2 transition-[outline-color] duration-150 selection:bg-[#bfdbfe] selection:text-[#1e3a5f]'

export default function EditableText({ path, value, as = 'span', className, hrefPath, hrefValue }: EditableTextProps) {
  const { isEditing, getValue, setValue } = useEditor()
  const ref = useRef<HTMLElement | null>(null)
  const wrapRef = useRef<HTMLSpanElement | null>(null)
  const [dirty, setDirty] = useState(false)
  const [linkOpen, setLinkOpen] = useState(false)
  const [pop, setPop] = useState<{ top: number; left: number } | null>(null)
  // Set text ONCE imperatively — see EditableRichText. Handing content to React
  // (as children or dangerouslySetInnerHTML) makes it rewrite the text node on
  // every re-render, collapsing the live selection. The contentEditable owns its
  // text while mounted; handleBlur reads it back out.
  const initialText = useRef<string | null>(null)
  if (initialText.current === null) initialText.current = (getValue(path) as string | undefined) ?? value
  const inited = useRef(false)
  const setNode = useCallback((node: HTMLElement | null) => {
    ref.current = node
    if (node && !inited.current) {
      node.textContent = initialText.current ?? ''
      inited.current = true
    }
  }, [])

  if (!isEditing) {
    return createElement(as, { className }, value)
  }

  const current = (getValue(path) as string | undefined) ?? value

  function handleBlur() {
    const text = ref.current?.innerText ?? ''
    if (text !== current) setValue(path, text)
    setDirty(false)
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault()
    document.execCommand('insertText', false, e.clipboardData.getData('text/plain'))
  }

  // Position the warning popover in fixed coordinates so it is never clipped by
  // an ancestor's `overflow-hidden` (e.g. buttons).
  function openLinkEditor() {
    const r = wrapRef.current?.getBoundingClientRect()
    if (r) setPop({ top: r.bottom + 6, left: Math.min(r.left, window.innerWidth - 300) })
    setLinkOpen(true)
  }

  const element = createElement(
    as,
    {
      ref: setNode,
      tabIndex: 0,
      className: clsx(className, EDIT_OUTLINE, dirty ? 'outline-[#3b82f6] focus-visible:outline-[#3b82f6]' : 'outline-transparent hover:outline-[#3b82f6]/50', 'cursor-text'),
      // Always editable in editor mode — never toggle contentEditable on a focused
      // element (that blurs it to <body> and kills the selection + border).
      contentEditable: true,
      suppressContentEditableWarning: true,
      // Text is set imperatively in setNode — do NOT pass children here.
      onFocus: () => setDirty(true),
      onBlur: handleBlur,
      onPaste: handlePaste,
    }
  )

  // Plain text: no wrapper, byte-identical structure to before.
  if (!hrefPath) return element

  const currentHref = (getValue(hrefPath) as string | undefined) ?? hrefValue ?? ''

  return (
    <span ref={wrapRef} className="inline-flex items-center gap-1 align-baseline">
      {element}
      {/* Always-visible link chip so non-technical editors can see at a glance
          that this text is a link. */}
      <button
        type="button"
        title="This text is a link — click to edit its web address"
        onMouseDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (linkOpen) setLinkOpen(false)
          else openLinkEditor()
        }}
        className="inline-flex items-center justify-center w-4 h-4 flex-shrink-0 rounded-full bg-[#3b82f6] text-white shadow-sm"
      >
        <Link2 size={10} />
      </button>

      {linkOpen && pop && (
        <span
          className="fixed z-[120] w-[280px] rounded-md border border-[var(--border)] bg-white shadow-xl p-3 text-left normal-case tracking-normal"
          style={{ top: pop.top, left: pop.left }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLinkOpen(false)}
            className="absolute top-1.5 right-1.5 p-0.5 rounded text-[var(--ink-3)] hover:bg-[var(--section)]"
          >
            <X size={13} />
          </button>
          <span className="flex items-start gap-1.5 text-[0.68rem] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1.5 mb-2 pr-5 leading-snug">
            <TriangleAlert size={12} className="flex-shrink-0 mt-0.5" />
            This text is a link. The web address below decides where it goes — change it carefully.
          </span>
          <label className="block text-[0.64rem] font-semibold tracking-[0.04em] uppercase text-[var(--ink-3)] mb-1">Web address</label>
          <input
            type="text"
            defaultValue={currentHref}
            onBlur={(e) => setValue(hrefPath, e.target.value)}
            placeholder="/services or https://…"
            className="w-full text-[0.78rem] border border-[var(--border)] rounded px-2 py-1.5 focus:outline-none focus:border-[var(--accent)]"
          />
          <button
            type="button"
            onClick={() => setLinkOpen(false)}
            className="mt-2 w-full text-[0.72rem] font-medium bg-[var(--ink)] text-white rounded py-1.5 hover:bg-[var(--accent)] transition-colors"
          >
            Done
          </button>
        </span>
      )}
    </span>
  )
}
