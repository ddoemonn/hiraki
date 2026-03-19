'use client'

import { useState } from 'react'
import { Drawer } from 'hiraki'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

export function BasicDocsPreview() {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-[var(--hiraki-radius)] border border-line p-5">
      <div className="mb-5">
        <p className="text-sm font-semibold text-fg">Preview</p>
        <p className="mt-1 text-sm text-muted">
          This is the primitive structure with minimal product styling on top.
        </p>
      </div>

      <div className="rounded-[var(--hiraki-radius)] border border-dashed border-line bg-base p-6">
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Button size="md" onClick={() => setOpen(true)}>
            Open drawer
          </Button>
          <Drawer.Portal>
            <Drawer.Overlay
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-fg) 28%, transparent)' }}
            />
            <Drawer.Content
              className="border border-line bg-surface text-fg shadow-[0_-16px_40px_rgba(0,0,0,0.14)]"
            >
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
                      className="rounded-[calc(var(--hiraki-radius)-4px)] border border-line bg-base px-3 py-2 text-sm text-muted"
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
      </div>
    </div>
  )
}

export function StylesPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SoftStylePreviewCard />
      <EditorialStylePreviewCard />
    </div>
  )
}

export function SoftStylePreviewCard() {
  const [minimalOpen, setMinimalOpen] = useState(false)

  return (
    <div className="rounded-[var(--hiraki-radius)] border border-line p-5">
      <div className="mb-5">
        <p className="text-sm font-semibold text-fg">Style A: Soft product sheet</p>
        <p className="mt-1 text-sm text-muted">
          Calm, clean, and app-like. Uses the same drawer parts with a light surface treatment.
        </p>
      </div>

      <div className="rounded-[var(--hiraki-radius)] border border-dashed border-line bg-[linear-gradient(180deg,var(--color-surface),var(--color-base))] p-6">
        <Drawer.Root open={minimalOpen} onOpenChange={setMinimalOpen}>
          <button
            type="button"
            onClick={() => setMinimalOpen(true)}
            className={cn(
              'inline-flex items-center rounded-[var(--hiraki-radius)] border border-line bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm',
              'dark:bg-zinc-100 dark:text-zinc-950',
            )}
          >
            Open soft sheet
          </button>
          <Drawer.Portal>
            <Drawer.Overlay
              style={{ background: 'rgba(15, 23, 42, 0.28)', backdropFilter: 'blur(10px)' }}
            />
            <Drawer.Content
              className="bg-white text-zinc-900 dark:bg-zinc-50 dark:text-zinc-900"
            >
              <Drawer.Handle />

              <div className="space-y-5 p-6">
                <div>
                  <Drawer.Title className="text-lg font-semibold">Preferences</Drawer.Title>
                  <Drawer.Description className="mt-1 text-sm text-zinc-600">
                    Soft, bright, product UI styling applied on top of the primitives.
                  </Drawer.Description>
                </div>
                <div className="grid gap-3">
                  {[
                    ['Language', 'English'],
                    ['Theme', 'System'],
                    ['Notifications', 'On'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3"
                    >
                      <span className="text-sm text-zinc-500">{label}</span>
                      <span className="text-sm font-medium text-zinc-900">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Drawer.Close asChild>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-2xl bg-zinc-950 px-4 py-2 text-sm font-medium text-white"
                    >
                      Done
                    </button>
                  </Drawer.Close>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  )
}

export function EditorialStylePreviewCard() {
  const [editorialOpen, setEditorialOpen] = useState(false)

  return (
    <div className="rounded-[var(--hiraki-radius)] border border-line p-5">
      <div className="mb-5">
        <p className="text-sm font-semibold text-fg">Style B: Editorial side panel</p>
        <p className="mt-1 text-sm text-muted">
          Bold, branded, and sharp. Same API, completely different visual language.
        </p>
      </div>

      <div className="rounded-[var(--hiraki-radius)] border border-dashed border-line bg-[radial-gradient(circle_at_top_left,#f97316_0%,transparent_28%),linear-gradient(180deg,#171717,#09090b)] p-6">
        <Drawer.Root open={editorialOpen} onOpenChange={setEditorialOpen} direction="right">
          <button
            type="button"
            onClick={() => setEditorialOpen(true)}
            className="inline-flex items-center rounded-none border border-orange-400 bg-orange-500 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-black shadow-[6px_6px_0_0_rgba(0,0,0,0.55)]"
          >
            Open editorial panel
          </button>
          <Drawer.Portal>
            <Drawer.Overlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.72)' }} />
            <Drawer.Content
              className="h-full w-full max-w-md border-l-4 border-orange-500 bg-neutral-950 text-orange-50 shadow-[-20px_0_50px_rgba(0,0,0,0.38)]"
              style={{ borderRadius: 0 }}
            >
              <div className="flex h-full flex-col">
                <div className="border-b border-orange-500/30 px-6 py-5">
                  <Drawer.Title className="text-xs font-black uppercase tracking-[0.3em] text-orange-400">
                    Issue 04
                  </Drawer.Title>
                  <Drawer.Description className="mt-3 max-w-xs text-2xl font-semibold leading-tight text-orange-50">
                    A styled drawer can still feel loud and opinionated.
                  </Drawer.Description>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
                  {[
                    'Heavy typography',
                    'Square geometry',
                    'High contrast accents',
                    'Same accessible behavior underneath',
                  ].map((item) => (
                    <div
                      key={item}
                      className="border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm font-medium text-orange-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 border-t border-orange-500/30 px-6 py-5">
                  <button
                    type="button"
                    className="inline-flex items-center bg-orange-500 px-4 py-2 text-sm font-black uppercase tracking-[0.15em] text-black"
                  >
                    Publish
                  </button>
                  <Drawer.Close asChild>
                    <button
                      type="button"
                      className="inline-flex items-center border border-orange-500/40 px-4 py-2 text-sm font-black uppercase tracking-[0.15em] text-orange-100"
                    >
                      Close
                    </button>
                  </Drawer.Close>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  )
}
