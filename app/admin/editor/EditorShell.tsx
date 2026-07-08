'use client'

import { useState } from 'react'
import { EditorProvider } from '@/components/editable/EditorContext'
import EditorToolbar from '@/components/editable/EditorToolbar'
import EditorDrawer from '@/components/editable/EditorDrawer'
import ThemePanel from '@/components/editable/ThemePanel'
import SettingsPanel from '@/components/editable/SettingsPanel'
import ThemeStyleLive from '@/components/theme/ThemeStyleLive'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomeSections from '@/components/sections/home/HomeSections'
import AboutPageView from '@/components/sections/about/AboutPageView'
import ServicesPageView from '@/components/sections/services/ServicesPageView'
import ApproachPageView from '@/components/sections/approach/ApproachPageView'
import IndustriesPageView from '@/components/sections/industries/IndustriesPageView'
import ContactPageView from '@/components/sections/contact/ContactPageView'
import InsightsPageView from '@/components/sections/insights/InsightsPageView'
import LegalEditorView from '@/components/sections/legal/LegalEditorView'
import BookPageView from '@/components/sections/book/BookPageView'
import type { SiteContent } from '@/types/content'

const PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'approach', label: 'Approach' },
  { id: 'industries', label: 'Industries' },
  { id: 'contact', label: 'Contact' },
  { id: 'insights', label: 'Insights' },
  { id: 'legal', label: 'Legal' },
  { id: 'book', label: 'Book' },
]

type PanelId = 'theme' | 'settings' | null

export default function EditorShell({ initialContent }: { initialContent: SiteContent }) {
  const [page, setPage] = useState('home')
  const [panel, setPanel] = useState<PanelId>(null)

  const togglePanel = (p: 'theme' | 'settings') => setPanel((cur) => (cur === p ? null : p))

  return (
    <EditorProvider initialContent={initialContent}>
      <ThemeStyleLive />
      <EditorToolbar
        pages={PAGES}
        activePage={page}
        onPageChange={setPage}
        activePanel={panel}
        onPanelToggle={togglePanel}
      />
      <div
        className="pt-12"
        // In the editor, clicking any link inside the page must NOT navigate
        // away — you edit in place and switch pages via the toolbar tabs. This
        // also lets the link-edit chips work without triggering their parent link.
        onClickCapture={(e) => {
          const anchor = (e.target as HTMLElement).closest('a[href]')
          if (anchor) e.preventDefault()
        }}
      >
        {page === 'about' ? (
          <AboutPageView content={initialContent} />
        ) : page === 'services' ? (
          <ServicesPageView content={initialContent} />
        ) : page === 'approach' ? (
          <ApproachPageView content={initialContent} />
        ) : page === 'industries' ? (
          <IndustriesPageView content={initialContent} />
        ) : page === 'contact' ? (
          <ContactPageView content={initialContent} />
        ) : page === 'insights' ? (
          <InsightsPageView content={initialContent} />
        ) : page === 'legal' ? (
          <LegalEditorView content={initialContent} />
        ) : page === 'book' ? (
          <BookPageView content={initialContent} />
        ) : (
          <>
            <Navbar content={initialContent} />
            <HomeSections content={initialContent} />
            <Footer content={initialContent} />
          </>
        )}
      </div>

      <EditorDrawer title="Theme" open={panel === 'theme'} onClose={() => setPanel(null)}>
        <ThemePanel />
      </EditorDrawer>
      <EditorDrawer title="Settings" open={panel === 'settings'} onClose={() => setPanel(null)}>
        <SettingsPanel />
      </EditorDrawer>
    </EditorProvider>
  )
}
