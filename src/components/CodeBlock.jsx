import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CodeBlock({ children, title, language }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = typeof children === 'string' ? children : children?.props?.children || ''
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group relative my-3 rounded-lg border border-zinc-800 bg-[#0c0c14] overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/50">
          <span className="text-xs font-medium text-zinc-500">{title}</span>
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
      className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 transition-colors cursor-pointer"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
