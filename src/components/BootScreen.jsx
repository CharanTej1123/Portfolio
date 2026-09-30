import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const bootLines = ['[BOOTING PORTFOLIO...]', '[LOADING SYSTEM...]', '[LOADING PROJECTS...]', '[LOADING SKILLS...]', '[SYSTEM ONLINE]']

export function BootScreen() {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [lineCount, setLineCount] = useState(0)
  const dismiss = () => {
    sessionStorage.setItem('portfolio-booted', 'true')
    setVisible(false)
    window.requestAnimationFrame(() => document.querySelector('#main h1')?.focus({ preventScroll: true }))
  }
  useEffect(() => {
    if (reducedMotion || sessionStorage.getItem('portfolio-booted')) {
      if (reducedMotion) sessionStorage.setItem('portfolio-booted', 'true')
      setVisible(false)
      return undefined
    }
    setVisible(true)
    const timers = bootLines.map((_, index) => window.setTimeout(() => setLineCount(index + 1), 240 + index * 230))
    const done = window.setTimeout(dismiss, 1500)
    const skip = (event) => (event.key === 'Escape' || event.key === 'Enter') && dismiss()
    window.addEventListener('keydown', skip)
    return () => {
      timers.forEach(window.clearTimeout)
      window.clearTimeout(done)
      window.removeEventListener('keydown', skip)
    }
  }, [reducedMotion])
  return (
    <AnimatePresence>
      {visible && <motion.div className="boot-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        <button className="boot-skip" autoFocus onClick={dismiss}>[ SKIP INTRO ]</button>
        <div className="boot-lines" aria-live="polite">{bootLines.slice(0, lineCount).map((line) => <p key={line}>{line}</p>)}</div>
        <div className="boot-track"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4 }} /></div>
      </motion.div>}
    </AnimatePresence>
  )
}