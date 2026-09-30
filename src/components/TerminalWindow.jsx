import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useScrollContainer } from '../hooks/ScrollContainerContext.jsx'
import { useTypewriter } from '../hooks/useTypewriter.js'

export function TerminalWindow({ command, children, className = '', accent = 'neon', stickyBar = true, title }) {
  const ref = useRef(null)
  const container = useScrollContainer()
  const visible = useInView(ref, { root: container, once: true, amount: 0.2 })
  const reducedMotion = useReducedMotion()
  const typed = useTypewriter(command, visible)
  return (
    <motion.section
      ref={ref}
      className={`terminal-window accent-${accent} ${className}`}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ root: container, once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.4, ease: 'easeOut' }}
      whileHover={reducedMotion ? undefined : { y: -2, boxShadow: '0 0 30px rgba(0,255,102,.16)' }}
    >
      <div className={`terminal-titlebar ${stickyBar ? 'sticky-titlebar' : ''}`}>
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <span className="window-command" aria-label={command}>{typed || (reducedMotion ? command : '')}</span>
        {title && <span className="window-title">{title}</span>}
      </div>
      <div className="terminal-body">{children}</div>
    </motion.section>
  )
}