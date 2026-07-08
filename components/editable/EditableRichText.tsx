'use client'

import { createElement, useCallback, useRef, useState, type ClipboardEvent, type MouseEvent as ReactMouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { Bold, Italic, Underline, Link2 } from 'lucide-react'
import clsx from 'clsx'
import { useEditor } from './EditorContext'
import { sanitizeHtml } from '@/lib/sanitizeHtml'

interface EditableRichTextProps {
  /** Dot-path into SiteContent holding an HTML string. */
  path: string
  /** Current value — an HTML string (or plain text, which is valid HTML). */
  value: string
  as?: string
  className?: string
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

// "Royal Minimalist" theme swatches — deliberately a handful of on-brand
// colors, not a full picker, so text color stays consistent with the design
// system instead of drifting into arbitrary hues.
const THEME_COLORS = [
  { label: 'Ink', value: '#221042' },
  { label: 'Royal', value: '#301850' },
  { label: 'Gold', value: '#C5A059' },
  { label: 'Muted', value: '#6A5E83' },
]

export default function EditableRichText({ path, value, as = 'p', className }: EditableRichTextProps) {
  const { isEditing, getValue, setValue } = useEditor()
  const ref = useRef<HTMLElement | null>(null)
  const savedRange = useRef<Range | null>(null)
  const [dirty, setDirty] = useState(false)
  const [toolbar, setToolbar] = useState<{ top: number; left: number } | null>(null)
  const [linkOpen, setLinkOpen] = useState(false)
  // Set innerHTML ONCE, imperatively, via this ref callback — NOT through React's
  // dangerouslySetInnerHTML. React re-applies dangerouslySetInnerHTML on every
  // re-render (even when the html string is byte-identical), and `el.innerHTML =`
  // recreates the text nodes, which collapses the live selection. Showing the
  // toolbar on mouseup is exactly such a re-render, so the selection died the
  // instant the drag ended and bold/italic had nothing to act on. Setting it
  // once and never handing content back to React keeps the DOM (and selection)
  // stable; handleBlur reads the edited html back out.
  const initialHtml = useRef<string | null>(null)
  if (initialHtml.current === null) initialHtml.current = (getValue(path) as string | undefined) ?? value
  const inited = useRef(false)
  const setNode = useCallback((node: HTMLElement | null) => {
    ref.current = node
    if (node && !inited.current) {
      node.innerHTML = initialHtml.current ?? ''
      inited.current = true
    }
  }, [])

  if (!isEditing) {
    const html = sanitizeHtml(value)
    return createElement(as, { className, dangerouslySetInnerHTML: { __html: html } })
  }

  const current = (getValue(path) as string | undefined) ?? value

  function handleBlur() {
    const html = sanitizeHtml(ref.current?.innerHTML ?? '')
    if (html !== current) setValue(path, html)
    setDirty(false)
    // Delay so a click on the toolbar (link button) still registers before it unmounts.
    setTimeout(() => setToolbar(null), 150)
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault()
    document.execCommand('insertText', false, e.clipboardData.getData('text/plain'))
  }

  function updateToolbarPosition() {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setToolbar(null)
      return
    }
    const rect = sel.getRangeAt(0).getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) {
      setToolbar(null)
      return
    }
    setToolbar({ top: rect.top - 42, left: Math.max(8, rect.left) })
  }

  function exec(command: 'bold' | 'italic' | 'underline') {
    return (e: ReactMouseEvent) => {
      e.preventDefault() // keep the selection alive
      document.execCommand(command)
      setDirty(true)
    }
  }

  function setColor(color: string) {
    return (e: ReactMouseEvent) => {
      e.preventDefault()
      document.execCommand('foreColor', false, color)
      setDirty(true)
    }
  }

  function openLinkEditor(e: ReactMouseEvent) {
    e.preventDefault()
    // The link <input> steals focus (and thus the live selection) from the
    // contentEditable the moment it mounts, so capture the Range now and
    // restore it right before running execCommand.
    const sel = window.getSelection()
    savedRange.current = sel && sel.rangeCount > 0 ? sel.getRangeAt(0).cloneRange() : null
    setLinkOpen(true)
  }

  function applyLink(url: string) {
    if (url && savedRange.current && ref.current) {
      ref.current.focus()
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(savedRange.current)
      document.execCommand('createLink', false, url)
      const html = sanitizeHtml(ref.current.innerHTML)
      setValue(path, html)
    }
    savedRange.current = null
    setLinkOpen(false)
    setToolbar(null)
  }

  const element = createElement(as, {
    ref: setNode,
    tabIndex: 0,
    className: clsx(className, EDIT_OUTLINE, dirty ? 'outline-[#3b82f6] focus-visible:outline-[#3b82f6]' : 'outline-transparent hover:outline-[#3b82f6]/50', 'cursor-text'),
    // Always editable in editor mode — never toggle contentEditable on a focused
    // element (that blurs it to <body> and kills the selection + border).
    contentEditable: true,
    suppressContentEditableWarning: true,
    // Content is set imperatively in setNode (see above) — do NOT pass
    // dangerouslySetInnerHTML/children here or React will rewrite it on re-render.
    onFocus: () => setDirty(true),
    onBlur: handleBlur,
    onPaste: handlePaste,
    onMouseUp: updateToolbarPosition,
    onKeyUp: updateToolbarPosition,
  })

  // Portalled to <body> — the toolbar is viewport-positioned (fixed) and must
  // not become a DOM descendant of `element` (which may be a <span> inside a
  // <p>, where a nested <div> would be invalid HTML).
  return (
    <>
      {element}
      {toolbar && createPortal(
        <div
          className="fixed z-[120] flex items-center gap-0.5 rounded-md border border-[var(--border)] bg-white shadow-xl p-1"
          style={{ top: toolbar.top, left: toolbar.left }}
          onMouseDown={(e) => e.preventDefault()} // don't steal focus/selection from the text
        >
          <ToolbarButton title="Bold" onMouseDown={exec('bold')}><Bold size={13} /></ToolbarButton>
          <ToolbarButton title="Italic" onMouseDown={exec('italic')}><Italic size={13} /></ToolbarButton>
          <ToolbarButton title="Underline" onMouseDown={exec('underline')}><Underline size={13} /></ToolbarButton>
          <ToolbarButton title="Link" onMouseDown={openLinkEditor}><Link2 size={13} /></ToolbarButton>
          <span className="w-px h-5 bg-[var(--border)] mx-0.5" aria-hidden="true" />
          {THEME_COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              title={c.label}
              onMouseDown={setColor(c.value)}
              className="w-5 h-5 rounded-full border border-black/10 flex-shrink-0"
              style={{ backgroundColor: c.value }}
            />
          ))}
          {linkOpen && (
            <span
              className="absolute top-full left-0 mt-1 w-[240px] rounded-md border border-[var(--border)] bg-white shadow-xl p-2 flex items-center gap-1.5"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                autoFocus
                placeholder="https:// or /page"
                className="flex-1 text-[0.76rem] border border-[var(--border)] rounded px-2 py-1 focus:outline-none focus:border-[var(--accent)]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') applyLink((e.target as HTMLInputElement).value)
                  if (e.key === 'Escape') setLinkOpen(false)
                }}
                onBlur={(e) => applyLink(e.target.value)}
              />
            </span>
          )}
        </div>,
        document.body
      )}
    </>
  )
}

function ToolbarButton({ title, onMouseDown, children }: { title: string; onMouseDown: (e: ReactMouseEvent) => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={onMouseDown}
      className="flex items-center justify-center w-7 h-7 rounded text-[var(--ink-3)] hover:bg-blue-50 hover:text-[var(--accent)]"
    >
      {children}
    </button>
  )
}
