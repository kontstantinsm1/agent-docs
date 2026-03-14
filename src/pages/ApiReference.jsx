import CodeBlock from '../components/CodeBlock'
import Endpoint, { ParamTable } from '../components/Endpoint'
import { PageNav } from './Introduction'

export default function ApiReference() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">API Reference</h1>
      <p className="text-base text-zinc-400 mb-8">Complete REST API documentation for Agent Core.</p>

      {/* Auth */}
      <section id="auth">
        <h2 className="text-xl font-semibold mb-3">Authentication</h2>
        <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-4 mb-4 text-sm text-blue-300">
          All API requests require an <strong className="text-blue-400">X-API-Key</strong> header. Get your API key from the server administrator.
        </div>
        <CodeBlock>{`curl -H "X-API-Key: your-api-key" \\
     https://your-server:8008/api/v1/calls`}</CodeBlock>
      </section>

      {/* Base URL */}
      <section id="base-url" className="border-t border-zinc-800 pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-3">Base URL</h2>
        <div className="rounded-lg bg-[#0c0c14] border border-zinc-800 px-5 py-3.5 font-mono text-sm text-emerald-400">
          https://your-server:8008/api/v1
        </div>
      </section>

      <PageNav
        prev={{ label: 'Quick Start', path: '/docs/quickstart' }}
        next={{ label: 'Create Call', path: '/api/calls/create' }}
      />
    </>
  )
}

/* ============================
   CALLS
   ============================ */

export function CallCreate() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Create Call</h1>
      <Endpoint method="POST" path="/api/v1/calls" description="Initiate a phone call with an AI agent.">
        <ParamTable params={[
          { name: 'phone', type: 'string', required: true, description: 'Phone number (E.164 format recommended)' },
          { name: 'agent_id', type: 'string', description: 'Agent ID to use for this call' },
          { name: 'webhook_url', type: 'string', description: 'URL to receive call events' },
          { name: 'metadata', type: 'object', description: 'Custom metadata attached to the call' },
        ]} />
        <ResponseLabel />
        <CodeBlock>{`{
  "call_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "queued",
  "phone": "+380501234567",
  "agent_id": "agent-uuid"
}`}</CodeBlock>
      </Endpoint>
      <PageNav prev={{ label: 'API Reference', path: '/api' }} next={{ label: 'Get Call', path: '/api/calls/get' }} />
    </>
  )
}

export function CallGet() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Get Call</h1>
      <Endpoint method="GET" path="/api/v1/calls/{call_id}" description="Get call status and result.">
        <p className="text-sm text-zinc-400 mb-2">Call statuses:</p>
        <ul className="text-sm text-zinc-400 space-y-1 mb-4">
          <li><code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-blue-400">queued</code> — waiting to be dialed</li>
          <li><code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-blue-400">in_progress</code> — call is active</li>
          <li><code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400">completed</code> — call finished successfully</li>
          <li><code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-red-400">failed</code> — call failed</li>
          <li><code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">cancelled</code> — hung up via API</li>
        </ul>
        <ResponseLabel />
        <CodeBlock>{`{
  "call_id": "uuid",
  "status": "completed",
  "phone": "+380501234567",
  "agent_id": "agent-uuid",
  "duration": 45,
  "outcome": "demo_scheduled",
  "collected_data": {
    "client_name": "Ivan Petrenko",
    "email": "ivan@example.com"
  },
  "error": null,
  "started_at": "2026-03-14T15:30:00Z",
  "finished_at": "2026-03-14T15:30:45Z"
}`}</CodeBlock>
      </Endpoint>
      <PageNav prev={{ label: 'Create Call', path: '/api/calls/create' }} next={{ label: 'List Calls', path: '/api/calls/list' }} />
    </>
  )
}

export function CallList() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">List Calls</h1>
      <Endpoint method="GET" path="/api/v1/calls" description="List recent API-initiated calls.">
        <ParamTable params={[
          { name: 'limit', type: 'int', description: 'Max results (default: 50)' },
          { name: 'offset', type: 'int', description: 'Skip N results (default: 0)' },
        ]} />
      </Endpoint>
      <PageNav prev={{ label: 'Get Call', path: '/api/calls/get' }} next={{ label: 'Get Transcript', path: '/api/calls/transcript' }} />
    </>
  )
}

