'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Undo2, Redo2, LogOut, Rocket, Palette, Settings, RotateCcw, Check, HelpCircle, X } from 'lucide-react'
import clsx from 'clsx'
import { useEditor } from './EditorContext'

type PanelId = 'theme' | 'settings' | null
type ConfirmId = 'publish' | 'discard' | null

interface EditorToolbarProps {
  pages?: { id: string; label: string }[]
  activePage?: string
  onPageChange?: (id: string) => void
  activePanel?: PanelId
  onPanelToggle?: (panel: 'theme' | 'settings') => void
}

export default function EditorToolbar({ pages, activePage, onPageChange, activePanel, onPanelToggle }: EditorToolbarProps) {
  const { undo, redo, canUndo, canRedo, saveStatus, publish, publishing, published, discardDraft } = useEditor()
  const [confirm, setConfirm] = useState<ConfirmId>(null)

  const statusLabel =
    saveStatus === 'saving' ? 'Saving…' : saveStatus === 'saved' ? 'Saved' : saveStatus === 'error' ? 'Save failed' : ''

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-12 bg-[var(--ink)] text-white flex items-center justify-between gap-2 px-4 shadow-lg overflow-x-auto">
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="font-syne font-bold text-[0.8rem] tracking-[0.05em] hidden sm:inline">Editor</span>
        <HelpButton />

        {pages && pages.length > 0 && (
          <div className="flex items-center gap-0.5 bg-white/10 rounded-md p-0.5 ml-1">
            {pages.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onPageChange?.(p.id)}
                className={clsx(
                  'text-[0.7rem] font-medium px-2.5 py-1 rounded transition-colors duration-150',
                  activePage === p.id ? 'bg-white text-[var(--ink)]' : 'text-white/60 hover:text-white'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 ml-2">
          <button
            type="button"
            title="Undo (Ctrl+Z)"
            disabled={!canUndo}
            onClick={undo}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <Undo2 size={15} />
          </button>
          <button
            type="button"
            title="Redo (Ctrl+Shift+Z)"
            disabled={!canRedo}
            onClick={redo}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <Redo2 size={15} />
          </button>
        </div>
        {statusLabel && (
          <span className={clsx('text-[0.72rem]', saveStatus === 'error' ? 'text-red-300' : 'text-white/50')}>
            {statusLabel}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={() => onPanelToggle?.('theme')}
          className={clsx(
            'flex items-center gap-1.5 text-[0.72rem] px-2.5 py-1.5 rounded transition-colors',
            activePanel === 'theme' ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white'
          )}
        >
          <Palette size={13} /> Theme
        </button>
        <button
          type="button"
          onClick={() => onPanelToggle?.('settings')}
          className={clsx(
            'flex items-center gap-1.5 text-[0.72rem] px-2.5 py-1.5 rounded transition-colors',
            activePanel === 'settings' ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white'
          )}
        >
          <Settings size={13} /> Settings
        </button>
        <button
          type="button"
          onClick={() => setConfirm('discard')}
          title="Undo all unpublished changes and return to the published version"
          className="flex items-center gap-1.5 text-[0.72rem] text-white/60 hover:text-white px-2.5 py-1.5 rounded"
        >
          <RotateCcw size={13} /> <span className="hidden md:inline">Discard changes</span>
        </button>
        <Link
          href="/api/admin/logout"
          className="flex items-center gap-1.5 text-[0.72rem] text-white/60 hover:text-white no-underline px-3 py-1.5"
        >
          <LogOut size={13} /> Exit
        </Link>
        <button
          type="button"
          onClick={() => setConfirm('publish')}
          disabled={publishing}
          className={clsx(
            'flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-[0.04em] uppercase px-4 py-1.5 rounded-sm transition-colors duration-150 disabled:opacity-50',
            published ? 'bg-green-600 text-white' : 'bg-[var(--accent)] text-white hover:bg-white hover:text-[var(--royal)]'
          )}
        >
          {published ? <Check size={13} /> : <Rocket size={13} />}
          {published ? 'Published' : publishing ? 'Publishing…' : 'Publish'}
        </button>
      </div>

      {confirm && (
        <ConfirmDialog
          kind={confirm}
          onCancel={() => setConfirm(null)}
          onConfirm={async () => {
            const action = confirm
            setConfirm(null)
            if (action === 'publish') await publish()
            else await discardDraft()
          }}
        />
      )}
    </div>
  )
}

const HELP_SEEN_KEY = 'ajrg_editor_help_seen'

const HELP_TIPS: [string, string][] = [
  ['Edit text', 'Click any text on the page and type. Changes save automatically.'],
  ['Switch pages', 'Use the tabs at the top to move between Home, About, Services and the rest.'],
  ['Add or remove items', 'Hover a card, service or article to reveal move, duplicate and delete controls, plus an “Add” button.'],
  ['Images', 'Hover an image and click “Change image” to upload a new one (under 5 MB).'],
  ['Theme & Settings', 'Use the Theme and Settings buttons for colours, logo, contact details and social links.'],
  ['Go live', 'Nothing is public until you press Publish. “Discard changes” resets to the live version.'],
]

function HelpButton() {
  const [open, setOpen] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Shown on every editor visit (e.g. every admin login) unless the owner
    // has explicitly opted out via the checkbox below.
    if (!localStorage.getItem(HELP_SEEN_KEY)) setOpen(true)
  }, [])

  function close() {
    setOpen(false)
    if (dontShowAgain) {
      try { localStorage.setItem(HELP_SEEN_KEY, '1') } catch { /* ignore */ }
    }
  }

  return (
    <>
      <button
        type="button"
        title="How to edit this site"
        onClick={() => (open ? close() : setOpen(true))}
        className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white"
      >
        <HelpCircle size={16} />
      </button>
      {open && (
        <div className="fixed inset-0 z-[130] flex items-start justify-center pt-20 bg-black/40" onClick={close}>
          <div
            className="w-[min(92vw,460px)] rounded-lg bg-white text-[var(--ink)] shadow-2xl p-6 normal-case tracking-normal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-serif-display text-[1.35rem]">Editing your website</h2>
              <button type="button" onClick={close} className="p-1 text-[var(--ink-3)] hover:text-[var(--ink)]" title="Close">
                <X size={18} />
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {HELP_TIPS.map(([title, body]) => (
                <li key={title}>
                  <p className="text-[0.82rem] font-semibold text-[var(--ink)]">{title}</p>
                  <p className="text-[0.82rem] text-[var(--ink-3)] leading-relaxed">{body}</p>
                </li>
              ))}
            </ul>
            <label className="flex items-center gap-2 mt-5 text-[0.78rem] text-[var(--ink-3)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              Don&apos;t show this again
            </label>
            <button
              type="button"
              onClick={close}
              className="mt-3 w-full bg-[var(--ink)] text-white text-[0.8rem] font-semibold tracking-[0.04em] uppercase py-2.5 rounded-sm hover:bg-[var(--accent)] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function ConfirmDialog({ kind, onConfirm, onCancel }: { kind: 'publish' | 'discard'; onConfirm: () => void; onCancel: () => void }) {
  const isPublish = kind === 'publish'
  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/40" onClick={onCancel}>
      <div
        className="w-[min(92vw,380px)] rounded-lg bg-white text-[var(--ink)] shadow-2xl p-6 normal-case tracking-normal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif-display text-[1.25rem] mb-2">
          {isPublish ? 'Publish changes?' : 'Discard changes?'}
        </h2>
        <p className="text-[0.85rem] text-[var(--ink-3)] leading-relaxed mb-5">
          {isPublish
            ? 'This makes your current edits live on the public website immediately. Visitors will see them right away.'
            : 'This throws away every unpublished edit and returns the editor to the version currently live on the website. This cannot be undone.'}
        </p>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-[0.8rem] font-medium px-4 py-2 rounded-sm text-[var(--ink-3)] hover:bg-[var(--section)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={clsx(
              'text-[0.8rem] font-semibold px-4 py-2 rounded-sm text-white',
              isPublish ? 'bg-[var(--accent)] hover:opacity-90' : 'bg-red-600 hover:bg-red-700'
            )}
          >
            {isPublish ? 'Publish now' : 'Discard changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
