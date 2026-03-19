'use client'

import { forwardRef } from 'react'
import type { DrawerOverlayProps } from '../types'
import { useDrawerContext } from '../context/drawer-context'
import { composeRefs, composeEventHandlers } from '../utils/dom'

export const Overlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  function Overlay({ onClick, style, ...props }, ref) {
    const { overlayRef, closeDrawer, dismissible } = useDrawerContext()

    return (
      <div
        ref={composeRefs(overlayRef, ref)}
        data-hiraki-overlay=""
        aria-hidden="true"
        onClick={composeEventHandlers(onClick, () => {
          if (dismissible) closeDrawer()
        })}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: 0,
          zIndex: 'var(--hiraki-overlay-z, 49)' as string,
          ...style,
        }}
        {...props}
      />
    )
  },
)

Overlay.displayName = 'Drawer.Overlay'
