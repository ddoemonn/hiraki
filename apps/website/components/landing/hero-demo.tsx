'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Github, ArrowRight } from 'lucide-react'
import { Drawer } from 'hiraki'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

export function HeroDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <Button size="lg" onClick={() => setOpen(true)}>
          Open demo
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Link
          href="/docs"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--hiraki-radius)] px-5 text-sm font-medium text-muted transition-colors hover:text-fg"
          style={{ border: '1px solid var(--code-border-strong)', background: 'var(--code-bg)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
        >
          Docs
        </Link>
        <a
          href="https://github.com/ozergokalpsezer/hiraki"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--hiraki-radius)] px-5 text-sm font-medium text-muted transition-colors hover:text-fg"
          style={{ border: '1px solid var(--code-border-strong)', background: 'var(--code-bg)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>

      <Drawer.Root open={open} onOpenChange={setOpen} direction="bottom">
        <Drawer.Portal>
          <Drawer.Overlay />
          <DemoDrawerContent />
        </Drawer.Portal>
      </Drawer.Root>
    </>
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
            hiraki bottom drawer
          </Drawer.Title>
          <Drawer.Description className="text-sm text-dim mt-1">
            Drag up and down. Release with velocity to snap or dismiss.
          </Drawer.Description>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {['Bottom ↓', 'Top ↑', 'Left ←', 'Right →'].map((label) => (
            <div
              key={label}
              className="flex h-12 items-center justify-center rounded-[var(--hiraki-radius)] border border-line bg-raised text-xs text-dim font-mono"
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
