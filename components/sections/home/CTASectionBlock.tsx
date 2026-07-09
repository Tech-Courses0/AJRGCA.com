import CTASection from '@/components/sections/CTASection'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableText from '@/components/editable/EditableText'
import ColorSwatch from '@/components/editable/ColorSwatch'
import { useLiveValue } from '@/components/editable/EditorContext'
import type { SiteContent } from '@/types/content'

export default function CTASectionBlock({ content }: { content: SiteContent }) {
  const c = content.pages.home.cta
  const primaryColor = useLiveValue('pages.home.cta.primaryColor', c.primaryColor)
  const secondaryColor = useLiveValue('pages.home.cta.secondaryColor', c.secondaryColor)
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
      primaryLabel={<EditableText path="pages.home.cta.primaryLabel" value={c.primaryLabel} as="span" hrefPath="pages.home.cta.primaryHref" hrefValue={c.primaryHref} />}
      primaryHref={c.primaryHref}
      primaryColor={primaryColor}
      primarySwatch={<ColorSwatch path="pages.home.cta.primaryColor" label="Button colour" />}
      secondaryLabel={<EditableText path="pages.home.cta.secondaryLabel" value={c.secondaryLabel} as="span" hrefPath="pages.home.cta.secondaryHref" hrefValue={c.secondaryHref} />}
      secondaryHref={c.secondaryHref}
      secondaryColor={secondaryColor}
      secondarySwatch={<ColorSwatch path="pages.home.cta.secondaryColor" label="Button colour" />}
    />
  )
}
