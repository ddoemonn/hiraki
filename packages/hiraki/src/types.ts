export type Direction = 'top' | 'bottom' | 'left' | 'right'

export type Variant = 'default' | 'floating' | 'sheet' | 'fullscreen' | 'nested' | 'stack'

export type SnapPoint = number | `${number}%` | 'content'

export interface SnapPointResolved {
  value: number // absolute pixels from edge
  label?: string
}

export interface GestureCallbackData {
  velocity: number
  direction: Direction
  translateValue: number
  snapPoint?: SnapPointResolved
}

export interface DrawerRootProps {
  children: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Uncontrolled default open state */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: Direction
  variant?: Variant
  /** Whether to render a backdrop overlay */
  modal?: boolean
  /** Whether clicking overlay / pressing Escape dismisses */
  dismissible?: boolean
  /** Snap points. Numbers = pixels from edge, strings = percentage of viewport */
  snapPoints?: SnapPoint[]
  /** Active snap index (controlled) */
  activeSnapPoint?: number
  onSnapPointChange?: (index: number) => void
  /** Fraction of drawer to drag before auto-close (0–1) */
  closeThreshold?: number
  /** Enable rubber-band effect when dragging past extents */
  rubberBand?: boolean
  /** Enable velocity-based inertia on release */
  inertia?: boolean
  /** Scale the page background when drawer opens */
  shouldScaleBackground?: boolean
  /** Callback when gesture starts */
  onDragStart?: (data: GestureCallbackData) => void
  /** Callback during drag */
  onDrag?: (data: GestureCallbackData) => void
  /** Callback when gesture ends */
  onDragEnd?: (data: GestureCallbackData) => void
}

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DrawerHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When true, only dragging the handle initiates gesture */
  handleOnly?: boolean
}

export interface DrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}

export interface DrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}

export interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export interface DrawerPortalProps {
  children: React.ReactNode
  container?: HTMLElement | null
}

export interface DrawerScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface DrawerSnapIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {}
