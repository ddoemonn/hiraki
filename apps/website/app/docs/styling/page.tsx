import type { Metadata } from 'next'
import { EditorialStylePreviewCard, SoftStylePreviewCard } from '@/components/docs/docs-previews'
import { editorialStyleExample, softStyleExample } from '@/components/docs/docs-content'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Styling | Hiraki Docs',
}

export default async function DocsStylingPage() {
  return (
    <DocsPageFrame
      eyebrow="styling"
      title="Same primitive, different Tailwind styling"
      description="This is the part that needs to be obvious. The two previews below use the same Hiraki primitives, but the Tailwind styling language is completely different."
    >
      <div className="space-y-10">
        <div className="rounded-[calc(var(--hiraki-radius)+4px)] border border-line bg-base p-4 md:p-6">
          <SoftStylePreviewCard />
          <div className="mt-6 overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-surface">
            <CodeBlock code={softStyleExample} lang="tsx" filename="soft-sheet.tsx" />
          </div>
        </div>

        <div className="rounded-[calc(var(--hiraki-radius)+4px)] border border-line bg-base p-4 md:p-6">
          <EditorialStylePreviewCard />
          <div className="mt-6 overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-surface">
            <CodeBlock code={editorialStyleExample} lang="tsx" filename="editorial-panel.tsx" />
          </div>
        </div>
      </div>
    </DocsPageFrame>
  )
}
