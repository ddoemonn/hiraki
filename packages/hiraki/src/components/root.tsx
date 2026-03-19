'use client'

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  type ReactNode,
} from 'react'
import type { DrawerRootProps, Direction } from '../types'
import { DrawerContext, type DrawerContextValue, type DrawerGestureHandlers } from '../context/drawer-context'
import { useControllableState } from '../hooks/use-controllable-state'
import { useSnapPoints } from '../hooks/use-snap-points'
import { createGestureEngine } from '../engine/gesture-engine'
import { createFocusTrap } from '../utils/focus-trap'
import { lockScroll, unlockScroll } from '../utils/scroll-lock'
import { generateId } from '../utils/dom'
import { applyEnterTransition, applyExitTransition, applySnapTransition, applyDragTransition } from '../animations/transitions'
import { updateOverlayProgress, updateBackgroundScale, updateDragProgress } from '../animations/micro-interactions'
import { getTransform } from '../animations/presets'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const EXIT_DURATION = 300

function getViewportSize(direction: Direction): number {
  if (typeof window === 'undefined') return 600
  return direction === 'left' || direction === 'right' ? window.innerWidth : window.innerHeight
}

export interface DrawerRootInternalProps extends DrawerRootProps {
  children: ReactNode
}

export function Root({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  direction = 'bottom',
  variant = 'default',
  modal = true,
  dismissible = true,
  snapPoints: snapPointsProp = [],
  activeSnapPoint: controlledSnap,
  onSnapPointChange,
  closeThreshold = 0.5,
  rubberBand = true,
  inertia = true,
  shouldScaleBackground = false,
  onDragStart,
  onDrag,
  onDragEnd,
}: DrawerRootInternalProps) {
  const [open, setOpen] = useControllableState({
    controlled: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const [mounted, setMounted] = useState(false)

  const contentRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const translateRef = useRef(0)
  const maxTranslateRef = useRef(0)
  const isDraggingRef = useRef(false)
  const dragProgressRef = useRef(0)

  const titleId = useMemo(() => generateId('hiraki-title'), [])
  const descriptionId = useMemo(() => generateId('hiraki-desc'), [])

  const [viewportSize, setViewportSize] = useState(() => getViewportSize(direction))

  useIsomorphicLayoutEffect(() => {
    const update = () => setViewportSize(getViewportSize(direction))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [direction])

  const {
    resolvedSnapPoints,
    snapEntries,
    activeSnapIndex,
    setActiveSnapIndex,
    translateForSnap,
  } = useSnapPoints({
    snapPoints: snapPointsProp,
    viewportSize,
    contentSize: contentRef.current?.scrollHeight,
    activeSnapPoint: controlledSnap,
    onSnapPointChange,
  })

  function measureMaxTranslate() {
    if (!contentRef.current) return 0
    return direction === 'left' || direction === 'right'
      ? contentRef.current.offsetWidth
      : contentRef.current.offsetHeight
  }

  function applyTranslate(value: number) {
    translateRef.current = value
    if (contentRef.current) {
      contentRef.current.style.transform = getTransform(direction, value)
    }
  }

  function applyProgress(value: number) {
    dragProgressRef.current = value
    updateOverlayProgress(overlayRef.current, value)
    updateDragProgress(contentRef.current, value)
    if (shouldScaleBackground) {
      const bgEl = document.querySelector<HTMLElement>('[data-hiraki-background]')
      updateBackgroundScale(bgEl, value)
    }
  }

  const stableRefs = useRef({ onDragStart, onDrag, onDragEnd, direction, shouldScaleBackground })
  stableRefs.current = { onDragStart, onDrag, onDragEnd, direction, shouldScaleBackground }

  const engineRef = useRef<ReturnType<typeof createGestureEngine> | null>(null)

  const getEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = createGestureEngine({
        direction,
        snapPoints: snapEntries,
        maxTranslate: maxTranslateRef.current,
        activeSnapIndex,
        closeThreshold,
        rubberBandEnabled: rubberBand,
        inertia,
        onDragStart: undefined,
        onDrag: undefined,
        onDragEnd: undefined,
      })
    }
    return engineRef.current
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const triggerClose = useCallback(() => {
    const mt = maxTranslateRef.current
    if (contentRef.current) applyExitTransition(contentRef.current)
    applyTranslate(mt)
    getEngine().setTranslate(mt)
    applyProgress(0)
    setTimeout(() => {
      setOpen(false)
      setMounted(false)
    }, EXIT_DURATION)
  }, [getEngine, setOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const engine = getEngine()
    engine.update({
      direction,
      snapPoints: snapEntries,
      maxTranslate: maxTranslateRef.current,
      activeSnapIndex,
      closeThreshold,
      rubberBandEnabled: rubberBand,
      inertia,
      onDragStart: (tv) => {
        isDraggingRef.current = true
        if (contentRef.current) {
          applyDragTransition(contentRef.current)
          contentRef.current.dataset['hirakiDragging'] = 'true'
        }
        stableRefs.current.onDragStart?.({
          velocity: 0,
          direction: stableRefs.current.direction,
          translateValue: tv,
        })
      },
      onDrag: (tv) => {
        applyTranslate(tv)
        const mt = maxTranslateRef.current
        const progress = mt > 0 ? Math.max(0, 1 - tv / mt) : 0
        applyProgress(progress)
        stableRefs.current.onDrag?.({
          velocity: 0,
          direction: stableRefs.current.direction,
          translateValue: tv,
        })
      },
      onDragEnd: (result) => {
        isDraggingRef.current = false
        if (contentRef.current) {
          contentRef.current.dataset['hirakiDragging'] = 'false'
        }
        if (result.shouldClose) {
          triggerClose()
        } else {
          const snapPx = resolvedSnapPoints[result.targetSnapIndex]?.value ?? 0
          const mt = maxTranslateRef.current
          const targetTranslate = Math.max(0, mt - snapPx)
          const dist = Math.abs(result.translateValue - targetTranslate)
          if (contentRef.current) applySnapTransition(contentRef.current, result.velocityPxMs / 1000, dist)
          applyTranslate(targetTranslate)
          getEngine().setTranslate(targetTranslate)
          const progress = mt > 0 ? Math.max(0, 1 - targetTranslate / mt) : 0
          applyProgress(progress)
          setActiveSnapIndex(result.targetSnapIndex)
          stableRefs.current.onDragEnd?.({
            velocity: result.velocityPxMs,
            direction: stableRefs.current.direction,
            translateValue: result.translateValue,
          })
        }
      },
    })
  }, [direction, snapEntries, activeSnapIndex, closeThreshold, rubberBand, inertia]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useIsomorphicLayoutEffect(() => {
    if (!mounted || !open || !contentRef.current) return
    const mt = measureMaxTranslate()
    if (mt === 0) return
    maxTranslateRef.current = mt
    getEngine().update({ maxTranslate: mt })

    applyTranslate(mt)
    getEngine().setTranslate(mt)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!contentRef.current) return
        const targetTranslate = translateForSnap(activeSnapIndex, mt)
        applyEnterTransition(contentRef.current)
        applyTranslate(targetTranslate)
        getEngine().setTranslate(targetTranslate)
        applyProgress(1)
      })
    })
  }, [mounted, open]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open || !contentRef.current) return
    const trap = createFocusTrap(contentRef.current)
    const timeout = setTimeout(() => trap.activate(), 100)
    return () => {
      clearTimeout(timeout)
      trap.deactivate()
    }
  }, [open])

  useEffect(() => {
    if (!open || !modal) return
    lockScroll()
    return () => unlockScroll()
  }, [open, modal])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissible) triggerClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, dismissible, triggerClose])

  const openDrawer = useCallback(() => {
    setMounted(true)
    setOpen(true)
  }, [setOpen])

  // forceClose always animates, used by the Close button
  const forceClose = useCallback(() => {
    triggerClose()
  }, [triggerClose])

  // closeDrawer is gated by dismissible, used by overlay click / Escape
  const closeDrawer = useCallback(() => {
    if (dismissible) triggerClose()
  }, [dismissible, triggerClose])

  const gestureHandlers: DrawerGestureHandlers = useMemo(
    () => ({
      onPointerDown: (e: React.PointerEvent) => {
        const engine = getEngine()
        const started = engine.onPointerDown(e.nativeEvent)
        if (started) (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
      },
      onPointerMove: (e: React.PointerEvent) => getEngine().onPointerMove(e.nativeEvent),
      onPointerUp: (e: React.PointerEvent) => getEngine().onPointerUp(e.nativeEvent),
      onPointerCancel: (e: React.PointerEvent) => getEngine().onPointerUp(e.nativeEvent),
    }),
    [getEngine],
  )

  const contextValue: DrawerContextValue = {
    open,
    mounted,
    openDrawer,
    closeDrawer,
    forceClose,
    direction,
    variant,
    modal,
    dismissible,
    isDraggingRef,
    translateRef,
    maxTranslateRef,
    dragProgressRef,
    resolvedSnapPoints,
    activeSnapIndex,
    contentRef,
    overlayRef,
    triggerRef,
    titleId,
    descriptionId,
    gestureHandlers,
  }

  return <DrawerContext.Provider value={contextValue}>{children}</DrawerContext.Provider>
}

Root.displayName = 'Drawer.Root'
