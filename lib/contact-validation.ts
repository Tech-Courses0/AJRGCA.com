export const FORM_LIMITS = {
  name: 100,
  organisation: 150,
  email: 254,
  phone: 30,
  selection: 120,
  message: 4000,
  source: 200,
  honeypot: 200,
} as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+()\-\.\s0-9]+$/

export type ValidatedContactPayload = {
  formType: 'contact'
  name: string
  organisation: string
  email: string
  phone: string
  serviceArea: string
  message: string
  sourcePage: string
  sourceForm: string
  website: string
}

export type ValidatedConsultationPayload = {
  formType: 'consultation'
  name: string
  organisation: string
  email: string
  phone: string
  businessType: string
  serviceArea: string
  mode: string
  date: string
  time: string
  message: string
  consent: true
  sourcePage: string
  sourceForm: string
  website: string
}

export type ValidatedFormPayload = ValidatedContactPayload | ValidatedConsultationPayload

function stringValue(value: unknown, limit: number, label: string): string {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (trimmed.length > limit) throw new Error(`${label} is too long.`)
  return trimmed
}

function required(value: string, label: string) {
  if (!value) throw new Error(`${label} is required.`)
}

function validateCommon(raw: Record<string, unknown>) {
  const name = stringValue(raw.name, FORM_LIMITS.name, 'Name')
  const organisation = stringValue(raw.organisation, FORM_LIMITS.organisation, 'Organisation')
  const email = stringValue(raw.email, FORM_LIMITS.email, 'Email').toLowerCase()
  const phone = stringValue(raw.phone, FORM_LIMITS.phone, 'Phone')
  const serviceArea = stringValue(raw.serviceArea, FORM_LIMITS.selection, 'Service area')
  const message = stringValue(raw.message, FORM_LIMITS.message, 'Message')
  const sourcePage = stringValue(raw.sourcePage, FORM_LIMITS.source, 'Source page')
  const sourceForm = stringValue(raw.sourceForm, FORM_LIMITS.source, 'Source form')
  const website = stringValue(raw.website, FORM_LIMITS.honeypot, 'Website')

  required(name, 'Name')
  required(email, 'Email')
  required(phone, 'Phone')
  required(serviceArea, 'Service area')
  required(message, 'Message')

  if (name.length < 2) throw new Error('Name must be at least 2 characters.')
  if (message.length < 10) throw new Error('Message must be at least 10 characters.')
  if (!EMAIL_PATTERN.test(email)) throw new Error('Enter a valid email address.')
  const digitCount = phone.replace(/\D/g, '').length
  if (!PHONE_PATTERN.test(phone) || digitCount < 7 || digitCount > 15) {
    throw new Error('Enter a valid phone number.')
  }

  return { name, organisation, email, phone, serviceArea, message, sourcePage, sourceForm, website }
}

export function validateFormPayload(value: unknown): ValidatedFormPayload {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Invalid request body.')
  }
  const raw = value as Record<string, unknown>
  if (raw.formType !== 'contact' && raw.formType !== 'consultation') {
    throw new Error('Invalid form type.')
  }

  const common = validateCommon(raw)
  if (raw.formType === 'contact') {
    return {
      formType: 'contact',
      ...common,
      sourcePage: common.sourcePage || '/contact',
      sourceForm: common.sourceForm || 'Contact enquiry form',
    }
  }

  const businessType = stringValue(raw.businessType, FORM_LIMITS.selection, 'Business type')
  const mode = stringValue(raw.mode, FORM_LIMITS.selection, 'Preferred mode')
  const date = stringValue(raw.date, 10, 'Preferred date')
  const time = stringValue(raw.time, FORM_LIMITS.selection, 'Preferred time')
  if (raw.consent !== true) throw new Error('Consent is required.')
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Enter a valid preferred date.')

  return {
    formType: 'consultation',
    ...common,
    businessType,
    mode,
    date,
    time,
    consent: true,
    sourcePage: common.sourcePage || '/book',
    sourceForm: common.sourceForm || 'Consultation booking form',
  }
}

export function validReplyTo(value: string): string | undefined {
  return value.length <= FORM_LIMITS.email && EMAIL_PATTERN.test(value) ? value : undefined
}
