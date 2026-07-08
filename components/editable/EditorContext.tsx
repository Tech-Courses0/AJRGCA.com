'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { getPath, setPath } from '@/lib/objectPath'
import type { SiteContent } from '@/types/content'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface EditorContextValue {
  isEditing: boolean
  content: SiteContent
  getValue: (path: string) => unknown
  setValue: (path: string, value: unknown) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  saveStatus: SaveStatus
  publish: () => Promise<void>
  publishing: boolean
  published: boolean
  discardDraft: () => Promise<void>
}

const EditorContext = createContext<EditorContextValue | null>(null)

/** Editable* components call this; outside a provider (the public site) it
 *  reports isEditing: false and callers fall back to their static `value` prop. */
export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext)
  if (ctx) return ctx
  return {
    isEditing: false,
    content: null as unknown as SiteContent,
    getValue: () => undefined,
    setValue: () => {},
    undo: () => {},
    redo: () => {},
    canUndo: false,
    canRedo: false,
    saveStatus: 'idle',
    publish: async () => {},
    publishing: false,
    published: false,
    discardDraft: async () => {},
  }
}

const AUTOSAVE_DELAY_MS = 800

export function EditorProvider({ initialContent, children }: { initialContent: SiteContent; children: ReactNode }) {
  const [history, setHistory] = useState<SiteContent[]>([initialContent])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const content = history[historyIndex]

  const scheduleAutosave = useCallback((next: SiteContent) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSaveStatus('saving')
    saveTimer.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/admin/content', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(next),
        })
        setSaveStatus(res.ok ? 'saved' : 'error')
      } catch {
        setSaveStatus('error')
      }
    }, AUTOSAVE_DELAY_MS)
  }, [])

  const pushContent = useCallback((next: SiteContent) => {
    setHistory((prev) => {
      const truncated = prev.slice(0, historyIndex + 1)
      return [...truncated, next]
    })
    setHistoryIndex((i) => i + 1)
    scheduleAutosave(next)
  }, [historyIndex, scheduleAutosave])

  const setValue = useCallback((path: string, value: unknown) => {
    pushContent(setPath(content, path, value))
  }, [content, pushContent])

  const getValue = useCallback((path: string) => getPath(content, path), [content])

  const undo = useCallback(() => {
    setHistoryIndex((i) => {
      const next = Math.max(0, i - 1)
      if (next !== i) scheduleAutosave(history[next])
      return next
    })
  }, [history, scheduleAutosave])

  const redo = useCallback(() => {
    setHistoryIndex((i) => {
      const next = Math.min(history.length - 1, i + 1)
      if (next !== i) scheduleAutosave(history[next])
      return next
    })
  }, [history, scheduleAutosave])

  const publish = useCallback(async () => {
    setPublishing(true)
    try {
      const res = await fetch('/api/admin/publish', { method: 'POST' })
      if (res.ok) {
        setPublished(true)
        setTimeout(() => setPublished(false), 2500)
      }
    } finally {
      setPublishing(false)
    }
  }, [])

  // Reverts the draft to the live version, then reloads so the editor re-seeds
  // from the freshly-reset draft (in-memory undo history can't hold a whole reset).
  const discardDraft = useCallback(async () => {
    const res = await fetch('/api/admin/discard', { method: 'POST' })
    if (res.ok) window.location.reload()
  }, [])

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey
      if (!mod || e.key.toLowerCase() !== 'z') return
      e.preventDefault()
      if (e.shiftKey) redo()
      else undo()
    }
    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [undo, redo])

  const value = useMemo<EditorContextValue>(() => ({
    isEditing: true,
    content,
    getValue,
    setValue,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    saveStatus,
    publish,
    publishing,
    published,
    discardDraft,
  }), [content, getValue, setValue, undo, redo, historyIndex, history.length, saveStatus, publish, publishing, published, discardDraft])

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}
