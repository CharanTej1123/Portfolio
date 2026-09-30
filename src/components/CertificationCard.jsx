import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, ExternalLink } from 'lucide-react'

export function CertificationCard({ certificate, index }) {
  const [expanded, setExpanded] = useState(false)
  const reducedMotion = useReducedMotion()
  return (
    <article className="certificate-file">
      <button className="certificate-trigger" aria-expanded={expanded} aria-controls={`certificate-${certificate.id}`} onClick={() => setExpanded((value) => !value)}>
        <span className="certificate-number">[{String(index + 1).padStart(2, '0')}]</span>
        <span>{certificate.file}</span>
        <ChevronDown size={16} className={expanded ? 'rotate-icon' : ''} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && <motion.div id={`certificate-${certificate.id}`} className="certificate-output" initial={{ height: reducedMotion ? 'auto' : 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: reducedMotion ? 'auto' : 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0.01 : 0.24 }}>
          <div className="certificate-output-inner">
            <p className="terminal-prompt"><span className="prompt-user">charan@portfolio:~$</span> cat certificates/{certificate.file}</p>
            <h2>{certificate.title}</h2>
            <p><strong>ISSUER</strong><span>{certificate.issuer}</span></p>
            {certificate.duration && <p><strong>DURATION</strong><span>{certificate.duration}</span></p>}
            <p className="certificate-description">{certificate.description}</p>
            {certificate.credentialUrl && <a className="terminal-button" href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">[ VERIFY ] <ExternalLink size={14} /></a>}
          </div>
        </motion.div>}
      </AnimatePresence>
    </article>
  )
}