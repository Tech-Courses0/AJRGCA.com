'use client'

import { Fragment, useEffect, useRef, useState, type ChangeEvent, type ReactNode } from 'react'
import { Copy, Trash2, Plus, GripVertical, ChevronUp, ChevronDown, ImageIcon } from 'lucide-react'
import clsx from 'clsx'
import { useEditor } from './EditorContext'

interface EditableRepeaterProps<T> {
  /** Dot-path into SiteContent for this array, e.g. "services" or "layout.home". */
  path: string
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  newItem: () => T
  /** Static classes for every item, or a per-item function (e.g. bento grid
   *  col/row spans that differ per card and must travel with the item on reorder). */
  itemClassName?: string | ((item: T, index: number) => string)
  addLabel?: string
  /** Hide the trailing "+ Add" control (e.g. the section list — sections are
   *  fixed; only their inner items get an add). */
  allowAdd?: boolean
  /** Hide the per-item Duplicate control (duplicating a whole section would be
   *  another way to "add a section"). */
  allowDuplicate?: boolean
  /** When items carry a photo, return the dot-path to that item's image field
   *  and the control bar grows an upload icon that writes straight to it.
   *  Pairs with `<EditableImage hideChangeButton>` in `renderItem` so there's
   *  one hover surface per item instead of two competing overlays. */
  imageUploadPath?: (item: T, index: number) => string
}

/** Renders `items.map(renderItem)` untouched when not editing (identical to
 *  the plain array-map every card grid on this site already uses). Inside the
 *  editor, wraps each item with duplicate/delete/reorder controls and appends
 *  an "add" control — driven off `path` in the shared draft content. */
