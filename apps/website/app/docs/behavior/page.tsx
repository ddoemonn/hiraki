import type { Metadata } from 'next'
import { behaviorExample } from '@/components/docs/docs-content'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Behavior | Hiraki Docs',
}

export default async function DocsBehaviorPage() {
  return (
    <DocsPageFrame
      eyebrow="behavior"
      title="Behavior stays consistent while the style changes"
      description="Direction, snap points, dismissal, and drag behavior come from the primitive layer. Styling those surfaces is still your responsibility."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-[var(--hiraki-radius)] border border-line p-6">
          <div className="space-y-4 text-sm text-muted">
            <p>Directions: bottom, top, left, right.</p>
            <p>Snap points: pixel values, percentages, and the content keyword.</p>
            <p>Accessibility: dialog semantics, focus trap, Escape, overlay dismissal, scroll lock.</p>
            <p>Control model: open state and active snap point can both be controlled from the parent.</p>
            <p>Handle: optional visual affordance. Place it where the direction makes sense, or hide it with `visible={false}`.</p>
          </div>
        </div>
        <div className="min-w-0 overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-base">
          <CodeBlock code={behaviorExample} lang="tsx" filename="behavior.tsx" />
        </div>
      </div>
    </DocsPageFrame>
  )
}
