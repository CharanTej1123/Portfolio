import { useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { useScrollContainer } from '../hooks/ScrollContainerContext.jsx'

export function BackToTop() {
  const container = useScrollContainer()
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll({ container })
  const [shown, setShown] = useState(false)
  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > 400
    setShown((current) => current === next ? current : next)
  })
  if (!shown) return null
  return (
    <button className="back-to-top" aria-label="Back to top" onClick={() => container?.current?.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}>
      <ArrowUp size={16} /> <span>cd ~</span>
    </button>
  )
}