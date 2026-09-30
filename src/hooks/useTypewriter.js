import { useEffect, useState } from 'react'

export function useTypewriter(text, enabled = true) {
  const [value, setValue] = useState('')
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!enabled || reduceMotion) {
      setValue(text)
      return undefined
    }
    setValue('')
    const delay = Math.min(45, Math.max(15, 600 / Math.max(text.length, 1)))
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setValue(text.slice(0, index))
      if (index >= text.length) window.clearInterval(timer)
    }, delay)
    return () => window.clearInterval(timer)
  }, [text, enabled])
  return value
}