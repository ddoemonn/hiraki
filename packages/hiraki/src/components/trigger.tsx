'use client'

import { forwardRef } from 'react'
import type { DrawerTriggerProps } from '../types'
import { useDrawerContext } from '../context/drawer-context'
import { composeRefs } from '../utils/dom'

export const Trigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  function Trigger({ children, onClick, asChild: _asChild, ...props }, ref) {
    const { openDrawer, triggerRef } = useDrawerContext()

    return (
      <button
        ref={composeRefs(triggerRef, ref)}
        type="button"
        data-hiraki-trigger=""
        onClick={composeEventHandlers(onClick, openDrawer)}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Trigger.displayName = 'Drawer.Trigger'

function composeEventHandlers<E>(
  original?: (e: E) => void,
  ours?: (e: E) => void,
): (e: E) => void {
  return (e: E) => {
    original?.(e)
    if (!(e as Event & { defaultPrevented?: boolean }).defaultPrevented) ours?.(e)
  }
}
