import type { Variant, Direction } from '../types'

export interface VariantConfig {
  /** CSS class to apply to content element */
  contentClass?: string
  /** Whether to show handle by default */
  showHandle?: boolean
  /** Inset margin from screen edge in px */
  margin?: number
  /** Border radius override */
  borderRadius?: number
  /** Whether the drawer fills the perpendicular axis */
  fullWidth?: boolean
  /** Whether to use morph animation */
  morph?: boolean
  /** Whether this registers with a parent drawer */
  nested?: boolean
  /** Stack offset multiplier */
  stackOffset?: number
}

const VARIANT_CONFIGS: Record<Variant, VariantConfig> = {
  default: {
    showHandle: true,
    borderRadius: 16,
    fullWidth: true,
  },
  floating: {
    showHandle: true,
    margin: 12,
    borderRadius: 16,
    fullWidth: false,
  },
  sheet: {
    showHandle: true,
    borderRadius: 0,
    fullWidth: true,
  },
  fullscreen: {
    showHandle: false,
    borderRadius: 0,
    fullWidth: true,
    morph: true,
  },
  nested: {
    showHandle: true,
    borderRadius: 16,
    fullWidth: true,
    nested: true,
  },
  stack: {
    showHandle: true,
    borderRadius: 16,
    fullWidth: true,
    stackOffset: 8,
  },
}

export function getVariantConfig(variant: Variant): VariantConfig {
  return VARIANT_CONFIGS[variant]
}

export function getContentStyle(
  variant: Variant,
  direction: Direction,
): React.CSSProperties {
  const config = getVariantConfig(variant)
  const style: React.CSSProperties = {}

  if (config.margin) {
    switch (direction) {
      case 'bottom':
        style.left = config.margin
        style.right = config.margin
        style.bottom = config.margin
        break
      case 'top':
        style.left = config.margin
        style.right = config.margin
        style.top = config.margin
        break
      case 'left':
        style.top = config.margin
        style.bottom = config.margin
        style.left = config.margin
        break
      case 'right':
        style.top = config.margin
        style.bottom = config.margin
        style.right = config.margin
        break
    }
  }

  if (config.borderRadius != null && config.borderRadius > 0) {
    const r = `var(--hiraki-radius, ${config.borderRadius}px)`
    if (config.margin) {
      style.borderRadius = r
    } else {
      switch (direction) {
        case 'bottom':
          style.borderTopLeftRadius = r
          style.borderTopRightRadius = r
          break
        case 'top':
          style.borderBottomLeftRadius = r
          style.borderBottomRightRadius = r
          break
        case 'left':
          style.borderTopRightRadius = r
          style.borderBottomRightRadius = r
          break
        case 'right':
          style.borderTopLeftRadius = r
          style.borderBottomLeftRadius = r
          break
      }
    }
  }

  return style
}
