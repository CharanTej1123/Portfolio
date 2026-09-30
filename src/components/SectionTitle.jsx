import { useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useScrollContainer } from '../hooks/ScrollContainerContext.jsx'
import { useTypewriter } from '../hooks/useTypewriter.js'
import { AsciiDivider } from './AsciiDivider.jsx'

export function SectionTitle({ title, command, className = '' }) {
  const ref = useRef(null)
  const container = useScrollContainer()
  const visible = useInView(ref, { root: container, once: true, amount: 0.2 })
  const reducedMotion = useReducedMotion()
  const typed = useTypewriter(command, visible)
  return (
    <header ref={ref} className={`section-heading ${className}`}>
      <p className="section-command" aria-label={`$ ${command}`}>$ {typed || (reducedMotion ? command : '')}</p>
      <h1 tabIndex="-1">{title}</h1>
      <AsciiDivider />
    </header>
  )
}