// Remembers the visitor's own latest consultation-status link in this browser,
// so returning to /book shows "you already have a request" instead of a blank
// form. No accounts — this is purely a convenience layer on top of the
// existing token-link auth (lib/bookings.ts); losing it just means falling
// back to the emailed link.
const KEY = 'ajrg_booking_status_url'

export function saveBookingStatusUrl(url: string) {
  try {
    localStorage.setItem(KEY, url)
  } catch {
    // localStorage unavailable (private browsing, etc.) — not worth failing the submission over.
  }
}

export function getBookingStatusUrl(): string | null {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function clearBookingStatusUrl() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
