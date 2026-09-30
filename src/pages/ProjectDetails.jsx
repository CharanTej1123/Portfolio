import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { TerminalWindow } from '../components/TerminalWindow.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { NotFound } from './NotFound.jsx'
import { projects } from '../data/projects.js'
import { profile } from '../data/profile.js'

export function ProjectDetails() {
  const { id } = useParams()
  const project = projects.find((entry) => entry.id === id)
  const [ready, setReady] = useState(false)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    if (reducedMotion) {
      setReady(true)
      return undefined
    }
    setReady(false)
    const timer = window.setTimeout(() => setReady(true), 320)
    return () => window.clearTimeout(timer)
  }, [id, reducedMotion])
  if (!project) return <NotFound />
  const index = projects.indexOf(project)
  const prior = projects[index - 1]
  const next = projects[index + 1]
  const repoHref = project.repoUrl ?? profile.github

  return (
    <>
      <SectionTitle title="04. PROJECT DETAILS" command={`cat projects/${project.id}`} />
      {!ready ? <p className="boot-message">&gt; loading project...</p> : (
        <TerminalWindow command={`./run ${project.id}`} accent={project.accent} stickyBar={false}>
          <div className="project-index">PROJECT {project.index}<span className="status-pill">{project.status}</span></div>
          <h2 className="project-title">{project.title}</h2>
          <div className="chip-list">{project.technologies.map((technology) => <span className="chip" key={technology}>{technology}</span>)}</div>
          <p className="project-summary">{project.summary}</p>
          <h3 className="subheading">HIGHLIGHTS</h3>
          <div className="output-lines">{project.highlights.map((highlight, line) => <ScrollReveal key={highlight} delay={Math.min(line * 0.06, 0.4)}><p className="output-line">{highlight}</p></ScrollReveal>)}</div>
          <h3 className="subheading">TERMINAL OUTPUT</h3>
          <div className="project-output">{project.terminalOutput.map(([key, value]) => <p key={key}><strong>{key}</strong><span>{value}</span></p>)}</div>
          <div className="button-row">
            <a className="terminal-button" href={repoHref} target="_blank" rel="noopener noreferrer">[ {project.repoUrl ? 'GITHUB' : 'GITHUB PROFILE'} ] <ExternalLink size={14} /></a>
            <Link className="terminal-button" to="/projects"><ArrowLeft size={14} /> [ BACK TO PROJECTS ]</Link>
          </div>
          <nav className="project-neighbors" aria-label="Other projects">
            {prior ? <Link to={`/projects/${prior.id}`}><ArrowLeft size={14} /> {prior.title}</Link> : <span />}
            {next ? <Link to={`/projects/${next.id}`}>{next.title} <ArrowRight size={14} /></Link> : <span />}
          </nav>
        </TerminalWindow>
      )}
    </>
  )
}