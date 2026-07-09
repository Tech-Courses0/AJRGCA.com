'use client'

import { useState, useEffect } from 'react'
import { Undo2, Redo2, LogOut, Rocket, Palette, Settings, Check, HelpCircle, X, History, RotateCcw } from 'lucide-react'
import clsx from 'clsx'
import { useEditor } from './EditorContext'

type PanelId = 'theme' | 'settings' | null

interface EditorToolbarProps {
  pages?: { id: string; label: string }[]
  activePage?: string
  onPageChange?: (id: string) => void
  activePanel?: PanelId
  onPanelToggle?: (panel: 'theme' | 'settings') => void
}

export default function EditorToolbar({ pages, activePage, onPageChange, activePanel, onPanelToggle }: EditorToolbarProps) {
  const { undo, redo, canUndo, canRedo, saveStatus, publish, publishing, published } = useEditor()
  const [confirmPublish, setConfirmPublish] = useState(false)
  const [publishMessage, setPublishMessage] = useState('')
  const [publishError, setPublishError] = useState<string | null>(null)

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
        <HistoryButton />
        <button
          type="button"
          onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST' })
            window.location.href = '/admin/login'
          }}
          className="flex items-center gap-1.5 text-[0.72rem] text-white/60 hover:text-white no-underline px-3 py-1.5"
        >
          <LogOut size={13} /> Exit
        </button>
        <button
          type="button"
          onClick={() => { setPublishMessage(''); setPublishError(null); setConfirmPublish(true) }}
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

      {confirmPublish && (
        <PublishDialog
          message={publishMessage}
          onMessageChange={setPublishMessage}
          error={publishError}
          onCancel={() => setConfirmPublish(false)}
          onConfirm={async () => {
            const trimmed = publishMessage.trim()
            if (!trimmed) {
              setPublishError('Describe what changed before publishing.')
              return
            }
            setConfirmPublish(false)
            await publish(trimmed)
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
  ['Go live', 'Nothing is public until you press Publish. Use History to revert a past version or reset the whole site to its original content.'],
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

interface HistoryEntry {
  id: number
  message: string
  createdAt: string
}

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

function HistoryButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [entries, setEntries] = useState<HistoryEntry[] | null>(null)
  const [revertId, setRevertId] = useState<number | null>(null)
  const [reverting, setReverting] = useState(false)
  const [confirmOriginal, setConfirmOriginal] = useState(false)
  const [revertingOriginal, setRevertingOriginal] = useState(false)

  async function openPanel() {
    setOpen(true)
    setLoading(true)
    try {
      const res = await fetch('/api/admin/history')
      const data = await res.json()
      setEntries(res.ok ? data.history : [])
    } finally {
      setLoading(false)
    }
  }

  async function revert(id: number) {
    setReverting(true)
    try {
      const res = await fetch('/api/admin/history/revert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) window.location.reload()
    } finally {
      setReverting(false)
    }
  }

  async function revertOriginal() {
    setRevertingOriginal(true)
    try {
      const res = await fetch('/api/admin/history/revert-original', { method: 'POST' })
      if (res.ok) window.location.reload()
    } finally {
      setRevertingOriginal(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        className="flex items-center gap-1.5 text-[0.72rem] px-2.5 py-1.5 rounded transition-colors text-white/60 hover:text-white"
      >
        <History size={13} /> <span className="hidden md:inline">History</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-[130] flex items-start justify-center pt-20 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="w-[min(92vw,440px)] rounded-lg bg-white text-[var(--ink)] shadow-2xl p-6 normal-case tracking-normal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-1">
              <h2 className="font-serif-display text-[1.25rem]">Publish history</h2>
              <button type="button" onClick={() => setOpen(false)} className="p-1 text-[var(--ink-3)] hover:text-[var(--ink)]" title="Close">
                <X size={18} />
              </button>
            </div>
            <p className="text-[0.78rem] text-[var(--ink-3)] mb-4">
              The last 5 published versions. Revert loads that version back into your draft — it goes live once you Publish again.
            </p>

            {loading && <p className="text-[0.82rem] text-[var(--ink-3)] py-4 text-center">Loading…</p>}
            {!loading && entries && entries.length === 0 && (
              <p className="text-[0.82rem] text-[var(--ink-3)] py-4 text-center">Nothing published yet.</p>
            )}
            {!loading && entries && entries.length > 0 && (
              <ul className="flex flex-col divide-y divide-[var(--border)]">
                {entries.map((entry) => (
                  <li key={entry.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[0.84rem] font-medium text-[var(--ink)] truncate">{entry.message}</p>
                      <p className="text-[0.7rem] text-[var(--ink-3)]">{relativeTime(entry.createdAt)}</p>
                    </div>
                    {revertId === entry.id ? (
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          disabled={reverting}
                          onClick={() => revert(entry.id)}
                          className="text-[0.72rem] font-semibold px-2.5 py-1.5 rounded-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                        >
                          {reverting ? 'Reverting…' : 'Confirm'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setRevertId(null)}
                          className="text-[0.72rem] font-medium px-2 py-1.5 rounded-sm text-[var(--ink-3)] hover:bg-[var(--section)]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setRevertId(entry.id)}
                        className="flex-shrink-0 text-[0.72rem] font-semibold px-2.5 py-1.5 rounded-sm text-[var(--accent-dark)] hover:bg-[var(--section)]"
                      >
                        Revert
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              {confirmOriginal ? (
                <div>
                  <p className="text-[0.78rem] text-red-700 leading-relaxed mb-2">
                    This resets the entire site — every section, every page — back to its original launch content. It goes live immediately, not just the draft. This cannot be undone from here.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={revertingOriginal}
                      onClick={revertOriginal}
                      className="text-[0.76rem] font-semibold px-3 py-1.5 rounded-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                      {revertingOriginal ? 'Resetting…' : 'Yes, reset everything'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmOriginal(false)}
                      className="text-[0.76rem] font-medium px-3 py-1.5 rounded-sm text-[var(--ink-3)] hover:bg-[var(--section)]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmOriginal(true)}
                  className="flex items-center gap-1.5 text-[0.78rem] font-medium text-red-700 hover:text-red-800"
                >
                  <RotateCcw size={13} /> Revert to original — undo every edit ever made
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function PublishDialog({
  message,
  onMessageChange,
  error,
  onConfirm,
  onCancel,
}: {
  message: string
  onMessageChange: (v: string) => void
  error: string | null
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/40" onClick={onCancel}>
      <div
        className="w-[min(92vw,380px)] rounded-lg bg-white text-[var(--ink)] shadow-2xl p-6 normal-case tracking-normal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif-display text-[1.25rem] mb-2">Publish changes?</h2>
        <p className="text-[0.85rem] text-[var(--ink-3)] leading-relaxed mb-5">
          This makes your current edits live on the public website immediately. Visitors will see them right away.
        </p>
        <div className="mb-5">
          <label className="block text-[0.68rem] font-semibold tracking-[0.04em] uppercase text-[var(--ink-3)] mb-1">
            What changed?
          </label>
          <input
            type="text"
            autoFocus
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onConfirm() }}
            placeholder="e.g. Updated hero stats and phone number"
            className="w-full text-[0.82rem] border border-[var(--border)] rounded px-2.5 py-2 focus:outline-none focus:border-[var(--accent)]"
          />
          <p className="text-[0.7rem] text-[var(--ink-3)] mt-1">Saved as this publish's label — also used as the GitHub commit message.</p>
          {error && <p className="text-[0.72rem] text-red-600 mt-1">{error}</p>}
        </div>
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
            className="text-[0.8rem] font-semibold px-4 py-2 rounded-sm text-white bg-[var(--accent)] hover:opacity-90"
          >
            Publish now
          </button>
        </div>
      </div>
    </div>
  )
}
