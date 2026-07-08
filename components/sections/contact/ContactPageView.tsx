import { Mail, MapPin, MessageCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionHeader from '@/components/ui/SectionHeader'
import ContactForm from '@/components/sections/ContactForm'
import EditableText from '@/components/editable/EditableText'
import EditableRichText from '@/components/editable/EditableRichText'
import { formatOffice } from '@/config/site'
import type { SiteContent } from '@/types/content'

export default function ContactPageView({ content }: { content: SiteContent }) {
  const { site } = content
  const p = content.pages.contact
  return (
    <>
      <Navbar content={content} />

      {/* ── Hero ── */}
      <section className="pt-36 pb-14 px-8 bg-[var(--cream)] relative overflow-hidden">
        <span className="bg-architectural absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="max-w-5xl mx-auto relative">
          <SectionHeader
            label={<EditableRichText path="pages.contact.hero.label" value={p.hero.label} as="span" />}
            title={<EditableRichText path="pages.contact.hero.title" value={p.hero.title} as="span" />}
            subtitle={<EditableRichText path="pages.contact.hero.subtitle" value={p.hero.subtitle} as="span" />}
          />
        </div>
      </section>

      {/* ── Form + details ── */}
      <section className="pb-24 px-8 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <EditableRichText path="pages.contact.formHeading" value={p.formHeading} as="h2" className="font-serif-display font-normal text-[1.6rem] text-[var(--ink)] mb-6" />
            <ContactForm />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="border border-[var(--border)] rounded-card p-7 bg-[var(--section)]">
              <EditableRichText path="pages.contact.getInTouchLabel" value={p.getInTouchLabel} as="p" className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--accent-dark)] mb-4" />
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-[0.88rem] text-[var(--ink-2)] no-underline hover:text-[var(--accent-dark)] transition-colors">
                <Mail size={15} className="text-[var(--accent)]" aria-hidden="true" /> {site.email}
              </a>
              <p className="flex items-center gap-2.5 text-[0.88rem] text-[var(--ink-3)] mt-3">
                <MessageCircle size={15} className="text-[var(--accent)]" aria-hidden="true" /> <EditableRichText path="pages.contact.whatsappNote" value={p.whatsappNote} as="span" />
              </p>
            </div>

            <div className="border border-[var(--border)] rounded-card p-7 bg-[var(--section)]">
              <EditableRichText path="pages.contact.officesLabel" value={p.officesLabel} as="p" className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--accent-dark)] mb-4" />

              <div className="flex items-start gap-2.5 mb-4">
                <MapPin size={15} className="text-[var(--accent)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <EditableRichText path="pages.contact.regOfficeLabel" value={p.regOfficeLabel} as="p" className="text-[0.72rem] font-semibold text-[var(--ink-2)] uppercase tracking-[0.04em]" />
                  <p className="text-[0.84rem] text-[var(--ink-3)] leading-relaxed mt-1">{formatOffice(site.registeredOffice)}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 mb-4">
                <MapPin size={15} className="text-[var(--accent)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <EditableRichText path="pages.contact.branchLabel" value={p.branchLabel} as="p" className="text-[0.72rem] font-semibold text-[var(--ink-2)] uppercase tracking-[0.04em]" />
                  <p className="text-[0.84rem] text-[var(--ink-3)] leading-relaxed mt-1">{formatOffice(site.branchOffice)}</p>
                </div>
              </div>

              <EditableRichText path="pages.contact.alsoServingNote" value={p.alsoServingNote} as="p" className="text-[0.78rem] text-[var(--ink-3)] mt-2" />
              <EditableRichText path="pages.contact.officeInProgressNote" value={p.officeInProgressNote} as="p" className="text-[0.72rem] text-[var(--ink-4)] mt-2 italic" />
            </div>
          </div>
        </div>

        {/* ── Map ── */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="flex items-center gap-2.5 mb-4">
            <MapPin size={15} className="text-[var(--accent)] flex-shrink-0" aria-hidden="true" />
            <EditableRichText path="pages.contact.mapLabel" value={p.mapLabel} as="p" className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--accent-dark)]" />
          </div>
          <div className="rounded-card overflow-hidden border border-[var(--border)] shadow-sm">
            <iframe
              title="AJRG & Associates — Noida branch office"
              src={p.mapEmbedUrl}
              className="w-full h-[360px] md:h-[440px] block border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a href={p.openInMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-[0.78rem] text-[var(--accent-dark)] underline">
            <EditableText path="pages.contact.openInMapsLabel" value={p.openInMapsLabel} as="span" hrefPath="pages.contact.openInMapsUrl" hrefValue={p.openInMapsUrl} />
          </a>
        </div>

        {/* Notices */}
        <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 bg-[var(--cream)] border border-[var(--border)] rounded-card">
            <p className="text-[0.78rem] text-[var(--ink-3)] leading-relaxed">
              <strong className="text-[var(--ink)]">Privacy Notice:</strong> <EditableRichText path="pages.contact.privacyNotice" value={p.privacyNotice} as="span" />
            </p>
          </div>
          <div className="p-6 bg-[var(--cream)] border border-[var(--border)] rounded-card">
            <p className="text-[0.78rem] text-[var(--ink-3)] leading-relaxed">
              <strong className="text-[var(--ink)]">Disclaimer:</strong> <EditableRichText path="pages.contact.disclaimerNotice" value={p.disclaimerNotice} as="span" />
            </p>
          </div>
        </div>
      </section>
      <Footer content={content} />
    </>
  )
}
