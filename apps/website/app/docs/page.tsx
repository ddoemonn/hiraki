import type { Metadata } from 'next'
import { CodeBadge } from '@/components/ui/code-badge'
import { DocsIntroBadges } from '@/components/docs/docs-content'
import { DocsPageFrame } from '@/components/docs/docs-page-frame'

export const metadata: Metadata = {
  title: 'Docs | Hiraki',
  description:
    'Documentation for Hiraki, the accessible and headless React drawer primitives that are meant to be redesigned.',
}

export default function DocsOverviewPage() {
  return (
    <DocsPageFrame
      eyebrow="overview"
      title="The docs should prove the headless story, not just say it."
      description="Hiraki is for teams that want accessible drawer behavior without inheriting a visual system. The library handles semantics, gestures, snap points, dismissal, and focus management. Your product still owns the final look."
    >
      <DocsIntroBadges />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Accessible behavior',
            body: 'ARIA dialog semantics, focus trapping, Escape dismissal, overlay dismissal, and scroll locking belong in the library.',
          },
          {
            title: 'Headless styling',
            body: 'Color, radius, type, spacing, motion, and personality stay inside the consuming app.',
          },
          {
            title: 'Proof over promise',
            body: 'The docs below show the same primitive rendered in two very different Tailwind styles, and both are built from the actual package.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[var(--hiraki-radius)] border border-line p-5"
          >
            <p className="mb-3 text-sm font-semibold text-fg">{item.title}</p>
            <p className="text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {[
          'accessible',
          'focus trap',
          'snap points',
          'behavior-first',
          'bring your own styles',
          'redesignable',
        ].map((item) => (
          <CodeBadge key={item} code={item} />
        ))}
      </div>
    </DocsPageFrame>
  )
}
