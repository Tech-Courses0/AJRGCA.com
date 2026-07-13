import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { getDestinationEmail, sendMail } from '@/lib/mail'
import { createBooking } from '@/lib/bookings'
import { validateFormPayload, validReplyTo } from '@/lib/contact-validation'

const MAX_REQUEST_BYTES = 25_000

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get('content-length') || 0)
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ ok: false, error: 'Submission is too large.' }, { status: 413 })
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const rawBytes = Buffer.byteLength(JSON.stringify(raw), 'utf8')
  if (rawBytes > MAX_REQUEST_BYTES) {
    return NextResponse.json({ ok: false, error: 'Submission is too large.' }, { status: 413 })
  }

  const honeypot = raw && typeof raw === 'object' && !Array.isArray(raw) && typeof (raw as { website?: unknown }).website === 'string'
    ? (raw as { website: string }).website
    : ''

  // Honeypot — bots that fill this get a success response with no side effects.
  if (honeypot.trim()) {
    return NextResponse.json({ ok: true })
  }

  let body
  try {
    body = validateFormPayload(raw)
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Invalid submission.' },
      { status: 400 }
    )
  }

  const origin = new URL(req.url).origin
  const submittedAt = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Kolkata',
  }).format(new Date())

  try {
    if (body.formType === 'consultation') {
      const { clientToken } = await createBooking(
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
          sourcePage: body.sourcePage,
          sourceForm: body.sourceForm,
          submittedAt,
        },
        origin
      )
      return NextResponse.json({ ok: true, statusUrl: `/booking/${clientToken}` })
    }

    const subject = `New website enquiry — ${body.name}`
    const text = [
      `Visitor name: ${body.name}`,
      `Visitor email: ${body.email}`,
      `Phone number: ${body.phone}`,
      `Organisation: ${body.organisation || '—'}`,
      `Service / interest: ${body.serviceArea}`,
      `Submitted: ${submittedAt}`,
      `Page: ${body.sourcePage}`,
      `Form: ${body.sourceForm}`,
      '',
      'Message:',
      body.message,
    ].join('\n')
    const messageId = await sendMail({
      to: getDestinationEmail(),
      replyTo: validReplyTo(body.email),
      subject,
      text,
    })

    const sql = getSql()
    if (sql) {
      try {
        await sql`
          insert into submissions (form_type, name, organisation, email, phone, message, raw, resend_message_id)
          values ('contact', ${body.name}, ${body.organisation || null}, ${body.email}, ${body.phone}, ${body.message}, ${JSON.stringify({ ...body, submittedAt })}, ${messageId})
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
    return NextResponse.json({ ok: false, error: 'We could not send your enquiry right now. Please try again shortly.' }, { status: 502 })
  }
}
