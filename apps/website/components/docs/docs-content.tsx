import { CodeBadge } from '@/components/ui/code-badge'

export const docsNav = [
  { href: '/docs', label: 'Overview' },
  { href: '/docs/installation', label: 'Installation' },
  { href: '/docs/quick-start', label: 'Quick start' },
  { href: '/docs/headless-styling', label: 'Headless styling' },
  { href: '/docs/behavior', label: 'Behavior' },
  { href: '/docs/api', label: 'API' },
] as const

export const quickStartExample = `import { Drawer } from 'hiraki'

export function Example() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="trigger">Open</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="overlay" />
        <Drawer.Content className="content">
          <Drawer.Handle className="handle" />
          <Drawer.Title className="title">Edit profile</Drawer.Title>
          <Drawer.Description className="description">
            Build your own design around the primitives.
          </Drawer.Description>
          <Drawer.Close className="close">Close</Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}`

export const softStyleExample = `import { Drawer } from 'hiraki'

export function SoftSheet() {
  return (
    <Drawer.Root>
      <button className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900">
        Open soft sheet
      </button>
      <Drawer.Portal>
        <Drawer.Overlay className="bg-slate-900/30 backdrop-blur-sm" />
        <Drawer.Content className="rounded-t-[28px] border border-white/60 bg-white text-zinc-900 shadow-[0_-20px_60px_rgba(15,23,42,0.18)]">
          <Drawer.Handle className="mt-3 bg-slate-900/15" />
          <div className="space-y-5 p-6">
            <Drawer.Title className="text-lg font-semibold">Checkout summary</Drawer.Title>
            <Drawer.Description className="text-sm text-zinc-600">
              Soft product styling on top of headless primitives.
            </Drawer.Description>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}`

export const editorialStyleExample = `import { Drawer } from 'hiraki'

export function EditorialPanel() {
  return (
    <Drawer.Root direction="right">
      <button className="border border-orange-400 bg-orange-500 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-black">
        Open editorial panel
      </button>
      <Drawer.Portal>
        <Drawer.Overlay className="bg-black/70" />
        <Drawer.Content className="h-full max-w-md border-l-4 border-orange-500 bg-neutral-950 text-orange-50">
          <div className="border-b border-orange-500/30 px-6 py-5">
            <Drawer.Title className="text-xs font-black uppercase tracking-[0.3em] text-orange-400">
              Issue 04
            </Drawer.Title>
            <Drawer.Description className="mt-3 text-2xl font-semibold leading-tight text-orange-50">
              Same primitive, completely different visual language.
            </Drawer.Description>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}`

export const behaviorExample = `<Drawer.Root
  snapPoints={['25%', '55%', '90%']}
  activeSnapPoint={snap}
  onSnapPointChange={setSnap}
  direction="bottom"
  dismissible
>
  <Drawer.Portal>
    <Drawer.Overlay className="overlay" />
    <Drawer.Content className="content">
      <Drawer.Handle visible />
      <Drawer.Title>Filters</Drawer.Title>
      <Drawer.SnapIndicator />
    </Drawer.Content>
  </Drawer.Portal>
</Drawer.Root>`

export interface PropRow {
  name: string
  type: string
  default: string
  description: string
}

export const rootPropRows: PropRow[] = [
  { name: 'open', type: 'boolean', default: '—', description: 'Controlled open state. Pair with onOpenChange.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Uncontrolled initial open state.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Called whenever the drawer opens or closes.' },
  { name: 'direction', type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: 'Which edge the drawer slides from. Determines gesture axis and transform direction.' },
  { name: 'variant', type: '"default" | "floating" | "sheet" | "fullscreen" | "nested" | "stack"', default: '"default"', description: 'Visual mode. Affects border radius, margin, and animation preset.' },
  { name: 'modal', type: 'boolean', default: 'true', description: 'Locks page scroll and traps focus inside the drawer while open.' },
  { name: 'dismissible', type: 'boolean', default: 'true', description: 'Whether overlay click and Escape key close the drawer.' },
  { name: 'snapPoints', type: 'SnapPoint[]', default: '[]', description: 'Snap positions. number = px from edge, "25%" = fraction of viewport, "content" = content height.' },
  { name: 'activeSnapPoint', type: 'number', default: '—', description: 'Controlled snap index. 0 is the smallest point, length - 1 is the largest.' },
  { name: 'onSnapPointChange', type: '(index: number) => void', default: '—', description: 'Called when the active snap index changes after a drag.' },
  { name: 'closeThreshold', type: 'number', default: '0.5', description: 'Fraction of the drawer height that must be dragged before auto-close triggers on release.' },
  { name: 'rubberBand', type: 'boolean', default: 'true', description: 'Elastic resistance when dragging past the open or closed extent.' },
  { name: 'inertia', type: 'boolean', default: 'true', description: 'Uses release velocity to project the landing snap point. Fast flick = skip a snap.' },
  { name: 'shouldScaleBackground', type: 'boolean', default: 'false', description: 'Scales the page element behind the drawer down when open. Add data-hiraki-background to the element to scale.' },
  { name: 'onDragStart', type: '(data: GestureCallbackData) => void', default: '—', description: 'Fires once when a drag gesture is confirmed (after axis lock).' },
  { name: 'onDrag', type: '(data: GestureCallbackData) => void', default: '—', description: 'Fires on every pointer move during a drag.' },
  { name: 'onDragEnd', type: '(data: GestureCallbackData) => void', default: '—', description: 'Fires when the pointer is released, with final velocity and translate.' },
]

export const subcomponentRows: { component: string; props: PropRow[] }[] = [
  {
    component: 'Drawer.Portal',
    props: [
      { name: 'container', type: 'HTMLElement | null', default: 'document.body', description: 'DOM node to portal into. Defaults to document.body.' },
    ],
  },
  {
    component: 'Drawer.Trigger',
    props: [
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Merges props onto the child element instead of rendering a button.' },
    ],
  },
  {
    component: 'Drawer.Close',
    props: [
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Merges props onto the child element instead of rendering a button.' },
    ],
  },
  {
    component: 'Drawer.Handle',
    props: [
      { name: 'visible', type: 'boolean', default: 'true', description: 'Controls whether the handle pill is rendered.' },
      { name: 'handleOnly', type: 'boolean', default: 'false', description: 'When true, drag gestures only start from the handle, not the full content area.' },
    ],
  },
  {
    component: 'Drawer.Content',
    props: [
      { name: '...HTMLAttributes', type: 'React.HTMLAttributes<HTMLDivElement>', default: '—', description: 'All standard div props forwarded. Use className to apply your own styles.' },
    ],
  },
  {
    component: 'Drawer.Overlay',
    props: [
      { name: '...HTMLAttributes', type: 'React.HTMLAttributes<HTMLDivElement>', default: '—', description: 'All standard div props forwarded. Opacity tracks drag progress via direct DOM mutation.' },
    ],
  },
]

export function DocsIntroBadges() {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {['accessible', 'behavior-first', 'bring your own styles', 'redesignable'].map((item) => (
        <CodeBadge key={item} code={item} />
      ))}
    </div>
  )
}
