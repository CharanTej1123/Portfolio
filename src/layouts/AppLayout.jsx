import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BackToTop } from '../components/BackToTop.jsx'
import { BootScreen } from '../components/BootScreen.jsx'
import { ScrollProgress } from '../components/ScrollProgress.jsx'
import { Sidebar } from '../components/Sidebar.jsx'
import { TopStatusBar } from '../components/TopStatusBar.jsx'
import { profile } from '../data/profile.js'

const scrollRoutes = ['/', '/about', '/education', '/skills', '/projects', '/certifications', '/contact']

function adjacentRoute(pathname, direction) {
  if (pathname.startsWith('/projects/')) return direction > 0 ? '/certifications' : '/projects'
  const index = scrollRoutes.indexOf(pathname)
  return index < 0 ? null : scrollRoutes[index + direction] ?? null
}

export function AppLayout({ children, scrollRef, routeInfo }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [railExpanded, setRailExpanded] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const reducedMotion = useReducedMotion()
  const location = useLocation()
  const navigate = useNavigate()
  const routeScrollLock = useRef(false)
  const touchStartY = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches
  const { scrollY } = useScroll({ container: scrollRef })
  const gridY = useTransform(scrollY, [0, 1000], [0, 60])

  useEffect(() => {
    const main = scrollRef.current
    if (!main) return undefined
    const isAtBoundary = (direction) => {
      const maximum = main.scrollHeight - main.clientHeight
      return direction > 0 ? maximum <= 2 || main.scrollTop >= maximum - 2 : main.scrollTop <= 2
    }
    const moveBetweenRoutes = (direction) => {
      if (routeScrollLock.current) return false
      const nextRoute = adjacentRoute(location.pathname, direction)
      if (!nextRoute) return false
      routeScrollLock.current = true
      navigate(nextRoute)
      return true
    }
    const onWheel = (event) => {
      if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return
      const direction = Math.sign(event.deltaY)
      if (direction && isAtBoundary(direction) && moveBetweenRoutes(direction)) event.preventDefault()
    }
    const onTouchStart = (event) => {
      touchStartY.current = event.touches[0]?.clientY ?? null
    }
    const onTouchEnd = (event) => {
      if (touchStartY.current === null) return
      const distance = touchStartY.current - (event.changedTouches[0]?.clientY ?? touchStartY.current)
      touchStartY.current = null
      if (Math.abs(distance) < 55) return
      const direction = Math.sign(distance)
      if (isAtBoundary(direction) && moveBetweenRoutes(direction)) event.preventDefault()
    }
    const onKeyDown = (event) => {
      if (event.target.closest('a, button, input, textarea, select, [contenteditable="true"]')) return
      const direction = ['PageDown', 'ArrowDown', ' '].includes(event.key) ? 1 : ['PageUp', 'ArrowUp'].includes(event.key) ? -1 : 0
      if (direction && isAtBoundary(direction) && moveBetweenRoutes(direction)) event.preventDefault()
    }
    main.addEventListener('wheel', onWheel, { passive: false })
    main.addEventListener('touchstart', onTouchStart, { passive: true })
    main.addEventListener('touchend', onTouchEnd, { passive: false })
    main.addEventListener('keydown', onKeyDown)
    return () => {
      main.removeEventListener('wheel', onWheel)
      main.removeEventListener('touchstart', onTouchStart)
      main.removeEventListener('touchend', onTouchEnd)
      main.removeEventListener('keydown', onKeyDown)
    }
  }, [location.pathname, navigate, scrollRef])

  useEffect(() => {
    const timeout = window.setTimeout(() => { routeScrollLock.current = false }, 700)
    return () => window.clearTimeout(timeout)
  }, [location.pathname])

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar-compact' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <motion.div className="background-grid" style={reducedMotion || isMobile ? undefined : { y: gridY }} aria-hidden="true" />
      <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} railExpanded={railExpanded} setRailExpanded={setRailExpanded} sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      {drawerOpen && <button className="drawer-backdrop" aria-label="Close navigation" onClick={() => setDrawerOpen(false)} />}
      <div className="mobile-bar">
        <span>{profile.handle}</span>
        <button aria-label="Open navigation" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}><Menu size={21} /></button>
      </div>
      <main id="main" className="main-scroll" ref={scrollRef} tabIndex="-1">
        <ScrollProgress />
        <TopStatusBar command={routeInfo?.[1] ?? 'cd /unknown'} />
        <div className="page-content">{children}</div>
        {location.pathname === '/contact' && <footer className="site-footer"><span className="copyright-mark">{profile.name}. All rights reserved.</span></footer>}
      </main>
      <BackToTop />
      <BootScreen />
    </div>
  )
}