import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '../data/profile.js'
import { TerminalWindow } from './TerminalWindow.jsx'
import { ScrollReveal } from './ScrollReveal.jsx'

export function ProjectCard({ project, index = 0 }) {
  const repoHref = project.repoUrl ?? profile.github
  return (
    <ScrollReveal delay={index * 0.12} x={index % 2 === 0 ? -24 : 24}>
    <TerminalWindow command={project.command} accent={project.accent} className="project-card" title={`PROJECT ${project.index}`}>
      <div className="project-index">PROJECT {project.index}<span className="status-pill">{project.status}</span></div>
      <h2 className="project-title">{project.title}</h2>
      <div className="chip-list">{project.technologies.map((technology) => <span className="chip" key={technology}>{technology}</span>)}</div>
      <p className="project-summary">{project.summary}</p>
      <div className="project-output">
        {project.terminalOutput.map(([key, value]) => <p key={key}><strong>{key}</strong><span>{value}</span></p>)}
      </div>
      <div className="button-row">
        <Link className="terminal-button" to={`/projects/${project.id}`}>[ VIEW DETAILS ] <ArrowUpRight size={14} /></Link>
        <a className="terminal-button" href={repoHref} target="_blank" rel="noopener noreferrer">[ {project.repoUrl ? 'GITHUB' : 'GITHUB PROFILE'} ] <ExternalLink size={14} /></a>
      </div>
    </TerminalWindow>
    </ScrollReveal>
  )
}