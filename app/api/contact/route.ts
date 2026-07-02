import { NextResponse } from 'next/server'
import { site } from '@/config/site'
import { getSql } from '@/lib/db'
import { sendMail } from '@/lib/resend'
import { createBooking } from '@/lib/bookings'

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

  const origin = new URL(req.url).origin

  try {
    if (body.formType === 'consultation') {
      await createBooking(
        {
          name: body.name,
          organisation: body.organisation,
          email: body.email,
          phone: body.phone,
          businessType: body.businessType,
          serviceArea: body.serviceArea,
          mode: body.mode,
          date: body.date,
          time: body.time,
          message: body.message,
        },
        origin
      )
      return NextResponse.json({ ok: true })
    }

    const subject = `Website enquiry — ${body.name}`
    const text = `Name: ${body.name}\nOrganisation: ${body.organisation || ''}\nEmail: ${body.email}\n\n${body.message}`
    const resendMessageId = await sendMail({ to: process.env.CONTACT_TO_EMAIL || site.email, replyTo: body.email, subject, text })

    const sql = getSql()
    if (sql) {
      try {
        await sql`
          insert into submissions (form_type, name, organisation, email, message, raw, resend_message_id)
          values ('contact', ${body.name}, ${body.organisation || null}, ${body.email}, ${body.message}, ${JSON.stringify(body)}, ${resendMessageId})
        `
      } catch (err) {
        console.error('[contact] Postgres insert failed:', err)
      }
    } else {
      console.log('[contact][dev] would log submission to Postgres:', body)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] send failed:', err)
    return NextResponse.json({ ok: false, error: 'Failed to send. Please email us directly.' }, { status: 502 })
  }
}
