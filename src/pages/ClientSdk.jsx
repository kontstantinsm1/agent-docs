import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import Tabs from '../components/Tabs'
import { PageNav } from './Introduction'

export default function ClientSdk() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Client SDK</h1>
      <p className="text-base mb-8" style={{ color: 'var(--c-text2)' }}>
        Official TypeScript/JavaScript SDK for Agent Core API. Works in Node.js, Edge runtimes, and modern browsers.
      </p>

      {/* Installation */}
      <h2 id="installation" className="text-xl font-semibold mb-3">Installation</h2>
      <Tabs tabs={['npm', 'pnpm', 'yarn']}>
        <CodeBlock>npm install github:kontstantinsm1/agent-core-sdk</CodeBlock>
        <CodeBlock>pnpm add github:kontstantinsm1/agent-core-sdk</CodeBlock>
        <CodeBlock>yarn add github:kontstantinsm1/agent-core-sdk</CodeBlock>
      </Tabs>

      {/* Quick Start */}
      <h2 id="quick-start" className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Quick Start</h2>

      <CodeBlock title="Initialize the client">{`import { AgentCore } from "@agent-core/sdk";

const agent = new AgentCore({
  apiKey: process.env.AGENT_CORE_API_KEY!,
  baseUrl: process.env.AGENT_CORE_URL!,
  webhookSecret: process.env.WEBHOOK_SECRET, // optional
});`}</CodeBlock>

      <CodeBlock title="Make a call">{`const call = await agent.calls.create({
  phone: "+380501234567",
  agentId: "2dcf1cd3-e2e2-4946-b0e2-6fe7d1710ab1",
  webhookUrl: "https://your-app.com/api/webhook",
});

console.log(call.callId, call.status); // "uuid", "queued"`}</CodeBlock>

      <CodeBlock title="Check status & get transcript">{`const status = await agent.calls.get(call.callId);
console.log(status.status, status.duration);

const transcript = await agent.calls.transcript(call.callId);
console.log(transcript.transcript);`}</CodeBlock>

      {/* Constructor */}
      <h2 id="config" className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Configuration</h2>
      <ParamBlock params={[
        { name: 'apiKey', type: 'string', required: true, desc: 'Your Agent Core API key' },
        { name: 'baseUrl', type: 'string', required: true, desc: 'Server URL (e.g. https://your-server:8008)' },
        { name: 'webhookSecret', type: 'string', required: false, desc: 'Secret for verifying webhook signatures' },
      ]} />

      {/* Calls */}
      <h2 id="calls" className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Calls</h2>

      <MethodBlock
        name="agent.calls.create(params)"
        desc="Initiate a phone call."
        params={[
          { name: 'phone', type: 'string', required: true, desc: 'Phone number in E.164 format' },
          { name: 'agentId', type: 'string', required: false, desc: 'Agent ID to use' },
          { name: 'webhookUrl', type: 'string', required: false, desc: 'URL for call events' },
          { name: 'metadata', type: 'Record<string, string>', required: false, desc: 'Custom key-value metadata' },
        ]}
        returns="Promise<Call>"
      />

      <MethodBlock
        name="agent.calls.get(callId)"
        desc="Get call status and details."
        params={[{ name: 'callId', type: 'string', required: true, desc: 'Call ID' }]}
        returns="Promise<Call>"
      />

      <MethodBlock
        name="agent.calls.list(limit?, offset?)"
        desc="List recent calls. Defaults: limit=50, offset=0."
        params={[
          { name: 'limit', type: 'number', required: false, desc: 'Max results (default 50)' },
          { name: 'offset', type: 'number', required: false, desc: 'Skip N results (default 0)' },
        ]}
        returns="Promise<Call[]>"
      />

      <MethodBlock
        name="agent.calls.transcript(callId)"
        desc="Get conversation transcript for a completed call."
        params={[{ name: 'callId', type: 'string', required: true, desc: 'Call ID' }]}
        returns="Promise<Transcript>"
      />

      <MethodBlock
        name="agent.calls.hangup(callId)"
        desc="Hang up an active call."
        params={[{ name: 'callId', type: 'string', required: true, desc: 'Call ID' }]}
        returns='Promise<{ call_id, status }>'
      />

      {/* Agents */}
      <h2 id="agents" className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Agents</h2>

      <MethodBlock
        name="agent.agents.create(params)"
        desc="Create a new agent."
        params={[
          { name: 'name', type: 'string', required: true, desc: 'Agent display name' },
          { name: 'config', type: 'AgentConfig', required: false, desc: 'Agent config object' },
        ]}
        returns="Promise<Agent>"
      />

      <MethodBlock name="agent.agents.list()" desc="List all agents." returns="Promise<{ agents: Agent[] }>" />
      <MethodBlock name="agent.agents.get(agentId)" desc="Get agent by ID." params={[{ name: 'agentId', type: 'string', required: true, desc: 'Agent ID' }]} returns="Promise<Agent>" />
      <MethodBlock name="agent.agents.update(agentId, params)" desc="Update agent name or config." params={[
        { name: 'agentId', type: 'string', required: true, desc: 'Agent ID' },
        { name: 'name', type: 'string', required: false, desc: 'New name' },
        { name: 'config', type: 'AgentConfig', required: false, desc: 'New config' },
      ]} returns="Promise<Agent>" />
      <MethodBlock name="agent.agents.delete(agentId)" desc="Delete an agent." params={[{ name: 'agentId', type: 'string', required: true, desc: 'Agent ID' }]} returns='Promise<{ status }>' />
      <MethodBlock name="agent.agents.schema()" desc="Get JSON Schema for agent config." returns="Promise<Record<string, unknown>>" />

      {/* Numbers */}
      <h2 id="numbers" className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Numbers</h2>

      <MethodBlock name="agent.numbers.list()" desc="List all available phone numbers." returns="Promise<{ numbers: PhoneNumber[] }>" />
      <MethodBlock name="agent.numbers.providers()" desc="List configured SIP providers." returns="Promise<{ providers: Provider[] }>" />

      {/* Webhooks */}
      <h2 id="webhooks" className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Webhooks</h2>

      <MethodBlock
        name="agent.webhooks.create(params)"
        desc="Register a webhook URL."
        params={[
          { name: 'url', type: 'string', required: true, desc: 'HTTPS URL' },
          { name: 'events', type: 'string[]', required: false, desc: 'Filter: call.queued, call.started, call.completed, call.failed' },
        ]}
        returns="Promise<Webhook>"
      />
      <MethodBlock name="agent.webhooks.list()" desc="List registered webhooks." returns="Promise<{ webhooks: Webhook[] }>" />
      <MethodBlock name="agent.webhooks.delete(webhookId)" desc="Delete a webhook." params={[{ name: 'webhookId', type: 'string', required: true, desc: 'Webhook ID' }]} returns='Promise<{ status }>' />

      {/* Webhook verification */}
      <h2 id="webhook-verification" className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Webhook Verification</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        Verify incoming webhook signatures to ensure authenticity. Requires <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>webhookSecret</code> in the constructor.
      </p>

      <CodeBlock title="Next.js API Route example">{`import { agent } from "@/lib/agent";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-webhook-signature") || "";

  try {
    const data = await agent.verifyWebhookAsync(body, signature);

    if (data.event === "call.completed") {
      console.log("Call completed:", data.call_id, data.duration);
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }
}`}</CodeBlock>

      <div className="my-4 text-sm" style={{ color: 'var(--c-text2)' }}>
        <p className="mb-2">Two methods available:</p>
        <ul className="space-y-1.5 list-disc list-inside">
          <li><code className="text-xs px-1.5 py-0.5 rounded text-blue-400" style={{ background: 'var(--c-code-bg)' }}>verifyWebhook(payload, signature)</code> — synchronous, Node.js only (uses <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>crypto</code>)</li>
          <li><code className="text-xs px-1.5 py-0.5 rounded text-blue-400" style={{ background: 'var(--c-code-bg)' }}>verifyWebhookAsync(payload, signature)</code> — async, works in Node.js + Edge + browsers (uses Web Crypto)</li>
        </ul>
      </div>

      <Callout type="info">
        Use <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>verifyWebhookAsync</code> for Next.js, Vercel Edge, Cloudflare Workers, and other edge runtimes.
      </Callout>

      {/* Error handling */}
      <h2 id="error-handling" className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Error Handling</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        All API errors throw <code className="text-xs px-1.5 py-0.5 rounded text-blue-400" style={{ background: 'var(--c-code-bg)' }}>AgentCoreError</code> with HTTP status and detail message.
      </p>

      <CodeBlock>{`import { AgentCore, AgentCoreError } from "@agent-core/sdk";

try {
  const call = await agent.calls.get("non-existent-id");
} catch (err) {
  if (err instanceof AgentCoreError) {
    console.log(err.status);  // 404
    console.log(err.detail);  // "Call not found"
  }
}`}</CodeBlock>

      {/* Types */}
      <h2 id="types" className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Types</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        All types are exported from the package and available for TypeScript projects.
      </p>

      <CodeBlock title="Key types">{`import type {
  AgentCoreConfig,
  Call,
  CreateCallParams,
  Transcript,
  TranscriptEntry,
  Agent,
  AgentConfig,
  CreateAgentParams,
  UpdateAgentParams,
  PhoneNumber,
  Provider,
  Webhook,
  CreateWebhookParams,
  WebhookPayload,
  WebhookEvent,
} from "@agent-core/sdk";`}</CodeBlock>

      <h3 className="text-base font-semibold mt-5 mb-2">Call</h3>
      <CodeBlock>{`interface Call {
  callId: string;
  status: "queued" | "in_progress" | "completed" | "failed" | "cancelled";
  phone: string;
  agentId?: string | null;
  duration?: number | null;
  error?: string | null;
  startedAt?: string | null;
  finishedAt?: string | null;
}`}</CodeBlock>

      <h3 className="text-base font-semibold mt-5 mb-2">Agent</h3>
      <CodeBlock>{`interface Agent {
  id: string;
  name: string;
  config: AgentConfig;
  created_at: string;
  updated_at: string;
}

interface AgentConfig {
  system_prompt?: string;
  llm?: { provider?: string; model?: string; temperature?: number };
  tts?: { provider?: string; voice_id?: string; language?: string; speed?: number };
  stt?: { provider?: string; language?: string };
  vad?: { stop_secs?: number };
  greeting_delay?: number;
}`}</CodeBlock>

      <h3 className="text-base font-semibold mt-5 mb-2">WebhookPayload</h3>
      <CodeBlock>{`interface WebhookPayload {
  event: "call.queued" | "call.started" | "call.completed" | "call.failed";
  call_id: string;
  status: string;
  phone: string;
  duration?: number;
  agent_id?: string;
  outcome?: string;
  collected_data?: Record<string, string>;
  functions_called?: string[];
  transcript?: TranscriptEntry[];
  fields?: Record<string, string>;
}`}</CodeBlock>

      <PageNav
        prev={{ label: 'Errors', path: '/docs/errors' }}
        next={{ label: 'API Reference', path: '/api' }}

      />
    </>
  )
}

