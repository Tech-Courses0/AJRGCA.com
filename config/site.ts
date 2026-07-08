/**
 * AJRG and Associates — single source of truth for firm-wide facts.
 *
 * ⚠️  ACTION REQUIRED (legal identifiers):
 *     The fields marked `TODO` are statutory identifiers that MUST be the
 *     firm's real values before this site goes live. They are intentionally
 *     left as placeholders — do not invent these. Update them here once and
 *     they propagate to the footer, metadata, and structured data.
 */

export const site = {
  name: 'AJRG and Associates',
  shortName: 'AJRGCA',
  legalName: 'AJRG and Associates, Chartered Accountants',
  tagline: 'Financial Clarity. Strong Compliance. Smarter Decisions.',
  url: 'https://ajrgca.com',

  /* ── Statutory identifiers ── */
  frn: 'TODO-FRN', // ICAI Firm Registration Number — still required, not in deck
  // Registered office & branch taken from the firm pitch deck (PIN to confirm).
  registeredOffice: {
    line1: 'Unit 202, “A” Wing, Shrikant Chambers',
    line2: 'Near RK Studio, Chembur (E)',
    city: 'Mumbai',
    state: 'Maharashtra',
    pin: 'TODO-PIN', // Chembur (E) — confirm PIN
    country: 'India',
  },
  branchOffice: {
    line1: 'B-137, Tower B, Logix Technova',
    line2: 'Sector 132',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pin: 'TODO-PIN',
    country: 'India',
  },

  /* ── Contact ── */
  email: 'contact@ajrgca.com',
  /* Turnaround promise shown on the booking/consultation flows. Single source —
     change here and it updates every "we'll confirm within …" line (forms, the
     /book page, the confirmation email, and the booking-status page). */
  responseTime: 'one business day',
  /* Booking — paste a Cal.com / Calendly embed URL here to switch on live
     slot scheduling on /book. Leave empty to show the request form plus a
     "we'll confirm within one business day" fallback. */
  consultationCalendarUrl: '' as string,
  cities: ['Mumbai', 'Noida', 'Ahmedabad', 'Bangalore'] as const,
  citiesLine: 'Mumbai · Noida · Ahmedabad · Bangalore',

  /* ── Compliance copy (ICAI 2026 + DPDP Act 2023) ── */
  disclaimer:
    'The information on this website is for general informational purposes only and does not constitute legal, financial, tax, investment, or professional advice. No information herein should be relied upon as a substitute for independent professional advice. AJRG and Associates is not liable for any loss or damage arising from the use of or reliance on information on this site. Engagement of services is subject to a formal professional engagement letter. This website is not intended as an advertisement or solicitation of work. All engagements are conducted in accordance with applicable ICAI standards and the Chartered Accountants Act, 1949.',
  dpdpNote:
    'Personal data submitted through this site is processed in accordance with the Digital Personal Data Protection Act, 2023. See our Privacy Policy for how we collect, use, and protect your data.',

  /* ── Positioning (from the firm pitch deck) ── */
  presence: 'Serving clients across India — strong regional expertise with a global outlook.',
} as const

export type Office = { line1: string; line2: string; city: string; state: string; pin: string; country: string }

export function formatOffice(o: Office): string {
  // Drop any unfilled placeholder fragments (e.g. PIN) so the line stays clean.
  const pin = o.pin.startsWith('TODO') ? '' : o.pin
  return [o.line1, o.line2, [o.city, o.state, pin].filter(Boolean).join(', '), o.country]
    .filter(Boolean)
    .join(', ')
}
const officeText = formatOffice

/* Formatted, human-readable registered office / branch */
export function registeredOfficeText(): string {
  return officeText(site.registeredOffice)
}

export function branchOfficeText(): string {
  return officeText(site.branchOffice)
}
