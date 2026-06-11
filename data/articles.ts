import type { Article } from '@/types'

/**
 * Knowledge Center articles. Served via ISR (see app/insights/[slug]/page.tsx).
 * Content is general and informational only — not professional advice.
 *
 * To add an article, append an object here; `generateStaticParams` will
 * pre-render it and ISR will pick up edits on the next revalidation window.
 */
export const articles: Article[] = [
  {
    slug: 'fractional-cfo-for-msmes',
    category: 'Advisory',
    label: 'Fractional CFO',
    title: 'Why MSMEs Should Consider a Fractional CFO in Today\'s Business Environment',
    excerpt:
      'A fractional CFO gives growing businesses senior financial leadership without a full-time cost — improving visibility, controls, and decision-making.',
    date: 'May 2025',
    readTime: '7 min read',
    author: 'AJRG and Associates',
    bgColor: '#221042',
    textColor: 'rgba(255,255,255,0.18)',
    body: [
      { type: 'paragraph', text: 'Many growing businesses reach a point where the founder or an accounts team can no longer carry the full weight of financial decision-making, yet a full-time Chief Financial Officer is neither affordable nor justified by the workload. A fractional CFO engagement is designed for exactly this gap.' },
      { type: 'heading', text: 'What a fractional CFO does' },
      { type: 'paragraph', text: 'A fractional CFO provides senior financial leadership on a part-time or retained basis. The remit typically covers forward-looking planning and control rather than day-to-day bookkeeping, which remains with the in-house team or an outsourced function.' },
      { type: 'list', items: [
        'Financial planning, budgeting, and rolling cash-flow forecasts',
        'Management reporting (MIS) that supports decisions, not just compliance',
        'Strengthening internal financial controls and review processes',
        'Fund-raise readiness, financial modelling, and investor reporting',
        'Support during transactions, due diligence, and capital events',
      ] },
      { type: 'heading', text: 'When it makes sense' },
      { type: 'paragraph', text: 'A fractional arrangement tends to suit businesses that are scaling, preparing for external funding, or navigating a period of change where financial discipline is critical but a permanent hire is premature. The objective is to install the systems and reporting cadence that make the finance function reliable.' },
      { type: 'paragraph', text: 'This article is general in nature. The suitability of any engagement depends on a firm\'s specific circumstances and should be assessed individually.' },
    ],
  },
  {
    slug: 'ibc-what-businesses-must-know',
    category: 'IBC Advisory',
    label: 'IBC Advisory',
    title: 'Understanding the Insolvency and Bankruptcy Code: Key Considerations for Businesses',
    excerpt:
      'A practical overview of the IBC framework, the corporate insolvency resolution process, and what businesses should keep in view.',
    date: 'April 2025',
    readTime: '10 min read',
    author: 'AJRG and Associates',
    bgColor: '#301850',
    textColor: 'rgba(255,255,255,0.20)',
    body: [
      { type: 'paragraph', text: 'The Insolvency and Bankruptcy Code, 2016 (IBC) consolidated India\'s insolvency framework into a single, time-bound process. For businesses — whether as a creditor or a corporate debtor — understanding its broad mechanics helps in responding to financial distress in a structured way.' },
      { type: 'heading', text: 'The resolution process in outline' },
      { type: 'paragraph', text: 'The Corporate Insolvency Resolution Process (CIRP) can be initiated by financial creditors, operational creditors, or the corporate debtor itself, on the occurrence of a default. Once admitted, the process is conducted under a resolution professional and overseen by a committee of creditors.' },
      { type: 'list', items: [
        'Initiation on default, subject to applicable thresholds',
        'Appointment of an interim resolution professional and a moratorium',
        'Formation of the committee of creditors (CoC)',
        'Invitation, evaluation, and approval of a resolution plan',
        'Liquidation only where resolution is not achieved',
      ] },
      { type: 'heading', text: 'What businesses should keep in view' },
      { type: 'paragraph', text: 'Early, accurate assessment of the financial position is often decisive. Reliable books, a clear view of liabilities, and well-prepared documentation materially affect how a business can participate in or respond to proceedings.' },
      { type: 'paragraph', text: 'This is a general overview and not legal or professional advice. IBC matters are fact-specific and are subject to ongoing amendments and judicial interpretation.' },
    ],
  },
  {
    slug: 'succession-planning-family-business',
    category: 'Succession',
    label: 'Succession Planning',
    title: 'Succession Planning for Promoter-Driven Businesses: A Structured Approach',
    excerpt:
      'Succession planning protects both family relationships and business continuity. A structured approach addresses ownership, control, and wealth transition.',
    date: 'March 2025',
    readTime: '9 min read',
    author: 'AJRG and Associates',
    bgColor: '#F3EAD6',
    textColor: '#9A7635',
    body: [
      { type: 'paragraph', text: 'For promoter-driven and family-run businesses, succession is rarely just a legal exercise — it touches ownership, management control, and family relationships at once. A structured approach reduces ambiguity and helps preserve both the business and the wealth it represents.' },
      { type: 'heading', text: 'Separating ownership from management' },
      { type: 'paragraph', text: 'A common starting point is distinguishing who owns the business from who runs it. Clarifying this early allows the next generation\'s roles, and the rights of family members who are not active in the business, to be defined deliberately rather than by default.' },
      { type: 'list', items: [
        'Drafting and structuring of wills',
        'Family-business succession frameworks',
        'Asset distribution strategy across stakeholders',
        'Trust structuring where appropriate',
        'Tax-efficient wealth transition planning',
      ] },
      { type: 'heading', text: 'Why structure matters' },
      { type: 'paragraph', text: 'Documented arrangements — wills, trusts, and clear governance — reduce the risk of disputes and provide continuity if circumstances change unexpectedly. The aim is a plan that is both robust and adaptable over time.' },
      { type: 'paragraph', text: 'This article is for general information only. Succession arrangements should be tailored to each family\'s and business\'s circumstances with appropriate professional advice.' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
