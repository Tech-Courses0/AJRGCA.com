'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Plus, Type, Heading, List } from 'lucide-react'
import InsightCard from '@/components/ui/InsightCard'
import EditableText from '@/components/editable/EditableText'
import EditableRichText from '@/components/editable/EditableRichText'
import EditableRepeater from '@/components/editable/EditableRepeater'
import EditableImage from '@/components/editable/EditableImage'
import { useEditor } from '@/components/editable/EditorContext'
import type { Article, ArticleBlock } from '@/types'

/** Card colour presets (deck-purple / royal / cream) — new posts cycle these so
 *  they look intentional without the editor having to touch colours. */
const PRESETS = [
  { bgColor: '#221042', textColor: 'rgba(255,255,255,0.18)' },
  { bgColor: '#301850', textColor: 'rgba(255,255,255,0.20)' },
  { bgColor: '#F3EAD6', textColor: '#9A7635' },
]

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)
}

const newArticle = (): Article => {
  const preset = PRESETS[Math.floor(Math.random() * PRESETS.length)]
  return {
    slug: `new-post-${Date.now().toString(36)}`,
    category: 'Advisory',
    label: 'New Post',
    title: 'New article title',
    excerpt: 'A short summary shown on the card and in search results.',
    date: 'Month 2025',
    readTime: '5 min read',
    author: 'AJRG and Associates',
    ...preset,
    body: [{ type: 'paragraph', text: 'Write your article here.' }],
  }
}

export default function InsightsCards({ articles }: { articles: Article[] }) {
  const { isEditing, content } = useEditor()

  if (!isEditing) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((a) => (
          <Link key={a.slug} href={`/insights/${a.slug}`} className="no-underline">
            <InsightCard insight={a} />
          </Link>
        ))}
      </div>
    )
  }

  const list = (content?.articles as Article[] | undefined) ?? articles
  return (
    <div className="flex flex-col gap-5">
      <EditableRepeater<Article>
        path="articles"
        items={list}
        newItem={newArticle}
        addLabel="Add article"
        imageUploadPath={(_, i) => `articles.${i}.image`}
        renderItem={(a, i) => <ArticleEditorCard article={a} index={i} />}
      />
    </div>
  )
}

