import { motion, useReducedMotion } from 'framer-motion'
import { Code2, Database, Cloud, Braces, ChartNoAxesCombined, Workflow, Cpu, Monitor, Users, Wrench } from 'lucide-react'
import { skills } from '../data/skills.js'
import { ScrollReveal } from './ScrollReveal.jsx'
import { useScrollContainer } from '../hooks/ScrollContainerContext.jsx'

const iconByCategory = {
  'PROGRAMMING LANGUAGES': Code2,
  'WEB TECHNOLOGIES': Braces,
  'DATA & ANALYTICS': ChartNoAxesCombined,
  'BACKEND & FRAMEWORKS': Wrench,
  DATABASES: Database,
  'CLOUD PLATFORMS': Cloud,
  'DEVOPS & VERSION CONTROL': Workflow,
  'API DEVELOPMENT': Braces,
  'OPERATING SYSTEMS': Monitor,
  METHODOLOGIES: Users,
  'AI INTEGRATION': Cpu,
  'SOFT SKILLS': Users,
}

export function SkillGroup({ group, index = 0 }) {
  const Icon = iconByCategory[group.category] ?? Wrench
  const container = useScrollContainer()
  const reducedMotion = useReducedMotion()
  return (
    <ScrollReveal delay={index * 0.035}>
      <section className="skill-group">
        <h2><Icon size={17} aria-hidden="true" /><span>{group.category}</span></h2>
        <motion.div className="chip-list" initial="hidden" whileInView="visible" viewport={{ root: container, once: true, amount: 0.2 }} variants={{ visible: { transition: { staggerChildren: 0.025 } } }}>
          {group.items.map((item) => <motion.span className="chip" key={item} transition={{ duration: reducedMotion ? 0.01 : 0.2 }} variants={{ hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.96 }, visible: { opacity: 1, scale: 1 } }}>{item}</motion.span>)}
        </motion.div>
      </section>
    </ScrollReveal>
  )
}

export function SkillsList() {
  return <div className="skills-grid">{skills.map((group, index) => <SkillGroup key={group.category} group={group} index={index} />)}</div>
}