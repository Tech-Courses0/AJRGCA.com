import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for use of the AJRG and Associates website.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <section className="pt-36 pb-28 px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4">Legal</p>
          <h1 className="font-serif-display font-normal text-[clamp(2rem,4vw,3rem)] text-[var(--ink)] leading-tight mb-10">Terms &amp; Conditions</h1>

          <div className="prose-legal">
            <p className="text-[0.72rem] text-[var(--ink-3)] mb-8">Last updated: June 2025</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.</p>

            <h2>2. Website Use</h2>
            <p>This website is provided for general informational purposes only. You may browse this website for personal and non-commercial use. You may not:</p>
            <ul>
              <li>Reproduce, copy, or redistribute any content from this website without prior written permission.</li>
              <li>Use this website for any unlawful purpose.</li>
              <li>Attempt to gain unauthorised access to any part of this website or related systems.</li>
            </ul>

            <h2>3. No Professional Advice</h2>
            <p>Information on this website does not constitute legal, financial, tax, accounting, or professional advice. No client or professional relationship is created by use of this website. Please refer to our <a href="/disclaimer" className="text-[var(--accent)]">Disclaimer</a> for full details.</p>

            <h2>4. Intellectual Property</h2>
            <p>All content on this website, including text, logos, graphics, and design, is the property of AJRG and Associates or its licensors and is protected by applicable intellectual property laws. No content may be used without prior written consent.</p>

            <h2>5. Accuracy of Information</h2>
            <p>We endeavour to keep information on this website accurate and up to date. However, we do not warrant the completeness, accuracy, or currency of any information. We reserve the right to modify or remove content at any time without notice.</p>

            <h2>6. Third-Party Links</h2>
            <p>This website may contain links to third-party websites. We do not endorse or take responsibility for the content, accuracy, or practices of linked sites. Visiting linked sites is at your own risk.</p>

            <h2>7. Limitation of Liability</h2>
            <p>To the extent permitted by applicable law, AJRG and Associates shall not be liable for any direct, indirect, incidental, consequential, or other damages arising from the use of or inability to use this website, or reliance on its content.</p>

            <h2>8. Professional Engagement</h2>
            <p>Engagement of professional services from AJRG and Associates is subject to a separate written engagement letter. These Terms and Conditions govern use of this website only and do not form part of any professional service agreement.</p>

            <h2>9. Privacy</h2>
            <p>Use of this website is also governed by our <a href="/privacy-policy" className="text-[var(--accent)]">Privacy Policy</a>, which is incorporated into these Terms by reference.</p>

            <h2>10. Governing Law</h2>
            <p>These Terms and Conditions are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.</p>

            <h2>11. Changes to These Terms</h2>
            <p>We may revise these Terms from time to time. The current version will always be available on this page. Continued use of the website after any changes constitutes acceptance of the revised Terms.</p>

            <h2>12. Contact</h2>
            <p>For any queries regarding these Terms, contact us at <a href="mailto:contact@ajrgca.com" className="text-[var(--accent)]">contact@ajrgca.com</a>.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
