'use client'

import { createContext, useContext, type RefObject, type MutableRefObject } from 'react'
import type { Direction, Variant, SnapPointResolved } from '../types'

export interface DrawerGestureHandlers {
  onPointerDown: (e: React.PointerEvent) => void
  onPointerMove: (e: React.PointerEvent) => void
  onPointerUp: (e: React.PointerEvent) => void
  onPointerCancel: (e: React.PointerEvent) => void
}

export interface DrawerContextValue {
  open: boolean
  mounted: boolean
  openDrawer: () => void
  closeDrawer: () => void
  forceClose: () => void
  direction: Direction
  variant: Variant
  modal: boolean
  dismissible: boolean
  isDraggingRef: MutableRefObject<boolean>
  translateRef: MutableRefObject<number>
  maxTranslateRef: MutableRefObject<number>
  dragProgressRef: MutableRefObject<number>
  resolvedSnapPoints: SnapPointResolved[]
  activeSnapIndex: number
  contentRef: RefObject<HTMLDivElement | null>
  overlayRef: RefObject<HTMLDivElement | null>
  triggerRef: RefObject<HTMLButtonElement | null>
  titleId: string
  descriptionId: string
  gestureHandlers: DrawerGestureHandlers
  onNestedOpenChange?: (open: boolean) => void
}

const DrawerContext = createContext<DrawerContextValue | null>(null)

export { DrawerContext }

export function useDrawerContext(): DrawerContextValue {
  const ctx = useContext(DrawerContext)
  if (!ctx) {
    throw new Error('Drawer compound components must be used within <Drawer.Root>')
  }
  return ctx
}
