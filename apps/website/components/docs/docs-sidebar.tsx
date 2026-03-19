'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { docsNav } from '@/components/docs/docs-content'
import { cn } from '@/lib/cn'

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="lg:max-h-[calc(100svh-8rem)] lg:overflow-y-auto">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-[var(--hiraki-radius)] px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
          style={{
            border: '1px solid var(--code-border-strong)',
            background: 'var(--code-bg)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
        <ThemeToggle />
      </div>

      <div className="mb-6 hidden lg:block">
        <p className="text-xs font-mono text-dim">hiraki/docs</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-fg">Documentation</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Accessible drawer primitives. Bring your own styles. Made to be redesigned.
        </p>
      </div>

      <nav className="flex flex-wrap gap-1 border-t border-line pt-4 lg:flex-col lg:space-y-1 lg:flex-nowrap lg:gap-0">
        {docsNav.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-[var(--hiraki-radius)] px-3 py-2 text-sm transition-colors',
                active
                  ? 'text-fg bg-surface'
                  : 'text-muted hover:text-fg hover:bg-surface/60',
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-6 hidden gap-3 border-t border-line pt-4 lg:grid">
        <a
          href="https://github.com/ddoemonn/hiraki"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/hiraki"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ExternalLink className="h-4 w-4" />
          npm package
        </a>
      </div>
    </div>
  )
}
