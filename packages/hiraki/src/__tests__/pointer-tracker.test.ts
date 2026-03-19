import { describe, it, expect, beforeEach } from 'vitest'
import { createPointerTracker } from '../engine/pointer-tracker'

function makePointerEvent(
  type: string,
  overrides: Partial<PointerEvent> = {},
): PointerEvent {
  return {
    clientX: 0,
    clientY: 0,
    pointerId: 1,
    timeStamp: 0,
    type,
    ...overrides,
  } as unknown as PointerEvent
}

describe('createPointerTracker', () => {
  let tracker: ReturnType<typeof createPointerTracker>

  beforeEach(() => {
    tracker = createPointerTracker()
  })

  it('starts inactive', () => {
    expect(tracker.getState().isActive).toBe(false)
  })

  it('activates on pointer down', () => {
    const started = tracker.onPointerDown(makePointerEvent('pointerdown', { clientX: 10, clientY: 20, timeStamp: 0 }))
    expect(started).toBe(true)
    expect(tracker.getState().isActive).toBe(true)
    expect(tracker.getState().startX).toBe(10)
    expect(tracker.getState().startY).toBe(20)
  })

  it('rejects second pointer down while active', () => {
    tracker.onPointerDown(makePointerEvent('pointerdown', { pointerId: 1 }))
    const second = tracker.onPointerDown(makePointerEvent('pointerdown', { pointerId: 2 }))
    expect(second).toBe(false)
  })

  it('tracks delta on pointer move', () => {
    tracker.onPointerDown(makePointerEvent('pointerdown', { clientX: 0, clientY: 0, timeStamp: 0 }))
    tracker.onPointerMove(makePointerEvent('pointermove', { clientX: 50, clientY: 0, pointerId: 1, timeStamp: 16 }))
    const state = tracker.getState()
    expect(state.deltaX).toBe(50)
    expect(state.deltaY).toBe(0)
  })

  it('locks dominant axis after threshold', () => {
    tracker.onPointerDown(makePointerEvent('pointerdown', { clientX: 0, clientY: 0, timeStamp: 0, pointerId: 1 }))
    tracker.onPointerMove(makePointerEvent('pointermove', { clientX: 20, clientY: 2, pointerId: 1, timeStamp: 16 }))
    expect(tracker.getState().dominantAxis).toBe('x')
  })

  it('deactivates on pointer up', () => {
    tracker.onPointerDown(makePointerEvent('pointerdown', { pointerId: 1 }))
    const stopped = tracker.onPointerUp(makePointerEvent('pointerup', { pointerId: 1 }))
    expect(stopped).toBe(true)
    expect(tracker.getState().isActive).toBe(false)
  })

  it('ignores pointer up from different pointer', () => {
    tracker.onPointerDown(makePointerEvent('pointerdown', { pointerId: 1 }))
    const stopped = tracker.onPointerUp(makePointerEvent('pointerup', { pointerId: 2 }))
    expect(stopped).toBe(false)
    expect(tracker.getState().isActive).toBe(true)
  })

  it('reset clears active state', () => {
    tracker.onPointerDown(makePointerEvent('pointerdown', { pointerId: 1 }))
    tracker.reset()
    expect(tracker.getState().isActive).toBe(false)
  })
})
