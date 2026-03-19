import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createGestureEngine, isHorizontal } from '../engine/gesture-engine'
import type { SnapPointEntry } from '../engine/physics'

const snapPoints: SnapPointEntry[] = [{ value: 400, index: 0 }]

function makePointerEvent(overrides: Partial<PointerEvent> = {}): PointerEvent {
  return {
    clientX: 0,
    clientY: 0,
    pointerId: 1,
    timeStamp: 0,
    target: document.body,
    ...overrides,
  } as unknown as PointerEvent
}

describe('isHorizontal', () => {
  it('returns true for left/right', () => {
    expect(isHorizontal('left')).toBe(true)
    expect(isHorizontal('right')).toBe(true)
  })

  it('returns false for top/bottom', () => {
    expect(isHorizontal('top')).toBe(false)
    expect(isHorizontal('bottom')).toBe(false)
  })
})

describe('createGestureEngine', () => {
  let onDragStart: ReturnType<typeof vi.fn>
  let onDrag: ReturnType<typeof vi.fn>
  let onDragEnd: ReturnType<typeof vi.fn>
  let engine: ReturnType<typeof createGestureEngine>

  beforeEach(() => {
    onDragStart = vi.fn()
    onDrag = vi.fn()
    onDragEnd = vi.fn()
    engine = createGestureEngine({
      direction: 'bottom',
      snapPoints,
      maxTranslate: 400,
      activeSnapIndex: 0,
      closeThreshold: 0.5,
      rubberBandEnabled: false,
      inertia: false,
      onDragStart,
      onDrag,
      onDragEnd,
    })
  })

  it('does not drag on wrong axis', () => {
    engine.onPointerDown(makePointerEvent({ clientX: 0, clientY: 0, timeStamp: 0 }))
    engine.onPointerMove(makePointerEvent({ clientX: 20, clientY: 2, pointerId: 1, timeStamp: 16 }))
    expect(onDragStart).not.toHaveBeenCalled()
  })

  it('starts drag on correct axis', () => {
    engine.onPointerDown(makePointerEvent({ clientX: 0, clientY: 0, timeStamp: 0 }))
    engine.onPointerMove(makePointerEvent({ clientX: 2, clientY: 20, pointerId: 1, timeStamp: 16 }))
    expect(onDragStart).toHaveBeenCalled()
  })

  it('calls onDrag with translate value during drag', () => {
    engine.onPointerDown(makePointerEvent({ clientX: 0, clientY: 0, timeStamp: 0 }))
    engine.onPointerMove(makePointerEvent({ clientX: 2, clientY: 20, pointerId: 1, timeStamp: 16 }))
    engine.onPointerMove(makePointerEvent({ clientX: 2, clientY: 50, pointerId: 1, timeStamp: 32 }))
    expect(onDrag).toHaveBeenCalledWith(50)
  })

  it('calls onDragEnd on pointer up', () => {
    engine.onPointerDown(makePointerEvent({ clientX: 0, clientY: 0, timeStamp: 0 }))
    engine.onPointerMove(makePointerEvent({ clientX: 2, clientY: 20, pointerId: 1, timeStamp: 16 }))
    engine.onPointerUp(makePointerEvent({ pointerId: 1, timeStamp: 32 }))
    expect(onDragEnd).toHaveBeenCalled()
  })

  it('should close when dragged past close threshold', () => {
    engine.setTranslate(0)
    engine.onPointerDown(makePointerEvent({ clientX: 0, clientY: 0, timeStamp: 0 }))
    engine.onPointerMove(makePointerEvent({ clientX: 0, clientY: 20, pointerId: 1, timeStamp: 16 }))
    engine.onPointerMove(makePointerEvent({ clientX: 0, clientY: 250, pointerId: 1, timeStamp: 32 }))
    engine.onPointerUp(makePointerEvent({ pointerId: 1, timeStamp: 48 }))
    const result = onDragEnd.mock.calls[0]?.[0]
    expect(result?.shouldClose).toBe(true)
  })

  it('setTranslate and getTranslate work', () => {
    engine.setTranslate(123)
    expect(engine.getTranslate()).toBe(123)
  })

  it('update patches options', () => {
    engine.update({ closeThreshold: 0.8 })
    expect(engine.getTranslate()).toBeDefined()
  })
})
