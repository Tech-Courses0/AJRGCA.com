'use client'

import { useState } from 'react'
import { RotateCcw, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { useEditor } from './EditorContext'
import { THEME_PRESETS, resolveTheme, DEFAULT_THEME } from '@/lib/themes'
import type { ThemeTokens } from '@/types/content'

const TOKEN_FIELDS: { key: keyof ThemeTokens; label: string }[] = [
  { key: 'ink', label: 'Primary / Ink' },
  { key: 'accent', label: 'Gold accent' },
  { key: 'accentDark', label: 'Gold (text)' },
  { key: 'royal', label: 'Purple' },
  { key: 'royalLight', label: 'Purple (light)' },
  { key: 'cream', label: 'Canvas' },
  { key: 'ink3', label: 'Muted text' },
  { key: 'border', label: 'Borders' },
  { key: 'royalWashFrom', label: 'Hero wash (top)' },
  { key: 'royalWashTo', label: 'Hero wash (bottom)' },
]

export default function ThemePanel() {
  const { content, setValue } = useEditor()
  const [advanced, setAdvanced] = useState(false)
  if (!content) return null

  const theme = content.theme ?? DEFAULT_THEME
  const resolved = resolveTheme(theme)

  const selectPreset = (id: string) => setValue('theme', { presetId: id, tokens: {} })
  const setToken = (key: keyof ThemeTokens, value: string) =>
    setValue('theme', { presetId: theme.presetId, tokens: { ...theme.tokens, [key]: value } })
  const reset = () => setValue('theme', { ...DEFAULT_THEME, tokens: {} })

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[var(--ink-3)] mb-2.5">Preset palettes</p>
        <div className="grid grid-cols-2 gap-2">
          {THEME_PRESETS.map((p) => {
            const active = theme.presetId === p.id && Object.keys(theme.tokens ?? {}).length === 0
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPreset(p.id)}
                className={clsx(
                  'flex items-center gap-2 rounded-md border px-2.5 py-2 text-left transition-colors',
                  active ? 'border-[#3b82f6] bg-blue-50/60' : 'border-[var(--border)] hover:border-[var(--border-dark)]'
                )}
              >
                <span className="flex -space-x-1">
                  {[p.ink, p.accent, p.royalLight].map((c, i) => (
                    <span key={i} className="w-3.5 h-3.5 rounded-full border border-white" style={{ background: c }} />
                  ))}
                </span>
                <span className="text-[0.74rem] font-medium text-[var(--ink)] leading-tight">{p.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setAdvanced((a) => !a)}
          className="flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-[var(--ink-3)] hover:text-[var(--ink)]"
        >
          Advanced
          <ChevronDown size={13} className={clsx('transition-transform', advanced && 'rotate-180')} />
        </button>
        {advanced && (
          <div className="mt-3 flex flex-col gap-2">
            {TOKEN_FIELDS.map(({ key, label }) => (
              <label key={key} className="flex items-center justify-between gap-3">
                <span className="text-[0.76rem] text-[var(--ink-2)]">{label}</span>
                <span className="flex items-center gap-2">
                  <input
                    type="color"
                    value={resolved[key]}
                    onChange={(e) => setToken(key, e.target.value)}
                    className="w-7 h-7 rounded border border-[var(--border)] bg-transparent cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={resolved[key]}
                    onChange={(e) => setToken(key, e.target.value)}
                    className="w-[74px] text-[0.72rem] font-mono border border-[var(--border)] rounded px-1.5 py-1 focus:outline-none focus:border-[var(--accent)]"
                  />
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={reset}
        className="flex items-center justify-center gap-1.5 text-[0.74rem] font-medium text-[var(--ink-3)] border border-[var(--border)] rounded-md py-2 hover:bg-[var(--section)] hover:text-[var(--ink)]"
      >
        <RotateCcw size={13} /> Reset to brand default
      </button>
    </div>
  )
}
