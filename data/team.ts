import type { TeamMember } from '@/types'

/**
 * Team & mentors — sourced from the firm pitch deck (real people).
 * ⚠️  Confirm names, titles, and bios with Rishu before launch, and supply
 *     real photographs (do not AI-generate headshots). Set `photo` to a path
 *     under /public once provided; until then a placeholder portrait is shown.
 *     See TODO.txt → "Our Team".
 */
export const leadership: TeamMember[] = [
  {
    name: 'Sumegha Agrawal',
    role: 'Chartered Accountant',
    bio: 'Financial reporting, taxation, audit and statutory compliances across manufacturing, retail, e-commerce and non-profit sectors.',
    photo: null,
  },
  {
    name: 'Sambhav Jain',
    role: 'Chartered Accountant',
    bio: 'Taxation, auditing and financial reporting across industries, with exposure to structured compliance and audit frameworks.',
    photo: null,
  },
  {
    name: 'Adv. Junaid Vikar Shaikh',
    role: 'Advocate — Tax Litigation',
    bio: 'GST, Customs, Foreign Trade Policy and Income Tax dispute resolution; experience across the chemical and shipping sectors.',
    photo: null,
  },
  {
    name: 'Kapil S. Mogaveera',
    role: 'Finance Professional',
    bio: 'Tax compliance, litigation, incentives and refunds — including GST and legacy laws (VAT, CST, LBT).',
    photo: null,
  },
]

export const mentors: TeamMember[] = [
  {
    name: 'Ajay Patel',
    role: 'Chartered Accountant — Advisor',
    bio: 'Over two decades in taxation, insolvency, valuation and strategic financial advisory; advanced management training, IIM Bangalore.',
    photo: null,
  },
  {
    name: 'Ajay Kaushik',
    role: 'Registered Patent Agent — Advisor',
    bio: 'Indian Patent Agent (B.Tech, Computer Science + Law) specialising in patent drafting, prosecution, portfolio management and strategic IP advisory.',
    photo: null,
  },
  {
    name: 'Deven Shah',
    role: 'Chartered Accountant & Company Secretary — Advisor',
    bio: '25+ years in finance, accounts and taxation; wealth management, retirement and estate & succession planning (NISM certified).',
    photo: null,
  },
]
