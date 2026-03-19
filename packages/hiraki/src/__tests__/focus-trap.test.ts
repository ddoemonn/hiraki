import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createFocusTrap } from '../utils/focus-trap'

function createContainer(): HTMLElement {
  const container = document.createElement('div')
  const btn1 = document.createElement('button')
  btn1.textContent = 'First'
  const btn2 = document.createElement('button')
  btn2.textContent = 'Second'
  const btn3 = document.createElement('button')
  btn3.textContent = 'Third'
  container.appendChild(btn1)
  container.appendChild(btn2)
  container.appendChild(btn3)
  document.body.appendChild(container)
  return container
}

describe('createFocusTrap', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = createContainer()
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('activates without throwing', () => {
    const trap = createFocusTrap(container)
    expect(() => trap.activate()).not.toThrow()
    trap.deactivate()
  })

  it('deactivates without throwing', () => {
    const trap = createFocusTrap(container)
    trap.activate()
    expect(() => trap.deactivate()).not.toThrow()
  })

  it('focuses first element on activate', () => {
    const trap = createFocusTrap(container)
    const firstBtn = container.querySelector('button')
    trap.activate()
    expect(document.activeElement).toBe(firstBtn)
    trap.deactivate()
  })

  it('wraps Tab from last to first element', () => {
    const trap = createFocusTrap(container)
    trap.activate()
    const buttons = container.querySelectorAll<HTMLElement>('button')
    const lastBtn = buttons[buttons.length - 1]!
    lastBtn.focus()
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
    document.dispatchEvent(tabEvent)
    expect(document.activeElement).toBe(buttons[0])
    trap.deactivate()
  })

  it('updateContainer accepts new container', () => {
    const trap = createFocusTrap(container)
    const newContainer = createContainer()
    expect(() => trap.updateContainer(newContainer)).not.toThrow()
    document.body.removeChild(newContainer)
  })

  it('calls focus on previouslyFocused on deactivate', () => {
    const outsideBtn = document.createElement('button')
    document.body.appendChild(outsideBtn)
    outsideBtn.focus()
    const focusSpy = vi.spyOn(outsideBtn, 'focus')
    const trap = createFocusTrap(container)
    trap.activate()
    trap.deactivate()
    expect(focusSpy).toHaveBeenCalled()
    document.body.removeChild(outsideBtn)
  })
})
