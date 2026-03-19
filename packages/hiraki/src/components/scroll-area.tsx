'use client'

import { forwardRef } from 'react'
import type { DrawerScrollAreaProps } from '../types'

export const ScrollArea = forwardRef<HTMLDivElement, DrawerScrollAreaProps>(
  function ScrollArea({ children, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-hiraki-scroll-area=""
        style={{
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
)

ScrollArea.displayName = 'Drawer.ScrollArea'
