export function setCSSProperties(
  el: HTMLElement | null,
  props: Record<string, string | number>,
): void {
  if (!el) return
  for (const [key, value] of Object.entries(props)) {
    const cssProp = key.startsWith('--') ? key : `--hiraki-${key}`
    el.style.setProperty(cssProp, String(value))
  }
}

export function removeCSSProperties(el: HTMLElement | null, keys: string[]): void {
  if (!el) return
  for (const key of keys) {
    const cssProp = key.startsWith('--') ? key : `--hiraki-${key}`
    el.style.removeProperty(cssProp)
  }
}

export function calcOverlayOpacity(progress: number, maxOpacity = 0.5): number {
  return Math.min(Math.max(progress, 0), 1) * maxOpacity
}

export function calcBackgroundScale(progress: number, minScale = 0.96): number {
  return minScale + (1 - minScale) * (1 - Math.min(Math.max(progress, 0), 1))
}
