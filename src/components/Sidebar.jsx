import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Award, FolderGit2, GraduationCap, Mail, PanelLeftClose, PanelLeftOpen, Terminal, UserRound, Wrench, Github, Linkedin } from 'lucide-react'
import { profile } from '../data/profile.js'

const links = [
  ['/', 'home', Terminal], ['/about', 'about', UserRound], ['/education', 'education', GraduationCap],
  ['/skills', 'skills', Wrench], ['/projects', 'projects', FolderGit2],
  ['/certifications', 'certifications', Award], ['/contact', 'contact', Mail],
]

export function Sidebar({ drawerOpen, setDrawerOpen, railExpanded, setRailExpanded, sidebarCollapsed, setSidebarCollapsed }) {
  const isTablet = window.matchMedia('(min-width: 761px) and (max-width: 1100px)').matches
  const isExpanded = isTablet ? railExpanded : !sidebarCollapsed
  const ToggleIcon = isExpanded ? PanelLeftClose : PanelLeftOpen
  const toggleNavigation = () => {
    if (window.matchMedia('(min-width: 761px) and (max-width: 1100px)').matches) {
      setRailExpanded((value) => !value)
    } else {
      setSidebarCollapsed((value) => !value)
    }
  }
  useEffect(() => {
    if (!drawerOpen) return undefined
    const prior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event) => event.key === 'Escape' && setDrawerOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = prior
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [drawerOpen, setDrawerOpen])

  return (
    <aside className={`sidebar ${drawerOpen ? 'sidebar-open' : ''} ${railExpanded ? 'sidebar-expanded' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="brand"><strong>{profile.handle}</strong><span>Portfolio</span><span className="brand-short" aria-hidden="true">CTP</span></div>
      <button className="rail-toggle" onClick={toggleNavigation} aria-label={isExpanded ? 'Collapse navigation' : 'Expand navigation'} aria-expanded={isExpanded} title={isExpanded ? 'Collapse navigation' : 'Expand navigation'}><ToggleIcon size={17} /></button>
      <nav aria-label="Primary">
        <div className="tree-root">~/portfolio</div>
        <div className="tree-links">
          {links.map(([path, label, Icon]) => (
            <NavLink key={path} to={path} end={path === '/'} title={label} aria-label={label} onClick={() => setDrawerOpen(false)}>
              <Icon size={17} aria-hidden="true" /><span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="sidebar-bottom">
        <div className="social-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><Github size={19} /><span>GitHub</span></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><Linkedin size={19} /><span>LinkedIn</span></a>
        </div>
        <span className="sidebar-status"><i /> STATUS: OPEN TO OPPORTUNITIES</span>
      </div>
    </aside>
  )
}