import { useEffect } from 'react'

export function useEnterKey(onEnter, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event) => {
      if (event.key !== 'Enter') return
      event.preventDefault()
      onEnter()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onEnter, enabled])
}
