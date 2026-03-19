'use client'

import { forwardRef, cloneElement, isValidElement, type ReactElement } from 'react'
import type { DrawerCloseProps } from '../types'
import { useDrawerContext } from '../context/drawer-context'

export const Close = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  function Close({ children, onClick, asChild = false, ...props }, ref) {
    const { forceClose } = useDrawerContext()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      forceClose()
    }

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<Record<string, unknown>>
      return cloneElement(child, {
        ...props,
        ref,
        'data-hiraki-close': '',
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          if (typeof child.props.onClick === 'function') child.props.onClick(e)
          handleClick(e)
        },
      })
    }

    return (
      <button
        ref={ref}
        type="button"
        data-hiraki-close=""
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Close.displayName = 'Drawer.Close'
