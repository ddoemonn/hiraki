import type { MutableRefObject, Ref } from 'react'

export function getScrollParent(el: Element | null): Element {
  if (!el) return document.body
  const style = window.getComputedStyle(el)
  const overflow = `${style.overflow} ${style.overflowY} ${style.overflowX}`
  if (/auto|scroll/.test(overflow)) {
    const hasScroll = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
    if (hasScroll) return el
  }
  return getScrollParent(el.parentElement)
}

export function isScrollable(el: Element): boolean {
  const style = window.getComputedStyle(el)
  const overflow = `${style.overflow} ${style.overflowY} ${style.overflowX}`
  if (!/auto|scroll/.test(overflow)) return false
  return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
}

type PossibleRef<T> = Ref<T> | undefined | null

export function composeRefs<T>(...refs: PossibleRef<T>[]): (node: T) => void {
  return (node: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref !== null && ref !== undefined) {
        ;(ref as MutableRefObject<T>).current = node
      }
    }
  }
}

export function composeEventHandlers<E>(
  originalHandler?: (event: E) => void,
  ourHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
): (event: E) => void {
  return function handleEvent(event: E) {
    originalHandler?.(event)
    if (
      !checkForDefaultPrevented ||
      !(event as Event & { defaultPrevented?: boolean }).defaultPrevented
    ) {
      ourHandler?.(event)
    }
  }
}

let idCounter = 0
export function generateId(prefix = 'hiraki'): string {
  return `${prefix}-${++idCounter}`
}
