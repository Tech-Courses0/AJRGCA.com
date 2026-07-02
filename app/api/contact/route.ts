import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { neon } from '@neondatabase/serverless'
import { site } from '@/config/site'

type ContactPayload = {
  formType: 'contact'
  name: string
  organisation?: string
  email: string
  message: string
  website?: string // honeypot
}

type ConsultationPayload = {
  formType: 'consultation'
  name: string
  organisation?: string
  email: string
  phone: string
  businessType?: string
  serviceArea?: string
  mode?: string
  date?: string
  time?: string
  message: string
  consent: boolean
  website?: string // honeypot
}

type Payload = ContactPayload | ConsultationPayload

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value)
}

function validate(body: Payload): string | null {
  if (!body.name?.trim()) return 'Name is required.'
  if (!body.email?.trim() || !isEmail(body.email)) return 'A valid email is required.'
  if (!body.message?.trim()) return 'Message is required.'
  if (body.formType === 'consultation') {
    if (!body.phone?.trim()) return 'Phone is required.'
    if (body.consent !== true) return 'Consent is required.'
  }
  return null
}

function buildEmail(body: Payload) {
  if (body.formType === 'consultation') {
    const subject = `Consultation request — ${body.name}`
    const text = [
      `Name: ${body.name}`,
      `Organisation: ${body.organisation || ''}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone}`,
      `Business type: ${body.businessType || ''}`,
      `Service area: ${body.serviceArea || ''}`,
      `Preferred mode: ${body.mode || ''}`,
      `Preferred date: ${body.date || ''}`,
      `Preferred time: ${body.time || ''}`,
      '',
      'Requirement:',
      body.message,
    ].join('\n')
    return { subject, text }
  }
  const subject = `Website enquiry — ${body.name}`
  const text = `Name: ${body.name}\nOrganisation: ${body.organisation || ''}\nEmail: ${body.email}\n\n${body.message}`
  return { subject, text }
}

function getSql() {
  if (!process.env.DATABASE_URL) return null
  return neon(process.env.DATABASE_URL)
}

export async function POST(req: Request) {
  let body: Payload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot — bots that fill this get a success response with no side effects.
  if (body.website?.trim()) {
    return NextResponse.json({ ok: true })
  }

  const validationError = validate(body)
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 400 })
  }

  const { subject, text } = buildEmail(body)
  const to = process.env.CONTACT_TO_EMAIL || site.email
  const from = process.env.RESEND_FROM || 'AJRG and Associates <onboarding@resend.dev>'

  let resendMessageId: string | null = null
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: body.email,
      subject,
      text,
    })
    if (error) {
      console.error('[contact] Resend send failed:', error)
      return NextResponse.json({ ok: false, error: 'Failed to send. Please email us directly.' }, { status: 502 })
    }
    resendMessageId = data?.id ?? null
  } else {
    console.log('[contact][dev] would send email:', { to, from, subject, text })
  }

  const sql = getSql()
  if (sql) {
    try {
      await sql`
        insert into submissions (form_type, name, organisation, email, phone, message, raw, resend_message_id)
        values (
          ${body.formType},
          ${body.name},
          ${body.organisation || null},
          ${body.email},
          ${body.formType === 'consultation' ? body.phone : null},
          ${body.message},
          ${JSON.stringify(body)},
          ${resendMessageId}
        )
      `
    } catch (err) {
      console.error('[contact] Postgres insert failed:', err)
    }
  } else {
    console.log('[contact][dev] would log submission to Postgres:', body)
  }

  return NextResponse.json({ ok: true })
}
