# hiraki (開き)

Zero-dependency React drawer component. All 4 directions, velocity-aware gestures, snap points, and 6 variants — without Radix, Framer Motion, or any external runtime dependency.

`~10 KB gzipped` — React >=18 is the only peer dep.

---

## Install

```sh
npm install hiraki
pnpm add hiraki
yarn add hiraki
```

---

## Usage

```tsx
import { Drawer } from 'hiraki'

function App() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>Open</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Handle />
          <Drawer.Title>Title</Drawer.Title>
          <Drawer.Description>Description</Drawer.Description>
          <Drawer.Close>Close</Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
```

Controlled open state:

```tsx
const [open, setOpen] = useState(false)

<Drawer.Root open={open} onOpenChange={setOpen}>
  ...
</Drawer.Root>
```

Snap points:

```tsx
<Drawer.Root snapPoints={['25%', '55%', '90%']}>
  ...
</Drawer.Root>
```

Direction:

```tsx
<Drawer.Root direction="right">
  ...
</Drawer.Root>
```

---

## API

### Drawer.Root

| prop | type | default |
|------|------|---------|
| `open` | `boolean` | — |
| `defaultOpen` | `boolean` | `false` |
| `onOpenChange` | `(open: boolean) => void` | — |
| `direction` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` |
| `variant` | `"default" \| "floating" \| "sheet" \| "fullscreen" \| "nested" \| "stack"` | `"default"` |
| `modal` | `boolean` | `true` |
| `dismissible` | `boolean` | `true` |
| `snapPoints` | `(number \| string)[]` | `[]` |
| `activeSnapPoint` | `number` | — |
| `onSnapPointChange` | `(index: number) => void` | — |
| `closeThreshold` | `number` | `0.5` |
| `rubberBand` | `boolean` | `true` |
| `inertia` | `boolean` | `true` |
| `shouldScaleBackground` | `boolean` | `false` |
| `onDragStart` | `(data: GestureCallbackData) => void` | — |
| `onDrag` | `(data: GestureCallbackData) => void` | — |
| `onDragEnd` | `(data: GestureCallbackData) => void` | — |

### Drawer.Handle

| prop | type | default |
|------|------|---------|
| `visible` | `boolean` | `true` |
| `handleOnly` | `boolean` | `false` |

### Drawer.Trigger / Drawer.Close

| prop | type | default |
|------|------|---------|
| `asChild` | `boolean` | `false` |

All components forward standard HTML attributes (`className`, `style`, `data-*`, event handlers).

---

## Snap points

Snap points define positions where the drawer rests. Three formats are supported:

- **Pixels from edge** — `200` means 200px of the drawer is visible
- **Percentage of viewport** — `'55%'` means 55% of viewport height (or width for left/right)
- **Content height** — `'content'` snaps to the drawer's natural content height

The drawer starts at the largest snap point. Velocity on release determines whether to snap forward, backward, or close.

```tsx
// percentage
<Drawer.Root snapPoints={['25%', '55%', '90%']}>

// pixels
<Drawer.Root snapPoints={[200, 400, 600]}>

// content height
<Drawer.Root snapPoints={['content']}>

// controlled
<Drawer.Root
  snapPoints={['25%', '55%', '90%']}
  activeSnapPoint={snap}
  onSnapPointChange={setSnap}
>
```

---

## Styling

Hiraki ships no CSS file or classNames. Style with Tailwind, CSS variables, or the `style` prop:

```tsx
<Drawer.Content className="bg-white rounded-t-2xl shadow-xl">
  <Drawer.Handle className="bg-gray-300" />
  <Drawer.Title className="text-lg font-semibold px-6 pt-6">
    Title
  </Drawer.Title>
</Drawer.Content>
```

CSS custom properties exposed during drag:

| property | description |
|----------|-------------|
| `--hiraki-drag-progress` | `0` (closed) to `1` (open), updates on every frame |

Scale the page behind the drawer:

```tsx
<Drawer.Root shouldScaleBackground>
  ...
</Drawer.Root>

// Mark the element to scale
<div data-hiraki-background>
  {/* page content */}
</div>
```

---

## License

MIT
