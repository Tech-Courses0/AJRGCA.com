import CTASection from '@/components/sections/CTASection'
import EditableRichText from '@/components/editable/EditableRichText'
import type { SiteContent } from '@/types/content'

export default function CTASectionBlock({ content }: { content: SiteContent }) {
  const c = content.pages.home.cta
  return (
    <CTASection
      title={
        <>
          <EditableRichText path="pages.home.cta.titleLead" value={c.titleLead} as="span" />
          <br />
          <em className="italic gold-text">
            <EditableRichText path="pages.home.cta.titleAccent" value={c.titleAccent} as="span" />
          </em>
        </>
      }
      subtitle={<EditableRichText path="pages.home.cta.subtitle" value={c.subtitle} as="span" />}
      buttonsPath="pages.home.cta.buttons"
      buttons={c.buttons}
    />
  )
}
