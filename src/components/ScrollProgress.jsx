import { motion, useScroll, useSpring } from 'framer-motion'
import { useScrollContainer } from '../hooks/ScrollContainerContext.jsx'

export function ScrollProgress() {
  const container = useScrollContainer()
  const { scrollYProgress } = useScroll({ container })
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}