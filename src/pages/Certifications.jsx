import { SectionTitle } from '../components/SectionTitle.jsx'
import { TerminalWindow } from '../components/TerminalWindow.jsx'
import { CertificationCard } from '../components/CertificationCard.jsx'
import { certifications } from '../data/certifications.js'

export function Certifications() {
  return (
    <>
      <SectionTitle title="05. CERTIFICATIONS" command="ls certificates/" />
      <TerminalWindow command="$ ls certificates/" stickyBar={false}>
        <div className="certificate-list">
          {certifications.map((certificate, index) => <CertificationCard key={certificate.id} certificate={certificate} index={index} />)}
        </div>
      </TerminalWindow>
    </>
  )
}