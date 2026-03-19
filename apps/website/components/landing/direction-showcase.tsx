'use client'

import { useState } from 'react'
import { Drawer } from 'hiraki'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { CodeBadge } from '@/components/ui/code-badge'
import type { Direction } from 'hiraki'

const directions: { value: Direction; label: string; hint: string }[] = [
  { value: 'bottom', label: 'bottom', hint: 'Drag down to dismiss' },
  { value: 'top', label: 'top', hint: 'Drag up to dismiss' },
  { value: 'left', label: 'left', hint: 'Drag left to dismiss' },
  { value: 'right', label: 'right', hint: 'Drag right to dismiss' },
]

const contentStyle: Record<Direction, string> = {
  bottom: 'border-b-0 w-full',
  top: 'border-t-0 w-full',
  left: 'border-l-0 h-full max-w-xs',
  right: 'border-r-0 h-full max-w-xs',
}

export function DirectionShowcase() {
  const [active, setActive] = useState<Direction | null>(null)

  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs font-mono text-dim mb-2">direction</p>
        <h2 className="text-2xl font-bold text-fg mb-8">All 4 directions</h2>

        <div className="flex flex-wrap gap-2">
          {directions.map((d) => (
            <button
              key={d.value}
              onClick={() => setActive(d.value)}
              className="cursor-pointer"
            >
              <CodeBadge code={`direction="${d.value}"`} active={active === d.value} />
            </button>
          ))}
        </div>

        {directions.map((d) => (
          <Drawer.Root
            key={d.value}
            open={active === d.value}
            onOpenChange={(o) => !o && setActive(null)}
            direction={d.value}
          >
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Content
                className={cn(
                  'flex flex-col bg-surface border border-line outline-none',
                  contentStyle[d.value],
                )}
              >
                <Drawer.Handle className="mt-3" />
                <div className="p-6">
                  <p className="text-xs font-mono text-dim mb-3">direction=&quot;{d.value}&quot;</p>
                  <Drawer.Title className="text-base font-semibold text-fg mb-1">
                    {d.label} drawer
                  </Drawer.Title>
                  <Drawer.Description className="text-sm text-muted mb-5">
                    {d.hint}
                  </Drawer.Description>
                  <Drawer.Close asChild>
                    <Button variant="secondary" size="sm">Close</Button>
                  </Drawer.Close>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        ))}
      </div>
    </section>
  )
}
