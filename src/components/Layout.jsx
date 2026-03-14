import { NavLink, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, Menu, X, ChevronRight, ExternalLink } from 'lucide-react'
import { topTabs, sidebars } from '../data/navigation'

export default function Layout({ children }) {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

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

  const activePrefix = topTabs.find((t) =>
    t.prefix === '/docs'
      ? location.pathname === '/docs' || location.pathname.startsWith('/docs/')
      : location.pathname.startsWith(t.prefix)
  )?.prefix || '/docs'

  const sidebarSections = sidebars[activePrefix] || sidebars['/docs']

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 h-14 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="h-full flex items-center px-5 gap-6">
          <button className="lg:hidden text-zinc-400" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/docs" className="flex items-center gap-2.5 shrink-0 text-white no-underline">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
              S
            </div>
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
                  className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors no-underline ${
                    isActive
                      ? 'text-white bg-zinc-800'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                  }`}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>

          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 text-[13px] hover:border-zinc-700 transition-colors cursor-pointer min-w-[180px]"
          >
            <Search size={14} className="opacity-50" />
            <span className="hidden sm:inline">Search docs...</span>
            <kbd className="ml-auto text-[11px] px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-sans">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-white transition-colors hidden sm:block"
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
          className={`fixed top-14 bottom-0 w-64 bg-[#09090b] border-r border-zinc-800 overflow-y-auto z-40 transition-transform lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="py-4">
            {sidebarSections.map((section) => (
              <div key={section.title} className="mb-2">
                <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-zinc-600">
                  {section.title}
                </div>
                {section.links.map((link) => (
                  <SidebarLink key={link.path + link.label} {...link} />
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

function SidebarLink({ label, path, method }) {
  const methodColors = {
    GET: 'bg-emerald-500/10 text-emerald-400',
    POST: 'bg-blue-500/10 text-blue-400',
    PUT: 'bg-yellow-500/10 text-yellow-400',
    DELETE: 'bg-red-500/10 text-red-400',
  }

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-1.5 text-[13px] border-l-2 transition-colors no-underline ${
          isActive
            ? 'border-blue-500 text-blue-400 bg-blue-500/5'
            : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
        }`
      }
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
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="bg-[#131316] border border-zinc-800 rounded-xl w-[520px] max-h-[400px] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 border-b border-zinc-800">
          <Search size={16} className="text-zinc-500 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent border-0 outline-none text-[15px] text-white py-3.5 placeholder:text-zinc-600"
          />
        </div>
        <div className="overflow-y-auto max-h-[320px] p-2">
          {!query && <div className="py-8 text-center text-zinc-600 text-sm">Type to search...</div>}
          {query && !filtered.length && <div className="py-8 text-center text-zinc-600 text-sm">No results found</div>}
          {filtered.map((item) => (
            <Link
              key={item.path + item.label}
              to={item.path}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-zinc-800/50 text-white no-underline transition-colors"
            >
              <div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-zinc-600">{item.section}</div>
              </div>
              <ChevronRight size={14} className="text-zinc-600" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
