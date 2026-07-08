import type { ThemeTokens, ThemeContent } from '@/types/content'

/**
 * Curated, on-brand theme presets. `royal` reproduces the exact CSS-var
 * defaults in app/globals.css (the untouched Royal Minimalist palette); the
 * others are contrast-checked alternatives the owner can switch to in one
 * click. Advanced per-token overrides layer on top of whichever preset is
 * selected (see resolveTheme).
 */
export interface ThemePreset extends ThemeTokens {
  id: string
  label: string
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'royal',
    label: 'Royal (default)',
    ink: '#221042',
    ink3: '#6A5E83',
    accent: '#C5A059',
    accentDark: '#896A2E',
    royal: '#301850',
    royalLight: '#683078',
    cream: '#F4F2F8',
    border: '#E4E2EA',
    royalWashFrom: '#190A36',
    royalWashTo: '#4A2472',
  },
  {
    id: 'slate',
    label: 'Slate Blue',
    ink: '#12213A',
    ink3: '#5A6577',
    accent: '#C5A059',
    accentDark: '#7E6A34',
    royal: '#1B3350',
    royalLight: '#35597F',
    cream: '#F1F4F8',
    border: '#DEE3EA',
    royalWashFrom: '#0C1A30',
    royalWashTo: '#2A4A73',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    ink: '#0F2A22',
    ink3: '#4F6B60',
    accent: '#C9A24B',
    accentDark: '#7C6224',
    royal: '#123C30',
    royalLight: '#2C6B54',
    cream: '#F0F5F1',
    border: '#DBE7DF',
    royalWashFrom: '#08201A',
    royalWashTo: '#1E5741',
  },
  {
    id: 'charcoal',
    label: 'Charcoal Gold',
    ink: '#1C1C20',
    ink3: '#5E5E68',
    accent: '#C9A24B',
    accentDark: '#7C6224',
    royal: '#2A2A30',
    royalLight: '#48484F',
    cream: '#F4F4F5',
    border: '#E3E3E6',
    royalWashFrom: '#141416',
    royalWashTo: '#3A3A42',
  },
]

export const DEFAULT_THEME: ThemeContent = { presetId: 'royal', tokens: {} }

export function getPreset(presetId: string): ThemePreset {
  return THEME_PRESETS.find((p) => p.id === presetId) ?? THEME_PRESETS[0]
}

/** Resolve a ThemeContent to a full, concrete token set: preset then overrides. */
export function resolveTheme(theme: ThemeContent | undefined): ThemeTokens {
  const preset = getPreset(theme?.presetId ?? 'royal')
  const { id, label, ...tokens } = preset
  return { ...tokens, ...(theme?.tokens ?? {}) }
}

/** Map resolved tokens → the CSS custom properties in globals.css. */
export function themeToCssVars(t: ThemeTokens): Record<string, string> {
  return {
    '--ink': t.ink,
    '--ink-3': t.ink3,
    '--accent': t.accent,
    '--accent-dark': t.accentDark,
    '--royal': t.royal,
    '--royal-light': t.royalLight,
    '--cream': t.cream,
    '--border': t.border,
    '--royal-wash': `linear-gradient(140deg, ${t.royalWashFrom} 0%, ${t.royal} 45%, ${t.royalLight} 80%, ${t.royalWashTo} 100%)`,
  }
}

/** Serialize tokens to a `:root { … }` CSS string for a <style> tag. */
export function themeToCss(t: ThemeTokens): string {
  const vars = themeToCssVars(t)
  const body = Object.entries(vars)
    .map(([k, v]) => `${k}:${v};`)
    .join('')
  return `:root{${body}}`
}
