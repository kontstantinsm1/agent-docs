import { NavLink, Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Search, Menu, X, ChevronRight, ExternalLink, Sun, Moon } from 'lucide-react'
import { topTabs, sidebars } from '../data/navigation'
import { useTheme } from './ThemeProvider'

const ActiveHashContext = createContext('')

export default function Layout({ children }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('')

  const activePrefix = topTabs.find((t) =>
    t.prefix === '/docs'
      ? location.pathname === '/docs' || location.pathname.startsWith('/docs/')
      : location.pathname.startsWith(t.prefix)
  )?.prefix || '/docs'

  const sidebarSections = sidebars[activePrefix] || sidebars['/docs']

  // Track which section heading is closest to top of viewport
  useEffect(() => {
    setActiveHash('')

    const currentSidebar = sidebars[activePrefix] || []
    const ids = currentSidebar
      .flatMap((s) => s.links)
      .filter((l) => l.hash)
      .map((l) => l.hash.replace('#', ''))

    if (!ids.length) return

    const handleScroll = () => {
      const scrollY = window.scrollY + 100 // offset for fixed header
      let current = ''

      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          current = '#' + id
        }
      }

      setActiveHash(current)
    }

    // Initial check after DOM renders
    const timer = setTimeout(handleScroll, 150)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname, activePrefix])
  const { theme, toggle } = useTheme()

  useEffect(() => setMobileOpen(false), [location.pathname])

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 h-14 z-50 backdrop-blur-xl border-b" style={{ background: `color-mix(in srgb, var(--c-bg) 80%, transparent)`, borderColor: 'var(--c-border)' }}>
        <div className="h-full flex items-center px-5 gap-6">
          <button className="lg:hidden" style={{ color: 'var(--c-text3)' }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/docs" className="flex items-center gap-2 shrink-0 no-underline" style={{ color: 'var(--c-text)' }}>
            <img src="https://smartwaylabs.com/wp-content/uploads/2024/11/cropped-cropped-cropped-cropped-cropped-Method-Draw-Image-22-1-1-59x51.png" alt="Smart Way Labs" className="h-6 w-auto" />
            <span className="text-[15px] font-semibold tracking-tight">Smart Way Labs</span>
          </Link>

          {/* Top tabs */}
          <nav className="hidden lg:flex items-center gap-1 h-full">
            {topTabs.map((tab) => {
              const isActive =
                tab.prefix === '/docs'
                  ? activePrefix === '/docs'
                  : activePrefix === tab.prefix
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className="px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors no-underline"
                  style={{
                    color: isActive ? 'var(--c-text)' : 'var(--c-text3)',
                    background: isActive ? 'var(--c-surface)' : 'transparent',
                  }}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] transition-colors cursor-pointer min-w-[180px]"
            style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-text3)' }}
          >
            <Search size={14} className="opacity-50" />
            <span className="hidden sm:inline">Search docs...</span>
            <kbd className="ml-auto text-[11px] px-1.5 py-0.5 rounded font-sans" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
              ⌘K
            </kbd>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="p-1.5 rounded-md transition-colors cursor-pointer"
            style={{ color: 'var(--c-text3)' }}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hidden sm:block"
            style={{ color: 'var(--c-text3)' }}
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Search modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside
          className={`fixed top-14 bottom-0 w-64 overflow-y-auto z-40 transition-transform lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ background: 'var(--c-bg)', borderRight: '1px solid var(--c-border)' }}
        >
          <nav className="py-4">
            {sidebarSections.map((section) => (
              <div key={section.title} className="mb-2">
                <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ color: 'var(--c-text3)' }}>
                  {section.title}
                </div>
                {section.links.map((link) => (
                  <SidebarLink key={link.path + link.label} {...link} activeHash={activeHash} />
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 lg:ml-64 min-w-0">
          <div className="max-w-[720px] px-6 py-10 lg:px-10 lg:mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarLink({ label, path, method, hash, activeHash }) {
  const methodColors = {
    GET: 'bg-emerald-500/10 text-emerald-400',
    POST: 'bg-blue-500/10 text-blue-400',
    PUT: 'bg-yellow-500/10 text-yellow-400',
    DELETE: 'bg-red-500/10 text-red-400',
  }

  // Hash links scroll to section, highlight based on scroll position
  if (hash) {
    const isActive = activeHash === hash
    return (
      <a
        href={hash}
        className={`flex items-center gap-2 px-4 py-1.5 text-[13px] border-l-2 transition-colors no-underline ${
          isActive
            ? 'border-blue-500 text-blue-400 bg-blue-500/5'
            : 'border-transparent'
        }`}
        style={isActive ? {} : { color: 'var(--c-text2)' }}
      >
        {label}
      </a>
    )
  }

  // If a hash section is active, suppress NavLink highlight for sibling non-hash links on the same path
  const hasSiblingHash = !!activeHash

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) => {
        const show = isActive && !hasSiblingHash
        return `flex items-center gap-2 px-4 py-1.5 text-[13px] border-l-2 transition-colors no-underline ${
          show
            ? 'border-blue-500 text-blue-400 bg-blue-500/5'
            : 'border-transparent'
        }`
      }}
      style={({ isActive }) => (isActive && !hasSiblingHash) ? {} : { color: 'var(--c-text2)' }}
    >
      {method && (
        <span className={`text-[10px] font-bold font-mono px-1.5 py-px rounded min-w-[36px] text-center ${methodColors[method] || ''}`}>
          {method}
        </span>
      )}
      {label}
    </NavLink>
  )
}

function SearchModal({ onClose }) {
  const [query, setQuery] = useState('')

  const allLinks = Object.values(sidebars)
    .flat()
    .flatMap((s) => s.links.map((l) => ({ ...l, section: s.title })))

  const filtered = query
    ? allLinks.filter(
        (l) =>
          l.label.toLowerCase().includes(query.toLowerCase()) ||
          l.section.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className="fixed inset-0 z-[100] backdrop-blur-sm flex items-start justify-center pt-[15vh]" style={{ background: 'var(--c-overlay)' }} onClick={onClose}>
      <div className="rounded-xl w-[520px] max-h-[400px] overflow-hidden shadow-2xl" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4" style={{ borderBottom: '1px solid var(--c-border)' }}>
          <Search size={16} style={{ color: 'var(--c-text3)' }} className="shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent border-0 outline-none text-[15px] py-3.5"
            style={{ color: 'var(--c-text)', '--tw-placeholder-color': 'var(--c-text3)' }}
          />
        </div>
        <div className="overflow-y-auto max-h-[320px] p-2">
          {!query && <div className="py-8 text-center text-sm" style={{ color: 'var(--c-text3)' }}>Type to search...</div>}
          {query && !filtered.length && <div className="py-8 text-center text-sm" style={{ color: 'var(--c-text3)' }}>No results found</div>}
          {filtered.map((item) => (
            <Link
              key={item.path + item.label}
              to={item.path}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg no-underline transition-colors"
              style={{ color: 'var(--c-text)' }}
            >
              <div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs" style={{ color: 'var(--c-text3)' }}>{item.section}</div>
              </div>
              <ChevronRight size={14} style={{ color: 'var(--c-text3)' }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
