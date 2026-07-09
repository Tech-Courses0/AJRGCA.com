/** Mirrors published site content into the GitHub repo as a real, labeled
 *  commit — gives content changes actual git history (diffs, rollback via
 *  git) instead of just an overwritten DB row. Optional: no-ops if
 *  GITHUB_TOKEN/GITHUB_REPO aren't set, same fallback pattern as DATABASE_URL. */

const FILE_PATH = 'content/site-content.json'

export async function commitContentToGithub(content: unknown, message: string): Promise<void> {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO // "owner/name"
  if (!token || !repo) return

  const api = `https://api.github.com/repos/${repo}/contents/${FILE_PATH}`
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
  }

  const existing = await fetch(api, { headers }).then((r) => (r.ok ? r.json() : null))

  const res = await fetch(api, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
      sha: existing?.sha,
    }),
  })

  if (!res.ok) throw new Error(`GitHub commit failed: ${res.status} ${await res.text()}`)
}
