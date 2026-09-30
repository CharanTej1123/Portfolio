import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects.js'

const sectionRoutes = {
  home: '/', '~': '/', '/': '/',
  about: '/about', 'about me': '/about',
  education: '/education', skills: '/skills',
  project: '/projects', projects: '/projects',
  certifications: '/certifications', certification: '/certifications',
  contact: '/contact', 'get in touch': '/contact',
}

function resolveCommand(value, currentPath) {
  const command = value.trim()
  if (!/^cd(?:\s+|\.\.$|[~/])/i.test(command)) return null
  const target = command.replace(/^cd/i, '').trim() || '~'
  if (target === '..') return currentPath.startsWith('/projects/') ? '/projects' : '/'

  const normalized = target.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '').toLowerCase()
  const friendly = normalized.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  if (sectionRoutes[friendly]) return sectionRoutes[friendly]

  const projectId = normalized.startsWith('projects/') ? normalized.slice('projects/'.length) : normalized
  const project = projects.find((entry) => entry.id === projectId)
  return project ? `/projects/${project.id}` : null
}

export function TerminalNavigator() {
  const [command, setCommand] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  function submit(event) {
    event.preventDefault()
    const route = resolveCommand(command, location.pathname)
    if (!route) {
      setError(`bash: ${command.trim() || 'cd'}: section not found`)
      return
    }
    setError('')
    navigate(route)
  }

  return (
    <div className="terminal-navigator-wrap">
      <form className="terminal-navigator" onSubmit={submit}>
        <label className="terminal-command-prefix" htmlFor="terminal-command">charan@portfolio:~$</label>
        <input
          id="terminal-command"
          aria-label="Portfolio navigation command"
          autoComplete="off"
          spellCheck="false"
          value={command}
          onChange={(event) => {
            setCommand(event.target.value)
            if (error) setError('')
          }}
        />
      </form>
      {error && <p className="terminal-cli-error" role="status">{error}</p>}
    </div>
  )
}