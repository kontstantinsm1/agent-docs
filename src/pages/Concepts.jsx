import CodeBlock from '../components/CodeBlock'
import { PageNav } from './Introduction'

export function Agents() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Agents</h1>
      <p className="text-base mb-8" style={{ color: 'var(--c-text2)' }}>
        Agents define the AI personality, voice, and behavior for your calls.
      </p>

      <h2 className="text-xl font-semibold mb-3">What is an Agent?</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        An Agent is a reusable configuration that controls how the AI behaves during a phone call. Each agent has a system prompt, voice settings, language model configuration, and speech parameters.
      </p>

      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Agent Configuration</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        When creating an agent, you can configure the following:
      </p>
      <ul className="text-sm space-y-2 mb-6" style={{ color: 'var(--c-text2)' }}>
        <li><strong style={{ color: 'var(--c-text)' }}>system_prompt</strong> — Instructions that define the agent's personality and behavior</li>
        <li><strong style={{ color: 'var(--c-text)' }}>llm</strong> — Language model settings (model name, temperature)</li>
        <li><strong style={{ color: 'var(--c-text)' }}>tts</strong> — Text-to-speech provider, voice ID, language, and speed</li>
        <li><strong style={{ color: 'var(--c-text)' }}>stt</strong> — Speech-to-text language configuration</li>
        <li><strong style={{ color: 'var(--c-text)' }}>vad</strong> — Voice activity detection settings (silence threshold)</li>
        <li><strong style={{ color: 'var(--c-text)' }}>greeting_delay</strong> — Delay in seconds before the agent speaks</li>
      </ul>

      <CodeBlock title="Example agent config">{`{
  "name": "Sales Assistant",
  "config": {
    "system_prompt": "You are a friendly sales assistant for Acme Corp...",
    "llm": {
      "model": "gpt-4o-mini",
      "temperature": 0.7
    },
    "tts": {
      "provider": "cartesia",
      "voice_id": "79a125e8-cd45-4c13-8a67-188112f4dd22",
      "language": "en",
      "speed": 1.0
    },
    "stt": { "language": "en" },
    "vad": { "stop_secs": 0.5 },
    "greeting_delay": 1
  }
}`}</CodeBlock>

      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Supported LLM Models</h2>
      <ul className="text-sm space-y-1.5" style={{ color: 'var(--c-text2)' }}>
        <li><code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>gpt-4o</code> — Best quality, slower</li>
        <li><code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>gpt-4o-mini</code> — Good balance of quality and speed</li>
        <li><code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>claude-sonnet-4-20250514</code> — Anthropic's Claude</li>
      </ul>

      <PageNav prev={{ label: 'Quick Start', path: '/docs/quickstart' }} next={{ label: 'Calls & Telephony', path: '/docs/telephony' }} />
    </>
  )
}

