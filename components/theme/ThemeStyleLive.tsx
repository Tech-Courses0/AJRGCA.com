'use client'

import { useEditor } from '@/components/editable/EditorContext'
import { resolveTheme, themeToCss } from '@/lib/themes'

/**
 * Editor-only companion to ThemeStyle: renders the same `:root` override from
 * the **draft** theme so preset clicks and color-picker drags reskin the
 * canvas live (updates reactively via EditorContext). Public pages use the
 * server-rendered ThemeStyle instead.
 */
export default function ThemeStyleLive() {
  const { content } = useEditor()
  if (!content) return null
  const css = themeToCss(resolveTheme(content.theme))
  return <style id="ajrg-theme-live" dangerouslySetInnerHTML={{ __html: css }} />
}
