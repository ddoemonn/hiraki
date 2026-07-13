import { HeroDemo } from '@/components/landing/hero-demo'
import { TerminalBlock } from '@/components/ui/terminal-block'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Hero() {
  return (
    <section className="w-full border-b border-line">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 md:py-28">
        <div className="mb-12 flex items-center justify-between">
          <span className="border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-dim rounded-[var(--radius-sm)]">
            v0.0.7
          </span>
          <ThemeToggle />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-fg leading-[1] mb-3">
          hiraki
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-dim font-sans mb-1">
          開き
        </p>
        <p className="text-xs text-dim font-mono mb-8">
          noun · &quot;an opening&quot;
        </p>

        <p className="text-base text-muted max-w-xl mb-10 leading-relaxed">
          A zero-dependency React drawer component. All 4 directions, velocity-aware gestures,
          snap points, 6 variants, and a pure CSS animation system without Radix,
          Framer Motion, or any external runtime dependencies.
        </p>

        <p className="text-sm text-dim max-w-2xl mb-8 leading-relaxed">
          Behavior-first primitives. No CSS file, no classNames. Style with Tailwind, CSS variables,
          or the style prop. Keep the behavior, redesign the surface.
        </p>

        <HeroDemo />

        <TerminalBlock
          command="pnpm add hiraki"
          label="install.sh"
          className="w-full sm:max-w-sm"
        />
      </div>
    </section>
  )
}
