import { Resend } from 'resend'

type SendMailArgs = {
  to: string | string[]
  subject: string
  text: string
  replyTo?: string
}

export async function sendMail({ to, subject, text, replyTo }: SendMailArgs): Promise<string | null> {
  const from = process.env.RESEND_FROM || 'AJRG and Associates <onboarding@resend.dev>'

  if (!process.env.RESEND_API_KEY) {
    console.log('[mail][dev] would send:', { to, from, subject, text })
    return null
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data, error } = await resend.emails.send({ from, to, replyTo, subject, text })
  if (error) {
    console.error('[mail] send failed:', error)
    throw new Error('Failed to send email.')
  }
  return data?.id ?? null
}
