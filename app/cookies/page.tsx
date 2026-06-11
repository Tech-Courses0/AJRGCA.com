import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for AJRG and Associates website.',
}

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <section className="pt-36 pb-28 px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4">Legal</p>
          <h1 className="font-serif-display font-normal text-[clamp(2rem,4vw,3rem)] text-[var(--ink)] leading-tight mb-10">Cookie Policy</h1>

          <div className="prose-legal">
            <p className="text-[0.72rem] text-[var(--ink-3)] mb-8">Last updated: June 2025</p>

            <h2>1. What Are Cookies</h2>
            <p>Cookies are small text files placed on your device by a website when you visit it. They are widely used to make websites function correctly and to provide basic usage information to site operators.</p>

            <h2>2. How We Use Cookies</h2>
            <p>This website may use the following types of cookies:</p>
            <ul>
              <li><strong>Strictly necessary cookies:</strong> Required for the website to function. These cannot be disabled without affecting website functionality. They do not collect personal information for marketing purposes.</li>
              <li><strong>Analytics cookies:</strong> We may use anonymised analytics tools to understand how visitors interact with our site (e.g., pages visited, time spent). This information is used only to improve the website and is not linked to any individual.</li>
            </ul>
            <p>We do not use cookies for advertising, behavioural tracking, or targeted marketing.</p>

            <h2>3. Third-Party Cookies</h2>
            <p>This website may include content or links from third-party services (such as embedded maps or social media links). These third parties may set their own cookies. We have no control over third-party cookies, and you should review the privacy and cookie policies of those services.</p>

            <h2>4. Managing Cookies</h2>
            <p>You can control and delete cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Note that disabling cookies may affect the functionality of this website. For instructions on managing cookies, please refer to your browser&apos;s help documentation.</p>

            <h2>5. Consent</h2>
            <p>By continuing to use this website, you consent to our use of strictly necessary cookies. Where analytics or non-essential cookies are in use, we will seek your consent in accordance with applicable law.</p>

            <h2>6. Contact</h2>
            <p>For any queries regarding cookies, contact us at <a href="mailto:contact@ajrgca.com" className="text-[var(--accent)]">contact@ajrgca.com</a>.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
