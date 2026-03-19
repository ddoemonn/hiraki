'use client'

import { forwardRef } from 'react'
import type { DrawerHandleProps } from '../types'
import { useDrawerContext } from '../context/drawer-context'

export const Handle = forwardRef<HTMLDivElement, DrawerHandleProps>(
  function Handle({ handleOnly: _handleOnly = false, style, ...props }, ref) {
    const { direction } = useDrawerContext()
    const isHorizontal = direction === 'left' || direction === 'right'

    return (
      <div
        ref={ref}
        data-hiraki-handle=""
        aria-hidden="true"
        style={{
          width: isHorizontal ? 4 : 36,
          height: isHorizontal ? 36 : 4,
          borderRadius: 9999,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          margin: isHorizontal ? '0 8px' : '8px auto',
          flexShrink: 0,
          cursor: 'grab',
          ...style,
        }}
        {...props}
      />
    )
  },
)

Handle.displayName = 'Drawer.Handle'
