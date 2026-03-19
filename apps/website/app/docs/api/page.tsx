import type { Metadata } from 'next'
import { rootPropRows, subcomponentRows, type PropRow } from '@/components/docs/docs-content'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBadge } from '@/components/ui/code-badge'

export const metadata: Metadata = {
  title: 'API | Hiraki Docs',
}

function PropList({ rows }: { rows: readonly PropRow[] }) {
  return (
    <div className="rounded-[var(--hiraki-radius)] border border-line overflow-hidden">
      <div className="hidden sm:grid sm:grid-cols-[130px_1fr_70px] border-b border-line bg-raised px-4 py-2">
        <span className="font-mono text-[11px] text-dim">prop</span>
        <span className="font-mono text-[11px] text-dim">type · description</span>
        <span className="font-mono text-[11px] text-dim text-right">default</span>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.name}
          className={`px-4 py-3 ${i !== rows.length - 1 ? 'border-b border-line' : ''}`}
          style={{ background: i % 2 === 0 ? 'var(--surface-base)' : 'var(--surface-surface)' }}
        >
          <div className="flex items-start justify-between gap-2 sm:hidden mb-1.5">
            <CodeBadge code={row.name} compact />
            <span className="font-mono text-[11px] text-dim shrink-0">{row.default}</span>
          </div>
          <div className="sm:grid sm:grid-cols-[130px_1fr_70px] sm:items-start sm:gap-x-4">
            <div className="hidden sm:block pt-0.5">
              <CodeBadge code={row.name} compact />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[11px] text-dim leading-none mb-1">{row.type}</p>
              <p className="text-[11px] text-muted leading-relaxed">{row.description}</p>
            </div>
            <div className="hidden sm:block text-right font-mono text-[11px] text-dim pt-0.5">{row.default}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function DocsApiPage() {
  return (
    <DocsPageFrame
      eyebrow="api"
      title="Compound API"
      description="Every prop, type, and default. All components also forward standard HTML attributes — className, style, data-*, event handlers."
    >
      <div className="flex flex-col gap-8">
        <section>
          <p className="mb-3 font-mono text-xs text-dim">Drawer.Root</p>
          <PropList rows={rootPropRows} />
        </section>

        {subcomponentRows.map((section) => (
          <section key={section.component}>
            <p className="mb-3 font-mono text-xs text-dim">{section.component}</p>
            <PropList rows={section.props} />
          </section>
        ))}
      </div>
    </DocsPageFrame>
  )
}
