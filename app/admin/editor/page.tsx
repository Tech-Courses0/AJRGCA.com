import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getDraftContent } from '@/lib/content'
import { isEditorSession } from '@/lib/editor-auth'
import EditorShell from './EditorShell'

export const dynamic = 'force-dynamic'

export default async function EditorPage() {
  const cookieStore = await cookies()
  const authenticated = await isEditorSession(
    cookieStore.get('ajrg_admin')?.value,
    process.env.EDITOR_SECRET,
  )
  if (!authenticated) redirect('/admin/login')

  const content = await getDraftContent()
  return <EditorShell initialContent={content} />
}
