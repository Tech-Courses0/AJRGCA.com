import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for AJRG and Associates website. Information on this site is for general purposes only and does not constitute professional advice.',
}

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />
      <section className="pt-36 pb-28 px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4">Legal</p>
          <h1 className="font-serif-display font-normal text-[clamp(2rem,4vw,3rem)] text-[var(--ink)] leading-tight mb-10">Disclaimer</h1>

          <div className="prose-legal">
            <p className="text-[0.72rem] text-[var(--ink-3)] mb-8">Last updated: June 2025</p>

            <h2>1. General Information Only</h2>
            <p>The content on this website is provided for general informational purposes only. It does not constitute and should not be relied upon as legal, financial, tax, accounting, investment, or professional advice of any kind.</p>

            <h2>2. No Professional Relationship</h2>
            <p>Access to or use of this website does not create a professional, advisory, or client relationship between AJRG and Associates and any visitor or user. A formal professional relationship is established only through a signed engagement letter.</p>

            <h2>3. No Guarantee of Accuracy</h2>
            <p>While we endeavour to keep the information on this website current and accurate, we make no representations or warranties, express or implied, about the completeness, accuracy, reliability, or suitability of any information. Laws, regulations, and professional standards change frequently. Information on this site may not reflect the most recent developments.</p>

            <h2>4. Not a Substitute for Professional Advice</h2>
            <p>You should not act or refrain from acting on the basis of any information on this website without first seeking independent professional advice from a qualified advisor who has knowledge of your specific circumstances.</p>

            <h2>5. Limitation of Liability</h2>
            <p>AJRG and Associates, its partners, employees, and associates shall not be liable for any loss, damage, or expense (including consequential, incidental, or indirect loss) arising from or in connection with any use of or reliance on information contained on this website.</p>

            <h2>6. External Links</h2>
            <p>This website may contain links to third-party websites. AJRG and Associates does not endorse or assume responsibility for the content, accuracy, or practices of any linked third-party sites.</p>

            <h2>7. ICAI Compliance</h2>
            <p>AJRG and Associates is a firm of Chartered Accountants registered with the Institute of Chartered Accountants of India (ICAI). All professional services are rendered in accordance with the Chartered Accountants Act, 1949, ICAI Rules, and applicable professional standards. This website is maintained in accordance with applicable ICAI guidelines on website content and advertising.</p>

            <h2>8. No Solicitation</h2>
            <p>Nothing on this website is intended to solicit professional work in any manner prohibited under the Chartered Accountants Act, 1949 or applicable ICAI guidelines. Information is provided for awareness and educational purposes only.</p>

            <h2>9. Jurisdiction</h2>
            <p>This disclaimer is governed by the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.</p>

            <h2>10. Contact</h2>
            <p>For any queries regarding this disclaimer, please contact us at <a href="mailto:contact@ajrgca.com" className="text-[var(--accent)]">contact@ajrgca.com</a>.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
