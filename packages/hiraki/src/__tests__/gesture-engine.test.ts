import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createGestureEngine, isHorizontal, shouldDrag } from '../engine/gesture-engine'
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

function createTestEngine(
  direction: 'top' | 'bottom' | 'left' | 'right',
  overrides: Partial<Parameters<typeof createGestureEngine>[0]> = {},
) {
  const onDragStart = vi.fn()
  const onDrag = vi.fn()
  const onDragEnd = vi.fn()
  const engine = createGestureEngine({
    direction,
    snapPoints,
    maxTranslate: 400,
    activeSnapIndex: 0,
    closeThreshold: 0.5,
    rubberBandEnabled: false,
    inertia: false,
    onDragStart,
    onDrag,
    onDragEnd,
    ...overrides,
  })

  return { engine, onDragStart, onDrag, onDragEnd }
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

describe('shouldDrag', () => {
  it('ignores document scroll for vertical drawers', () => {
    const target = document.createElement('div')
    document.body.appendChild(target)
    document.body.style.overflowY = 'auto'

    Object.defineProperty(document.body, 'scrollTop', {
      configurable: true,
      value: 300,
    })
    Object.defineProperty(document.body, 'scrollHeight', {
      configurable: true,
      value: 2000,
    })
    Object.defineProperty(document.body, 'clientHeight', {
      configurable: true,
      value: 800,
    })

    expect(shouldDrag(target, 'bottom')).toBe(true)

    target.remove()
    document.body.style.overflowY = ''
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

  it.each([
    ['bottom', { start: { clientX: 0, clientY: 0 }, move: { clientX: 0, clientY: 250 } }],
    ['top', { start: { clientX: 0, clientY: 300 }, move: { clientX: 0, clientY: 50 } }],
    ['right', { start: { clientX: 0, clientY: 0 }, move: { clientX: 250, clientY: 0 } }],
    ['left', { start: { clientX: 300, clientY: 0 }, move: { clientX: 50, clientY: 0 } }],
  ] as const)('closes correctly for %s drawers', (direction, gesture) => {
    const { engine, onDragEnd } = createTestEngine(direction)

    engine.onPointerDown(makePointerEvent({ ...gesture.start, timeStamp: 0 }))
    engine.onPointerMove(makePointerEvent({ ...gesture.move, pointerId: 1, timeStamp: 16 }))
    engine.onPointerUp(makePointerEvent({ ...gesture.move, pointerId: 1, timeStamp: 32 }))

    const result = onDragEnd.mock.calls[0]?.[0]
    expect(result?.shouldClose).toBe(true)
  })

  it('projects snap selection in the correct direction on release', () => {
    const { engine, onDragEnd } = createTestEngine('bottom', {
      closeThreshold: 0.9,
      inertia: true,
      snapPoints: [
        { value: 100, index: 0 },
        { value: 300, index: 1 },
      ],
    })

    engine.onPointerDown(makePointerEvent({ clientX: 0, clientY: 0, timeStamp: 0 }))
    engine.onPointerMove(makePointerEvent({ clientX: 0, clientY: 180, pointerId: 1, timeStamp: 16 }))
    engine.onPointerUp(makePointerEvent({ clientX: 0, clientY: 180, pointerId: 1, timeStamp: 32 }))

    const result = onDragEnd.mock.calls[0]?.[0]
    expect(result?.shouldClose).toBe(false)
    expect(result?.targetSnapIndex).toBe(0)
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
