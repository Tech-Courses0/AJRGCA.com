'use client'

import clsx from 'clsx'
import { Type, Heading, List, ListOrdered, Plus } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import { useEditor } from '@/components/editable/EditorContext'
import type { SiteContent, LegalKey } from '@/types/content'
import type { ArticleBlock } from '@/types'

export default function LegalPageView({ content, docKey }: { content: SiteContent; docKey: LegalKey }) {
  const { isEditing, getValue, setValue } = useEditor()
  const doc = content.pages.legal[docKey]
  const base = `pages.legal.${docKey}`
  const bodyPath = `${base}.body`

  function addBlock(block: ArticleBlock) {
    const current = (getValue(bodyPath) as ArticleBlock[] | undefined) ?? doc.body
    setValue(bodyPath, [...current, block])
  }

  return (
    <>
      <Navbar content={content} />
      {/* LegalPageView is only ever rendered in edit mode from inside
          LegalEditorView, which adds a fixed doc-switcher bar just below
          Navbar — clear it with extra top padding. */}
      <section className={clsx('pb-28 px-8 bg-white', isEditing ? 'pt-[188px]' : 'pt-36')}>
        <div className="max-w-3xl mx-auto">
          <EditableRichText path={`${base}.eyebrow`} value={doc.eyebrow} as="p" className="text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4" />
          <EditableRichText path={`${base}.title`} value={doc.title} as="h1" className="font-serif-display font-normal text-[clamp(2rem,4vw,3rem)] text-[var(--ink)] leading-tight mb-10" />

          <div className="prose-legal">
            <EditableRichText path={`${base}.lastUpdated`} value={doc.lastUpdated} as="p" className="text-[0.72rem] text-[var(--ink-3)] mb-8" />

            <EditableRepeater<ArticleBlock>
              path={bodyPath}
              items={doc.body}
              newItem={() => ({ type: 'paragraph', text: 'New paragraph.' })}
              allowAdd={false}
              renderItem={(block, i) => {
                if (block.type === 'section') {
                  return (
                    <div key={i} className="flex gap-3 items-start not-prose">
                      <EditableRichText
                        path={`${bodyPath}.${i}.number`}
                        value={block.number ?? ''}
                        as="span"
                        className="flex-shrink-0 font-syne font-bold text-[0.95rem] text-[var(--ink)] w-10 pt-0.5"
                      />
                      <EditableRichText path={`${bodyPath}.${i}.text`} value={block.text ?? ''} as="div" className="flex-1" />
                    </div>
                  )
                }
                if (block.type === 'heading') {
                  return <EditableRichText key={i} path={`${bodyPath}.${i}.text`} value={block.text ?? ''} as="h2" />
                }
                if (block.type === 'list') {
                  return (
                    <ul key={i}>
                      <EditableRepeater<string>
                        path={`${bodyPath}.${i}.items`}
                        items={block.items ?? []}
                        newItem={() => 'New item.'}
                        addLabel="Add item"
                        renderItem={(item, j) => (
                          <li key={j}>
                            <EditableRichText path={`${bodyPath}.${i}.items.${j}`} value={item} as="span" />
                          </li>
                        )}
                      />
                    </ul>
                  )
                }
                return <EditableRichText key={i} path={`${bodyPath}.${i}.text`} value={block.text ?? ''} as="p" />
              }}
            />
            {isEditing && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--border)] not-prose">
                <span className="text-[0.62rem] uppercase tracking-[0.08em] text-[var(--ink-4)] mr-1">Add</span>
                <AddButton icon={<ListOrdered size={12} />} label="Numbered section" onClick={() => addBlock({ type: 'section', number: '1.', text: 'New clause.' })} />
                <AddButton icon={<Type size={12} />} label="Paragraph" onClick={() => addBlock({ type: 'paragraph', text: 'New paragraph.' })} />
                <AddButton icon={<Heading size={12} />} label="Heading" onClick={() => addBlock({ type: 'heading', text: 'New heading' })} />
                <AddButton icon={<List size={12} />} label="Bullet list" onClick={() => addBlock({ type: 'list', items: ['New point'] })} />
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer content={content} />
    </>
  )
}

function AddButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-[#3b82f6] border border-dashed border-[#3b82f6]/40 rounded px-2 py-1 hover:bg-blue-50/60"
    >
      <Plus size={11} /> {icon} {label}
    </button>
  )
}
