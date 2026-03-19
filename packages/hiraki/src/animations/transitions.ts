import {
  applyTransition,
  removeTransition,
  prefersReducedMotion,
  getEnterTransition,
  getExitTransition,
  getSnapTransition,
  type AnimationPreset,
} from './presets'

export function applyDragTransition(el: HTMLElement | null): void {
  if (!el) return
  removeTransition(el)
}

export function applySnapTransition(
  el: HTMLElement | null,
  velocityPxMs: number,
  distancePx: number,
): void {
  if (!el) return
  if (prefersReducedMotion()) {
    applyTransition(el, { duration: 0, easing: 'linear', property: 'transform' })
    return
  }
  applyTransition(el, getSnapTransition(velocityPxMs, distancePx))
}

export function applyEnterTransition(
  el: HTMLElement | null,
  preset: AnimationPreset = 'slide',
  duration?: number,
): void {
  if (!el) return
  if (prefersReducedMotion()) {
    applyTransition(el, { duration: 0, easing: 'linear', property: 'transform' })
    return
  }
  applyTransition(el, getEnterTransition(preset, duration))
}

export function applyExitTransition(
  el: HTMLElement | null,
  preset: AnimationPreset = 'slide',
  duration?: number,
): void {
  if (!el) return
  if (prefersReducedMotion()) {
    applyTransition(el, { duration: 0, easing: 'linear', property: 'transform' })
    return
  }
  applyTransition(el, getExitTransition(preset, duration))
}
