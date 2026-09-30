import { useTypewriter } from '../hooks/useTypewriter.js'
import { FileDown } from 'lucide-react'
import { profile } from '../data/profile.js'

export function TopStatusBar({ command }) {
  const fullCommand = `charan@portfolio:~$ ${command}`
  const typed = useTypewriter(fullCommand)
  return (
    <header className="top-status" aria-label={fullCommand}>
      <span className="top-command" aria-hidden="true">{typed}</span>
      <div className="top-actions">
        <a className="top-resume" href={profile.resume} download target="_blank" rel="noopener noreferrer"><FileDown size={15} /><span>RESUME</span></a>
        <span className="status-ready"><i />SYSTEM ONLINE</span>
      </div>
    </header>
  )
}