import { getSql } from './db'
import { sendMail } from './resend'
import { generateToken } from './tokens'
import { createMeetEvent } from './google-calendar'
import { site, registeredOfficeText, branchOfficeText } from '@/config/site'

export type BookingPayload = {
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
}

// Coarse preference buckets from the form -> a representative 24h time, used
// only when the owner approves the request as-is (no counter-proposal, which
// would carry its own precise time).
const TIME_BUCKETS: Record<string, string> = {
  'Morning (10am–1pm)': '10:00',
  'Afternoon (2pm–5pm)': '14:00',
  'Evening (5pm–7pm)': '17:00',
  'Any time': '11:00',
}

function locationLine(mode: string | undefined, meetLink: string | null): string {
  if (mode === 'Mumbai office') return `In person — ${registeredOfficeText()}`
  if (mode === 'Noida office') return `In person — ${branchOfficeText()}`
  return meetLink ? `Video call — ${meetLink}` : 'Video call — link to follow separately'
}

export async function createBooking(payload: BookingPayload, origin: string) {
  const owner_token = generateToken()
  const client_token = generateToken()

  const sql = getSql()
  if (sql) {
    await sql`
      insert into bookings (
        name, organisation, email, phone, business_type, service_area, mode,
        message, requested_date, requested_time, owner_token, client_token, raw
      ) values (
        ${payload.name}, ${payload.organisation || null}, ${payload.email}, ${payload.phone},
        ${payload.businessType || null}, ${payload.serviceArea || null}, ${payload.mode || null},
        ${payload.message}, ${payload.date || null}, ${payload.time || null},
        ${owner_token}, ${client_token}, ${JSON.stringify(payload)}
      )
    `
  } else {
    console.log('[bookings][dev] would create booking:', payload)
  }

  await sendMail({
    to: process.env.CONTACT_TO_EMAIL || site.email,
    subject: `New consultation request — ${payload.name}`,
    text: [
      `${payload.name} requested a consultation.`,
      `Organisation: ${payload.organisation || '—'}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Business type: ${payload.businessType || '—'}`,
      `Service area: ${payload.serviceArea || '—'}`,
      `Preferred: ${payload.mode || '—'} · ${payload.date || 'no date given'} · ${payload.time || '—'}`,
      '',
      'Requirement:',
      payload.message,
      '',
      `Review and respond: ${origin}/admin/bookings/${owner_token}`,
    ].join('\n'),
  })

  await sendMail({
    to: payload.email,
    subject: 'We have received your consultation request',
    text: [
      `Hi ${payload.name},`,
      '',
      `Thank you for your consultation request. We will confirm a slot within ${site.responseTime}.`,
      '',
      `Track the status of your request here: ${origin}/booking/${client_token}`,
    ].join('\n'),
  })

  return { clientToken: client_token }
}

export async function getBookingByOwnerToken(token: string) {
  const sql = getSql()
  if (!sql) return null
  const rows = await sql`select * from bookings where owner_token = ${token}`
  return rows[0] ?? null
}

export async function getBookingByClientToken(token: string) {
  const sql = getSql()
  if (!sql) return null
  const rows = await sql`select * from bookings where client_token = ${token}`
  return rows[0] ?? null
}

async function finalizeBooking(booking: any, date: string, time: string, origin: string) {
  const sql = getSql()
  let meetLink: string | null = null

  if (booking.mode === 'Video call') {
    meetLink = await createMeetEvent({
      summary: `AJRG consultation — ${booking.name}`,
      description: booking.message || '',
      date,
      time,
      attendeeEmails: [booking.email, process.env.CONTACT_TO_EMAIL || site.email],
    })
  }

  if (sql) {
    await sql`
      update bookings
      set status = 'confirmed', final_date = ${date}, final_time = ${time},
          meet_link = ${meetLink}, updated_at = now()
      where id = ${booking.id}
    `
  } else {
    console.log('[bookings][dev] would confirm booking:', { id: booking.id, date, time, meetLink })
  }

  const where = locationLine(booking.mode, meetLink)
  const confirmationText = [
    `Consultation confirmed for ${booking.name}.`,
    `When: ${date} at ${time} (IST)`,
    `Where: ${where}`,
    '',
    'This slot is now locked — please reply directly if anything changes.',
  ].join('\n')

  await sendMail({ to: booking.email, subject: 'Your consultation is confirmed', text: confirmationText })
  await sendMail({ to: process.env.CONTACT_TO_EMAIL || site.email, subject: `Confirmed — ${booking.name}`, text: confirmationText })
}

type OwnerAction =
  | { action: 'approve' }
  | { action: 'counter'; date: string; time: string; note?: string }
  | { action: 'reject' }

export async function applyOwnerDecision(ownerToken: string, decision: OwnerAction, origin: string) {
  const booking = await getBookingByOwnerToken(ownerToken)
  if (!booking) throw new Error('Booking not found.')
  if (booking.status !== 'pending') throw new Error('This request has already been responded to.')

  const sql = getSql()

  if (decision.action === 'approve') {
    const time = booking.requested_time ? TIME_BUCKETS[booking.requested_time] || '11:00' : '11:00'
    const date = booking.requested_date || new Date().toISOString().slice(0, 10)
    await finalizeBooking(booking, date, time, origin)
    return { status: 'confirmed' as const }
  }

  if (decision.action === 'reject') {
    if (sql) await sql`update bookings set status = 'rejected', updated_at = now() where id = ${booking.id}`
    await sendMail({
      to: booking.email,
      subject: 'Update on your consultation request',
      text: [
        `Hi ${booking.name},`,
        '',
        'Unfortunately we are unable to accommodate your requested time. Please feel free to submit a new request with a different preference.',
        '',
        `${origin}/book`,
      ].join('\n'),
    })
    return { status: 'rejected' as const }
  }

  // counter
  if (sql) {
    await sql`
      update bookings
      set status = 'countered', proposed_date = ${decision.date}, proposed_time = ${decision.time},
          proposed_note = ${decision.note || null}, updated_at = now()
      where id = ${booking.id}
    `
  } else {
    console.log('[bookings][dev] would counter-propose:', decision)
  }
  await sendMail({
    to: booking.email,
    subject: 'A different time has been proposed for your consultation',
    text: [
      `Hi ${booking.name},`,
      '',
      `We can't do your original preference, but we can meet on ${decision.date} at ${decision.time} (IST).`,
      decision.note ? `\nNote from the team: ${decision.note}` : '',
      '',
      `Accept or decline this time: ${origin}/booking/${booking.client_token}`,
    ].join('\n'),
  })
  return { status: 'countered' as const }
}

export async function applyClientResponse(clientToken: string, accept: boolean, origin: string) {
  const booking = await getBookingByClientToken(clientToken)
  if (!booking) throw new Error('Booking not found.')
  if (booking.status !== 'countered') throw new Error('There is no pending proposal to respond to.')

  const sql = getSql()

  if (accept) {
    await finalizeBooking(booking, booking.proposed_date, booking.proposed_time, origin)
    return { status: 'confirmed' as const }
  }

  if (sql) await sql`update bookings set status = 'declined', updated_at = now() where id = ${booking.id}`
  await sendMail({
    to: process.env.CONTACT_TO_EMAIL || site.email,
    subject: `Client declined proposed time — ${booking.name}`,
    text: `${booking.name} (${booking.email}) declined the proposed slot of ${booking.proposed_date} at ${booking.proposed_time}.`,
  })
  return { status: 'declined' as const }
}
