import { SectionTitle } from '../components/SectionTitle.jsx'
import { ProjectCard } from '../components/ProjectCard.jsx'
import { projects } from '../data/projects.js'

export function Projects() {
  return (
    <>
      <SectionTitle title="04. PROJECTS" command="ls projects/" />
      <div className="project-list">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div>
    </>
  )
}