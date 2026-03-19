import { useMemo, useCallback } from 'react'
import type { SnapPoint, SnapPointResolved } from '../types'
import type { SnapPointEntry } from '../engine/physics'
import { useControllableState } from './use-controllable-state'

interface UseSnapPointsOptions {
  snapPoints: readonly SnapPoint[]
  viewportSize: number
  contentSize?: number
  activeSnapPoint?: number
  onSnapPointChange?: (index: number) => void
}

function resolveSnapPoint(snap: SnapPoint, viewportSize: number, contentSize?: number): number {
  if (snap === 'content') return Math.min(contentSize ?? viewportSize, viewportSize)
  if (typeof snap === 'number') return Math.min(Math.max(snap, 0), viewportSize)
  const percent = parseFloat(snap) / 100
  return Math.round(viewportSize * percent)
}

export interface UseSnapPointsReturn {
  resolvedSnapPoints: SnapPointResolved[]
  snapEntries: SnapPointEntry[]
  activeSnapIndex: number
  setActiveSnapIndex: (index: number) => void
  activeSnapPx: number
  translateForSnap: (index: number, maxTranslate: number) => number
}

export function useSnapPoints({
  snapPoints,
  viewportSize,
  contentSize,
  activeSnapPoint,
  onSnapPointChange,
}: UseSnapPointsOptions): UseSnapPointsReturn {
  const [rawActiveSnapIndex, setRawActiveSnapIndex] = useControllableState({
    controlled: activeSnapPoint,
    defaultValue: snapPoints.length > 0 ? snapPoints.length - 1 : 0,
    onChange: onSnapPointChange,
  })

  const resolvedSnapPoints = useMemo<SnapPointResolved[]>(() => {
    if (snapPoints.length === 0) return [{ value: viewportSize }]
    return snapPoints.map((sp) => ({
      value: resolveSnapPoint(sp, viewportSize, contentSize),
      label: typeof sp === 'string' ? sp : undefined,
    }))
  }, [snapPoints, viewportSize, contentSize])

  const snapEntries = useMemo<SnapPointEntry[]>(
    () => resolvedSnapPoints.map((sp, i) => ({ value: sp.value, index: i })),
    [resolvedSnapPoints],
  )

  const maxIndex = Math.max(resolvedSnapPoints.length - 1, 0)
  const activeSnapIndex = Math.min(Math.max(rawActiveSnapIndex, 0), maxIndex)
  const setActiveSnapIndex = useCallback(
    (index: number) => {
      setRawActiveSnapIndex(Math.min(Math.max(index, 0), maxIndex))
    },
    [maxIndex, setRawActiveSnapIndex],
  )

  const activeSnapPx = resolvedSnapPoints[activeSnapIndex]?.value ?? viewportSize

  const translateForSnap = useCallback(
    (index: number, maxTranslate: number): number => {
      const clampedIndex = Math.min(Math.max(index, 0), maxIndex)
      const snapPx = resolvedSnapPoints[clampedIndex]?.value ?? 0
      return Math.max(0, maxTranslate - snapPx)
    },
    [maxIndex, resolvedSnapPoints],
  )

  return { resolvedSnapPoints, snapEntries, activeSnapIndex, setActiveSnapIndex, activeSnapPx, translateForSnap }
}
