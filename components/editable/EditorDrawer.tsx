'use client'

import { X } from 'lucide-react'
import type { ReactNode } from 'react'

/** Right-side slide-over used by the Theme and Settings panels in the editor. */
export default function EditorDrawer({
  title,
  open,
  onClose,
  children,
}: {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
}) {
  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 top-12 z-[95] bg-black/10" onClick={onClose} />
      <aside className="fixed top-12 right-0 bottom-0 z-[96] w-[320px] bg-white border-l border-[var(--border)] shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 h-12 border-b border-[var(--border)] flex-shrink-0">
          <span className="font-syne font-bold text-[0.82rem] text-[var(--ink)]">{title}</span>
          <button type="button" onClick={onClose} className="p-1.5 rounded hover:bg-[var(--section)] text-[var(--ink-3)]">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </aside>
    </>
  )
}
