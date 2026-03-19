'use client'

import { useState } from 'react'
import { Github, ArrowRight } from 'lucide-react'
import { Drawer } from 'hiraki'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/ui/copy-button'
import { cn } from '@/lib/cn'

export function Hero() {
  const [open, setOpen] = useState(false)

  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-fg leading-[1] mb-2">
          hiraki
        </h1>
        <p className="text-2xl md:text-3xl font-light text-dim mb-1 font-sans">
          開き
        </p>
        <p className="text-sm text-dim font-mono mb-8">
          Japanese · noun · &quot;an opening&quot; or &quot;the act of opening&quot;
        </p>

        <p className="text-base text-muted max-w-xl mb-10 leading-relaxed">
          A zero-dependency React drawer component. All 4 directions, velocity-aware gestures,
          snap points, 6 variants, and a pure CSS animation system — without Radix,
          Framer Motion, or any external runtime dependencies.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-12">
          <Button size="lg" onClick={() => setOpen(true)}>
            Open demo
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="lg">
            <Github className="w-4 h-4" />
            GitHub
          </Button>
        </div>

        <div className="flex items-center gap-0 border border-line bg-surface w-fit rounded-[16px] overflow-hidden">
          <span className="px-4 py-2.5 text-sm font-mono text-dim border-r border-line">$</span>
          <span className="px-4 py-2.5 text-sm font-mono text-muted">pnpm add hiraki</span>
          <div className="border-l border-line">
            <CopyButton text="pnpm add hiraki" />
          </div>
        </div>
      </div>

      <Drawer.Root open={open} onOpenChange={setOpen} direction="bottom">
        <Drawer.Portal>
          <Drawer.Overlay />
          <DemoDrawerContent />
        </Drawer.Portal>
      </Drawer.Root>
    </section>
  )
}

function DemoDrawerContent() {
  return (
    <Drawer.Content
      className={cn(
        'flex flex-col bg-surface border border-line border-b-0',
        'max-h-[85dvh] outline-none',
      )}
    >
      <Drawer.Handle className="mt-3" />
      <div className="flex flex-col gap-4 p-6 overflow-y-auto">
        <div>
          <Drawer.Title className="text-base font-semibold text-fg font-mono">
            hiraki — bottom drawer
          </Drawer.Title>
          <Drawer.Description className="text-sm text-dim mt-1">
            Drag up and down. Release with velocity to snap or dismiss.
          </Drawer.Description>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {['Bottom ↓', 'Top ↑', 'Left ←', 'Right →'].map((label) => (
            <div
              key={label}
              className="flex items-center justify-center h-12 border border-line text-xs text-dim font-mono bg-raised"
            >
              {label}
            </div>
          ))}
        </div>
        <Drawer.Close asChild>
          <Button variant="secondary" size="sm" className="mt-1 w-fit">
            Close
          </Button>
        </Drawer.Close>
      </div>
    </Drawer.Content>
  )
}