function ParamBlock({ params }) {
  return (
    <div className="rounded-lg overflow-hidden my-4" style={{ border: '1px solid var(--c-border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-border)' }}>
            <th className="text-left px-4 py-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text3)' }}>Parameter</th>
            <th className="text-left px-4 py-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text3)' }}>Type</th>
            <th className="text-left px-4 py-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text3)' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} style={{ borderBottom: '1px solid var(--c-border-light)' }}>
              <td className="px-4 py-2"><code className="text-xs text-blue-400">{p.name}</code></td>
              <td className="px-4 py-2">
                <span className="font-mono text-xs text-purple-400">{p.type}</span>
                {p.required ? <span className="ml-1.5 text-[10px] font-semibold text-red-400">required</span> : <span className="ml-1.5 text-[10px]" style={{ color: 'var(--c-text3)' }}>optional</span>}
              </td>
              <td className="px-4 py-2" style={{ color: 'var(--c-text2)' }}>{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MethodBlock({ name, desc, params, returns }) {
  return (
    <div className="my-4 rounded-lg overflow-hidden" style={{ border: '1px solid var(--c-border)' }}>
      <div className="px-4 py-3" style={{ background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-border)' }}>
        <code className="text-sm font-semibold text-blue-400">{name}</code>
        {returns && <span className="ml-2 text-xs font-mono" style={{ color: 'var(--c-text3)' }}>→ {returns}</span>}
      </div>
      <div className="px-4 py-3">
        <p className="text-sm mb-2" style={{ color: 'var(--c-text2)' }}>{desc}</p>
        {params && params.length > 0 && (
          <table className="w-full text-sm">
            <tbody>
              {params.map((p) => (
                <tr key={p.name} style={{ borderBottom: '1px solid var(--c-border-light)' }}>
                  <td className="py-1.5 pr-3"><code className="text-xs text-blue-400">{p.name}</code></td>
                  <td className="py-1.5 pr-3">
                    <span className="font-mono text-xs text-purple-400">{p.type}</span>
                    {p.required ? <span className="ml-1 text-[10px] font-semibold text-red-400">required</span> : <span className="ml-1 text-[10px]" style={{ color: 'var(--c-text3)' }}>optional</span>}
                  </td>
                  <td className="py-1.5" style={{ color: 'var(--c-text2)' }}>{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
