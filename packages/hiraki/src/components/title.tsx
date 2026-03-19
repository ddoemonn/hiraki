'use client'

import { forwardRef } from 'react'
import type { DrawerTitleProps } from '../types'
import { useDrawerContext } from '../context/drawer-context'

export const Title = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  function Title({ children, ...props }, ref) {
    const { titleId } = useDrawerContext()

    return (
      <h2 ref={ref} id={titleId} data-hiraki-title="" {...props}>
        {children}
      </h2>
    )
  },
)

Title.displayName = 'Drawer.Title'
