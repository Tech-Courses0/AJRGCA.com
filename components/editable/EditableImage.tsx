'use client'

import { useRef, useState, type ChangeEvent } from 'react'
import { ImageIcon } from 'lucide-react'
import clsx from 'clsx'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { useEditor } from './EditorContext'

interface EditableImageProps {
  /** Dot-path into SiteContent, e.g. "team.leadership.0.photo". */
  path: string
  value: string | null
  alt: string
  className?: string
  avatar?: boolean
  placeholderLabel?: string
  /** Optional dot-path to an editable alt-text override. When set, an alt-text
   *  input appears in the hover overlay; the effective alt is this value, or
   *  the `alt` prop if empty/unset. */
  altPath?: string
  /** Suppress the built-in "Change image" hover overlay — use when an
   *  ancestor (e.g. EditableRepeater's control bar) already provides the
   *  upload trigger, so there's one hover surface per item, not two. */
  hideChangeButton?: boolean
}

export default function EditableImage({ path, value, alt, className, avatar, placeholderLabel = 'Photo', altPath, hideChangeButton }: EditableImageProps) {
  const { isEditing, getValue, setValue } = useEditor()
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Tailwind's `group-hover` variant doesn't compile under this project's
  // Turbopack dev pipeline (zero `.group` rules make it into the loaded
  // stylesheet) — tracking hover in JS state sidesteps the broken CSS variant.
  const [hovered, setHovered] = useState(false)

  const current = isEditing ? ((getValue(path) as string | null | undefined) ?? value) : value
  const src = previewUrl ?? current
  const altOverride = altPath ? (getValue(altPath) as string | undefined) : undefined
  const effectiveAlt = altOverride || alt

  if (!isEditing) {
    return src ? (
      <img src={src} alt={effectiveAlt} className={className} />
    ) : (
      <ImagePlaceholder label={placeholderLabel} avatar={avatar} className={className} />
    )
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    if (!file.type.startsWith('image/')) {
      setError('That’s not an image file.')
      e.target.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image is too large — use a file under 5 MB.')
      e.target.value = ''
      return
    }
    setPreviewUrl(URL.createObjectURL(file))
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
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
      e.target.value = ''
    }
  }

  return (
    <div
      className={clsx('relative overflow-hidden', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {src ? (
        <img src={src} alt={effectiveAlt} className="w-full h-full object-cover" />
      ) : (
        <ImagePlaceholder label={placeholderLabel} avatar={avatar} className="w-full h-full" />
      )}
      {hideChangeButton ? (
        // No overlay text/box (that's the repeater control bar's job), but
        // clicking the tile itself still opens the file picker directly —
        // one hover surface, but click-to-upload still works as everywhere else.
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Change image"
          className="absolute inset-0 cursor-pointer"
        />
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={clsx(
            'absolute inset-0 flex items-center justify-center gap-1.5 text-white text-xs font-semibold transition-all duration-150',
            hovered ? 'bg-black/45 opacity-100' : 'bg-black/0 opacity-0'
          )}
        >
          <ImageIcon size={15} aria-hidden="true" />
          {uploading ? 'Uploading…' : 'Change image'}
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {altPath && (
        <input
          type="text"
          defaultValue={altOverride ?? ''}
          placeholder="Alt text"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => setValue(altPath, e.target.value)}
          className={clsx(
            'absolute inset-x-1.5 bottom-1.5 z-10 text-[0.66rem] rounded px-2 py-1 bg-white/95 border border-[var(--border)] focus:opacity-100 transition-opacity duration-150',
            hovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
      {error && (
        <span className="absolute inset-x-0 bottom-0 z-10 bg-red-600 text-white text-[0.62rem] leading-tight px-2 py-1 text-center normal-case tracking-normal">
          {error}
        </span>
      )}
    </div>
  )
}
