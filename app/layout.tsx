import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

/* Royal Minimalist type pairing — self-hosted via next/font (zero CLS) */
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ajrgca.com'),
  title: {
    default: 'AJRG and Associates — Chartered Accountants',
    template: '%s | AJRG and Associates',
  },
  description:
    'AJRG and Associates is a Chartered Accountancy firm providing Strategic Financial Advisory, Audit & Assurance, Tax & Compliance, and IBC Advisory services across Mumbai, Noida, Ahmedabad, and Bangalore.',
  keywords: [
    'Chartered Accountant',
    'CA firm India',
    'Strategic Financial Advisory',
    'Fractional CFO',
    'Audit and Assurance',
    'Tax Compliance',
    'IBC Advisory',
    'Succession Planning',
    'AJRG and Associates',
    'AJRGCA',
  ],
  authors: [{ name: 'AJRG and Associates, Chartered Accountants' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ajrgca.com',
    siteName: 'AJRG and Associates',
    title: 'AJRG and Associates — Chartered Accountants',
    description:
      'Financial Clarity. Strong Compliance. Smarter Decisions. A Chartered Accountancy firm serving growing businesses across India.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AJRG and Associates Chartered Accountants',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AJRG and Associates — Chartered Accountants',
    description: 'Financial Clarity. Strong Compliance. Smarter Decisions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
