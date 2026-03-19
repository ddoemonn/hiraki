'use client'

import { useState, useCallback } from 'react'
import { Drawer } from 'hiraki'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'

const snapConfigs = [
  {
    label: 'Percentage snaps',
    snapPoints: ['25%', '55%', '90%'] as const,
    code: "snapPoints={['25%', '55%', '90%']}",
  },
  {
    label: 'Pixel snaps',
    snapPoints: [200, 400, 600] as const,
    code: 'snapPoints={[200, 400, 600]}',
  },
  {
    label: 'Content snap',
    snapPoints: ['content'] as const,
    code: "snapPoints={['content']}",
  },
] as const

type SnapPointInput = string | number
type SnapConfig = (typeof snapConfigs)[number]

export function SnapDemo() {
  const [activeConfig, setActiveConfig] = useState<number | null>(null)
  const [activeSnap, setActiveSnap] = useState(0)

  const config = activeConfig !== null ? snapConfigs[activeConfig] : null

  const handleSnap = useCallback((index: number) => {
    setActiveSnap(index)
  }, [])

  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs font-mono text-dim mb-2">snapPoints</p>
        <h2 className="text-2xl font-bold text-fg mb-4">Snap points</h2>
        <p className="text-sm text-muted max-w-lg mb-6 leading-relaxed">
          Pixels, percentages, or{' '}
          <code className="font-mono text-xs bg-raised px-1.5 py-0.5 border border-line">
            &quot;content&quot;
          </code>{' '}
          — velocity-aware. Flick fast to jump between snaps. Drag slowly to land precisely.
        </p>

        <div className="flex flex-col gap-1 mb-8 font-mono text-xs text-dim">
          {snapConfigs.map((s, i) => (
            <button
              key={s.code}
              onClick={() => {
                setActiveConfig(i)
                const pts = s.snapPoints as readonly SnapPointInput[]
                setActiveSnap(pts.length - 1)
              }}
              className={cn(
                'px-3 py-2 border border-line bg-surface text-muted rounded-[16px] text-left transition-colors cursor-pointer',
                'hover:bg-raised hover:text-fg',
              )}
            >
              {s.code}
            </button>
          ))}
        </div>

        {snapConfigs.map((s, i) => (
          <Drawer.Root
            key={s.code}
            open={activeConfig === i}
            onOpenChange={(o) => !o && setActiveConfig(null)}
            snapPoints={s.snapPoints as unknown as SnapPointInput[]}
            activeSnapPoint={activeSnap}
            onSnapPointChange={handleSnap}
          >
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Content
                className={cn(
                  'flex flex-col bg-surface border border-line border-b-0',
                  'outline-none max-h-[90dvh]',
                )}
              >
                <Drawer.Handle className="mt-3" />
                <div className="p-6 flex flex-col gap-3 flex-1 overflow-y-auto">
                  <div>
                    <p className="text-xs font-mono text-dim mb-1">{s.code}</p>
                    <Drawer.Title className="text-base font-semibold text-fg">
                      {s.label}
                    </Drawer.Title>
                    <Drawer.Description className="text-sm text-dim mt-0.5">
                      Drag to move between snap positions · Flick to jump
                    </Drawer.Description>
                  </div>

                  <div className="flex items-center gap-2 py-2">
                    {(s.snapPoints as readonly SnapPointInput[]).map((sp, j) => (
                      <button
                        key={j}
                        onClick={() => setActiveSnap(j)}
                        className={cn(
                          'px-3 py-1.5 text-xs font-mono border rounded-[16px] transition-all cursor-pointer',
                          activeSnap === j
                            ? 'border-fg/30 bg-raised text-fg'
                            : 'border-line text-dim hover:text-muted',
                        )}
                      >
                        {String(sp)}
                      </button>
                    ))}
                  </div>

                  <Drawer.SnapIndicator className="py-2" />

                  <div className="flex flex-col gap-2 mt-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-10 border border-line bg-raised rounded-[8px]" />
                    ))}
                  </div>

                  <Drawer.Close asChild>
                    <Button variant="secondary" size="sm" className="mt-2 w-fit">
                      Close
                    </Button>
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
