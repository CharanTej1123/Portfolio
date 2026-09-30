import { useState } from 'react'
import { Check, Copy, ExternalLink } from 'lucide-react'

export function ContactCard({ label, value, href, external = false, copyValue }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }
  return (
    <article className="contact-card">
      <div className="contact-card-heading"><span>{label}</span>{external && <ExternalLink size={15} aria-hidden="true" />}</div>
      <a className="contact-value" href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{value}</a>
      {copyValue && <button className="copy-button" onClick={copy} aria-label={`Copy ${label.toLowerCase()}`}>
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>}
      {copied && <p className="copy-toast" role="status">&gt; copied to clipboard</p>}
    </article>
  )
}