/* ── One article: card meta (always shown) + collapsible body editor ── */
function ArticleEditorCard({ article, index }: { article: Article; index: number }) {
  const { getValue, setValue } = useEditor()
  const [open, setOpen] = useState(false)
  const base = `articles.${index}`
  const slug = (getValue(`${base}.slug`) as string | undefined) ?? article.slug
  const bg = (getValue(`${base}.bgColor`) as string | undefined) ?? article.bgColor
  const fg = (getValue(`${base}.textColor`) as string | undefined) ?? article.textColor

  return (
    <div className="border border-[var(--border)] rounded-card bg-white p-5">
      <div className="flex gap-5">
        {/* Preview tile — a real uploaded photo takes over on both the card and
            the public site; until then the colour + label below is the fallback. */}
        <EditableImage
          path={`${base}.image`}
          value={article.image ?? null}
          alt={article.title}
          altPath={`${base}.imageAlt`}
          className="w-40 flex-shrink-0 aspect-video rounded-md"
          placeholderLabel="Article photo"
          hideChangeButton
        />

        {/* Meta */}
        <div className="flex-1 min-w-0">
          <EditableText path={`${base}.category`} value={article.category} as="p" className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-[var(--accent-dark)] mb-1.5" />
          <EditableText path={`${base}.title`} value={article.title} as="h3" className="font-syne font-bold text-[0.95rem] text-[var(--ink)] leading-snug mb-1.5" />
          <EditableText path={`${base}.excerpt`} value={article.excerpt} as="p" className="text-[0.78rem] text-[var(--ink-3)] leading-relaxed mb-2" />
          <div className="flex items-center gap-3 text-[0.72rem] text-[var(--ink-4)]">
            <EditableText path={`${base}.date`} value={article.date} as="span" />
            <span aria-hidden="true">·</span>
            <EditableText path={`${base}.readTime`} value={article.readTime} as="span" />
          </div>

          {/* Fallback tile (shown until a photo is uploaded above) */}
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            <span className="text-[0.62rem] uppercase tracking-[0.08em] text-[var(--ink-4)] mr-1">Fallback text</span>
            <EditableText path={`${base}.label`} value={article.label} as="span" className="text-[0.76rem] text-[var(--ink-2)]" />
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[0.62rem] uppercase tracking-[0.08em] text-[var(--ink-4)] mr-1">Fallback colour</span>
            {PRESETS.map((p) => (
              <button
                key={p.bgColor}
                type="button"
                title="Use this card colour"
                onClick={() => { setValue(`${base}.bgColor`, p.bgColor); setValue(`${base}.textColor`, p.textColor) }}
                className="w-5 h-5 rounded-full border border-[var(--border)]"
                style={{ backgroundColor: p.bgColor, outline: bg === p.bgColor ? '2px solid var(--accent)' : 'none', outlineOffset: 1 }}
                aria-label={`Card colour ${p.bgColor}`}
              >
                {fg && p.bgColor === bg ? <span className="sr-only">selected</span> : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slug */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <label className="text-[0.62rem] font-semibold uppercase tracking-[0.06em] text-[var(--ink-4)]">Web address</label>
        <span className="text-[0.72rem] text-[var(--ink-4)]">/insights/</span>
        <input
          type="text"
          defaultValue={slug}
          key={slug}
          onBlur={(e) => setValue(`${base}.slug`, slugify(e.target.value) || slug)}
          className="text-[0.72rem] border border-[var(--border)] rounded px-2 py-1 focus:outline-none focus:border-[var(--accent)]"
        />
        <span className="text-[0.62rem] text-amber-700">Changing this changes the article&apos;s link.</span>
      </div>

      {/* Body editor toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-4 flex items-center gap-1.5 text-[0.75rem] font-semibold text-[var(--accent)]"
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {open ? 'Hide article content' : 'Edit article content'}
      </button>

      {open && <ArticleBodyEditor index={index} body={article.body} />}
    </div>
  )
}

/* ── The article body: reorderable blocks + typed "add block" controls ── */
function ArticleBodyEditor({ index, body }: { index: number; body: ArticleBlock[] }) {
  const { getValue, setValue } = useEditor()
  const path = `articles.${index}.body`

  function addBlock(block: ArticleBlock) {
    const current = (getValue(path) as ArticleBlock[] | undefined) ?? body
    setValue(path, [...current, block])
  }

  return (
    <div className="mt-4 pt-4 border-t border-[var(--border)] flex flex-col gap-2">
      <EditableRepeater<ArticleBlock>
        path={path}
        items={body}
        newItem={() => ({ type: 'paragraph', text: 'New paragraph.' })}
        allowAdd={false}
        renderItem={(block, j) => <BlockEditor block={block} basePath={`${path}.${j}`} />}
      />
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[0.62rem] uppercase tracking-[0.08em] text-[var(--ink-4)] mr-1">Add</span>
        <AddButton icon={<Type size={12} />} label="Paragraph" onClick={() => addBlock({ type: 'paragraph', text: 'New paragraph.' })} />
        <AddButton icon={<Heading size={12} />} label="Heading" onClick={() => addBlock({ type: 'heading', text: 'New heading' })} />
        <AddButton icon={<List size={12} />} label="Bullet list" onClick={() => addBlock({ type: 'list', items: ['New point'] })} />
      </div>
    </div>
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

/* ── Render one block by its type ── */
function BlockEditor({ block, basePath }: { block: ArticleBlock; basePath: string }) {
  if (block.type === 'heading') {
    return <EditableRichText path={`${basePath}.text`} value={block.text ?? ''} as="p" className="font-serif-display text-[1.15rem] text-[var(--ink)] leading-snug" />
  }
  if (block.type === 'list') {
    return (
      <ul className="flex flex-col gap-1.5 pl-1">
        <EditableRepeater<string>
          path={`${basePath}.items`}
          items={block.items ?? []}
          newItem={() => 'New point'}
          addLabel="Add point"
          renderItem={(item, k) => (
            <li className="flex items-start gap-2 text-[0.85rem] text-[var(--ink-2)] leading-relaxed">
              <span className="w-3 h-px bg-[var(--accent)] flex-shrink-0 mt-[0.6rem]" aria-hidden="true" />
              <EditableText path={`${basePath}.items.${k}`} value={item} as="span" className="flex-1" />
            </li>
          )}
        />
      </ul>
    )
  }
  return <EditableRichText path={`${basePath}.text`} value={block.text ?? ''} as="p" className="text-[0.9rem] text-[var(--ink-2)] leading-[1.75]" />
}
