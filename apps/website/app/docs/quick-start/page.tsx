import type { Metadata } from 'next'
import { BasicDocsPreview } from '@/components/docs/docs-previews'
import { quickStartExample } from '@/components/docs/docs-content'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Quick Start | Hiraki Docs',
}

export default async function DocsQuickStartPage() {
  return (
    <DocsPageFrame
      eyebrow="quick start"
      title="Primitive structure first"
      description="Start from the structural parts. Once the behavior works, attach your classes and tokens."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0">
          <BasicDocsPreview />
        </div>
        <div className="min-w-0 overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base">
          <CodeBlock code={quickStartExample} lang="tsx" filename="quick-start.tsx" />
        </div>
      </div>
    </DocsPageFrame>
  )
}
