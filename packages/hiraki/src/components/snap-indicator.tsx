'use client'

import { forwardRef } from 'react'
import type { DrawerSnapIndicatorProps } from '../types'
import { useDrawerContext } from '../context/drawer-context'

export const SnapIndicator = forwardRef<HTMLDivElement, DrawerSnapIndicatorProps>(
  function SnapIndicator({ style, ...props }, ref) {
    const { resolvedSnapPoints, activeSnapIndex, direction } = useDrawerContext()
    const isHorizontal = direction === 'left' || direction === 'right'

    return (
      <div
        ref={ref}
        data-hiraki-snap-indicator=""
        aria-hidden="true"
        style={{
          display: 'flex',
          gap: 4,
          flexDirection: isHorizontal ? 'column' : 'row',
          justifyContent: 'center',
          ...style,
        }}
        {...props}
      >
        {resolvedSnapPoints.map((_, i) => (
          <div
            key={i}
            data-active={i === activeSnapIndex ? 'true' : 'false'}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor:
                i === activeSnapIndex
                  ? 'var(--hiraki-snap-active, currentColor)'
                  : 'var(--hiraki-snap-inactive, rgba(120, 120, 128, 0.32))',
              transition: 'background-color 200ms ease',
            }}
          />
        ))}
      </div>
    )
  },
)

SnapIndicator.displayName = 'Drawer.SnapIndicator'
