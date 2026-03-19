import { Github, ExternalLink } from 'lucide-react'
import { CopyButton } from '@/components/ui/copy-button'

export function InstallCta() {
  return (
    <section className="w-full">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs font-mono text-dim mb-2">get started</p>
        <h2 className="text-2xl font-bold text-fg mb-6">Open source, free forever</h2>
        <p className="text-sm text-muted mb-10 max-w-lg leading-relaxed">
          MIT licensed. No paid tiers, no telemetry, no vendor lock-in.
          Contributions welcome.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-0 border border-line bg-surface w-fit">
            <span className="px-4 py-2.5 text-sm font-mono text-dim border-r border-line">npm</span>
            <span className="px-4 py-2.5 text-sm font-mono text-muted">npm install hiraki</span>
            <div className="border-l border-line">
              <CopyButton text="npm install hiraki" />
            </div>
          </div>

          <div className="flex items-center gap-0 border border-line bg-surface w-fit">
            <span className="px-4 py-2.5 text-sm font-mono text-dim border-r border-line">pnpm</span>
            <span className="px-4 py-2.5 text-sm font-mono text-muted">pnpm add hiraki</span>
            <div className="border-l border-line">
              <CopyButton text="pnpm add hiraki" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <a
            href="https://github.com"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-muted transition-colors font-mono"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://npmjs.com"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-muted transition-colors font-mono"
          >
            <ExternalLink className="w-4 h-4" />
            npm
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-line">
          <p className="text-xs font-mono text-dim">
            hiraki (開き) — React drawer component · MIT License
          </p>
        </div>
      </div>
    </section>
  )
}
