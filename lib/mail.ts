import { google } from 'googleapis'
import { site } from '@/config/site'
import { getAuthorizedGoogleClient } from './google-calendar'

type SendMailArgs = {
  to: string | string[]
  subject: string
  text: string
  replyTo?: string
}

export function getDestinationEmail() {
  return process.env.DESTINATION_EMAIL || process.env.CONTACT_TO_EMAIL || site.deliveryEmail
}

function encodeHeader(value: string) {
  return `=?UTF-8?B?${Buffer.from(value, 'utf8').toString('base64')}?=`
}

export async function sendMail({ to, subject, text, replyTo }: SendMailArgs): Promise<string> {
  const auth = await getAuthorizedGoogleClient()
  if (!auth) {
    throw new Error('Google is not connected. Connect it in the site editor before accepting submissions.')
  }

  const recipients = Array.isArray(to) ? to : [to]
  const lines = [
    `To: ${recipients.join(', ')}`,
    `Subject: ${encodeHeader(subject)}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(text, 'utf8').toString('base64'),
  ]
  const raw = Buffer.from(lines.join('\r\n'), 'utf8').toString('base64url')
  const gmail = google.gmail({ version: 'v1', auth })

  try {
    const { data } = await gmail.users.messages.send({ userId: 'me', requestBody: { raw } })
    if (!data.id) throw new Error('Gmail did not return a message ID.')
    return data.id
  } catch (error) {
    const code = (error as { code?: number }).code
    if (code === 401 || code === 403) {
      throw new Error('Gmail permission is missing. Reconnect Google in the site editor, then try again.')
    }
    throw error
  }
}
