import { HeroDemo } from '@/components/landing/hero-demo'
import { TerminalBlock } from '@/components/ui/terminal-block'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Hero() {
  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-4 py-14 sm:px-6 sm:py-20 md:py-28">
        <div className="mb-10 flex justify-end">
          <ThemeToggle />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-fg leading-[1] mb-2">
          hiraki
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-dim mb-1 font-sans">
          開き
        </p>
        <p className="text-sm text-dim font-mono mb-8">
          Japanese · noun · &quot;an opening&quot; or &quot;the act of opening&quot;
        </p>

        <p className="text-base text-muted max-w-xl mb-10 leading-relaxed">
          A zero-dependency React drawer component. All 4 directions, velocity-aware gestures,
          snap points, 6 variants, and a pure CSS animation system without Radix,
          Framer Motion, or any external runtime dependencies.
        </p>

        <p className="text-sm text-dim max-w-2xl mb-8 leading-relaxed">
          Accessible, headless, unstyled primitives. Keep the behavior, redesign the surface,
          and make the drawer feel native to your product instead of ours.
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
