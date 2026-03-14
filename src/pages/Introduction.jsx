import { Link } from 'react-router-dom'
import { Zap, FileText, Plug, ArrowRight } from 'lucide-react'

const cards = [
  { icon: Zap, title: 'Quick Start', desc: 'Make your first AI call in under 5 minutes.', to: '/docs/quickstart' },
  { icon: FileText, title: 'API Reference', desc: 'Full REST API for calls, agents, and webhooks.', to: '/api' },
  { icon: Plug, title: 'MCP Server', desc: 'Use AI assistants to interact with registries.', to: '/tools/mcp-server' },
]

export default function Introduction() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Agent Core API</h1>
      <p className="text-base mb-8 leading-relaxed max-w-xl" style={{ color: 'var(--c-text2)' }}>
        Build AI-powered voice agents that make phone calls. Create agents with custom personalities, initiate outbound calls, and receive results via webhooks.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group flex flex-col p-5 rounded-xl hover:border-blue-500/30 transition-all no-underline"
            style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}
          >
            <c.icon size={22} className="text-blue-400 mb-3" />
            <div className="text-[15px] font-semibold mb-1 flex items-center gap-1.5" style={{ color: 'var(--c-text)' }}>
              {c.title}
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
            </div>
            <div className="text-[13px] leading-relaxed" style={{ color: 'var(--c-text3)' }}>{c.desc}</div>
          </Link>
        ))}
      </div>

      <div className="pt-8 mt-8" style={{ borderTop: '1px solid var(--c-border)' }}>
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--c-text2)' }}>
          {[
            ['AI Voice Agents', 'Configurable LLM-powered agents with customizable voices, personalities, and behavior'],
            ['Outbound Calling', 'Initiate calls to any phone number with a single API request'],
            ['Multi-Provider Telephony', 'Support for Skyetel, Zadarma, and other SIP providers'],
            ['Real-time Webhooks', 'Get notified when calls are queued, started, completed, or fail'],
            ['Transcripts', 'Full conversation transcripts for every call'],
            ['Multiple TTS/STT', 'Cartesia, ElevenLabs, Deepgram and more'],
          ].map(([title, desc]) => (
            <li key={title} className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">&#8226;</span>
              <span><strong style={{ color: 'var(--c-text)' }}>{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-8 mt-8" style={{ borderTop: '1px solid var(--c-border)' }}>
        <h2 className="text-xl font-semibold mb-4">Architecture</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
          Agent Core is built on <a href="https://pipecat.ai" className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">Pipecat</a> and <a href="https://livekit.io" className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">LiveKit</a>, providing a robust pipeline for real-time voice AI.
        </p>
        <ArchDiagram />
      </div>

      <PageNav next={{ label: 'Quick Start', path: '/docs/quickstart' }} />
    </>
  )
}

function ArchDiagram() {
  return (
    <div className="my-4 p-6 rounded-xl overflow-x-auto" style={{ background: 'var(--c-code-bg)', border: '1px solid var(--c-code-border)' }}>
      <svg viewBox="0 0 680 260" className="w-full max-w-[600px] mx-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Top row boxes */}
        <rect x="20" y="30" width="160" height="64" rx="10" fill="var(--c-surface)" stroke="var(--c-border)" strokeWidth="1.5" />
        <text x="100" y="56" textAnchor="middle" fill="var(--c-text)" className="text-[13px] font-semibold">Your App</text>
        <text x="100" y="74" textAnchor="middle" fill="var(--c-text3)" className="text-[11px]">REST API</text>

        <rect x="260" y="30" width="160" height="64" rx="10" fill="var(--c-surface)" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="340" y="56" textAnchor="middle" fill="var(--c-text)" className="text-[13px] font-semibold">Agent Core</text>
        <text x="340" y="74" textAnchor="middle" fill="var(--c-text3)" className="text-[11px]">Pipecat</text>

        <rect x="500" y="30" width="160" height="64" rx="10" fill="var(--c-surface)" stroke="var(--c-border)" strokeWidth="1.5" />
        <text x="580" y="56" textAnchor="middle" fill="var(--c-text)" className="text-[13px] font-semibold">SIP / PSTN</text>
        <text x="580" y="74" textAnchor="middle" fill="var(--c-text3)" className="text-[11px]">LiveKit</text>

        {/* Arrows */}
        <line x1="180" y1="62" x2="254" y2="62" stroke="var(--c-text3)" strokeWidth="1.5" fill="none" />
        <polygon points="254,57 264,62 254,67" fill="var(--c-text3)" />
        <line x1="420" y1="62" x2="494" y2="62" stroke="var(--c-text3)" strokeWidth="1.5" fill="none" />
        <polygon points="494,57 504,62 494,67" fill="var(--c-text3)" />

        {/* Vertical + branch */}
        <line x1="340" y1="94" x2="340" y2="140" stroke="var(--c-text3)" strokeWidth="1.5" />
        <line x1="260" y1="140" x2="420" y2="140" stroke="var(--c-text3)" strokeWidth="1.5" />
        <line x1="280" y1="140" x2="280" y2="170" stroke="var(--c-text3)" strokeWidth="1.5" />
        <line x1="400" y1="140" x2="400" y2="170" stroke="var(--c-text3)" strokeWidth="1.5" />

        {/* Bottom boxes */}
        <rect x="210" y="170" width="140" height="64" rx="10" fill="var(--c-surface)" stroke="var(--c-border)" strokeWidth="1.5" />
        <text x="280" y="198" textAnchor="middle" fill="var(--c-text)" className="text-[13px] font-semibold">LLM</text>
        <text x="280" y="216" textAnchor="middle" fill="var(--c-text3)" className="text-[11px]">GPT-4o, Claude, etc.</text>

        <rect x="330" y="170" width="140" height="64" rx="10" fill="var(--c-surface)" stroke="var(--c-border)" strokeWidth="1.5" />
        <text x="400" y="198" textAnchor="middle" fill="var(--c-text)" className="text-[13px] font-semibold">TTS / STT</text>
        <text x="400" y="216" textAnchor="middle" fill="var(--c-text3)" className="text-[11px]">Cartesia, Deepgram</text>
      </svg>
    </div>
  )
}

export function PageNav({ prev, next }) {
  return (
    <div className="flex justify-between items-center mt-12 pt-6" style={{ borderTop: '1px solid var(--c-border)' }}>
      {prev ? (
        <Link to={prev.path} className="flex flex-col items-start px-4 py-3 rounded-lg text-sm no-underline transition-colors" style={{ border: '1px solid var(--c-border)' }}>
          <span className="text-[11px]" style={{ color: 'var(--c-text3)' }}>Previous</span>
          <span style={{ color: 'var(--c-text2)' }}>{prev.label}</span>
        </Link>
      ) : <div />}
      {next ? (
        <Link to={next.path} className="flex flex-col items-end px-4 py-3 rounded-lg text-sm no-underline transition-colors ml-auto" style={{ border: '1px solid var(--c-border)' }}>
          <span className="text-[11px]" style={{ color: 'var(--c-text3)' }}>Next</span>
          <span style={{ color: 'var(--c-text2)' }}>{next.label}</span>
        </Link>
      ) : <div />}
    </div>
  )
}