export function Telephony() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Calls & Telephony</h1>
      <p className="text-base mb-8" style={{ color: 'var(--c-text2)' }}>
        How Agent Core handles phone calls through SIP providers.
      </p>

      <h2 className="text-xl font-semibold mb-3">Call Lifecycle</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        Every call goes through the following stages:
      </p>
      <div className="space-y-3 mb-6">
        {[
          { status: 'queued', color: 'text-blue-400', desc: 'Call request received, waiting to be dialed' },
          { status: 'in_progress', color: 'text-yellow-400', desc: 'Call connected, agent is speaking with the callee' },
          { status: 'completed', color: 'text-emerald-400', desc: 'Call finished successfully' },
          { status: 'failed', color: 'text-red-400', desc: 'Call could not be completed (network error, busy, etc.)' },
          { status: 'cancelled', color: 'text-zinc-400', desc: 'Call was terminated via the hangup API' },
        ].map((s) => (
          <div key={s.status} className="flex items-start gap-3">
            <code className={`text-xs px-2 py-0.5 rounded font-semibold ${s.color}`} style={{ background: 'var(--c-code-bg)' }}>{s.status}</code>
            <span className="text-sm" style={{ color: 'var(--c-text2)' }}>{s.desc}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>SIP Providers</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        Agent Core connects to the phone network through SIP (Session Initiation Protocol) providers. Currently supported:
      </p>
      <ul className="text-sm space-y-2" style={{ color: 'var(--c-text2)' }}>
        <li><strong style={{ color: 'var(--c-text)' }}>Skyetel</strong> — US-based provider with excellent coverage and competitive rates</li>
        <li><strong style={{ color: 'var(--c-text)' }}>Zadarma</strong> — International provider with numbers in 100+ countries</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Phone Number Format</h2>
      <p className="text-sm mb-3" style={{ color: 'var(--c-text2)' }}>
        All phone numbers should use <strong style={{ color: 'var(--c-text)' }}>E.164 format</strong>:
      </p>
      <CodeBlock>{`+1234567890     # Country code + number
+380501234567   # Ukraine
+16893291197    # United States`}</CodeBlock>

      <PageNav prev={{ label: 'Agents', path: '/docs/agents' }} next={{ label: 'Webhooks', path: '/docs/webhooks' }} />
    </>
  )
}

export function Webhooks() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Webhooks</h1>
      <p className="text-base mb-8" style={{ color: 'var(--c-text2)' }}>
        Receive real-time notifications when call events occur.
      </p>

      <h2 className="text-xl font-semibold mb-3">How Webhooks Work</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        When a call event occurs, Agent Core sends a POST request to your registered webhook URL with a JSON payload describing the event.
      </p>

      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Available Events</h2>
      <ul className="text-sm space-y-2 mb-6" style={{ color: 'var(--c-text2)' }}>
        <li><code className="text-xs px-1.5 py-0.5 rounded text-blue-400" style={{ background: 'var(--c-code-bg)' }}>call.queued</code> — Call has been queued for dialing</li>
        <li><code className="text-xs px-1.5 py-0.5 rounded text-blue-400" style={{ background: 'var(--c-code-bg)' }}>call.started</code> — Call has connected, agent is speaking</li>
        <li><code className="text-xs px-1.5 py-0.5 rounded text-emerald-400" style={{ background: 'var(--c-code-bg)' }}>call.completed</code> — Call finished successfully</li>
        <li><code className="text-xs px-1.5 py-0.5 rounded text-red-400" style={{ background: 'var(--c-code-bg)' }}>call.failed</code> — Call failed with an error</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Payload Format</h2>
      <CodeBlock>{`{
  "event": "call.completed",
  "call_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "phone": "+380501234567",
  "duration": 45,
  "agent_id": "agent-uuid",
  "metadata": { "campaign": "spring-2026" }
}`}</CodeBlock>

      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Setting Up</h2>
      <p className="text-sm mb-3" style={{ color: 'var(--c-text2)' }}>You can register webhooks in two ways:</p>
      <ul className="text-sm space-y-1.5 list-disc list-inside mb-4" style={{ color: 'var(--c-text2)' }}>
        <li><strong style={{ color: 'var(--c-text)' }}>Per-call</strong> — Pass <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>webhook_url</code> when creating a call</li>
        <li><strong style={{ color: 'var(--c-text)' }}>Global</strong> — Register a webhook via the <a href="/api/webhooks/create" className="text-blue-400 hover:underline">Webhooks API</a></li>
      </ul>

      <PageNav prev={{ label: 'Calls & Telephony', path: '/docs/telephony' }} next={{ label: 'Voice Providers', path: '/docs/providers' }} />
    </>
  )
}

export function Providers() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Voice Providers</h1>
      <p className="text-base mb-8" style={{ color: 'var(--c-text2)' }}>
        Agent Core supports multiple TTS and STT providers for voice synthesis and recognition.
      </p>

      <h2 className="text-xl font-semibold mb-3">Text-to-Speech (TTS)</h2>
      <ul className="text-sm space-y-3 mb-6" style={{ color: 'var(--c-text2)' }}>
        <li>
          <strong style={{ color: 'var(--c-text)' }}>Cartesia</strong> — Ultra-low latency, natural-sounding voices. Best for real-time conversations.
          <div className="text-xs mt-1" style={{ color: 'var(--c-text3)' }}>Supports: English, Spanish, French, German, and more</div>
        </li>
        <li>
          <strong style={{ color: 'var(--c-text)' }}>ElevenLabs</strong> — Premium voice cloning and synthesis with emotional range.
          <div className="text-xs mt-1" style={{ color: 'var(--c-text3)' }}>Supports: 29 languages</div>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Speech-to-Text (STT)</h2>
      <ul className="text-sm space-y-3 mb-6" style={{ color: 'var(--c-text2)' }}>
        <li>
          <strong style={{ color: 'var(--c-text)' }}>Deepgram</strong> — Real-time transcription with low latency. Default STT provider.
          <div className="text-xs mt-1" style={{ color: 'var(--c-text3)' }}>Supports: 30+ languages, streaming mode</div>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Configuration Example</h2>
      <CodeBlock title="Agent TTS config">{`{
  "tts": {
    "provider": "cartesia",
    "voice_id": "79a125e8-cd45-4c13-8a67-188112f4dd22",
    "language": "en",
    "speed": 1.0
  },
  "stt": {
    "provider": "deepgram",
    "language": "en"
  }
}`}</CodeBlock>

      <PageNav prev={{ label: 'Webhooks', path: '/docs/webhooks' }} next={{ label: 'API Reference', path: '/api' }} />
    </>
  )
}
