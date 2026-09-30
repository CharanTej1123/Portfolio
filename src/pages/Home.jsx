import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { TerminalWindow } from '../components/TerminalWindow.jsx'
import { TerminalNavigator } from '../components/TerminalNavigator.jsx'
import { profile } from '../data/profile.js'

const quotes = [
  'Turning ideas into real-world impact.',
  'Build with clarity. Improve with every iteration.',
  'Progress is a series of thoughtful solutions.',
  'Make each step useful.',
]

function RotatingQuote() {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % quotes.length), 4500)
    return () => window.clearInterval(timer)
  }, [reducedMotion])

  return (
    <div className="quote-slot" aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <motion.blockquote
          className="home-quote"
          key={quotes[index]}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -5 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.28 }}
        >
          "{quotes[index]}"
        </motion.blockquote>
      </AnimatePresence>
    </div>
  )
}

export function Home() {
  return (
    <div className="home-stack">
      <TerminalWindow command="./home" className="home-terminal" stickyBar={false}>
        <div className="home-identity-grid">
          <div className="home-intro">
            <h1 tabIndex="-1">CHARAN TEJ P</h1>
            <p className="home-role">{profile.title}</p>
            <p className="home-location">BASED IN {profile.location.toUpperCase()}</p>
          </div>
          <div className="home-status-panel">
            <span className="home-status-label">STATUS</span>
            <span className="home-status-value"><i /> OPEN TO OPPORTUNITIES</span>
          </div>
        </div>
        <RotatingQuote />
        <div className="button-row home-actions">
          <Link className="terminal-button" to="/projects">[ VIEW PROJECTS ]</Link>
          <Link className="terminal-button" to="/about">[ ABOUT ME ]</Link>
          <Link className="terminal-button" to="/skills">[ MY SKILLS ]</Link>
          <Link className="terminal-button" to="/contact">[ CONTACT ME ]</Link>
        </div>
        <TerminalNavigator />
      </TerminalWindow>
    </div>
  )
}