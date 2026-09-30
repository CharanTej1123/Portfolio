import { SectionTitle } from '../components/SectionTitle.jsx'
import { TerminalWindow } from '../components/TerminalWindow.jsx'
import { profile } from '../data/profile.js'

const details = [
  ['Name', profile.name], ['Location', profile.location],
  ['Degree', 'B.Tech in Artificial Intelligence & Data Science'],
  ['University', 'REVA University'], ['CGPA', '8.3/10'], ['Graduated', '2026'],
]
const focus = [
  'Backend engineering (Java / Spring Boot, Python / FastAPI)',
  'Cloud infrastructure (AWS, Docker)',
  'AI integration (LLM APIs, Amazon Bedrock)',
  'Data analytics (Pandas, SQL, Power BI)',
  'Debugging and root-cause analysis',
]

export function About() {
  return (
    <>
      <SectionTitle title="01. ABOUT ME" command="cat about" />
      <div className="page-stack">
        <TerminalWindow command="./about">
          <p className="summary-copy">{profile.summary}</p>
        </TerminalWindow>
        <TerminalWindow command="$ cat profile.json" title="PROFILE" accent="cyan">
          {details.map(([key, value]) => <div className="key-value" key={key}><strong>{key}</strong><span>{value}</span></div>)}
        </TerminalWindow>
        <TerminalWindow command="$ cat current-focus.txt" title="CURRENT FOCUS" accent="yellow">
          <div className="output-lines">{focus.map((line) => <p className="output-line" key={line}>{line}</p>)}</div>
        </TerminalWindow>
      </div>
    </>
  )
}