'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { DrawerPortalProps } from '../types'
import { useDrawerContext } from '../context/drawer-context'

export function Portal({ children, container }: DrawerPortalProps) {
  const { mounted } = useDrawerContext()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated || !mounted) return null

  return createPortal(children, container ?? document.body)
}

Portal.displayName = 'Drawer.Portal'
