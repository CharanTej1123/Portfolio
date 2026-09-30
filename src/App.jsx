import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLocation, useRoutes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout.jsx'
import { ScrollContainerProvider } from './hooks/ScrollContainerContext.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { Education } from './pages/Education.jsx'
import { Skills } from './pages/Skills.jsx'
import { Projects } from './pages/Projects.jsx'
import { ProjectDetails } from './pages/ProjectDetails.jsx'
import { Certifications } from './pages/Certifications.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { Contact } from './pages/Contact.jsx'

const routeInfo = {
  '/': ['HOME', 'cd ~'], '/about': ['ABOUT ME', 'cd about'],
  '/education': ['EDUCATION', 'cd education'], '/skills': ['SKILLS', 'cd skills'],
  '/projects': ['PROJECTS', 'cd projects'], '/certifications': ['CERTIFICATIONS', 'cd certifications'],
  '/contact': ['GET IN TOUCH', 'cd contact'],
}

const routeConfig = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/education', element: <Education /> },
  { path: '/skills', element: <Skills /> },
  { path: '/projects', element: <Projects /> },
  { path: '/projects/:id', element: <ProjectDetails /> },
  { path: '/certifications', element: <Certifications /> },
  { path: '/contact', element: <Contact /> },
  { path: '*', element: <NotFound /> },
]

function RouteViews() {
  const location = useLocation()
  const page = useRoutes(routeConfig)
  const reducedMotion = useReducedMotion()
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    const section = routeInfo[location.pathname]?.[0] ?? (location.pathname.startsWith('/projects/') ? 'PROJECT DETAILS' : '404')
    document.title = location.pathname === '/' ? 'Charan Tej P | Backend, Cloud & AI Developer' : `${section} | Charan Tej P`
    const focusTimer = window.setTimeout(() => {
      if (document.querySelector('.boot-screen')) return
      const heading = scrollRef.current?.querySelector('h1')
      if (heading) {
        heading.tabIndex = -1
        heading.focus({ preventScroll: true })
      }
    }, reducedMotion ? 0 : 300)
    return () => window.clearTimeout(focusTimer)
  }, [location.pathname, reducedMotion])

  return (
    <ScrollContainerProvider value={scrollRef}>
      <AppLayout scrollRef={scrollRef} routeInfo={routeInfo[location.pathname] ?? (location.pathname.startsWith('/projects/') ? ['PROJECT DETAILS', `cd ${location.pathname.slice(1)}`] : ['404', `cd ${location.pathname}`])}>
        <motion.div
          key={location.pathname}
          className="route-view"
          initial={{ opacity: 0, x: reducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.28, ease: 'easeOut' }}
        >
          {page}
        </motion.div>
      </AppLayout>
    </ScrollContainerProvider>
  )
}

export default function App() {
  return <RouteViews />
}