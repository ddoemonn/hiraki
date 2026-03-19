import { Github, ExternalLink } from 'lucide-react'
import { TerminalBlock } from '@/components/ui/terminal-block'

export function InstallCta() {
  return (
    <section className="w-full">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 sm:py-16">
        <p className="text-xs font-mono text-dim mb-2">get started</p>
        <h2 className="text-2xl font-bold text-fg mb-6">Open source, free forever</h2>
        <p className="text-sm text-muted mb-10 max-w-lg leading-relaxed">
          MIT licensed. No paid tiers, no telemetry, no vendor lock-in.
          Contributions welcome.
        </p>

        <div className="flex flex-col gap-4">
          <TerminalBlock command="npm install hiraki" label="npm.sh" className="w-full sm:max-w-sm" />
          <TerminalBlock command="pnpm add hiraki" label="pnpm.sh" className="w-full sm:max-w-sm" />
        </div>

        <div className="flex items-center gap-4 mt-8">
          <a
            href="https://github.com/ozergokalpsezer/hiraki"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-muted transition-colors font-mono"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/hiraki"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-dim hover:text-muted transition-colors font-mono"
          >
            <ExternalLink className="w-4 h-4" />
            npm
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-line">
          <p className="text-xs font-mono text-dim">
            hiraki (開き), React drawer component · MIT License
          </p>
        </div>
      </div>
    </section>
  )
}