export function CallTranscript() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Get Transcript</h1>
      <Endpoint method="GET" path="/api/v1/calls/{call_id}/transcript" description="Get the conversation transcript for a completed call.">
        <ResponseLabel />
        <CodeBlock>{`{
  "call_id": "uuid",
  "transcript": [
    { "role": "bot", "text": "Hello! How can I help you?" },
    { "role": "user", "text": "I'd like to learn more..." }
  ]
}`}</CodeBlock>
      </Endpoint>
      <PageNav prev={{ label: 'List Calls', path: '/api/calls/list' }} next={{ label: 'Get Result', path: '/api/calls/result' }} />
    </>
  )
}

export function CallResult() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Get Call Result</h1>
      <Endpoint method="GET" path="/api/v1/calls/{call_id}/result" description="Get the collected data and outcome for a completed call. Returns only the structured result, not the full call object.">
        <ResponseLabel />
        <CodeBlock>{`{
  "call_id": "uuid",
  "outcome": "demo_scheduled",
  "collected_data": {
    "client_name": "Ivan Petrenko",
    "email": "ivan@example.com",
    "preferred_time": "tomorrow at 14:00",
    "interest_area": "voice agents"
  },
  "functions_called": [
    "customer_available",
    "interested_voice_agents",
    "wants_demo",
    "demo_scheduled"
  ]
}`}</CodeBlock>
      </Endpoint>
      <PageNav prev={{ label: 'Get Transcript', path: '/api/calls/transcript' }} next={{ label: 'Hangup Call', path: '/api/calls/hangup' }} />
    </>
  )
}

export function CallHangup() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Hangup Call</h1>
      <Endpoint method="POST" path="/api/v1/calls/{call_id}/hangup" description="Hang up an active call." />
      <PageNav prev={{ label: 'Get Result', path: '/api/calls/result' }} next={{ label: 'Create Agent', path: '/api/agents/create' }} />
    </>
  )
}

/* ============================
   AGENTS
   ============================ */

export function AgentCreate() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Create Agent</h1>
      <Endpoint method="POST" path="/api/v1/agents" description="Create a new agent.">
        <ParamTable params={[
          { name: 'name', type: 'string', required: true, description: 'Agent display name' },
          { name: 'config', type: 'object', description: 'Agent configuration (see schema)' },
        ]} />
        <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mt-4 mb-1">Config object</div>
        <CodeBlock>{`{
  "system_prompt": "You are a helpful assistant...",
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
}`}</CodeBlock>
      </Endpoint>
      <PageNav prev={{ label: 'Hangup Call', path: '/api/calls/hangup' }} next={{ label: 'List Agents', path: '/api/agents/list' }} />
    </>
  )
}

export function AgentList() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">List Agents</h1>
      <Endpoint method="GET" path="/api/v1/agents" description="List all agents." />
      <PageNav prev={{ label: 'Create Agent', path: '/api/agents/create' }} next={{ label: 'Get Agent', path: '/api/agents/get' }} />
    </>
  )
}

export function AgentGet() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Get Agent</h1>
      <Endpoint method="GET" path="/api/v1/agents/{agent_id}" description="Get agent details and configuration." />
      <PageNav prev={{ label: 'List Agents', path: '/api/agents/list' }} next={{ label: 'Update Agent', path: '/api/agents/update' }} />
    </>
  )
}

export function AgentUpdate() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Update Agent</h1>
      <Endpoint method="PUT" path="/api/v1/agents/{agent_id}" description="Update agent name and/or configuration." />
      <PageNav prev={{ label: 'Get Agent', path: '/api/agents/get' }} next={{ label: 'Delete Agent', path: '/api/agents/delete' }} />
    </>
  )
}

export function AgentDelete() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Delete Agent</h1>
      <Endpoint method="DELETE" path="/api/v1/agents/{agent_id}" description="Delete an agent." />
      <PageNav prev={{ label: 'Update Agent', path: '/api/agents/update' }} next={{ label: 'Agent Schema', path: '/api/agents/schema' }} />
    </>
  )
}

