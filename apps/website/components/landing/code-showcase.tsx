import { CodeBlock } from '@/components/ui/code-block'
import { CopyButton } from '@/components/ui/copy-button'

const basicExample = `import { Drawer } from 'hiraki'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button>Open</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Handle />
          <Drawer.Title>Hello</Drawer.Title>
          <Drawer.Description>
            A zero-dependency drawer.
          </Drawer.Description>
          <Drawer.Close asChild>
            <button>Close</button>
          </Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}`

const snapExample = `<Drawer.Root
  snapPoints={['25%', '50%', '90%']}
  activeSnapPoint={activeSnap}
  onSnapPointChange={setActiveSnap}
>
  <Drawer.Portal>
    <Drawer.Overlay />
    <Drawer.Content>
      <Drawer.Handle />
      <Drawer.SnapIndicator />
      {/* content */}
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>`

const directionExample = `{/* Opens from the right */}
<Drawer.Root direction="right">
  <Drawer.Portal>
    <Drawer.Overlay />
    <Drawer.Content>
      <Drawer.Handle />
      <nav>Sidebar navigation</nav>
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>`

export function CodeShowcase() {
  return (
    <section className="w-full border-b border-line">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 sm:py-16">
        <p className="text-xs font-mono text-dim mb-2">usage</p>
        <h2 className="text-2xl font-bold text-fg mb-4">Built for DX</h2>
        <p className="text-sm text-muted max-w-lg mb-10 leading-relaxed">
          Compound component API: compose{' '}
          <code className="font-mono text-xs bg-raised px-1.5 py-0.5 border border-line">Root</code>,{' '}
          <code className="font-mono text-xs bg-raised px-1.5 py-0.5 border border-line">Content</code>,{' '}
          <code className="font-mono text-xs bg-raised px-1.5 py-0.5 border border-line">Overlay</code>{' '}
          and add what you need. Nothing more.
        </p>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="min-w-0 border border-line bg-surface rounded-[var(--hiraki-radius)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-raised">
              <span className="text-xs font-mono text-dim">basic.tsx</span>
              <CopyButton text={basicExample} />
            </div>
            <CodeBlock code={basicExample} lang="tsx" />
          </div>

          <div className="min-w-0 flex flex-col gap-6">
            <div className="min-w-0 border border-line bg-surface rounded-[var(--hiraki-radius)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-raised">
                <span className="text-xs font-mono text-dim">snap-points.tsx</span>
                <CopyButton text={snapExample} />
              </div>
              <CodeBlock code={snapExample} lang="tsx" />
            </div>

            <div className="min-w-0 border border-line bg-surface rounded-[var(--hiraki-radius)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-raised">
                <span className="text-xs font-mono text-dim">direction.tsx</span>
                <CopyButton text={directionExample} />
              </div>
              <CodeBlock code={directionExample} lang="tsx" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
