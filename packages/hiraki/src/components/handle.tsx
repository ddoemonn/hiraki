'use client'

import { forwardRef } from 'react'
import type { DrawerHandleProps } from '../types'
import { useDrawerContext } from '../context/drawer-context'

export const Handle = forwardRef<HTMLDivElement, DrawerHandleProps>(
  function Handle(
    {
      handleOnly: _handleOnly = false,
      visible = true,
      style,
      ...props
    },
    ref,
  ) {
    const { direction } = useDrawerContext()
    const isHorizontal = direction === 'left' || direction === 'right'

    if (!visible) return null

    return (
      <div
        ref={ref}
        data-hiraki-handle=""
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isHorizontal ? 20 : '100%',
          height: isHorizontal ? 52 : 20,
          margin: isHorizontal ? '0 8px' : '0',
          flexShrink: 0,
          cursor: isHorizontal ? 'ew-resize' : 'ns-resize',
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          ...style,
        }}
        {...props}
      >
        <span
          style={{
            width: isHorizontal ? 5 : 44,
            height: isHorizontal ? 44 : 5,
            borderRadius: 9999,
            backgroundColor: 'var(--hiraki-handle-bg, rgba(120, 120, 128, 0.42))',
            boxShadow: 'var(--hiraki-handle-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.22))',
            pointerEvents: 'none',
          }}
        />
      </div>
    )
  },
)

Handle.displayName = 'Drawer.Handle'
