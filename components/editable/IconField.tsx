'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { useEditor } from './EditorContext'
import { getIcon, iconMap, ICON_KEYS, type IconKey } from '@/lib/icons'

interface IconFieldProps {
  /** Dot-path to the item's icon key, e.g. "pages.book.badges.0.icon". */
  path: string
  /** Current key — used on the public site (no editor context) and as the
   *  fallback before the first edit, mirroring EditableText's `value` prop. */
  value?: string
  size?: number
  className?: string
  strokeWidth?: number
}

/** Renders the resolved icon. On the public site it's just the icon; inside the
 *  editor it becomes a click target that opens a grid to pick from the curated
 *  set (lib/icons). Unknown/missing keys resolve to the fallback icon. */
export default function IconField({ path, value, size = 16, className, strokeWidth }: IconFieldProps) {
  const { isEditing, getValue, setValue } = useEditor()
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const ref = useRef<HTMLSpanElement>(null)

  const key = (getValue(path) as string | undefined) ?? value
  const Icon = getIcon(key)

  useEffect(() => {
    if (!open) return
    function onDocDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocDown)
    return () => document.removeEventListener('mousedown', onDocDown)
  }, [open])

  if (!isEditing) return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />

  function toggle(e: React.MouseEvent) {
    // Icons often sit inside a <Link> — never navigate or bubble to the
    // repeater's select handler when picking an icon.
    e.preventDefault()
    e.stopPropagation()
    if (open) { setOpen(false); return }
    const r = ref.current?.getBoundingClientRect()
    if (r) setPos({ top: r.bottom + 6, left: Math.max(8, r.left) })
    setOpen(true)
  }

  function pick(k: IconKey) {
    setValue(path, k)
    setOpen(false)
  }

  return (
    // role=button (not <button>) keeps it valid inside an <a>.
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      title="Change icon"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={toggle}
      className={clsx('relative inline-flex cursor-pointer rounded-sm outline outline-1 outline-dashed outline-[#3b82f6]/40 hover:outline-[#3b82f6] outline-offset-2')}
    >
      <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />
      {open && pos && createPortal(
        <div
          className="fixed z-[130] grid grid-cols-6 gap-1 rounded-md border border-[var(--border)] bg-white shadow-xl p-2 w-[232px]"
          style={{ top: pos.top, left: pos.left }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {ICON_KEYS.map((k) => {
            const Opt = iconMap[k]
            const active = k === key
            return (
              <button
                key={k}
                type="button"
                title={k}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); pick(k) }}
                className={clsx(
                  'flex items-center justify-center w-8 h-8 rounded',
                  active ? 'bg-[var(--accent)] text-white' : 'text-[var(--ink-2)] hover:bg-blue-50 hover:text-[var(--accent)]'
                )}
              >
                <Opt size={16} aria-hidden="true" />
              </button>
            )
          })}
        </div>,
        document.body
      )}
    </span>
  )
}
