import type { Direction } from '../types'

export type AnimationPreset = 'slide' | 'spring' | 'scale' | 'morph'

export interface TransitionConfig {
  duration: number
  easing: string
  property: string
}

const SPRING_EASING = 'cubic-bezier(0.32, 0.08, 0.38, 1.1)'
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_IN_OUT = 'cubic-bezier(0.4, 0, 0.2, 1)'

export function getTransform(direction: Direction, value: number): string {
  switch (direction) {
    case 'top':
      return `translate3d(0, ${-value}px, 0)`
    case 'left':
      return `translate3d(${-value}px, 0, 0)`
    case 'right':
      return `translate3d(${value}px, 0, 0)`
    default:
      return `translate3d(0, ${value}px, 0)`
  }
}

export function getEnterTransition(preset: AnimationPreset, duration = 350): TransitionConfig {
  switch (preset) {
    case 'spring':
      return { duration, easing: SPRING_EASING, property: 'transform' }
    case 'scale':
      return { duration, easing: EASE_OUT, property: 'transform, opacity' }
    case 'morph':
      return { duration, easing: EASE_OUT, property: 'transform, border-radius, width, height' }
    default:
      return { duration, easing: EASE_OUT, property: 'transform' }
  }
}

export function getExitTransition(preset: AnimationPreset, duration = 300): TransitionConfig {
  switch (preset) {
    case 'spring':
      return { duration, easing: EASE_IN_OUT, property: 'transform' }
    case 'scale':
      return { duration, easing: EASE_IN_OUT, property: 'transform, opacity' }
    case 'morph':
      return { duration, easing: EASE_IN_OUT, property: 'transform, border-radius, width, height' }
    default:
      return { duration, easing: EASE_IN_OUT, property: 'transform' }
  }
}

export function getSnapTransition(velocityPxMs: number, distancePx: number): TransitionConfig {
  const absVelocity = Math.abs(velocityPxMs)
  const duration =
    absVelocity > 0.5
      ? Math.max(120, Math.min(250, distancePx / absVelocity))
      : 250
  return { duration, easing: EASE_OUT, property: 'transform' }
}

export function applyTransition(el: HTMLElement, config: TransitionConfig): void {
  el.style.transition = `${config.property} ${config.duration}ms ${config.easing}`
}

export function removeTransition(el: HTMLElement): void {
  el.style.transition = 'none'
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
