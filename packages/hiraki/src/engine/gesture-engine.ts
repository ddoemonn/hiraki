import type { Direction } from '../types'
import { createPointerTracker } from './pointer-tracker'
import { rubberBand, findNearestSnapPoint, type SnapPointEntry } from './physics'

export interface GestureEngineOptions {
  direction: Direction
  snapPoints: SnapPointEntry[]
  maxTranslate: number
  activeSnapIndex: number
  closeThreshold: number
  rubberBandEnabled: boolean
  inertia: boolean
  onDragStart?: (translateValue: number) => void
  onDrag?: (translateValue: number) => void
  onDragEnd?: (result: DragEndResult) => void
}

export interface DragEndResult {
  translateValue: number
  velocityPxMs: number
  targetSnapIndex: number
  shouldClose: boolean
}

export function isHorizontal(direction: Direction): boolean {
  return direction === 'left' || direction === 'right'
}

function getDirectionSign(direction: Direction): number {
  return direction === 'top' || direction === 'left' ? -1 : 1
}

export function shouldDrag(
  target: EventTarget | null,
  direction: Direction,
): boolean {
  if (!(target instanceof Element)) return true
  const horizontal = isHorizontal(direction)
  const scrollParent = getScrollParent(target, horizontal)
  if (!scrollParent) return true
  const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = scrollParent
  if (horizontal) {
    return direction === 'right' ? scrollLeft <= 0 : scrollLeft + clientWidth >= scrollWidth - 1
  }
  return direction === 'bottom' ? scrollTop <= 0 : scrollTop + clientHeight >= scrollHeight - 1
}

function getScrollParent(el: Element, horizontal: boolean): Element | null {
  let current: Element | null = el
  while (current) {
    if (current === document.body || current === document.documentElement) {
      return null
    }
    const style = window.getComputedStyle(current)
    const overflow = horizontal
      ? `${style.overflowX} ${style.overflow}`
      : `${style.overflowY} ${style.overflow}`
    if (/auto|scroll/.test(overflow)) {
      const hasScroll = horizontal
        ? current.scrollWidth > current.clientWidth
        : current.scrollHeight > current.clientHeight
      if (hasScroll) return current
    }
    current = current.parentElement
  }
  return null
}

export function createGestureEngine(options: GestureEngineOptions) {
  let opts = { ...options }
  const tracker = createPointerTracker()
  let isDragging = false
  let dragStartTranslate = 0
  let translateValue = 0
  let capturedElement: Element | null = null

  function update(newOpts: Partial<GestureEngineOptions>) {
    opts = { ...opts, ...newOpts }
  }

  function getDelta(): number {
    const state = tracker.getState()
    const delta = isHorizontal(opts.direction) ? state.deltaX : state.deltaY
    return delta * getDirectionSign(opts.direction)
  }

  function getVelocity(): number {
    const state = tracker.getState()
    const velocity = isHorizontal(opts.direction) ? state.velocityX : state.velocityY
    return velocity * getDirectionSign(opts.direction)
  }

  function clampWithRubberBand(raw: number): number {
    const min = 0
    const max = opts.maxTranslate
    if (raw >= min && raw <= max) return raw
    if (!opts.rubberBandEnabled) return Math.min(Math.max(raw, min), max)
    return rubberBand(raw, min, max)
  }

  function onPointerDown(event: PointerEvent): boolean {
    const started = tracker.onPointerDown(event)
    if (!started) return false
    dragStartTranslate = translateValue
    capturedElement = event.target as Element
    return true
  }

  function onPointerMove(event: PointerEvent): boolean {
    if (!tracker.getState().isActive) return false
    tracker.onPointerMove(event)
    const state = tracker.getState()
    if (!isDragging) {
      if (state.dominantAxis === null) return false
      const horizontal = isHorizontal(opts.direction)
      const correctAxis = horizontal ? state.dominantAxis === 'x' : state.dominantAxis === 'y'
      if (!correctAxis) {
        tracker.reset()
        return false
      }
      if (!shouldDrag(capturedElement, opts.direction)) {
        tracker.reset()
        return false
      }
      isDragging = true
      opts.onDragStart?.(translateValue)
    }
    translateValue = clampWithRubberBand(dragStartTranslate + getDelta())
    opts.onDrag?.(translateValue)
    return true
  }

  function onPointerUp(event: PointerEvent): boolean {
    const wasActive = tracker.getState().isActive
    tracker.onPointerUp(event)
    if (!wasActive || !isDragging) {
      isDragging = false
      return false
    }
    isDragging = false
    const velocityPxMs = getVelocity()
    const velocityPxSec = velocityPxMs * 1000
    const snapVelocityPxMs = -velocityPxMs
    const closeThresholdPx = opts.closeThreshold * opts.maxTranslate
    const shouldClose = translateValue > closeThresholdPx || velocityPxSec > 300
    let targetSnapIndex: number
    if (shouldClose) {
      targetSnapIndex = -1
    } else {
      targetSnapIndex = findNearestSnapPoint(
        opts.maxTranslate - translateValue,
        snapVelocityPxMs,
        opts.snapPoints,
        opts.inertia,
      )
    }
    opts.onDragEnd?.({ translateValue, velocityPxMs: velocityPxSec, targetSnapIndex, shouldClose })
    return true
  }

  function setTranslate(value: number) {
    translateValue = value
  }

  function getIsDragging() {
    return isDragging
  }

  function getTranslate() {
    return translateValue
  }

  return { update, onPointerDown, onPointerMove, onPointerUp, setTranslate, getIsDragging, getTranslate }
}

export type GestureEngine = ReturnType<typeof createGestureEngine>
