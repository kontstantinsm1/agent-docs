import CodeBlock from '../components/CodeBlock'
import { PageNav } from './Introduction'

export default function QuickStart() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Quick Start</h1>
      <p className="text-base mb-8" style={{ color: 'var(--c-text2)' }}>Make your first AI phone call in 3 steps.</p>

      <h2 className="text-lg font-semibold mb-3">Prerequisites</h2>
      <ul className="text-sm space-y-1.5 mb-8 list-disc list-inside" style={{ color: 'var(--c-text2)' }}>
        <li>An Agent Core API key (get from server administrator)</li>
        <li>A running Agent Core server</li>
        <li><code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)', border: '1px solid var(--c-code-border)' }}>curl</code> or any HTTP client</li>
      </ul>

      <div className="pt-8 space-y-8" style={{ borderTop: '1px solid var(--c-border)' }}>
        <Step n={1} title="Create an Agent" desc="Define the AI personality, voice, and behavior.">
          <CodeBlock>{`curl -X POST /api/v1/agents \\
  -H "X-API-Key: your-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Sales Bot",
    "config": {
      "system_prompt": "You are a friendly sales assistant...",
      "tts": {
        "voice_id": "79a125e8-cd45-4c13-8a67-188112f4dd22"
      }
    }
  }'`}</CodeBlock>
        </Step>

        <Step n={2} title="Make a Call" desc="Initiate an outbound call with your agent.">
          <CodeBlock>{`curl -X POST /api/v1/calls \\
  -H "X-API-Key: your-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "+380501234567",
    "agent_id": "agent-uuid-here",
    "webhook_url": "https://your-app.com/webhook"
  }'`}</CodeBlock>
        </Step>

        <Step n={3} title="Get the Result" desc="Check call status and retrieve the transcript.">
          <CodeBlock>{`curl /api/v1/calls/{call_id} \\
  -H "X-API-Key: your-key"

# Response:
{
  "call_id": "550e8400-e29b-41d4-...",
  "status": "completed",
  "duration": 45,
  "phone": "+380501234567"
}`}</CodeBlock>
        </Step>
      </div>

      <PageNav
        prev={{ label: 'Introduction', path: '/docs' }}
        next={{ label: 'API Reference', path: '/api' }}
      />
    </>
  )
}

function Step({ n, title, desc, children }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-semibold text-blue-400 mt-0.5">
        {n}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold mb-1">{title}</h3>
        <p className="text-sm mb-2" style={{ color: 'var(--c-text2)' }}>{desc}</p>
        {children}
      </div>
    </div>
  )
}
