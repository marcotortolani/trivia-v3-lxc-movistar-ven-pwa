import { useRef, useEffect } from 'react'

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>()
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current === 'function') {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
