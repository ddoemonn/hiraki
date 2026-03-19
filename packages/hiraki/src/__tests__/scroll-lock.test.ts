import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { lockScroll, unlockScroll } from '../utils/scroll-lock'

describe('lockScroll / unlockScroll', () => {
  beforeEach(() => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
  })

  afterEach(() => {
    unlockScroll()
  })

  it('locks body scroll', () => {
    lockScroll()
    expect(document.body.style.overflow).toBe('hidden')
    unlockScroll()
  })

  it('unlocks body scroll', () => {
    lockScroll()
    unlockScroll()
    expect(document.body.style.overflow).toBe('')
  })

  it('handles multiple lock calls (reference counted)', () => {
    lockScroll()
    lockScroll()
    unlockScroll()
    expect(document.body.style.overflow).toBe('hidden')
    unlockScroll()
    expect(document.body.style.overflow).toBe('')
  })

  it('does not throw when called in non-browser env', () => {
    const originalDocument = global.document
    Object.defineProperty(global, 'document', { value: undefined, configurable: true })
    expect(() => lockScroll()).not.toThrow()
    expect(() => unlockScroll()).not.toThrow()
    Object.defineProperty(global, 'document', { value: originalDocument, configurable: true })
  })
})
