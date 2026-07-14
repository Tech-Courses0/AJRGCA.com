import { Resend } from 'resend'
import { google } from 'googleapis'
import { getGoogleAuthorizedClient } from './google-calendar'

type SendMailArgs = {
  to: string | string[]
  subject: string
  text: string
  replyTo?: string
}

function encodedHeader(value: string) {
  return `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`
}

async function sendWithGoogle({ to, subject, text, replyTo }: SendMailArgs): Promise<string | null> {
  const auth = await getGoogleAuthorizedClient()
  if (!auth) return null

  const oauth = google.oauth2({ version: 'v2', auth })
  const profile = await oauth.userinfo.get()
  const connectedEmail = profile.data.email
  if (!connectedEmail) throw new Error('Connected Google account has no email address.')

  const recipients = Array.isArray(to) ? to : [to]
  const from = process.env.MAIL_FROM || `AJRG and Associates <${connectedEmail}>`
  const headers = [
    `From: ${from}`,
    `To: ${recipients.join(', ')}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${encodedHeader(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ]
  const raw = `${headers.join('\r\n')}\r\n\r\n${Buffer.from(text, 'utf8').toString('base64')}`
  const gmail = google.gmail({ version: 'v1', auth })
  const { data } = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: Buffer.from(raw, 'utf8').toString('base64url') },
  })
  return data.id ?? null
}

async function sendWithResend({ to, subject, text, replyTo }: SendMailArgs): Promise<string | null> {
  const from = process.env.RESEND_FROM || 'AJRG and Associates <onboarding@resend.dev>'
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data, error } = await resend.emails.send({ from, to, replyTo, subject, text })
  if (error) {
    console.error('[mail] send failed:', error)
    throw new Error('Failed to send email.')
  }
  return data?.id ?? null
}

/** Gmail is primary; a verified Resend sender is the independent fallback. */
export async function sendMail(args: SendMailArgs): Promise<string | null> {
  const failures: string[] = []

  try {
    const googleMessageId = await sendWithGoogle(args)
    if (googleMessageId) return googleMessageId
  } catch (error) {
    console.error('[mail][google] send failed:', error)
    failures.push('Google')
  }

  if (process.env.RESEND_API_KEY) {
    try {
      return await sendWithResend(args)
    } catch (error) {
      console.error('[mail][resend] fallback failed:', error)
      failures.push('Resend')
    }
  }

  if (process.env.NODE_ENV !== 'production' && failures.length === 0) {
    console.log('[mail][dev] would send:', { to: args.to, subject: args.subject })
    return null
  }

  throw new Error(`No email provider could deliver the message. Providers attempted: ${failures.join(', ') || 'none'}.`)
}
