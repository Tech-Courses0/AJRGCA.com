import { getLiveContent } from '@/lib/content'
import { resolveTheme, themeToCss, DEFAULT_THEME } from '@/lib/themes'
import type { ThemeContent } from '@/types/content'

/**
 * Server component mounted in the root layout. Reads the live theme and emits
 * a `:root { … }` override that reskins the whole site (everything already
 * runs off the --* vars in globals.css). Renders nothing when the theme is the
 * untouched default preset, so an un-themed site ships zero extra CSS.
 *
 * `theme` may be passed in (layout already fetched live content) to avoid a
 * second DB read; otherwise it fetches its own.
 */
export default async function ThemeStyle({ theme: themeProp }: { theme?: ThemeContent }) {
  const theme = themeProp ?? (await getLiveContent()).theme

  const isDefault =
    (theme?.presetId ?? 'royal') === DEFAULT_THEME.presetId &&
    Object.keys(theme?.tokens ?? {}).length === 0
  if (isDefault) return null

  const css = themeToCss(resolveTheme(theme))
  return <style id="ajrg-theme" dangerouslySetInnerHTML={{ __html: css }} />
}
