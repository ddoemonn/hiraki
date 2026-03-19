export function rubberBand(value: number, min: number, max: number, factor = 0.55): number {
  if (value >= min && value <= max) return value
  const distance = value < min ? min - value : value - max
  const sign = value < min ? -1 : 1
  const dampened = factor * Math.log(1 + distance)
  return (value < min ? min : max) + sign * dampened
}

export function dampen(value: number, factor = 0.5): number {
  return value * factor
}

export function decayPosition(position: number, velocity: number, deceleration = 0.003): number {
  if (Math.abs(velocity) < 0.01) return position
  return position + (velocity * Math.abs(velocity)) / (2 * deceleration)
}

export function project(velocity: number, deceleration = 0.003): number {
  return (velocity * Math.abs(velocity)) / (2 * deceleration)
}

export interface SnapPointEntry {
  value: number
  index: number
}

export function findNearestSnapPoint(
  currentPx: number,
  velocityPxMs: number,
  snapPoints: SnapPointEntry[],
  inertia = true,
): number {
  if (snapPoints.length === 0) return 0
  // velocityPxMs is already in px/sec (gesture-engine converts from px/ms)
  // decayPosition expects a velocity that produces reasonable projections
  const projected = inertia ? decayPosition(currentPx, velocityPxMs) : currentPx
  let nearestIndex = 0
  let nearestDist = Infinity
  for (const { value, index } of snapPoints) {
    const dist = Math.abs(projected - value)
    if (dist < nearestDist) {
      nearestDist = dist
      nearestIndex = index
    }
  }
  return nearestIndex
}

export function springEasing(stiffness = 0.5): string {
  const c1 = 0.32 + stiffness * 0.1
  const c2 = 0.08 + stiffness * 0.05
  return `cubic-bezier(${c1}, ${c2}, 0.38, 1.1)`
}

export function naturalDuration(
  distancePx: number,
  velocityPxMs: number,
  baseDuration = 400,
): number {
  const absVelocity = Math.abs(velocityPxMs)
  if (absVelocity < 0.001) return baseDuration
  const velocityDuration = distancePx / absVelocity
  return Math.min(Math.max(velocityDuration, 120), baseDuration)
}
