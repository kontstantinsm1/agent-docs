import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const themes = {
  dark: {
    info:    { bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.2)', color: '#93c5fd' },
    warning: { bg: 'rgba(217,119,6,0.08)',  border: 'rgba(217,119,6,0.25)', color: '#fbbf24' },
    success: { bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)', color: '#6ee7b7' },
    danger:  { bg: 'rgba(239,68,68,0.06)',  border: 'rgba(239,68,68,0.2)', color: '#fca5a5' },
  },
  light: {
    info:    { bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8' },
    warning: { bg: '#fffbeb', border: '#fde68a', color: '#92400e' },
    success: { bg: '#ecfdf5', border: '#a7f3d0', color: '#065f46' },
    danger:  { bg: '#fef2f2', border: '#fecaca', color: '#991b1b' },
  },
}

const icons = { info: Info, warning: AlertTriangle, success: CheckCircle, danger: XCircle }

export default function Callout({ type = 'info', children }) {
  const { theme } = useTheme()
  const s = themes[theme]?.[type] || themes.dark.info
  const Icon = icons[type] || Info

  return (
    <div
      className="flex gap-3 rounded-lg p-4 my-4 text-sm leading-relaxed"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      <Icon size={18} className="shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  )
}