export default function EditableRepeater<T>({
  path,
  items,
  renderItem,
  newItem,
  itemClassName,
  addLabel = 'Add',
  allowAdd = true,
  allowDuplicate = true,
  imageUploadPath,
}: EditableRepeaterProps<T>) {
  const { isEditing, getValue, setValue } = useEditor()
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  // Item selection now drives the control bar (click to select, click outside
  // to deselect) instead of CSS hover — Tailwind's `group`/`group-hover`
  // variants don't compile under this project's Turbopack dev pipeline
  // (verified: zero `.group` rules exist in the loaded stylesheet), and even
  // a JS-hover version was fragile for items whose content is a real link
  // (the click that reveals the bar could also fire navigation). Click-select
  // sidesteps both problems at once.
  // Tracks the selected item's stable id, not its array position — keying by
  // position meant the control bar stayed glued to a grid slot instead of
  // following the item after a move/reorder (e.g. move "Approach" up and the
  // bar stays at position 3, now showing over "Services").
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  // `draggable` only arms while the mouse is down on the grip handle — making
  // the whole item draggable unconditionally fought native text selection
  // inside any EditableText/input in the item (a click-drag to select text
  // could get hijacked as a drag gesture instead), which is what made the
  // hover controls feel flaky.
  const [armedIndex, setArmedIndex] = useState<number | null>(null)
  // Stable per-item keys, independent of array position. EditableText sets its
  // DOM textContent imperatively once per mount and never re-syncs it from
  // props (so typing doesn't fight React's re-render / cursor jumps). Keying
  // list items by index means React reuses the same DOM node across a
  // reorder, so a moved item's node stays put and keeps showing its old text —
  // items visually don't move even though the underlying array did. Keying by
  // a stable id makes React actually move the DOM node when the array
  // reorders, which is what "move up/down" is supposed to look like.
  const idsRef = useRef<string[]>([])

  useEffect(() => {
    if (selectedId === null) return
    function onDocMouseDown(e: MouseEvent) {
      const i = idsRef.current.indexOf(selectedId as string)
      const el = itemRefs.current[i]
      if (el && !el.contains(e.target as Node)) setSelectedId(null)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [selectedId])

  if (!isEditing) {
    return <>{items.map((item, i) => <Fragment key={i}>{renderItem(item, i)}</Fragment>)}</>
  }

  const current = (getValue(path) as T[] | undefined) ?? items
  while (idsRef.current.length < current.length) idsRef.current.push(crypto.randomUUID())

  function commit(next: T[]) {
    setValue(path, next)
  }

  function duplicate(i: number) {
    const next = [...current]
    next.splice(i + 1, 0, structuredClone(current[i]))
    idsRef.current.splice(i + 1, 0, crypto.randomUUID())
    commit(next)
  }

  function remove(i: number) {
    commit(current.filter((_, idx) => idx !== i))
    idsRef.current.splice(i, 1)
    setSelectedId(null)
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= current.length) return
    const next = [...current]
    ;[next[i], next[j]] = [next[j], next[i]]
    ;[idsRef.current[i], idsRef.current[j]] = [idsRef.current[j], idsRef.current[i]]
    commit(next)
  }

  function onDrop(i: number) {
    if (dragIndex === null || dragIndex === i) return
    const next = [...current]
    const [moved] = next.splice(dragIndex, 1)
    next.splice(i, 0, moved)
    const [movedId] = idsRef.current.splice(dragIndex, 1)
    idsRef.current.splice(i, 0, movedId)
    commit(next)
    setDragIndex(null)
  }

  return (
    <>
      {current.map((item, i) => (
        <div
          key={idsRef.current[i]}
          ref={(el) => { itemRefs.current[i] = el }}
          className={clsx('relative', typeof itemClassName === 'function' ? itemClassName(item, i) : itemClassName)}
          draggable={armedIndex === i}
          onClickCapture={(e) => {
            // Selecting an item (rather than a link inside it) must never
            // fire real navigation — this only affects nav-style repeaters
            // whose renderItem wraps content in a <Link>/<a>.
            if ((e.target as HTMLElement).closest('a')) e.preventDefault()
          }}
          onClick={() => setSelectedId(idsRef.current[i])}
          onDragStart={() => setDragIndex(i)}
          onDragEnd={() => setArmedIndex(null)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(i)}
        >
          {/* Hangs off the item's own bottom edge, horizontally centered
              under it, rather than inset over the item's content. */}
          <div
            className={clsx(
              'absolute top-full left-1/2 -translate-x-1/2 z-20 flex items-center gap-0.5 focus-within:opacity-100 transition-opacity duration-150 bg-white border border-[#3b82f6]/40 rounded-md shadow-md p-0.5',
              selectedId === idsRef.current[i] ? 'opacity-100' : 'opacity-0'
            )}
          >
            <button type="button" title="Move up" onClick={() => move(i, -1)} className="p-1 hover:bg-blue-50 rounded text-[var(--ink-3)]">
              <ChevronUp size={13} />
            </button>
            <button type="button" title="Move down" onClick={() => move(i, 1)} className="p-1 hover:bg-blue-50 rounded text-[var(--ink-3)]">
              <ChevronDown size={13} />
            </button>
            {imageUploadPath && <ImageUploadButton path={imageUploadPath(item, i)} />}
            {allowDuplicate && (
              <button type="button" title="Duplicate" onClick={() => duplicate(i)} className="p-1 hover:bg-blue-50 rounded text-[var(--ink-3)]">
                <Copy size={13} />
              </button>
            )}
            <button type="button" title="Delete" onClick={() => remove(i)} className="p-1 hover:bg-red-50 rounded text-red-600">
              <Trash2 size={13} />
            </button>
            <span
              title="Drag to reorder"
              className="p-1 cursor-grab text-[var(--ink-3)]"
              onMouseDown={() => setArmedIndex(i)}
              onMouseUp={() => setArmedIndex(null)}
            >
              <GripVertical size={13} />
            </span>
          </div>
          <div
            className={clsx(
              'outline outline-1 outline-dashed rounded-sm',
              selectedId === idsRef.current[i] ? 'outline-[#3b82f6]/40' : 'outline-transparent'
            )}
          >
            {renderItem(item, i)}
          </div>
        </div>
      ))}
      {allowAdd && (
        <button
          type="button"
          onClick={() => { idsRef.current.push(crypto.randomUUID()); commit([...current, newItem()]) }}
          className={clsx(
            'flex items-center justify-center gap-1.5 border-2 border-dashed border-[#3b82f6]/30 text-[#3b82f6] text-sm font-medium rounded-md py-4 hover:bg-blue-50/60 transition-colors',
            typeof itemClassName === 'function' ? undefined : itemClassName
          )}
        >
          <Plus size={15} /> {addLabel}
        </button>
      )}
    </>
  )
}

/** Self-contained upload icon for the repeater's control bar — its own hidden
 *  input/state so it can live in a variable-length `.map` without breaking
 *  the rules of hooks (a shared hook called once per item would). */
function ImageUploadButton({ path }: { path: string }) {
  const { setValue } = useEditor()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    if (!file.type.startsWith('image/')) {
      setError('Not an image file.')
      e.target.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image too large — max 5MB.')
      e.target.value = ''
      return
    }
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
      if (res.ok) {
        const { url } = await res.json()
        setValue(path, url)
      } else {
        const { error: msg } = await res.json().catch(() => ({ error: 'Upload failed.' }))
        setError(msg ?? 'Upload failed.')
      }
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <>
      <button
        type="button"
        title={error ?? 'Upload image'}
        onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
        className={clsx('p-1 rounded', error ? 'text-red-600' : 'hover:bg-blue-50 text-[var(--ink-3)]')}
      >
        {uploading ? (
          <span className="block w-[13px] h-[13px] border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <ImageIcon size={13} />
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </>
  )
}
