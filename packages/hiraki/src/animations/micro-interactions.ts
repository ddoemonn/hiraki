import { calcOverlayOpacity, calcBackgroundScale } from '../utils/css-properties'

export function updateOverlayProgress(overlayEl: HTMLElement | null, progress: number): void {
  if (!overlayEl) return
  overlayEl.style.opacity = String(calcOverlayOpacity(progress))
}

export function updateBackgroundScale(backgroundEl: HTMLElement | null, progress: number): void {
  if (!backgroundEl) return
  backgroundEl.style.transform = `scale(${calcBackgroundScale(progress)})`
  backgroundEl.style.borderRadius = `${progress * 12}px`
}

export function updateDragProgress(contentEl: HTMLElement | null, progress: number): void {
  if (!contentEl) return
  contentEl.style.setProperty('--hiraki-drag-progress', String(progress))
}
