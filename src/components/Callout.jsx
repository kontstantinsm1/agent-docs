import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

const styles = {
  info: {
    bg: 'bg-blue-500/5',
    border: 'border-blue-500/20',
    text: 'text-blue-300',
    Icon: Info,
  },
  warning: {
    bg: 'bg-yellow-500/5',
    border: 'border-yellow-500/20',
    text: 'text-yellow-300',
    Icon: AlertTriangle,
  },
  success: {
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20',
    text: 'text-emerald-300',
    Icon: CheckCircle,
  },
  danger: {
    bg: 'bg-red-500/5',
    border: 'border-red-500/20',
    text: 'text-red-300',
    Icon: XCircle,
  },
}

export default function Callout({ type = 'info', children }) {
  const s = styles[type] || styles.info
  return (
    <div className={`flex gap-3 rounded-lg border ${s.bg} ${s.border} p-4 my-4 text-sm leading-relaxed ${s.text}`}>
      <s.Icon size={18} className="shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  )
}
