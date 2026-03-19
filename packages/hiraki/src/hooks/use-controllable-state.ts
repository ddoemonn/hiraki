import { useState, useCallback, useRef } from 'react'

interface UseControllableStateOptions<T> {
  controlled?: T
  defaultValue: T
  onChange?: (value: T) => void
}

export function useControllableState<T>({
  controlled,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, (value: T | ((prev: T) => T)) => void] {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue)
  const isControlled = controlled !== undefined
  const value = isControlled ? controlled : uncontrolled
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue = typeof next === 'function' ? (next as (prev: T) => T)(value) : next
      if (!isControlled) setUncontrolled(nextValue)
      onChangeRef.current?.(nextValue)
    },
    [isControlled, value],
  )

  return [value, setValue]
}
