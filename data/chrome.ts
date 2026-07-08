import { site } from '@/config/site'
import type { NavContent, FooterContent, SiteConfig } from '@/types/content'

/** Client-safe fallback for the site/brand slice — used by Navbar/Footer when
 *  no live `content` prop is passed (e.g. a page not yet migrated). Mirrors
 *  the brand defaults seeded in defaultContent(). */
export const defaultSiteBrand: SiteConfig = {
  ...site,
  wordmark: 'AJRGCA',
  logoImage: null,
  favicon: null,
  phone: '',
  whatsapp: '',
  social: [],
}

/**
 * Default navbar + footer content — the exact text/links that were previously
 * hardcoded in components/layout/Navbar.tsx and Footer.tsx. Kept in a
 * client-safe module (no server deps) so both defaultContent() (server) and
 * the chrome components' fallback (client) can import it.
 */

export const navDefault: NavContent = {
  labels: {
    about: 'About',
    services: 'Services',
    approach: 'Approach',
    whoWeServe: 'Who We Serve',
    insights: 'Insights',
    contact: 'Contact',
    cta: 'Book Consultation',
  },
  topLevel: [
    { id: 'about', label: 'About', href: '/about', kind: 'link' },
    { id: 'services', label: 'Services', href: '/services', kind: 'services' },
    { id: 'approach', label: 'Approach', href: '/approach', kind: 'link' },
    { id: 'clients', label: 'Who We Serve', href: '/industries', kind: 'clients' },
    { id: 'insights', label: 'Insights', href: '/insights', kind: 'link' },
    { id: 'contact', label: 'Contact', href: '/contact', kind: 'link' },
  ],
  serviceGroups: [
    {
      label: 'Audit & Assurance',
      services: [
        { icon: 'shield-check', title: 'Audit & Assurance', desc: 'Independent assurance over your numbers — statutory, internal, and concurrent audit, IFC and fraud review.', href: '/services' },
        { icon: 'book-open', title: 'Finance & Accounting', desc: 'Reliable books and decision-grade MIS — managed finance, reporting, and financial controls.', href: '/services' },
      ],
    },
    {
      label: 'Tax Advisory',
      services: [
        { icon: 'file-text', title: 'Strategic Indirect & Direct Tax', desc: 'Seamless GST and income-tax compliance, litigation handling, transfer pricing and transaction structuring.', href: '/services' },
        { icon: 'package', title: 'Customs & Trade Advisory', desc: 'MOOWR, RoDTEP, Free Trade Zone and AEO advisory for manufacturers and exporters.', href: '/services' },
      ],
    },
    {
      label: 'Regulatory & Compliance',
      services: [
        { icon: 'building', title: 'Secretarial & ROC Compliance', desc: 'Incorporation, ROC filings, CSR & ESG, and secretarial audits under the Companies Act, 2013.', href: '/services' },
        { icon: 'scale', title: 'IBC Advisory', desc: 'CIRP advisory, financial position assessment and coordination with resolution professionals.', href: '/services' },
      ],
    },
    {
      label: 'Specialised Services',
      services: [
        { icon: 'trending-up', title: 'Strategic & Business Advisory', desc: 'Fractional CFO, financial modelling, valuation, M&A and transaction advisory.', href: '/services' },
        { icon: 'users', title: 'Succession Planning', desc: 'Wills, family-business succession, trust structuring and tax-efficient wealth transition.', href: '/services' },
        { icon: 'gavel', title: 'Legal Advisory & Dispute', desc: 'Commercial suits, arbitration, mediation and consumer-forum disputes.', href: '/services' },
        { icon: 'lightbulb', title: 'Intellectual Property Rights', desc: 'Patents, trademarks, copyright and strategic IP portfolio management.', href: '/services' },
      ],
    },
  ],
  clientTypes: [
    { icon: 'trending-up', title: 'Growing Enterprises', desc: 'Scaling businesses that need structured finance', href: '/industries' },
    { icon: 'rocket', title: 'Startups & MSMEs', desc: 'ESOP, fundraising & investor-ready compliance', href: '/industries' },
    { icon: 'building', title: 'Established Organisations', desc: 'Audit, tax planning & strategic advisory', href: '/industries' },
    { icon: 'users', title: 'Promoter-Driven Businesses', desc: 'Financial visibility & succession planning', href: '/industries' },
    { icon: 'briefcase', title: 'Professional Firms', desc: 'GST, ROC & practice management support', href: '/industries' },
    { icon: 'globe', title: 'Exporters & Manufacturers', desc: 'MOOWR, RoDTEP, FTZ & AEO advisory', href: '/industries' },
  ],
  featured: {
    eyebrow: 'Insights',
    headingLead: 'From our',
    headingAccent: 'Knowledge Center',
    body: 'Factual perspectives on tax, audit, IBC and succession — written by our partners.',
    citiesLine: 'Mumbai · Noida · Ahmedabad · Bangalore',
    primaryLabel: 'Read the Knowledge Center',
    secondaryLabel: 'Book a consultation',
  },
  servicesBottomNote: '10 service verticals · Partner-led delivery · ICAI registered practice',
  exploreAllLabel: 'Explore all services',
  clientsAllLabel: 'View all client types',
}

export const footerDefault: FooterContent = {
  frnLabel: 'Firm Registration No. (FRN):',
  registeredOfficeLabel: 'Registered Office:',
  columns: [
    {
      heading: 'Services',
      links: [
        { label: 'Audit & Assurance', href: '/services' },
        { label: 'Tax & Regulatory Compliance', href: '/services' },
        { label: 'Strategic & Business Advisory', href: '/services' },
        { label: 'Secretarial & ROC Compliance', href: '/services' },
        { label: 'IBC Advisory', href: '/services' },
        { label: 'Succession Planning', href: '/services' },
      ],
    },
    {
      heading: 'Firm',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Approach', href: '/approach' },
        { label: 'Industries', href: '/industries' },
        { label: 'Knowledge Center', href: '/insights' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],
  connectHeading: 'Connect',
  legalHeading: 'Legal',
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Disclaimer', href: '/disclaimer' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
  dpdpLabel: 'Data Protection:',
  disclaimerLabel: 'Professional Disclaimer:',
}
