const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details > summary',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(', ')

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter((el) => {
    const style = window.getComputedStyle(el)
    return style.visibility !== 'hidden' && style.display !== 'none'
  })
}

export interface FocusTrap {
  activate: () => void
  deactivate: () => void
  updateContainer: (container: HTMLElement) => void
}

export function createFocusTrap(initialContainer: HTMLElement): FocusTrap {
  let container = initialContainer
  let active = false
  let previouslyFocused: HTMLElement | null = null

  function handleKeyDown(event: KeyboardEvent) {
    if (!active || event.key !== 'Tab') return
    const focusable = getFocusableElements(container)
    if (focusable.length === 0) {
      event.preventDefault()
      return
    }
    const firstEl = focusable[0]
    const lastEl = focusable[focusable.length - 1]
    if (event.shiftKey) {
      if (document.activeElement === firstEl) {
        event.preventDefault()
        lastEl?.focus()
      }
    } else {
      if (document.activeElement === lastEl) {
        event.preventDefault()
        firstEl?.focus()
      }
    }
  }

  function handleFocusOut(event: FocusEvent) {
    if (!active) return
    const relatedTarget = event.relatedTarget as Node | null
    if (relatedTarget && !container.contains(relatedTarget)) {
      getFocusableElements(container)[0]?.focus()
    }
  }

  function activate() {
    if (active) return
    active = true
    previouslyFocused = document.activeElement as HTMLElement | null
    getFocusableElements(container)[0]?.focus()
    document.addEventListener('keydown', handleKeyDown)
    container.addEventListener('focusout', handleFocusOut)
  }

  function deactivate() {
    if (!active) return
    active = false
    document.removeEventListener('keydown', handleKeyDown)
    container.removeEventListener('focusout', handleFocusOut)
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus()
    }
    previouslyFocused = null
  }

  function updateContainer(newContainer: HTMLElement) {
    if (active) {
      container.removeEventListener('focusout', handleFocusOut)
      container = newContainer
      container.addEventListener('focusout', handleFocusOut)
    } else {
      container = newContainer
    }
  }

  return { activate, deactivate, updateContainer }
}
