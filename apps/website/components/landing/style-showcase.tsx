import { EditorialStylePreviewCard } from '@/components/docs/docs-previews'
import { editorialStyleExample } from '@/components/docs/docs-content'
import { CodeBadge } from '@/components/ui/code-badge'
import { CodeBlock } from '@/components/ui/code-block'

export async function StyleShowcase() {
  return (
    <section className="w-full border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-2 text-xs font-mono text-dim">styling</p>
          <h2 className="mb-4 text-2xl font-bold text-fg md:text-3xl">
            Same primitive, different product voice
          </h2>
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Hiraki keeps the behavior layer stable and lets your team push the visual direction.
            The homepage only shows one stronger example here so the rest of the landing can stay minimal.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['accessible', 'behavior-first', 'bring your own styles', 'redesignable'].map((item) => (
              <CodeBadge key={item} code={item} compact />
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-start">
          <div className="min-w-0">
            <EditorialStylePreviewCard />
          </div>

          <div className="min-w-0">
            <div className="mb-4 max-w-xl">
              <p className="mb-2 text-xs font-mono text-dim">component example</p>
              <p className="text-sm leading-relaxed text-muted">
                A louder editorial treatment, built with the same `Drawer.Root`, `Drawer.Overlay`,
                `Drawer.Content`, `Drawer.Title`, and `Drawer.Close` primitives.
              </p>
            </div>
            <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-surface">
              <CodeBlock code={editorialStyleExample} lang="tsx" filename="editorial-panel.tsx" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
