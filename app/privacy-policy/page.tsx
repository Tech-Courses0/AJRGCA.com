import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AJRG and Associates. Understand how we collect, use, and protect personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <section className="pt-36 pb-28 px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4">Legal</p>
          <h1 className="font-serif-display font-normal text-[clamp(2rem,4vw,3rem)] text-[var(--ink)] leading-tight mb-10">Privacy Policy</h1>

          <div className="prose-legal">
            <p className="text-[0.72rem] text-[var(--ink-3)] mb-8">Last updated: June 2025</p>

            <h2>1. Introduction</h2>
            <p>AJRG and Associates, Chartered Accountants (&quot;we&quot;, &quot;our&quot;, or &quot;the firm&quot;) is committed to protecting personal information in accordance with applicable Indian law, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDP Act).</p>
            <p>This policy describes how we collect, use, store, and handle personal information when you interact with this website or engage with our professional services.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following personal information:</p>
            <ul>
              <li><strong>Contact information:</strong> Name, email address, phone number, when you contact us via email, WhatsApp, or any contact form. Contact form submissions are retained in a secure database as a record of your enquiry, in addition to being emailed to our team.</li>
              <li><strong>Business information:</strong> Company name, designation, nature of business requirements, shared voluntarily by you for the purpose of a professional enquiry.</li>
              <li><strong>Usage data:</strong> Technical information such as browser type, IP address, and pages visited, collected automatically when you use this website.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use personal information only for the following purposes:</p>
            <ul>
              <li>To respond to your professional service enquiries.</li>
              <li>To provide and manage professional services under an engagement.</li>
              <li>To comply with legal, regulatory, and professional obligations.</li>
              <li>To improve the functionality of our website.</li>
            </ul>
            <p>We do not use personal information for unsolicited marketing, profiling, or any purpose not connected to the above.</p>

            <h2>4. Sharing of Information</h2>
            <p>We do not sell, rent, or trade personal information. We may share information only in the following circumstances:</p>
            <ul>
              <li>With associate professionals or service providers engaged to assist in the performance of professional services, subject to appropriate confidentiality obligations.</li>
              <li>Where required by law, court order, or statutory authority.</li>
              <li>With your explicit consent.</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>We retain personal information for as long as necessary to fulfil the purpose for which it was collected, including any legal, regulatory, or professional obligation to retain records. For professional engagements, records are typically retained for a minimum of eight years in accordance with applicable professional standards.</p>

            <h2>6. Data Security</h2>
            <p>We implement reasonable security measures to protect personal information against unauthorised access, alteration, or disclosure. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.</p>

            <h2>7. Cookies</h2>
            <p>This website may use cookies for basic functionality. Please refer to our <a href="/cookies" className="text-[var(--accent)]">Cookie Policy</a> for details.</p>

            <h2>8. Your Rights</h2>
            <p>Subject to applicable law, you may have the right to access, correct, or request erasure of personal information we hold about you. To exercise any such right, please contact us at <a href="mailto:contact@ajrgca.com" className="text-[var(--accent)]">contact@ajrgca.com</a>.</p>

            <h2>9. Third-Party Links</h2>
            <p>This website may contain links to third-party sites. This Privacy Policy does not apply to those sites. We encourage you to review the privacy policies of any third-party websites you visit.</p>

            <h2>10. Changes to This Policy</h2>
            <p>We may update this policy from time to time. The current version will always be available on this page with the date of last update.</p>

            <h2>11. Contact</h2>
            <p>For any privacy-related queries or requests, please contact us at <a href="mailto:contact@ajrgca.com" className="text-[var(--accent)]">contact@ajrgca.com</a>.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
