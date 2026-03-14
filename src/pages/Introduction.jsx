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
      <p className="text-base text-zinc-400 mb-8 leading-relaxed max-w-xl">
        Build AI-powered voice agents that make phone calls. Create agents with custom personalities, initiate outbound calls, and receive results via webhooks.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group flex flex-col p-5 rounded-xl border border-zinc-800 bg-[#131316] hover:border-blue-500/30 hover:bg-zinc-800/30 transition-all no-underline"
          >
            <c.icon size={22} className="text-blue-400 mb-3" />
            <div className="text-[15px] font-semibold text-white mb-1 flex items-center gap-1.5">
              {c.title}
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
            </div>
            <div className="text-[13px] text-zinc-500 leading-relaxed">{c.desc}</div>
          </Link>
        ))}
      </div>

      <div className="border-t border-zinc-800 pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">&#8226;</span><span><strong className="text-white">AI Voice Agents</strong> — Configurable LLM-powered agents with customizable voices, personalities, and behavior</span></li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">&#8226;</span><span><strong className="text-white">Outbound Calling</strong> — Initiate calls to any phone number with a single API request</span></li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">&#8226;</span><span><strong className="text-white">Multi-Provider Telephony</strong> — Support for Skyetel, Zadarma, and other SIP providers</span></li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">&#8226;</span><span><strong className="text-white">Real-time Webhooks</strong> — Get notified when calls are queued, started, completed, or fail</span></li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">&#8226;</span><span><strong className="text-white">Transcripts</strong> — Full conversation transcripts for every call</span></li>
          <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">&#8226;</span><span><strong className="text-white">Multiple TTS/STT</strong> — Cartesia, ElevenLabs, Deepgram and more</span></li>
        </ul>
      </div>

      <div className="border-t border-zinc-800 pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-4">Architecture</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Agent Core is built on <a href="https://pipecat.ai" className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">Pipecat</a> and <a href="https://livekit.io" className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">LiveKit</a>, providing a robust pipeline for real-time voice AI.
        </p>
        <ArchDiagram />
      </div>

      <PageNav next={{ label: 'Quick Start', path: '/docs/quickstart' }} />
    </>
  )
}

function ArchDiagram() {
  const boxClass = "fill-[#131316] stroke-zinc-700"
  const textMain = "fill-white text-[13px] font-semibold"
  const textSub = "fill-zinc-500 text-[11px]"
  const arrow = "stroke-zinc-600 fill-none"
  const arrowHead = "fill-zinc-600"

  return (
    <div className="my-4 p-6 rounded-xl border border-zinc-800 bg-[#0c0c14] overflow-x-auto">
      <svg viewBox="0 0 680 260" className="w-full max-w-[600px] mx-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Top row boxes */}
        <rect x="20" y="30" width="160" height="64" rx="10" className={boxClass} strokeWidth="1.5" />
        <text x="100" y="56" textAnchor="middle" className={textMain}>Your App</text>
        <text x="100" y="74" textAnchor="middle" className={textSub}>REST API</text>

        <rect x="260" y="30" width="160" height="64" rx="10" className={boxClass} strokeWidth="1.5" style={{ stroke: '#3b82f6', strokeWidth: 1.5 }} />
        <text x="340" y="56" textAnchor="middle" className={textMain}>Agent Core</text>
        <text x="340" y="74" textAnchor="middle" className={textSub}>Pipecat</text>

        <rect x="500" y="30" width="160" height="64" rx="10" className={boxClass} strokeWidth="1.5" />
        <text x="580" y="56" textAnchor="middle" className={textMain}>SIP / PSTN</text>
        <text x="580" y="74" textAnchor="middle" className={textSub}>LiveKit</text>

        {/* Arrows top row */}
        <line x1="180" y1="62" x2="254" y2="62" className={arrow} strokeWidth="1.5" />
        <polygon points="254,57 264,62 254,67" className={arrowHead} />

        <line x1="420" y1="62" x2="494" y2="62" className={arrow} strokeWidth="1.5" />
        <polygon points="494,57 504,62 494,67" className={arrowHead} />

        {/* Vertical line from Agent Core */}
        <line x1="340" y1="94" x2="340" y2="140" className={arrow} strokeWidth="1.5" />

        {/* Branch lines */}
        <line x1="260" y1="140" x2="420" y2="140" className={arrow} strokeWidth="1.5" />
        <line x1="280" y1="140" x2="280" y2="170" className={arrow} strokeWidth="1.5" />
        <line x1="400" y1="140" x2="400" y2="170" className={arrow} strokeWidth="1.5" />

        {/* Bottom boxes */}
        <rect x="210" y="170" width="140" height="64" rx="10" className={boxClass} strokeWidth="1.5" />
        <text x="280" y="198" textAnchor="middle" className={textMain}>LLM</text>
        <text x="280" y="216" textAnchor="middle" className={textSub}>GPT-4o, Claude, etc.</text>

        <rect x="330" y="170" width="140" height="64" rx="10" className={boxClass} strokeWidth="1.5" />
        <text x="400" y="198" textAnchor="middle" className={textMain}>TTS / STT</text>
        <text x="400" y="216" textAnchor="middle" className={textSub}>Cartesia, Deepgram</text>
      </svg>
    </div>
  )
}

export function PageNav({ prev, next }) {
  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t border-zinc-800">
      {prev ? (
        <Link to={prev.path} className="flex flex-col items-start px-4 py-3 rounded-lg border border-zinc-800 hover:border-zinc-700 text-sm no-underline transition-colors">
          <span className="text-[11px] text-zinc-600">Previous</span>
          <span className="text-zinc-300">{prev.label}</span>
        </Link>
      ) : <div />}
      {next ? (
        <Link to={next.path} className="flex flex-col items-end px-4 py-3 rounded-lg border border-zinc-800 hover:border-zinc-700 text-sm no-underline transition-colors ml-auto">
          <span className="text-[11px] text-zinc-600">Next</span>
          <span className="text-zinc-300">{next.label}</span>
        </Link>
      ) : <div />}
    </div>
  )
}
