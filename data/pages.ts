import { legalDefault } from '@/data/legal'
import type { PagesContent } from '@/types/content'

/**
 * Default per-page copy — seeds `content.pages`. Values mirror the text that
 * was previously hardcoded in each page/section component. Client-safe (no
 * server deps) so both defaultContent() and any client fallback can import it.
 */
export const pagesDefault: PagesContent = {
  home: {
    bentoHeader: {
      label: 'How We Solve',
      title: 'Service pillars, built around outcomes.',
      sideNote: 'Ten practice areas, partner-led. Each links to a technical deep-dive.',
    },
    bentoDeepDiveLabel: 'Technical Deep-Dive',
    bentoPillars: [
      {
        icon: 'shield-check',
        eyebrow: 'Audit & Assurance',
        title: 'Independent assurance that stands up to scrutiny',
        body: 'Statutory, internal and concurrent audit, IFC and fraud review — under direct partner oversight.',
        href: '/services',
        className: 'md:col-span-2 md:row-span-2',
        feature: true,
      },
      {
        icon: 'trending-up',
        eyebrow: 'Strategic Advisory',
        title: 'A CFO perspective, without the full-time cost',
        body: 'Fractional CFO, financial modelling, valuation and transaction advisory.',
        href: '/services',
        className: 'md:col-span-2',
      },
      {
        icon: 'file-text',
        eyebrow: 'Tax Advisory',
        title: 'Seamless tax in a shifting regulatory landscape',
        body: 'GST and income-tax compliance, litigation and transaction structuring.',
        href: '/services',
        className: 'md:col-span-1',
      },
      {
        icon: 'scale',
        eyebrow: 'IBC Advisory',
        title: 'Clarity through insolvency proceedings',
        body: 'CIRP advisory, financial assessment and resolution coordination.',
        href: '/services',
        className: 'md:col-span-1',
      },
      {
        icon: 'building',
        eyebrow: 'Regulatory & ROC',
        title: 'Corporate compliance, handled end to end',
        body: 'Incorporation, ROC filings, CSR & ESG and secretarial audits.',
        href: '/services',
        className: 'md:col-span-2',
      },
      {
        icon: 'users',
        eyebrow: 'Succession Planning',
        title: 'Protecting wealth across generations',
        body: 'Wills, family-business succession, trusts and wealth transition.',
        href: '/services',
        className: 'md:col-span-2',
      },
    ],
    standards: {
      label: 'Our Practice',
      title: 'A registered, regulated professional firm.',
      items: [
        { title: 'ICAI Registered Practice', body: 'Registered with the ICAI; every engagement follows applicable professional and ethical standards.' },
        { title: 'Partner-Qualified Professionals', body: 'Partners hold ICAI Chartered Accountant qualifications. Full credentials are on the About page.' },
        { title: 'Standards-Based Delivery', body: 'Delivered per applicable Standards on Auditing, Accounting Standards and ICAI pronouncements.' },
      ],
    },
    cta: {
      titleLead: 'Contact us to discuss your',
      titleAccent: 'requirements.',
      subtitle: "Get in touch with our partners to discuss your firm's requirements and learn how we may be of service.",
      buttons: [
        { label: 'Contact Us', href: '/contact', variant: 'primary' },
        { label: 'View All Services', href: '/services', variant: 'secondary' },
      ],
    },
  },
  services: {
    hero: {
      eyebrow: 'Our Services',
      titleLead: 'Financial advisory services across',
      titleAccent: 'our practice areas.',
      subtitle: 'Ten practice areas, from statutory compliance to strategic advisory — under qualified partner oversight.',
    },
    heroStats: [
      { value: '10', label: 'Practice Areas' },
      { value: '3', label: 'Service Categories' },
      { value: '4', label: 'Cities Across India' },
      { value: '2', label: 'Qualified Partners' },
    ],
    categories: [
      { id: 'Advisory', label: 'Advisory', blurb: 'Strategic finance advisory covering financial planning, audit, assurance, and management reporting.' },
      { id: 'Compliance', label: 'Compliance', blurb: 'Tax, regulatory, secretarial, and customs compliance services.' },
      { id: 'Specialised', label: 'Specialised', blurb: 'Advisory for complex or specialised situations including insolvency, succession, legal, and IPR matters.' },
    ],
    keyAreasLabel: 'Key areas',
    approachPointer: {
      label: 'How We Work',
      title: 'A structured methodology behind every engagement.',
      ctaLabel: 'Explore Our Approach →',
      ctaHref: '/approach',
    },
    cta: {
      titleLead: 'Get in touch to discuss your',
      titleAccent: 'requirements.',
      subtitle: 'Contact our partners to learn more about our services and whether they may be relevant to your requirements.',
      buttons: [
        { label: 'Contact Us', href: '/contact', variant: 'primary' },
        { label: 'Our Approach', href: '/approach', variant: 'secondary' },
      ],
    },
  },
  approach: {
    hero: {
      eyebrow: 'Our Approach',
      titleLead: 'A structured methodology.',
      titleAccent: 'Professional execution.',
      subtitle: 'A five-stage process, adapted to each engagement — understand, assess, strengthen, inform.',
    },
    methodologyHeader: { label: 'The Methodology', title: 'Five stages of structured engagement.' },
    methodology: [
      { num: '01', title: 'Understand Business Vision', desc: 'We start with your goals, culture and direction, so the advisory fits your business.' },
      { num: '02', title: 'Gap Analysis: AS-IS vs TO-BE', desc: 'We map current systems against where they need to be, and surface the gaps.' },
      { num: '03', title: 'Strengthen Processes & Controls', desc: 'We design SOPs and internal controls that build discipline and reduce risk.' },
      { num: '04', title: 'Enhance Financial Visibility', desc: 'Clear MIS and structured reporting give promoters real financial visibility.' },
      { num: '05', title: 'Support Informed Decisions', desc: 'Structured data and reporting support better-informed business decisions.' },
    ],
    focus: {
      label: 'Our Focus Areas',
      heading: 'We work closely with promoters, management teams and finance functions to address real-world challenges with',
      headingAccent: 'clarity and precision.',
      footerLocations: 'Mumbai | Noida | Ahmedabad* | Bangalore',
      commitments: [
        'Financial Reporting for Promoters',
        'Building Structured Accounting Systems',
        'Strengthening Internal Financial Controls',
        'Compliance Health Check & Risk Assessment',
        'Reconciliations & Process Implementation',
        'ICAI registered and regulated practice',
      ],
    },
    whyItMatters: {
      label: 'Why It Matters',
      title: 'Process supports consistent professional delivery.',
      items: [
        { title: 'Aligned from the outset', desc: 'We start with your goals, so every engagement is relevant to your situation.' },
        { title: 'System-based approach', desc: 'SOPs and controls create a foundation for consistent reporting and compliance.' },
        { title: 'Structured reporting', desc: 'Accurate, timely MIS underpins sound business decisions.' },
      ],
    },
    cta: {
      titleLead: 'Get in touch to discuss your',
      titleAccent: 'requirements.',
      subtitle: 'Contact our partners to learn more about our services and whether they may be relevant to your requirements.',
      buttons: [
        { label: 'Contact Us', href: '/contact', variant: 'primary' },
        { label: 'View All Services', href: '/services', variant: 'secondary' },
      ],
    },
  },
  contact: {
    hero: {
      label: 'Contact',
      title: 'Get in touch with our team.',
      subtitle: 'Share your requirements and we will respond at the earliest.',
    },
    formHeading: 'Send us an enquiry',
    getInTouchLabel: 'Get In Touch',
    whatsappNote: 'WhatsApp — available on request',
    officesLabel: 'Our Offices',
    regOfficeLabel: 'Registered Office — Mumbai',
    branchLabel: 'Branch — Noida',
    alsoServingNote: 'Also serving Bangalore · Ahmedabad*',
    officeInProgressNote: '*Office in progress',
    mapLabel: 'Find Us — Noida Branch',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Logix%20Technova%2C%20Tower%20B%2C%20Sector%20132%2C%20Noida&t=&z=16&ie=UTF8&iwloc=&output=embed',
    openInMapsLabel: 'Open in Google Maps',
    openInMapsUrl: 'https://www.google.com/maps/place/Logix+Technova/@28.5076002,77.3800379,17z',
    privacyNotice: 'Information you share is used solely to respond to your enquiry and provide requested professional services, processed in line with the DPDP Act, 2023. See our Privacy Policy.',
    disclaimerNotice: 'Content on this website is for general information only and does not constitute professional advice. See our full Disclaimer.',
  },
  industries: {
    header: {
      label: 'Who We Serve',
      title: 'Expertise tailored to your business stage and sector.',
      intro: 'We work with growing enterprises, established organisations, startups, promoter-driven businesses, and professional firms across India.',
    },
    speciality: {
      label: 'Our Speciality',
      title: 'Where we add the most value.',
      body: 'Serving clients across India — strong regional expertise with a global outlook.',
      items: [
        'Financial Visibility for Promoters',
        'Building Structured Accounting Systems',
        'Strengthening Internal Financial Controls',
        'Compliance Health Check & Risk Mitigation',
        'Reconciliations & Process Implementation',
      ],
    },
  },
  insights: {
    header: {
      label: 'Knowledge Center',
      title: 'Practical perspectives for growing businesses.',
      intro: 'Factual, partner-authored perspectives on financial advisory, compliance, and strategic decision-making — provided for general reference, not as professional advice.',
    },
  },
  about: {
    heroEyebrow: 'About AJRG and Associates',
    heroTitleLead: 'A Chartered Accountant firm providing',
    heroTitleAccent: 'financial advisory, audit, and compliance services.',
    whoWeAre: {
      label: 'Who We Are',
      title: 'Professional advisory. Structured practice.',
      paras: [
        'A professional firm providing Strategic Financial Advisory, Audit & Assurance, and Compliance Services to businesses across sectors.',
        'We help organisations build strong financial foundations — bringing accuracy, discipline and transparency to their numbers, with a focus on structured systems and dependable execution.',
      ],
    },
    vision: {
      label: 'Our Vision',
      title: 'To be a dependable financial growth partner for businesses, combining',
      titleAccent: 'strong compliance with strategic finance leadership.',
      presenceLabel: 'Our Presence',
      presenceValue: 'Mumbai | Noida | Ahmedabad* | Bangalore',
    },
    valuesHeader: { label: 'Our Values', title: 'The principles that govern every engagement.' },
    values: [
      { num: '01', title: 'Financial Clarity', desc: 'We bring accuracy, discipline, and transparency to your numbers — so you have a clear picture of where your business stands.' },
      { num: '02', title: 'Strong Compliance', desc: 'Our approach is rooted in structured systems and professional execution to support regulatory compliance requirements.' },
      { num: '03', title: 'Smarter Decisions', desc: 'We combine compliance services with strategic advisory — supporting better-informed financial and business decisions.' },
      { num: '04', title: 'Professional Partnership', desc: 'We work closely with promoters, management teams, and finance functions to address financial and compliance requirements.' },
    ],
    partnersHeader: { label: 'Our Partners', title: 'Subject-matter experts behind every engagement.' },
    partnersNote: 'All partners are members of the Institute of Chartered Accountants of India (ICAI). Membership and registration details available on request.',
    leadershipHeader: {
      label: 'Our Leadership Team',
      title: 'The professionals behind every engagement.',
      subtitle: 'A team of qualified professionals supporting our partners across audit, taxation, compliance and advisory.',
    },
    leadershipNote: 'Names and bios are from the firm profile. Real photographs to be supplied before launch.',
    mentorsHeader: { label: 'Associates & Mentors', title: 'Senior advisors guiding our practice.' },
    cta: {
      titleLead: 'Get in touch with',
      titleAccent: 'our partners.',
      subtitle: 'Contact us to learn more about our services and whether they may be relevant to your requirements.',
      buttons: [{ label: 'Contact Us', href: '/contact', variant: 'primary' }],
    },
  },
  legal: legalDefault,
  book: {
    hero: {
      eyebrow: 'Consultation',
      titleLead: 'Book a consultation with a',
      titleAccent: 'partner.',
      subtitle: 'Request a confidential, no-obligation discussion of your requirement. We will match you to the right partner and confirm a slot within one business day.',
    },
    badges: [
      { label: 'Partner-led', icon: 'user-check' },
      { label: 'Confidential', icon: 'lock' },
      { label: 'No obligation', icon: 'check-circle' },
    ],
    stepsLabel: 'How it works',
    steps: [
      { title: 'Share your requirement', desc: 'Tell us briefly what you need and how you would like to meet.', icon: 'clipboard-list' },
      { title: 'We match the right partner', desc: 'Your query is routed to the partner best suited to it.', icon: 'users' },
      { title: 'Confirmed within a day', desc: 'We confirm the date, time and meeting link or office.', icon: 'calendar-check' },
      { title: 'Meet & plan next steps', desc: 'A focused, confidential discussion with clear next steps.', icon: 'check-circle' },
    ],
    faqsLabel: 'Good to know',
    faqsTitle: 'Before you book.',
    faqs: [
      { q: 'Is the consultation chargeable?', a: 'The initial discussion is no-obligation. Any chargeable engagement begins only after a formal professional engagement letter is agreed.' },
      { q: 'What should I prepare?', a: 'Anything relevant to your query — recent financial statements, returns, notices or filings — helps us give you a more useful discussion. Not mandatory.' },
      { q: 'Where do we meet?', a: 'By video call, or in person at our registered office in Mumbai (Chembur) or our branch in Noida (Sector 132).' },
      { q: 'Is my information kept confidential?', a: 'Yes. All discussions and any data you share are treated as strictly confidential, in line with applicable ICAI professional standards and the DPDP Act, 2023.' },
    ],
    officesNote: 'In person at <b>Mumbai</b> or <b>Noida</b> · or by video, anywhere.',
    complianceNote: '<b>Please note:</b> Personal data you submit is processed solely to arrange and respond to your consultation, in line with the DPDP Act, 2023 — see our <a href="/privacy-policy">Privacy Policy</a>. This page is not an advertisement or solicitation of work; all engagements are conducted in accordance with applicable ICAI standards and the Chartered Accountants Act, 1949.',
  },
}
