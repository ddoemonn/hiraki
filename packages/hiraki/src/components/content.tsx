'use client'

import { forwardRef } from 'react'
import type { DrawerContentProps } from '../types'
import { useDrawerContext } from '../context/drawer-context'
import { composeRefs } from '../utils/dom'
import { getContentStyle } from '../variants/variant-config'

function getPositionStyle(direction: string): React.CSSProperties {
  switch (direction) {
    case 'top':
      return { top: 0, left: 0, right: 0 }
    case 'left':
      return { left: 0, top: 0, bottom: 0 }
    case 'right':
      return { right: 0, top: 0, bottom: 0 }
    default:
      return { bottom: 0, left: 0, right: 0 }
  }
}

export const Content = forwardRef<HTMLDivElement, DrawerContentProps>(
  function Content({ children, style, ...props }, ref) {
    const {
      contentRef,
      direction,
      variant,
      open,
      titleId,
      descriptionId,
      gestureHandlers,
    } = useDrawerContext()

    return (
      <div
        ref={composeRefs(contentRef, ref)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-hiraki-content=""
        data-hiraki-direction={direction}
        data-hiraki-variant={variant}
        data-hiraki-open={open ? 'true' : 'false'}
        data-hiraki-dragging="false"
        data-state={open ? 'open' : 'closed'}
        style={{
          position: 'fixed',
          zIndex: 'var(--hiraki-content-z, 50)' as string,
          willChange: 'transform',
          touchAction: 'none',
          ...getPositionStyle(direction),
          ...getContentStyle(variant, direction),
          ...style,
        }}
        {...gestureHandlers}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Content.displayName = 'Drawer.Content'
