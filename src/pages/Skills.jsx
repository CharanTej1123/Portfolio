import { SectionTitle } from '../components/SectionTitle.jsx'
import { TerminalWindow } from '../components/TerminalWindow.jsx'
import { SkillsList } from '../components/SkillGroup.jsx'

export function Skills() {
  return (
    <>
      <SectionTitle title="03. SKILLS" command="cat skills" />
      <TerminalWindow command="$ skills --list" stickyBar={false}>
        <SkillsList />
      </TerminalWindow>
    </>
  )
}