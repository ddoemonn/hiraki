import { describe, it, expect } from 'vitest'
import {
  rubberBand,
  dampen,
  decayPosition,
  project,
  findNearestSnapPoint,
  naturalDuration,
  type SnapPointEntry,
} from '../engine/physics'

describe('rubberBand', () => {
  it('returns value unchanged when within bounds', () => {
    expect(rubberBand(50, 0, 100)).toBe(50)
    expect(rubberBand(0, 0, 100)).toBe(0)
    expect(rubberBand(100, 0, 100)).toBe(100)
  })

  it('dampens value below min', () => {
    const result = rubberBand(-10, 0, 100)
    expect(result).toBeGreaterThan(-10)
    expect(result).toBeLessThan(0)
  })

  it('dampens value above max', () => {
    const result = rubberBand(110, 0, 100)
    expect(result).toBeGreaterThan(100)
    expect(result).toBeLessThan(110)
  })

  it('returns clamped value when factor is 0', () => {
    expect(rubberBand(-50, 0, 100, 0)).toBe(0)
    expect(rubberBand(150, 0, 100, 0)).toBe(100)
  })
})

describe('dampen', () => {
  it('multiplies by factor', () => {
    expect(dampen(100, 0.5)).toBe(50)
    expect(dampen(100, 0.25)).toBe(25)
  })
})

describe('decayPosition', () => {
  it('returns position when velocity is negligible', () => {
    expect(decayPosition(100, 0.001)).toBe(100)
  })

  it('projects forward with positive velocity', () => {
    const result = decayPosition(0, 1)
    expect(result).toBeGreaterThan(0)
  })

  it('projects backward with negative velocity', () => {
    const result = decayPosition(100, -1)
    expect(result).toBeLessThan(100)
  })
})

describe('project', () => {
  it('returns 0 for zero velocity', () => {
    expect(project(0)).toBe(0)
  })

  it('returns positive value for positive velocity', () => {
    expect(project(1)).toBeGreaterThan(0)
  })

  it('returns negative value for negative velocity', () => {
    expect(project(-1)).toBeLessThan(0)
  })
})

describe('findNearestSnapPoint', () => {
  const snapPoints: SnapPointEntry[] = [
    { value: 100, index: 0 },
    { value: 300, index: 1 },
    { value: 500, index: 2 },
  ]

  it('finds nearest snap point without inertia', () => {
    expect(findNearestSnapPoint(120, 0, snapPoints, false)).toBe(0)
    expect(findNearestSnapPoint(280, 0, snapPoints, false)).toBe(1)
    expect(findNearestSnapPoint(450, 0, snapPoints, false)).toBe(2)
  })

  it('returns 0 for empty snap points', () => {
    expect(findNearestSnapPoint(100, 0, [])).toBe(0)
  })

  it('applies velocity projection with inertia enabled', () => {
    const result = findNearestSnapPoint(100, 2, snapPoints, true)
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(2)
  })
})

describe('naturalDuration', () => {
  it('returns baseDuration when velocity is negligible', () => {
    expect(naturalDuration(100, 0)).toBe(400)
  })

  it('clamps duration to max 400ms', () => {
    expect(naturalDuration(10, 0.001)).toBe(400)
  })

  it('clamps duration to min 120ms', () => {
    expect(naturalDuration(10, 100)).toBe(120)
  })
})
