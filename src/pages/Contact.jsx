import { useState } from 'react'
import { SectionTitle } from '../components/SectionTitle.jsx'
import { TerminalWindow } from '../components/TerminalWindow.jsx'
import { ContactCard } from '../components/ContactCard.jsx'
import { profile } from '../data/profile.js'

const emptyValues = { name: '', email: '', message: '' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'ERROR: name must be at least 2 characters'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'ERROR: invalid email'
  if (values.message.trim().length < 10) errors.message = 'ERROR: message must be at least 10 characters'
  return errors
}

export function Contact() {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle')
  const [copyState, setCopyState] = useState('')
  const subject = `Portfolio message from ${values.name.trim()}`
  const body = `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  function update(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
    setState('idle')
  }

  async function submit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setCopyState('')
    if (Object.keys(nextErrors).length) {
      setState('invalid')
      return
    }
    setState('validated')
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(`To: ${profile.email}\nSubject: ${subject}\n\n${body}`)
      setCopyState('MESSAGE COPIED')
    } catch {
      setCopyState('Clipboard unavailable. Open your email app or copy the message manually.')
    }
  }

  return (
    <>
      <SectionTitle title="06. GET IN TOUCH" command="cat contact" />
      <div className="contact-intro">"I'm always open to discussing new opportunities, interesting projects, or just a tech conversation."</div>
      <div className="contact-grid">
        <ContactCard label="EMAIL" value={profile.email} href={`mailto:${profile.email}`} copyValue={profile.email} />
        <ContactCard label="PHONE" value={profile.phone} href={profile.phoneHref} copyValue={profile.phone} />
        <ContactCard label="LINKEDIN" value="linkedin.com/in/charantej-p" href={profile.linkedin} external />
        <ContactCard label="GITHUB" value="github.com/CharanTej1123" href={profile.github} external />
      </div>
      <TerminalWindow command="$ ./send-message" title="MESSAGE" stickyBar={false}>
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="form-field">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" value={values.name} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
            {errors.name && <p id="name-error" className="form-error">{errors.name}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" value={values.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="5" value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
            {errors.message && <p id="message-error" className="form-error">{errors.message}</p>}
          </div>
          <button className="terminal-button" type="submit">[ RUN ./send-message ]</button>
          <div className="form-feedback" role="status" aria-live="polite">
            {state === 'validated' && <><p>&gt; MESSAGE VALIDATED</p><p>&gt; READY TO SEND</p></>}
            {state === 'validated' && <div className="button-row contact-send-actions">
              <a className="terminal-button" href={mailto}>[ OPEN IN EMAIL APP ]</a>
              <button className="terminal-button" type="button" onClick={copyDraft}>[ COPY MESSAGE ]</button>
            </div>}
            {state === 'validated' && <p className="mail-client-note">Email draft opens in your device's default mail app. Use COPY MESSAGE if no mail app is configured.</p>}
            {copyState && <p>{`> ${copyState}`}</p>}
          </div>
        </form>
      </TerminalWindow>
    </>
  )
}