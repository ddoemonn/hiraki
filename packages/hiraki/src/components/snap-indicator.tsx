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
              backgroundColor: i === activeSnapIndex ? 'currentColor' : 'rgba(0,0,0,0.2)',
              transition: 'background-color 200ms ease',
            }}
          />
        ))}
      </div>
    )
  },
)

SnapIndicator.displayName = 'Drawer.SnapIndicator'
