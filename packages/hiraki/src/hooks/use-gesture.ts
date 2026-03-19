import { useRef, useCallback, useEffect } from 'react'
import { createGestureEngine, type GestureEngineOptions, type DragEndResult } from '../engine/gesture-engine'
import type { SnapPointEntry } from '../engine/physics'
import type { Direction } from '../types'

interface UseGestureOptions {
  direction: Direction
  snapPoints: SnapPointEntry[]
  maxTranslate: number
  activeSnapIndex: number
  closeThreshold: number
  rubberBand: boolean
  inertia: boolean
  enabled?: boolean
  onDragStart?: (translateValue: number) => void
  onDrag?: (translateValue: number) => void
  onDragEnd?: (result: DragEndResult) => void
}

export function useGesture(options: UseGestureOptions) {
  const engineRef = useRef(
    createGestureEngine({
      direction: options.direction,
      snapPoints: options.snapPoints,
      maxTranslate: options.maxTranslate,
      activeSnapIndex: options.activeSnapIndex,
      closeThreshold: options.closeThreshold,
      rubberBandEnabled: options.rubberBand,
      inertia: options.inertia,
      onDragStart: options.onDragStart,
      onDrag: options.onDrag,
      onDragEnd: options.onDragEnd,
    }),
  )

  // Keep engine options in sync
  useEffect(() => {
    engineRef.current.update({
      direction: options.direction,
      snapPoints: options.snapPoints,
      maxTranslate: options.maxTranslate,
      activeSnapIndex: options.activeSnapIndex,
      closeThreshold: options.closeThreshold,
      rubberBandEnabled: options.rubberBand,
      inertia: options.inertia,
      onDragStart: options.onDragStart,
      onDrag: options.onDrag,
      onDragEnd: options.onDragEnd,
    })
  })

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (options.enabled === false) return
      const started = engineRef.current.onPointerDown(event.nativeEvent)
      if (started) {
        ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
      }
    },
    [options.enabled],
  )

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (options.enabled === false) return
      engineRef.current.onPointerMove(event.nativeEvent)
    },
    [options.enabled],
  )

  const onPointerUp = useCallback(
    (event: React.PointerEvent) => {
      if (options.enabled === false) return
      engineRef.current.onPointerUp(event.nativeEvent)
    },
    [options.enabled],
  )

  const onPointerCancel = useCallback(
    (event: React.PointerEvent) => {
      if (options.enabled === false) return
      engineRef.current.onPointerUp(event.nativeEvent)
    },
    [options.enabled],
  )

  const setTranslate = useCallback((value: number) => {
    engineRef.current.setTranslate(value)
  }, [])

  return {
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
    setTranslate,
    getTranslate: () => engineRef.current.getTranslate(),
    getIsDragging: () => engineRef.current.getIsDragging(),
  }
}
