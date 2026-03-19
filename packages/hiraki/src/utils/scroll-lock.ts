let lockCount = 0
let savedScrollY = 0
let savedScrollbarWidth = 0
let originalStyles: {
  overflow: string
  paddingRight: string
  position: string
  top: string
  width: string
} | null = null

function getScrollbarWidth(): number {
  if (typeof document === 'undefined') return 0
  const outer = document.createElement('div')
  outer.style.cssText = 'visibility:hidden;overflow:scroll;position:absolute;top:-9999px;width:50px'
  document.body.appendChild(outer)
  const inner = document.createElement('div')
  outer.appendChild(inner)
  const width = outer.offsetWidth - inner.offsetWidth
  document.body.removeChild(outer)
  return width
}

export function lockScroll(): void {
  if (typeof document === 'undefined') return
  lockCount++
  if (lockCount > 1) return
  savedScrollY = window.scrollY
  savedScrollbarWidth = getScrollbarWidth()
  const body = document.body
  originalStyles = {
    overflow: body.style.overflow,
    paddingRight: body.style.paddingRight,
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
  }
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
  if (isIOS) {
    body.style.position = 'fixed'
    body.style.top = `-${savedScrollY}px`
    body.style.width = '100%'
  } else {
    body.style.overflow = 'hidden'
  }
  if (savedScrollbarWidth > 0) {
    body.style.paddingRight = `${savedScrollbarWidth}px`
    document.documentElement.style.setProperty('--hiraki-scrollbar-width', `${savedScrollbarWidth}px`)
  }
}

export function unlockScroll(): void {
  if (typeof document === 'undefined') return
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount > 0 || !originalStyles) return
  const body = document.body
  body.style.overflow = originalStyles.overflow
  body.style.paddingRight = originalStyles.paddingRight
  body.style.position = originalStyles.position
  body.style.top = originalStyles.top
  body.style.width = originalStyles.width
  document.documentElement.style.removeProperty('--hiraki-scrollbar-width')
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
  if (isIOS) window.scrollTo(0, savedScrollY)
  originalStyles = null
}
