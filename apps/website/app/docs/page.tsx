import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpLeft } from 'lucide-react'
import { GithubIcon } from '@/components/ui/icons'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { CodeBlock } from '@/components/ui/code-block'
import { TerminalBlock } from '@/components/ui/terminal-block'
import {
  BasicDrawerDemo,
  SoftDrawerDemo,
  EditorialDrawerDemo,
} from '@/components/docs/docs-previews'
import {
  quickStartExample,
  behaviorExample,
  rootPropRows,
  subcomponentRows,
  type PropRow,
} from '@/components/docs/docs-content'

export const metadata: Metadata = {
  title: 'Docs — hiraki',
  description:
    'Documentation for hiraki, the accessible zero-dependency React drawer primitives that are meant to be redesigned.',
}

const stylingExample = `// Same primitive, swap the classes.
<Drawer.Content className="rounded-t-2xl bg-white text-zinc-900">
  {/* soft product sheet */}
</Drawer.Content>

<Drawer.Content className="rounded-none border-l-2 border-white bg-neutral-950">
  {/* square editorial panel */}
</Drawer.Content>`

function Section({
  id,
  label,
  title,
  lead,
  children,
}: {
  id: string
  label: string
  title: string
  lead?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 pt-20 first:pt-0">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{label}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-[28px] sm:leading-tight">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{lead}</p>
      ) : null}
      <div className="prose-docs mt-7">{children}</div>
    </section>
  )
}

function Code({
  code,
  filename,
  lang = 'tsx',
}: {
  code: string
  filename?: string
  lang?: 'tsx' | 'bash'
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-surface">
      <CodeBlock code={code} lang={lang} filename={filename} />
    </div>
  )
}

function PropTable({ rows }: { rows: readonly PropRow[] }) {
  return (
    <div className="not-prose my-6">
      {rows.map((row) => (
        <div
          key={row.name}
          className="grid gap-1 border-b border-line py-3.5 first:border-t sm:grid-cols-[minmax(0,190px)_minmax(0,1fr)] sm:gap-6"
        >
          <div className="flex items-baseline justify-between gap-3 sm:block">
            <code className="font-mono text-[13px] text-fg">{row.name}</code>
            <span className="font-mono text-[11px] text-dim sm:hidden">{row.default}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline justify-between gap-4">
              <p className="min-w-0 break-words font-mono text-[11px] leading-relaxed text-dim">
                {row.type}
              </p>
              <span className="hidden shrink-0 font-mono text-[11px] text-dim sm:inline">
                {row.default}
              </span>
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{row.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function DocsPage() {
  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-line bg-base/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
          <Link href="/" className="group flex items-baseline gap-2">
            <ArrowUpLeft className="h-3.5 w-3.5 self-center text-dim transition-colors group-hover:text-fg" />
            <span className="text-sm font-semibold tracking-tight text-fg">hiraki</span>
            <span className="font-sans text-sm text-dim">開き</span>
          </Link>
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/ddoemonn/hiraki"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center text-dim transition-colors hover:text-fg"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <Section
          id="overview"
          label="overview"
          title="Accessible drawer behavior, none of the visual system."
          lead="hiraki handles semantics, gestures, snap points, dismissal, and focus management. Your product keeps full control of the surface — color, radius, type, spacing, and motion."
        >
          <p>
            It ships zero runtime dependencies: no Radix, no Framer Motion, ~10&nbsp;KB gzipped.
            Behavior lives in the library; everything you can see stays in your app.
          </p>
          <p>
            There is no CSS file to import and no class names to override. You style the primitives
            with Tailwind, CSS variables, or the <code>style</code> prop — and the same component can
            look calm and product-like in one place and loud and editorial in another.
          </p>
        </Section>

        <Section id="install" label="install" title="Add the package">
          <p>Install with your package manager of choice, then compose the primitives directly in your UI.</p>
          <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
            <TerminalBlock command="pnpm add hiraki" label="pnpm" />
            <TerminalBlock command="npm install hiraki" label="npm" />
          </div>
        </Section>

        <Section
          id="quick-start"
          label="quick start"
          title="Structure first, styling second"
          lead="Start from the structural parts. Once the behavior works, attach your classes and tokens."
        >
          <Code code={quickStartExample} filename="quick-start.tsx" />
          <p>Open it to feel the gesture, velocity, and dismissal in a minimal product skin:</p>
          <BasicDrawerDemo />
        </Section>

        <Section
          id="styling"
          label="styling"
          title="One primitive, any product voice"
          lead="The behavior layer stays stable while your team owns the visual direction. Both drawers below are the same primitives — only the class names differ."
        >
          <Code code={stylingExample} filename="styling.tsx" />
          <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
            <SoftDrawerDemo />
            <EditorialDrawerDemo />
          </div>
        </Section>

        <Section
          id="behavior"
          label="behavior"
          title="Behavior stays consistent while the style changes"
          lead="Direction, snap points, dismissal, and drag physics come from the primitive layer."
        >
          <ul>
            <li><strong>Directions</strong> — bottom, top, left, and right, each with the correct gesture axis.</li>
            <li><strong>Snap points</strong> — pixel values, percentages, and the <code>content</code> keyword.</li>
            <li><strong>Accessibility</strong> — dialog semantics, focus trap, Escape, overlay dismissal, scroll lock.</li>
            <li><strong>Control model</strong> — open state and active snap point can both be controlled from the parent.</li>
            <li><strong>Handle</strong> — an optional affordance; place it where the direction makes sense, or hide it.</li>
          </ul>
          <Code code={behaviorExample} filename="behavior.tsx" />
        </Section>

        <Section
          id="api"
          label="api"
          title="Compound API"
          lead="Every prop, type, and default. All parts also forward standard HTML attributes — className, style, data-*, and event handlers."
        >
          <h3 className="mb-0 font-mono text-sm font-medium text-fg">Drawer.Root</h3>
          <PropTable rows={rootPropRows} />

          {subcomponentRows.map((group) => (
            <div key={group.component}>
              <h3 className="mb-0 font-mono text-sm font-medium text-fg">{group.component}</h3>
              <PropTable rows={group.props} />
            </div>
          ))}
        </Section>
      </main>
    </div>
  )
}
