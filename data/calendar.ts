import type { ComplianceCategory, ComplianceDeadline } from '@/types'

/**
 * Factual statutory due dates (FY 2026-27 cycle) under Indian law.
 * These are standard, publicly-notified recurring deadlines — provided as a
 * utility for visitors, not as advice. Always confirm against the latest CBDT,
 * CBIC, and MCA notifications, which may extend or revise specific dates.
 */
export const complianceCategories: ComplianceCategory[] = [
  'GST',
  'Income Tax',
  'TDS',
  'MCA',
]

export const complianceDeadlines: ComplianceDeadline[] = [
  // ── Monthly recurring (representative cycle shown) ──
  { date: '2026-06-07', category: 'TDS', title: 'TDS / TCS Payment (May)', authority: 'CBDT', recurring: 'Monthly' },
  { date: '2026-06-11', category: 'GST', title: 'GSTR-1 — Outward Supplies (May)', authority: 'CBIC', recurring: 'Monthly' },
  { date: '2026-06-13', category: 'GST', title: 'GSTR-1 (IFF) — QRMP Taxpayers (May)', authority: 'CBIC', recurring: 'Monthly' },
  { date: '2026-06-15', category: 'Income Tax', title: 'Advance Tax — First Instalment (15%)', authority: 'CBDT', recurring: 'Quarterly' },
  { date: '2026-06-20', category: 'GST', title: 'GSTR-3B — Summary Return (May)', authority: 'CBIC', recurring: 'Monthly' },

  { date: '2026-07-07', category: 'TDS', title: 'TDS / TCS Payment (June)', authority: 'CBDT', recurring: 'Monthly' },
  { date: '2026-07-11', category: 'GST', title: 'GSTR-1 — Outward Supplies (June)', authority: 'CBIC', recurring: 'Monthly' },
  { date: '2026-07-20', category: 'GST', title: 'GSTR-3B — Summary Return (June)', authority: 'CBIC', recurring: 'Monthly' },
  { date: '2026-07-31', category: 'TDS', title: 'TDS Return — Form 26Q/24Q (Q1)', authority: 'CBDT', recurring: 'Quarterly' },
  { date: '2026-07-31', category: 'Income Tax', title: 'ITR Filing — Non-Audit Cases (AY 2026-27)', authority: 'CBDT', recurring: 'Annual' },

  // ── Quarterly / annual milestones ──
  { date: '2026-09-15', category: 'Income Tax', title: 'Advance Tax — Second Instalment (45%)', authority: 'CBDT', recurring: 'Quarterly' },
  { date: '2026-09-30', category: 'Income Tax', title: 'Tax Audit Report — Form 3CA/3CB-3CD', authority: 'CBDT', recurring: 'Annual' },
  { date: '2026-09-30', category: 'MCA', title: 'DIR-3 KYC — Director KYC', authority: 'MCA', recurring: 'Annual' },

  { date: '2026-10-31', category: 'Income Tax', title: 'ITR Filing — Audit Cases (AY 2026-27)', authority: 'CBDT', recurring: 'Annual' },
  { date: '2026-10-31', category: 'TDS', title: 'TDS Return — Form 26Q/24Q (Q2)', authority: 'CBDT', recurring: 'Quarterly' },
  { date: '2026-10-30', category: 'MCA', title: 'AOC-4 — Financial Statements Filing', authority: 'MCA', recurring: 'Annual' },

  { date: '2026-11-29', category: 'MCA', title: 'MGT-7 — Annual Return Filing', authority: 'MCA', recurring: 'Annual' },

  { date: '2026-12-15', category: 'Income Tax', title: 'Advance Tax — Third Instalment (75%)', authority: 'CBDT', recurring: 'Quarterly' },
  { date: '2026-12-31', category: 'GST', title: 'GSTR-9 / 9C — Annual Return (FY 2025-26)', authority: 'CBIC', recurring: 'Annual' },

  { date: '2027-01-31', category: 'TDS', title: 'TDS Return — Form 26Q/24Q (Q3)', authority: 'CBDT', recurring: 'Quarterly' },
  { date: '2027-03-15', category: 'Income Tax', title: 'Advance Tax — Fourth Instalment (100%)', authority: 'CBDT', recurring: 'Quarterly' },
]
