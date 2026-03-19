'use client'

import { forwardRef } from 'react'
import type { DrawerDescriptionProps } from '../types'
import { useDrawerContext } from '../context/drawer-context'

export const Description = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  function Description({ children, ...props }, ref) {
    const { descriptionId } = useDrawerContext()

    return (
      <p ref={ref} id={descriptionId} data-hiraki-description="" {...props}>
        {children}
      </p>
    )
  },
)

Description.displayName = 'Drawer.Description'
