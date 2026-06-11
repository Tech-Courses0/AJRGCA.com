import type { Industry, Insight, Stat, Partner } from '@/types'

export const industries: Industry[] = [
  {
    id: 'growing-enterprises',
    icon: 'trending-up',
    name: 'Growing Enterprises',
    description: 'Strategic finance support, structured accounting, and compliance services for businesses at a growth stage.',
    tags: ['CFO Advisory', 'MIS', 'Compliance'],
  },
  {
    id: 'startups-msmes',
    icon: 'rocket',
    name: 'Startups & MSMEs',
    description: 'Guidance on structuring, ESOP design, fundraising compliance, and financial statement preparation for investor-ready businesses.',
    tags: ['Fundraising', 'ESOPs', 'DPIIT', 'Valuation'],
  },
  {
    id: 'established-organisations',
    icon: 'building',
    name: 'Established Organisations',
    description: 'Audit, assurance, tax planning, and advisory services to maintain statutory compliance and support operational decision-making.',
    tags: ['Audit', 'Tax Planning', 'IFC'],
  },
  {
    id: 'promoter-businesses',
    icon: 'users',
    name: 'Promoter-Driven Businesses',
    description: 'Financial reporting, structured accounting, and succession planning services for family-run and promoter-led enterprises.',
    tags: ['Succession', 'Wealth', 'Structuring'],
  },
  {
    id: 'professional-firms',
    icon: 'briefcase',
    name: 'Professional Firms',
    description: 'Tax compliance, ROC filings, GST advisory, and practice management support for LLPs and professional service firms.',
    tags: ['GST', 'ROC', 'Tax'],
  },
  {
    id: 'exporters-manufacturers',
    icon: 'ship',
    name: 'Exporters & Manufacturers',
    description: 'Advisory covering MOOWR, RoDTEP, FTZ, and AEO for businesses engaged in manufacturing and export-oriented operations.',
    tags: ['MOOWR', 'RoDTEP', 'FTZ', 'AEO'],
  },
]

/* Partner bios — framed as Subject Matter Experts (ICAI-compliant factual bios) */
export const partners: Partner[] = [
  {
    name: 'Ajay Jain',
    role: 'Partner — Strategic Finance, Audit & Governance',
    qualifications: 'Chartered Accountant',
    sectors: ['Strategic Finance', 'Audit & Accounts', 'Governance', 'Scalable Finance Functions'],
    expertise: [],
    bio: [
      'Ajay is a Chartered Accountant specialising in strategic finance, audit & accounts, governance, and building scalable finance functions.',
      'A founder of AJRG (and of Digibuks), he partners with businesses to drive profitability, strengthen controls, and enable sustainable growth through disciplined financial strategy.',
    ],
    icaiNote: 'Member, Institute of Chartered Accountants of India (ICAI). Membership No.: TODO — to be confirmed before launch.',
  },
  {
    name: 'Rishu Goyal',
    role: 'Partner — Valuation, M&A & Insolvency',
    qualifications: 'CA · RV (SFA) · Insolvency Professional · SEBI RIA',
    sectors: ['Corporate Structuring', 'M&A & Valuation', 'Insolvency & IBC', 'Investment Advisory'],
    expertise: [],
    bio: [
      'Rishu is a Chartered Accountant, Registered Valuer (Securities or Financial Assets), Insolvency Professional, and SEBI Registered Investment Adviser.',
      'A founder of AJRG, he specialises in corporate structuring, M&A, valuation, insolvency & IBC advisory, strategic finance, and investment advisory — helping promoters navigate transactions and complex resolutions.',
    ],
    icaiNote: 'Member, Institute of Chartered Accountants of India (ICAI). Membership No.: TODO — to be confirmed before launch.',
  },
]

export const insights: Insight[] = [
  {
    slug: 'fractional-cfo-for-msmes',
    category: 'Advisory',
    title: 'Why MSMEs Should Consider a Fractional CFO in Today\'s Business Environment',
    date: 'May 2025',
    readTime: '7 min read',
    bgColor: '#221042',
    textColor: 'rgba(255,255,255,0.18)',
    label: 'Fractional CFO',
  },
  {
    slug: 'ibc-what-businesses-must-know',
    category: 'IBC Advisory',
    title: 'Understanding the Insolvency and Bankruptcy Code: Key Considerations for Businesses',
    date: 'April 2025',
    readTime: '10 min read',
    bgColor: '#301850',
    textColor: 'rgba(255,255,255,0.20)',
    label: 'IBC Advisory',
  },
  {
    slug: 'succession-planning-family-business',
    category: 'Succession',
    title: 'Succession Planning for Promoter-Driven Businesses: A Structured Approach',
    date: 'March 2025',
    readTime: '9 min read',
    bgColor: '#F3EAD6',
    textColor: '#9A7635',
    label: 'Succession Planning',
  },
]

export const stats: Stat[] = [
  { value: '4', label: 'Cities Across India' },
  { value: '10', label: 'Practice Areas' },
  { value: '4', label: 'Specialised Domains' },
  { value: '2', label: 'Qualified Partners' },
]
