'use client'

import { useRef, useState, type ChangeEvent } from 'react'
import { Upload, Plus, Trash2 } from 'lucide-react'
import { useEditor } from './EditorContext'
import type { SocialLink } from '@/types/content'

/** Labeled text input bound to a content dot-path. */
function Field({ label, path, placeholder }: { label: string; path: string; placeholder?: string }) {
  const { getValue, setValue } = useEditor()
  const value = (getValue(path) as string | null | undefined) ?? ''
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[0.68rem] font-semibold tracking-[0.04em] uppercase text-[var(--ink-3)]">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(path, e.target.value)}
        className="text-[0.82rem] border border-[var(--border)] rounded px-2 py-1.5 focus:outline-none focus:border-[var(--accent)]"
      />
    </label>
  )
}

/** Multiline variant of Field — for long legal copy (disclaimer, DPDP note). */
function TextAreaField({ label, path, hint }: { label: string; path: string; hint?: string }) {
  const { getValue, setValue } = useEditor()
  const value = (getValue(path) as string | null | undefined) ?? ''
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[0.68rem] font-semibold tracking-[0.04em] uppercase text-[var(--ink-3)]">{label}</span>
      <textarea
        value={value}
        rows={5}
        onChange={(e) => setValue(path, e.target.value)}
        className="text-[0.82rem] leading-relaxed border border-[var(--border)] rounded px-2 py-1.5 focus:outline-none focus:border-[var(--accent)] resize-y"
      />
      {hint && <span className="text-[0.66rem] text-[var(--ink-4)]">{hint}</span>}
    </label>
  )
}

/** Upload control bound to a content path holding an image URL (logo/favicon). */
function UploadField({ label, path, hint }: { label: string; path: string; hint?: string }) {
  const { getValue, setValue } = useEditor()
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const url = (getValue(path) as string | null | undefined) ?? null

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
      if (res.ok) setValue(path, (await res.json()).url)
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[0.68rem] font-semibold tracking-[0.04em] uppercase text-[var(--ink-3)]">{label}</span>
      <div className="flex items-center gap-2">
        {url && <img src={url} alt="" className="w-8 h-8 object-contain border border-[var(--border)] rounded bg-white" />}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 text-[0.74rem] border border-[var(--border)] rounded px-2.5 py-1.5 hover:bg-[var(--section)]"
        >
          <Upload size={13} /> {busy ? 'Uploading…' : url ? 'Replace' : 'Upload'}
        </button>
        {url && (
          <button type="button" onClick={() => setValue(path, null)} className="text-[0.72rem] text-red-600 hover:underline">
            Remove
          </button>
        )}
      </div>
      {hint && <span className="text-[0.66rem] text-[var(--ink-4)]">{hint}</span>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return <p className="text-[0.7rem] font-bold tracking-[0.08em] uppercase text-[var(--accent-dark)] mt-1">{children}</p>
}

export default function SettingsPanel() {
  const { content, getValue, setValue } = useEditor()
  if (!content) return null

  const social = (getValue('site.social') as SocialLink[] | undefined) ?? []
  const setSocial = (next: SocialLink[]) => setValue('site.social', next)

  return (
    <div className="flex flex-col gap-4">
      <SectionLabel>Brand</SectionLabel>
      <Field label="Company name" path="site.name" />
      <Field label="Legal name" path="site.legalName" />
      <Field label="Tagline" path="site.tagline" />
      <Field label="Wordmark" path="site.wordmark" />
      <UploadField label="Logo image" path="site.logoImage" hint="Overrides the text wordmark when set." />
      <Field label="Logo alt text" path="site.logoAlt" placeholder={(getValue('site.wordmark') as string) || 'AJRGCA'} />
      <UploadField label="Favicon" path="site.favicon" hint="Shown in the browser tab." />

      <SectionLabel>Contact</SectionLabel>
      <Field label="Email" path="site.email" />
      <Field label="Phone" path="site.phone" />
      <Field label="WhatsApp" path="site.whatsapp" />

      <SectionLabel>Registered office</SectionLabel>
      <Field label="Address line 1" path="site.registeredOffice.line1" />
      <Field label="Address line 2" path="site.registeredOffice.line2" />
      <Field label="City" path="site.registeredOffice.city" />
      <Field label="State" path="site.registeredOffice.state" />
      <Field label="PIN" path="site.registeredOffice.pin" />

      <SectionLabel>Branch office</SectionLabel>
      <Field label="Address line 1" path="site.branchOffice.line1" />
      <Field label="Address line 2" path="site.branchOffice.line2" />
      <Field label="City" path="site.branchOffice.city" />
      <Field label="State" path="site.branchOffice.state" />
      <Field label="PIN" path="site.branchOffice.pin" />

      <SectionLabel>Firm details</SectionLabel>
      <Field label="Firm Registration No. (FRN)" path="site.frn" />
      <Field label="Cities line" path="site.citiesLine" />

      <SectionLabel>Legal</SectionLabel>
      <TextAreaField label="Professional disclaimer" path="site.disclaimer" hint="Shown in the footer. Controlled only here." />
      <TextAreaField label="Data protection (DPDP) note" path="site.dpdpNote" hint="Shown in the footer. Controlled only here." />

      <SectionLabel>Social links</SectionLabel>
      <div className="flex flex-col gap-2">
        {social.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <input
              type="text"
              value={s.platform}
              placeholder="platform"
              onChange={(e) => setSocial(social.map((x, j) => (j === i ? { ...x, platform: e.target.value } : x)))}
              className="w-[84px] text-[0.74rem] border border-[var(--border)] rounded px-1.5 py-1 focus:outline-none focus:border-[var(--accent)]"
            />
            <input
              type="text"
              value={s.url}
              placeholder="https://…"
              onChange={(e) => setSocial(social.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))}
              className="flex-1 text-[0.74rem] border border-[var(--border)] rounded px-1.5 py-1 focus:outline-none focus:border-[var(--accent)]"
            />
            <button type="button" onClick={() => setSocial(social.filter((_, j) => j !== i))} className="p-1 text-red-600 hover:bg-red-50 rounded">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSocial([...social, { platform: 'linkedin', url: '' }])}
          className="flex items-center justify-center gap-1.5 text-[0.74rem] text-[#3b82f6] border border-dashed border-[#3b82f6]/30 rounded py-1.5 hover:bg-blue-50/60"
        >
          <Plus size={13} /> Add social link
        </button>
      </div>

      <p className="text-[0.68rem] text-[var(--ink-4)] leading-relaxed mt-1">
        Platform names accept: linkedin, twitter, facebook, instagram, youtube, github, mail, globe.
      </p>
    </div>
  )
}
