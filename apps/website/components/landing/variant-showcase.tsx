'use client'

import { useState } from 'react'
import { Drawer } from 'hiraki'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

type Variant = 'default' | 'floating' | 'sheet'

const variants: { value: Variant; description: string }[] = [
  { value: 'default', description: 'Attached to bottom edge, full width.' },
  { value: 'floating', description: 'Detached with margin on all sides.' },
  { value: 'sheet', description: 'Full width, no border radius.' },
]

export function VariantShowcase() {
  const [active, setActive] = useState<Variant | null>(null)

  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs font-mono text-dim mb-2">variants</p>
        <h2 className="text-2xl font-bold text-fg mb-8">6 visual modes, one API</h2>

        <div className="flex flex-wrap gap-px border border-line w-fit mb-6">
          {variants.map((v) => (
            <button
              key={v.value}
              onClick={() => setActive(v.value)}
              className="px-4 py-2 text-xs font-mono text-dim hover:text-fg hover:bg-raised border-r border-line last:border-r-0 transition-colors cursor-pointer bg-surface"
            >
              variant=&quot;{v.value}&quot;
            </button>
          ))}
        </div>

        {variants.map((v) => (
          <Drawer.Root
            key={v.value}
            open={active === v.value}
            onOpenChange={(o) => !o && setActive(null)}
            variant={v.value}
          >
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Content
                className={cn(
                  'flex flex-col bg-surface border border-line outline-none',
                  v.value !== 'floating' && 'border-b-0',
                )}
              >
                <Drawer.Handle className="mt-3" />
                <div className="p-6">
                  <p className="text-xs font-mono text-dim mb-3">variant=&quot;{v.value}&quot;</p>
                  <Drawer.Title className="text-base font-semibold text-fg mb-1">
                    {v.value}
                  </Drawer.Title>
                  <Drawer.Description className="text-sm text-muted mb-5">
                    {v.description}
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
