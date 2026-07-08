import type { ArticleBlock } from '@/types'

/** One legal document: eyebrow + title + last-updated + editable prose blocks. */
export interface LegalDoc {
  eyebrow: string
  title: string
  lastUpdated: string
  body: ArticleBlock[]
}

const h = (text: string): ArticleBlock => ({ type: 'heading', text })
const para = (text: string): ArticleBlock => ({ type: 'paragraph', text })
const list = (items: string[]): ArticleBlock => ({ type: 'list', items })

// NOTE: inline links inside legal prose (e.g. a mid-sentence "Disclaimer" link,
// or a mailto) are flattened to plain text here — the email/target still reads,
// it just isn't a clickable anchor. Full rich-text inline links are out of scope.

export const legalDefault: { privacy: LegalDoc; terms: LegalDoc; disclaimer: LegalDoc; cookies: LegalDoc } = {
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: June 2025',
    body: [
      h('1. Introduction'),
      para('AJRG and Associates, Chartered Accountants ("we", "our", or "the firm") is committed to protecting personal information in accordance with applicable Indian law, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDP Act).'),
      para('This policy describes how we collect, use, store, and handle personal information when you interact with this website or engage with our professional services.'),
      h('2. Information We Collect'),
      para('We may collect the following personal information:'),
      list([
        'Contact information: Name, email address, phone number, when you contact us via email, WhatsApp, or any contact form. Contact form submissions are retained in a secure database as a record of your enquiry, in addition to being emailed to our team.',
        'Business information: Company name, designation, nature of business requirements, shared voluntarily by you for the purpose of a professional enquiry.',
        'Usage data: Technical information such as browser type, IP address, and pages visited, collected automatically when you use this website.',
      ]),
      h('3. How We Use Your Information'),
      para('We use personal information only for the following purposes:'),
      list([
        'To respond to your professional service enquiries.',
        'To provide and manage professional services under an engagement.',
        'To comply with legal, regulatory, and professional obligations.',
        'To improve the functionality of our website.',
      ]),
      para('We do not use personal information for unsolicited marketing, profiling, or any purpose not connected to the above.'),
      h('4. Sharing of Information'),
      para('We do not sell, rent, or trade personal information. We may share information only in the following circumstances:'),
      list([
        'With associate professionals or service providers engaged to assist in the performance of professional services, subject to appropriate confidentiality obligations.',
        'Where required by law, court order, or statutory authority.',
        'With your explicit consent.',
      ]),
      h('5. Data Retention'),
      para('We retain personal information for as long as necessary to fulfil the purpose for which it was collected, including any legal, regulatory, or professional obligation to retain records. For professional engagements, records are typically retained for a minimum of eight years in accordance with applicable professional standards.'),
      h('6. Data Security'),
      para('We implement reasonable security measures to protect personal information against unauthorised access, alteration, or disclosure. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.'),
      h('7. Cookies'),
      para('This website may use cookies for basic functionality. Please refer to our Cookie Policy for details.'),
      h('8. Your Rights'),
      para('Subject to applicable law, you may have the right to access, correct, or request erasure of personal information we hold about you. To exercise any such right, please contact us at contact@ajrgca.com.'),
      h('9. Third-Party Links'),
      para('This website may contain links to third-party sites. This Privacy Policy does not apply to those sites. We encourage you to review the privacy policies of any third-party websites you visit.'),
      h('10. Changes to This Policy'),
      para('We may update this policy from time to time. The current version will always be available on this page with the date of last update.'),
      h('11. Contact'),
      para('For any privacy-related queries or requests, please contact us at contact@ajrgca.com.'),
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms & Conditions',
    lastUpdated: 'Last updated: June 2025',
    body: [
      h('1. Acceptance of Terms'),
      para('By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.'),
      h('2. Website Use'),
      para('This website is provided for general informational purposes only. You may browse this website for personal and non-commercial use. You may not:'),
      list([
        'Reproduce, copy, or redistribute any content from this website without prior written permission.',
        'Use this website for any unlawful purpose.',
        'Attempt to gain unauthorised access to any part of this website or related systems.',
      ]),
      h('3. No Professional Advice'),
      para('Information on this website does not constitute legal, financial, tax, accounting, or professional advice. No client or professional relationship is created by use of this website. Please refer to our Disclaimer for full details.'),
      h('4. Intellectual Property'),
      para('All content on this website, including text, logos, graphics, and design, is the property of AJRG and Associates or its licensors and is protected by applicable intellectual property laws. No content may be used without prior written consent.'),
      h('5. Accuracy of Information'),
      para('We endeavour to keep information on this website accurate and up to date. However, we do not warrant the completeness, accuracy, or currency of any information. We reserve the right to modify or remove content at any time without notice.'),
      h('6. Third-Party Links'),
      para('This website may contain links to third-party websites. We do not endorse or take responsibility for the content, accuracy, or practices of linked sites. Visiting linked sites is at your own risk.'),
      h('7. Limitation of Liability'),
      para('To the extent permitted by applicable law, AJRG and Associates shall not be liable for any direct, indirect, incidental, consequential, or other damages arising from the use of or inability to use this website, or reliance on its content.'),
      h('8. Professional Engagement'),
      para('Engagement of professional services from AJRG and Associates is subject to a separate written engagement letter. These Terms and Conditions govern use of this website only and do not form part of any professional service agreement.'),
      h('9. Privacy'),
      para('Use of this website is also governed by our Privacy Policy, which is incorporated into these Terms by reference.'),
      h('10. Governing Law'),
      para('These Terms and Conditions are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.'),
      h('11. Changes to These Terms'),
      para('We may revise these Terms from time to time. The current version will always be available on this page. Continued use of the website after any changes constitutes acceptance of the revised Terms.'),
      h('12. Contact'),
      para('For any queries regarding these Terms, contact us at contact@ajrgca.com.'),
    ],
  },
  disclaimer: {
    eyebrow: 'Legal',
    title: 'Disclaimer',
    lastUpdated: 'Last updated: June 2025',
    body: [
      h('1. General Information Only'),
      para('The content on this website is provided for general informational purposes only. It does not constitute and should not be relied upon as legal, financial, tax, accounting, investment, or professional advice of any kind.'),
      h('2. No Professional Relationship'),
      para('Access to or use of this website does not create a professional, advisory, or client relationship between AJRG and Associates and any visitor or user. A formal professional relationship is established only through a signed engagement letter.'),
      h('3. No Guarantee of Accuracy'),
      para('While we endeavour to keep the information on this website current and accurate, we make no representations or warranties, express or implied, about the completeness, accuracy, reliability, or suitability of any information. Laws, regulations, and professional standards change frequently. Information on this site may not reflect the most recent developments.'),
      h('4. Not a Substitute for Professional Advice'),
      para('You should not act or refrain from acting on the basis of any information on this website without first seeking independent professional advice from a qualified advisor who has knowledge of your specific circumstances.'),
      h('5. Limitation of Liability'),
      para('AJRG and Associates, its partners, employees, and associates shall not be liable for any loss, damage, or expense (including consequential, incidental, or indirect loss) arising from or in connection with any use of or reliance on information contained on this website.'),
      h('6. External Links'),
      para('This website may contain links to third-party websites. AJRG and Associates does not endorse or assume responsibility for the content, accuracy, or practices of any linked third-party sites.'),
      h('7. ICAI Compliance'),
      para('AJRG and Associates is a firm of Chartered Accountants registered with the Institute of Chartered Accountants of India (ICAI). All professional services are rendered in accordance with the Chartered Accountants Act, 1949, ICAI Rules, and applicable professional standards. This website is maintained in accordance with applicable ICAI guidelines on website content and advertising.'),
      h('8. No Solicitation'),
      para('Nothing on this website is intended to solicit professional work in any manner prohibited under the Chartered Accountants Act, 1949 or applicable ICAI guidelines. Information is provided for awareness and educational purposes only.'),
      h('9. Jurisdiction'),
      para('This disclaimer is governed by the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.'),
      h('10. Contact'),
      para('For any queries regarding this disclaimer, please contact us at contact@ajrgca.com.'),
    ],
  },
  cookies: {
    eyebrow: 'Legal',
    title: 'Cookie Policy',
    lastUpdated: 'Last updated: June 2025',
    body: [
      h('1. What Are Cookies'),
      para('Cookies are small text files placed on your device by a website when you visit it. They are widely used to make websites function correctly and to provide basic usage information to site operators.'),
      h('2. How We Use Cookies'),
      para('This website may use the following types of cookies:'),
      list([
        'Strictly necessary cookies: Required for the website to function. These cannot be disabled without affecting website functionality. They do not collect personal information for marketing purposes.',
        'Analytics cookies: We may use anonymised analytics tools to understand how visitors interact with our site (e.g., pages visited, time spent). This information is used only to improve the website and is not linked to any individual.',
      ]),
      para('We do not use cookies for advertising, behavioural tracking, or targeted marketing.'),
      h('3. Third-Party Cookies'),
      para('This website may include content or links from third-party services (such as embedded maps or social media links). These third parties may set their own cookies. We have no control over third-party cookies, and you should review the privacy and cookie policies of those services.'),
      h('4. Managing Cookies'),
      para("You can control and delete cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Note that disabling cookies may affect the functionality of this website. For instructions on managing cookies, please refer to your browser's help documentation."),
      h('5. Consent'),
      para('By continuing to use this website, you consent to our use of strictly necessary cookies. Where analytics or non-essential cookies are in use, we will seek your consent in accordance with applicable law.'),
      h('6. Contact'),
      para('For any queries regarding cookies, contact us at contact@ajrgca.com.'),
    ],
  },
}