export function AgentSchema() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Agent Schema</h1>
      <Endpoint method="GET" path="/api/v1/agents/schema" description="Get the JSON Schema for agent configuration. Useful for dynamic form generation." />
      <PageNav prev={{ label: 'Delete Agent', path: '/api/agents/delete' }} next={{ label: 'List Numbers', path: '/api/telephony/numbers' }} />
    </>
  )
}

/* ============================
   TELEPHONY
   ============================ */

export function TelephonyNumbers() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">List Numbers</h1>
      <Endpoint method="GET" path="/api/v1/numbers" description="List all available phone numbers.">
        <ResponseLabel />
        <CodeBlock>{`{
  "numbers": [
    { "number": "+16893291197", "provider": "skyetel", "country": "US" },
    { "number": "+380441234567", "provider": "zadarma", "country": "UA" }
  ]
}`}</CodeBlock>
      </Endpoint>
      <PageNav prev={{ label: 'Agent Schema', path: '/api/agents/schema' }} next={{ label: 'List Providers', path: '/api/telephony/providers' }} />
    </>
  )
}

export function TelephonyProviders() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">List Providers</h1>
      <Endpoint method="GET" path="/api/v1/providers" description="List configured SIP providers." />
      <PageNav prev={{ label: 'List Numbers', path: '/api/telephony/numbers' }} next={{ label: 'Create Webhook', path: '/api/webhooks/create' }} />
    </>
  )
}

/* ============================
   WEBHOOKS
   ============================ */

export function WebhookCreate() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Create Webhook</h1>
      <Endpoint method="POST" path="/api/v1/webhooks" description="Register a webhook URL to receive events.">
        <ParamTable params={[
          { name: 'url', type: 'string', required: true, description: 'HTTPS URL to receive POST events' },
          { name: 'events', type: 'string[]', description: 'Filter events (default: all). Options: call.queued, call.started, call.completed, call.failed' },
        ]} />
      </Endpoint>
      <PageNav prev={{ label: 'List Providers', path: '/api/telephony/providers' }} next={{ label: 'List Webhooks', path: '/api/webhooks/list' }} />
    </>
  )
}

export function WebhookList() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">List Webhooks</h1>
      <Endpoint method="GET" path="/api/v1/webhooks" description="List registered webhooks." />
      <PageNav prev={{ label: 'Create Webhook', path: '/api/webhooks/create' }} next={{ label: 'Delete Webhook', path: '/api/webhooks/delete' }} />
    </>
  )
}

export function WebhookDelete() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Delete Webhook</h1>
      <Endpoint method="DELETE" path="/api/v1/webhooks/{webhook_id}" description="Delete a webhook." />
      <PageNav prev={{ label: 'List Webhooks', path: '/api/webhooks/list' }} next={{ label: 'Event Payload', path: '/api/webhooks/events' }} />
    </>
  )
}

export function WebhookEvents() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Webhook Events</h1>
      <p className="text-sm text-zinc-400 mb-4">All webhook requests are POST with JSON body:</p>
      <CodeBlock>{`{
  "event": "call.completed",
  "call_id": "uuid",
  "status": "completed",
  "phone": "+380501234567",
  "duration": 45,
  "agent_id": "agent-uuid"
}`}</CodeBlock>
      <h3 className="text-base font-semibold mt-6 mb-3">Available Events</h3>
      <ul className="text-sm text-zinc-400 space-y-1.5">
        <li><code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-blue-400">call.queued</code> — call has been queued for dialing</li>
        <li><code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-blue-400">call.started</code> — call has connected and agent is speaking</li>
        <li><code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400">call.completed</code> — call finished successfully</li>
        <li><code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-red-400">call.failed</code> — call failed with error</li>
      </ul>
      <PageNav prev={{ label: 'Delete Webhook', path: '/api/webhooks/delete' }} next={{ label: 'MCP Server', path: '/tools/mcp-server' }} />
    </>
  )
}

function ResponseLabel() {
  return <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mt-4 mb-1">Response</div>
}
