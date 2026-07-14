const SESSION_LIFETIME_MS = 8 * 60 * 60 * 1000
const TOKEN_VERSION = 'v1'

function encodeBase64Url(bytes: ArrayBuffer): string {
  let binary = ''
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

async function signature(secret: string, value: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return encodeBase64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(value)))
}

function equal(left: string, right: string): boolean {
  if (left.length !== right.length) return false
  let mismatch = 0
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }
  return mismatch === 0
}

export async function createEditorSession(secret: string): Promise<string> {
  const payload = `${TOKEN_VERSION}.${Date.now() + SESSION_LIFETIME_MS}`
  return `${payload}.${await signature(secret, payload)}`
}

export async function isEditorSession(token: string | undefined, secret: string | undefined): Promise<boolean> {
  if (!token || !secret) return false
  const parts = token.split('.')
  if (parts.length !== 3 || parts[0] !== TOKEN_VERSION) return false

  const expiresAt = Number(parts[1])
  const now = Date.now()
  if (!Number.isFinite(expiresAt) || expiresAt <= now || expiresAt > now + SESSION_LIFETIME_MS + 60_000) {
    return false
  }

  const payload = `${parts[0]}.${parts[1]}`
  return equal(parts[2], await signature(secret, payload))
}
