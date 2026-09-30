import { SectionTitle } from '../components/SectionTitle.jsx'
import { TerminalWindow } from '../components/TerminalWindow.jsx'
import { ScrollReveal } from '../components/ScrollReveal.jsx'
import { education } from '../data/education.js'
import { MoveHorizontal } from 'lucide-react'

function JsonEducation({ item, index }) {
  const score = item.cgpa ?? item.percentage
  const course = item.degree ?? item.program
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="json-entry">
        <div><span className="json-punctuation">{'{'}</span></div>
        <div><span className="json-key">"institution"</span>: <span className="json-string">"{item.institution}"</span>,</div>
        <div><span className="json-key">"{item.degree ? 'degree' : 'program'}"</span>: <span className="json-string">"{course}"</span>,</div>
        <div><span className="json-key">"duration"</span>: <span className="json-string">"{item.duration}"</span>,</div>
        {item.status && <div><span className="json-key">"status"</span>: <span className="json-string">"{item.status}"</span>,</div>}
        <div><span className="json-key">"{item.cgpa ? 'cgpa' : 'percentage'}"</span>: <span className="json-string">"{score}"</span></div>
        <div><span className="json-punctuation">{'},'}</span></div>
      </div>
    </ScrollReveal>
  )
}

export function Education() {
  return (
    <>
      <SectionTitle title="02. EDUCATION" command="cat education" />
      <div className="page-stack">
        <TerminalWindow command="$ cat education.json" stickyBar={false}>
          <div className="json-scroll" role="region" aria-label="Education records" tabIndex="0">
            <pre className="json-bracket">[</pre>
            {education.map((item, index) => <JsonEducation item={item} index={index} key={item.institution} />)}
            <pre className="json-bracket">]</pre>
          </div>
        </TerminalWindow>
        <TerminalWindow command="$ education --table" title="EDUCATION SUMMARY" accent="cyan">
          <p className="scroll-cue"><MoveHorizontal size={16} aria-hidden="true" /> SCROLL TABLE</p>
          <div className="table-scroll" role="region" aria-label="Education summary table" tabIndex="0">
            <table className="education-table">
              <thead><tr><th scope="col">INSTITUTION</th><th scope="col">PROGRAM</th><th scope="col">YEARS</th><th scope="col">SCORE</th></tr></thead>
              <tbody>{education.map((item) => <tr key={item.institution}><td>{item.institution}</td><td>{item.degree ?? item.program}</td><td className="nowrap-cell">{item.duration}</td><td className="score-value">{item.cgpa ?? item.percentage}</td></tr>)}</tbody>
            </table>
          </div>
        </TerminalWindow>
      </div>
    </>
  )
}