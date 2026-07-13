'use client'

import { useState } from 'react'
import { Drawer } from 'hiraki'
import { Button } from '@/components/ui/button'

function DemoStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose flex min-h-[150px] items-center justify-center border border-dashed border-line bg-base p-8 rounded-[var(--hiraki-radius)]">
      {children}
    </div>
  )
}

/* Basic — the primitive with restrained, on-brand product styling. */
export function BasicDrawerDemo() {
  const [open, setOpen] = useState(false)

  return (
    <DemoStage>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Button size="md" onClick={() => setOpen(true)}>
          Open drawer
        </Button>
        <Drawer.Portal>
          <Drawer.Overlay
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-fg) 24%, transparent)' }}
          />
          <Drawer.Content className="border border-line border-b-0 bg-surface text-fg outline-none">
            <Drawer.Handle className="mt-3" />
            <div className="space-y-4 p-6">
              <div>
                <Drawer.Title className="text-base font-semibold">Edit profile</Drawer.Title>
                <Drawer.Description className="mt-1 text-sm text-muted">
                  Same primitives, your own classes.
                </Drawer.Description>
              </div>
              <div className="grid gap-2">
                {['Name', 'Role'].map((item) => (
                  <div
                    key={item}
                    className="border border-line bg-base px-3 py-2 text-sm text-muted rounded-[var(--radius-sm)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <Drawer.Close asChild>
                <Button variant="secondary" size="sm">
                  Close
                </Button>
              </Drawer.Close>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </DemoStage>
  )
}

/* Soft — calm, light, product-app voice. No gradients, no glow. */
export function SoftDrawerDemo() {
  const [open, setOpen] = useState(false)

  return (
    <DemoStage>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 rounded-[var(--radius-sm)]"
        >
          Open soft sheet
        </button>
        <Drawer.Portal>
          <Drawer.Overlay style={{ background: 'rgba(9, 9, 11, 0.28)' }} />
          <Drawer.Content className="bg-white text-zinc-900 outline-none">
            <Drawer.Handle />
            <div className="space-y-5 p-6">
              <div>
                <Drawer.Title className="text-lg font-semibold">Preferences</Drawer.Title>
                <Drawer.Description className="mt-1 text-sm text-zinc-500">
                  A soft, bright product surface on top of the primitives.
                </Drawer.Description>
              </div>
              <div className="grid gap-2">
                {[
                  ['Language', 'English'],
                  ['Theme', 'System'],
                  ['Notifications', 'On'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between border border-zinc-200 bg-zinc-50 px-4 py-3 rounded-[var(--radius-sm)]"
                  >
                    <span className="text-sm text-zinc-500">{label}</span>
                    <span className="text-sm font-medium text-zinc-900">{value}</span>
                  </div>
                ))}
              </div>
              <Drawer.Close asChild>
                <button
                  type="button"
                  className="inline-flex items-center bg-zinc-950 px-4 py-2 text-sm font-medium text-white rounded-[var(--radius-sm)]"
                >
                  Done
                </button>
              </Drawer.Close>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </DemoStage>
  )
}

/* Editorial — loud voice, but monochrome and square. High contrast, no neon. */
export function EditorialDrawerDemo() {
  const [open, setOpen] = useState(false)

  return (
    <DemoStage>
      <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-none border border-zinc-950 bg-zinc-950 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950"
        >
          Open editorial panel
        </button>
        <Drawer.Portal>
          <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
          <Drawer.Content
            className="h-full w-full max-w-md border-l-2 border-white bg-neutral-950 text-neutral-100 outline-none"
            style={{ borderRadius: 0 }}
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-white/15 px-6 py-5">
                <Drawer.Title className="text-[11px] font-bold uppercase tracking-[0.32em] text-neutral-400">
                  Issue 04
                </Drawer.Title>
                <Drawer.Description className="mt-3 max-w-xs text-2xl font-semibold leading-tight text-neutral-50">
                  Same primitive, a completely different visual language.
                </Drawer.Description>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto px-6 py-6">
                {[
                  'Heavy typography',
                  'Square geometry',
                  'High contrast',
                  'Same accessible behavior underneath',
                ].map((item) => (
                  <div
                    key={item}
                    className="border border-white/15 px-4 py-3 text-sm font-medium text-neutral-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 border-t border-white/15 px-6 py-5">
                <Drawer.Close asChild>
                  <button
                    type="button"
                    className="inline-flex items-center border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-neutral-100"
                  >
                    Close
                  </button>
                </Drawer.Close>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </DemoStage>
  )
}
