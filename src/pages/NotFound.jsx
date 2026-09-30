import { Link, useLocation } from 'react-router-dom'
import { TerminalWindow } from '../components/TerminalWindow.jsx'

export function NotFound() {
  const location = useLocation()
  return (
    <div className="not-found-page">
      <TerminalWindow command={`cd ${location.pathname}`} accent="yellow" stickyBar={false}>
        <p className="not-found-line">charan@portfolio:~$ cd {location.pathname}</p>
        <p className="error-line">bash: cd: {location.pathname}: No such file or directory</p>
        <h1 tabIndex="-1">ERROR 404</h1>
        <Link className="terminal-button" to="/">[ RETURN HOME ]</Link>
      </TerminalWindow>
    </div>
  )
}