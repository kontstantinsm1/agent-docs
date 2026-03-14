import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CodeBlock({ children, title }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = typeof children === 'string' ? children : children?.props?.children || ''
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group relative my-3 rounded-lg overflow-hidden" style={{ background: 'var(--c-code-bg)', border: '1px solid var(--c-code-border)' }}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid var(--c-code-border)', background: 'var(--c-surface)' }}>
          <span className="text-xs font-medium" style={{ color: 'var(--c-text3)' }}>{title}</span>
          <CopyBtn copied={copied} onClick={handleCopy} />
        </div>
      )}
      <div className="relative">
        {!title && (
          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <CopyBtn copied={copied} onClick={handleCopy} />
          </div>
        )}
        <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed m-0 border-0 bg-transparent">
          <code className="font-mono">{children}</code>
        </pre>
      </div>
    </div>
  )
}

function CopyBtn({ copied, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors cursor-pointer"
      style={{ color: 'var(--c-text3)', background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
