export function AsciiDivider({ children = '────────────────────────────────────────────────────────' }) {
  return <div className="ascii-divider" aria-hidden="true">{children}</div>
}