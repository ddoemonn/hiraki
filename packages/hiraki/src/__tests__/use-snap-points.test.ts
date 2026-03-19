import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSnapPoints } from '../hooks/use-snap-points'

describe('useSnapPoints', () => {
  it('defaults to single full-viewport snap when no snapPoints provided', () => {
    const { result } = renderHook(() =>
      useSnapPoints({ snapPoints: [], viewportSize: 800 }),
    )
    expect(result.current.resolvedSnapPoints).toHaveLength(1)
    expect(result.current.resolvedSnapPoints[0]?.value).toBe(800)
  })

  it('resolves pixel snap points', () => {
    const { result } = renderHook(() =>
      useSnapPoints({ snapPoints: [300, 600], viewportSize: 800 }),
    )
    expect(result.current.resolvedSnapPoints[0]?.value).toBe(300)
    expect(result.current.resolvedSnapPoints[1]?.value).toBe(600)
  })

  it('resolves percentage snap points', () => {
    const { result } = renderHook(() =>
      useSnapPoints({ snapPoints: ['50%', '100%'], viewportSize: 800 }),
    )
    expect(result.current.resolvedSnapPoints[0]?.value).toBe(400)
    expect(result.current.resolvedSnapPoints[1]?.value).toBe(800)
  })

  it('resolves content snap point to contentSize', () => {
    const { result } = renderHook(() =>
      useSnapPoints({ snapPoints: ['content'], viewportSize: 800, contentSize: 350 }),
    )
    expect(result.current.resolvedSnapPoints[0]?.value).toBe(350)
  })

  it('clamps content snap to viewportSize', () => {
    const { result } = renderHook(() =>
      useSnapPoints({ snapPoints: ['content'], viewportSize: 400, contentSize: 600 }),
    )
    expect(result.current.resolvedSnapPoints[0]?.value).toBe(400)
  })

  it('translateForSnap returns maxTranslate - snapPx', () => {
    const { result } = renderHook(() =>
      useSnapPoints({ snapPoints: [300], viewportSize: 800 }),
    )
    expect(result.current.translateForSnap(0, 500)).toBe(200)
  })

  it('setActiveSnapIndex updates index', () => {
    const { result } = renderHook(() =>
      useSnapPoints({ snapPoints: [200, 400], viewportSize: 800 }),
    )
    act(() => {
      result.current.setActiveSnapIndex(0)
    })
    expect(result.current.activeSnapIndex).toBe(0)
  })

  it('snapEntries have correct index mapping', () => {
    const { result } = renderHook(() =>
      useSnapPoints({ snapPoints: [200, 400, 600], viewportSize: 800 }),
    )
    expect(result.current.snapEntries[1]?.index).toBe(1)
    expect(result.current.snapEntries[1]?.value).toBe(400)
  })

  it('clamps active snap point to the available range', () => {
    const { result } = renderHook(() =>
      useSnapPoints({ snapPoints: [200, 400], viewportSize: 800, activeSnapPoint: 99 }),
    )

    expect(result.current.activeSnapIndex).toBe(1)
    expect(result.current.translateForSnap(99, 500)).toBe(100)
  })
})
