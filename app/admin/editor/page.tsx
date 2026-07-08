import { getDraftContent } from '@/lib/content'
import EditorShell from './EditorShell'

export default async function EditorPage() {
  const content = await getDraftContent()
  return <EditorShell initialContent={content} />
}
