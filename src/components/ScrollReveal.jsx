import { motion, useReducedMotion } from 'framer-motion'
import { useScrollContainer } from '../hooks/ScrollContainerContext.jsx'

export function ScrollReveal({ children, className = '', delay = 0, x = 0 }) {
  const container = useScrollContainer()
  const reducedMotion = useReducedMotion()
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches
  const horizontalOffset = mobile ? 0 : x
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 18, x: reducedMotion ? 0 : horizontalOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ root: container, once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.38, delay: reducedMotion ? 0 : delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}