import { useTypewriter } from '../hooks/useTypewriter.js'
import { Cursor } from './Cursor.jsx'

export function TerminalPrompt({ command = '', cursor = false, className = '' }) {
  const typed = useTypewriter(command)
  const full = `charan@portfolio:~$ ${command}`
  return (
    <p className={`terminal-prompt ${className}`} aria-label={full}>
      <span className="prompt-user">charan@portfolio:~$</span> {typed}
      {cursor && typed === command && <Cursor />}
    </p>
  )
}