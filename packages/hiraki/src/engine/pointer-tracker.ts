export interface PointerState {
  startX: number
  startY: number
  currentX: number
  currentY: number
  deltaX: number
  deltaY: number
  velocityX: number
  velocityY: number
  dominantAxis: 'x' | 'y' | null
  isActive: boolean
  pointerId: number | null
  timestamp: number
  startTimestamp: number
}

export interface PointerTrackerOptions {
  smoothingFactor?: number
  axisLockThreshold?: number
}

const DEFAULT_SMOOTHING = 0.3
const DEFAULT_AXIS_LOCK = 8

export function createPointerTracker(options: PointerTrackerOptions = {}) {
  const smoothingFactor = options.smoothingFactor ?? DEFAULT_SMOOTHING
  const axisLockThreshold = options.axisLockThreshold ?? DEFAULT_AXIS_LOCK

  let state: PointerState = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    velocityX: 0,
    velocityY: 0,
    dominantAxis: null,
    isActive: false,
    pointerId: null,
    timestamp: 0,
    startTimestamp: 0,
  }

  let lastX = 0
  let lastY = 0
  let lastTimestamp = 0

  function onPointerDown(event: PointerEvent): boolean {
    if (state.isActive) return false
    state = {
      startX: event.clientX,
      startY: event.clientY,
      currentX: event.clientX,
      currentY: event.clientY,
      deltaX: 0,
      deltaY: 0,
      velocityX: 0,
      velocityY: 0,
      dominantAxis: null,
      isActive: true,
      pointerId: event.pointerId,
      timestamp: event.timeStamp,
      startTimestamp: event.timeStamp,
    }
    lastX = event.clientX
    lastY = event.clientY
    lastTimestamp = event.timeStamp
    return true
  }

  function onPointerMove(event: PointerEvent): boolean {
    if (!state.isActive || state.pointerId !== event.pointerId) return false
    const dt = event.timeStamp - lastTimestamp
    const rawVx = dt > 0 ? (event.clientX - lastX) / dt : 0
    const rawVy = dt > 0 ? (event.clientY - lastY) / dt : 0
    const vx = smoothingFactor * rawVx + (1 - smoothingFactor) * state.velocityX
    const vy = smoothingFactor * rawVy + (1 - smoothingFactor) * state.velocityY
    const deltaX = event.clientX - state.startX
    const deltaY = event.clientY - state.startY
    let dominantAxis = state.dominantAxis
    if (dominantAxis === null) {
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)
      if (Math.max(absX, absY) >= axisLockThreshold) {
        dominantAxis = absX > absY ? 'x' : 'y'
      }
    }
    state = {
      ...state,
      currentX: event.clientX,
      currentY: event.clientY,
      deltaX,
      deltaY,
      velocityX: vx,
      velocityY: vy,
      dominantAxis,
      timestamp: event.timeStamp,
    }
    lastX = event.clientX
    lastY = event.clientY
    lastTimestamp = event.timeStamp
    return true
  }

  function onPointerUp(event: PointerEvent): boolean {
    if (!state.isActive || state.pointerId !== event.pointerId) return false
    state = { ...state, isActive: false }
    return true
  }

  function getState(): Readonly<PointerState> {
    return state
  }

  function reset() {
    state = { ...state, isActive: false, pointerId: null, dominantAxis: null, velocityX: 0, velocityY: 0 }
  }

  return { onPointerDown, onPointerMove, onPointerUp, getState, reset }
}

export type PointerTracker = ReturnType<typeof createPointerTracker>
