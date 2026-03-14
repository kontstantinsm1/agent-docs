import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import { PageNav } from './Introduction'

export default function Errors() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Errors</h1>
      <p className="text-base mb-8" style={{ color: 'var(--c-text2)' }}>
        How Agent Core handles errors across the API and during calls.
      </p>

      {/* HTTP Errors */}
      <h2 className="text-xl font-semibold mb-3">HTTP Status Codes</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        All API errors return a JSON body with a <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>detail</code> field describing the issue.
      </p>

      <CodeBlock title="Error response format">{`{
  "detail": "Agent not found"
}`}</CodeBlock>

      <div className="my-6 rounded-lg overflow-hidden" style={{ border: '1px solid var(--c-border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-border)' }}>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text3)' }}>Code</th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text3)' }}>Status</th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text3)' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { code: '200', status: 'OK', desc: 'Request succeeded', color: 'text-emerald-400' },
              { code: '400', status: 'Bad Request', desc: 'Invalid input — malformed phone number, missing fields, invalid URL', color: 'text-yellow-400' },
              { code: '401', status: 'Unauthorized', desc: 'Missing or invalid API key', color: 'text-red-400' },
              { code: '404', status: 'Not Found', desc: 'Resource does not exist (agent, call, provider, etc.)', color: 'text-red-400' },
              { code: '422', status: 'Unprocessable Entity', desc: 'Validation error — invalid agent config structure', color: 'text-orange-400' },
              { code: '500', status: 'Internal Server Error', desc: 'Server-side failure — external service error, corrupted data', color: 'text-red-400' },
            ].map((r) => (
              <tr key={r.code} style={{ borderBottom: '1px solid var(--c-border-light)' }}>
                <td className="px-4 py-2.5">
                  <code className={`text-xs font-bold ${r.color}`}>{r.code}</code>
                </td>
                <td className="px-4 py-2.5 font-medium" style={{ color: 'var(--c-text)' }}>{r.status}</td>
                <td className="px-4 py-2.5" style={{ color: 'var(--c-text2)' }}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common API errors */}
      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Common API Errors</h2>

      <h3 className="text-base font-semibold mt-5 mb-2">Authentication</h3>
      <CodeBlock>{`# Missing or invalid API key
HTTP 401
{
  "detail": "Invalid or missing API key"
}`}</CodeBlock>

      <h3 className="text-base font-semibold mt-5 mb-2">Invalid Phone Number</h3>
      <CodeBlock>{`# Bad phone format
HTTP 400
{
  "detail": "Invalid phone number format. Use E.164: +1234567890"
}`}</CodeBlock>

      <h3 className="text-base font-semibold mt-5 mb-2">Resource Not Found</h3>
      <CodeBlock>{`# Agent doesn't exist
HTTP 404
{
  "detail": "Agent not found"
}

# Call doesn't exist
HTTP 404
{
  "detail": "Call not found"
}`}</CodeBlock>

      <h3 className="text-base font-semibold mt-5 mb-2">Invalid Agent Config</h3>
      <CodeBlock>{`# Malformed config object
HTTP 422
{
  "detail": "Invalid agent config"
}`}</CodeBlock>

      {/* Call Error Codes */}
      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Call Error Codes</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        When a call fails, the <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>error</code> field contains a structured error code. These are organized by category.
      </p>

      <CodeBlock title="Failed call response">{`{
  "call_id": "550e8400-...",
  "status": "failed",
  "error": {
    "code": "NO_ANSWER",
    "category": "subscriber",
    "description": "Phone rang but no one answered",
    "retry": true
  }
}`}</CodeBlock>

      {/* Subscriber errors */}
      <h3 className="text-base font-semibold mt-6 mb-3">Subscriber Errors</h3>
      <p className="text-sm mb-3" style={{ color: 'var(--c-text2)' }}>Issues on the callee's side.</p>
      <ErrorTable errors={[
        { code: 'NO_ANSWER', desc: 'Phone rang, no answer', retry: true },
        { code: 'BUSY', desc: 'Line is busy', retry: true },
        { code: 'DECLINED', desc: 'Call rejected by callee', retry: false },
        { code: 'UNAVAILABLE', desc: 'Temporarily unavailable', retry: true },
        { code: 'NUMBER_NOT_FOUND', desc: 'Number does not exist', retry: false },
        { code: 'NUMBER_INVALID', desc: 'Invalid number format', retry: false },
      ]} />

      {/* Provider errors */}
      <h3 className="text-base font-semibold mt-6 mb-3">Provider Errors</h3>
      <p className="text-sm mb-3" style={{ color: 'var(--c-text2)' }}>Issues with the SIP telephony provider.</p>
      <ErrorTable errors={[
        { code: 'PROVIDER_TIMEOUT', desc: 'Provider did not respond', retry: true },
        { code: 'PROVIDER_ERROR', desc: 'Provider server error (5xx)', retry: true },
        { code: 'PROVIDER_OVERLOADED', desc: 'Provider is overloaded', retry: true },
        { code: 'PROVIDER_FORBIDDEN', desc: 'Provider rejected the request', retry: false },
        { code: 'CODEC_MISMATCH', desc: 'Audio codec negotiation failed', retry: false },
      ]} />

      {/* Config errors */}
      <h3 className="text-base font-semibold mt-6 mb-3">Configuration Errors</h3>
      <p className="text-sm mb-3" style={{ color: 'var(--c-text2)' }}>Misconfiguration in the system setup.</p>
      <ErrorTable errors={[
        { code: 'TRUNK_MISSING', desc: 'SIP trunk not found in LiveKit', retry: false },
        { code: 'TRUNK_ID_EMPTY', desc: 'SIP trunk ID not configured', retry: false },
        { code: 'AUTH_REQUIRED', desc: 'SIP authentication required', retry: false },
        { code: 'PROVIDER_NOT_FOUND', desc: 'Telephony provider not configured', retry: false },
        { code: 'API_KEY_MISSING', desc: 'Missing API key for external service', retry: false },
      ]} />

      {/* Infra errors */}
      <h3 className="text-base font-semibold mt-6 mb-3">Infrastructure Errors</h3>
      <p className="text-sm mb-3" style={{ color: 'var(--c-text2)' }}>Issues with infrastructure services.</p>
      <ErrorTable errors={[
        { code: 'SIP_TIMEOUT', desc: 'SIP connection timed out', retry: true },
        { code: 'LIVEKIT_ERROR', desc: 'LiveKit API returned an error', retry: true },
        { code: 'ROOM_POLL_FAILED', desc: 'Room monitoring failed', retry: true },
        { code: 'ZADARMA_API_ERROR', desc: 'Zadarma callback API error', retry: true },
        { code: 'ZADARMA_NO_CONNECT', desc: 'Zadarma second leg never connected', retry: true },
      ]} />

      {/* System errors */}
      <h3 className="text-base font-semibold mt-6 mb-3">System Errors</h3>
      <p className="text-sm mb-3" style={{ color: 'var(--c-text2)' }}>Internal bot and server issues.</p>
      <ErrorTable errors={[
        { code: 'BOT_CRASHED', desc: 'Bot subprocess crashed unexpectedly', retry: true },
        { code: 'BOT_STARTUP_FAILED', desc: 'Bot failed to initialize', retry: true },
        { code: 'TTS_ERROR', desc: 'Text-to-speech service failed', retry: true },
        { code: 'STT_ERROR', desc: 'Speech-to-text service failed', retry: true },
        { code: 'LLM_ERROR', desc: 'AI language model failed', retry: true },
        { code: 'INTERRUPTED', desc: 'Server restarted during active call', retry: true },
        { code: 'CANCELED', desc: 'Call canceled (campaign paused/stopped)', retry: false },
        { code: 'UNKNOWN', desc: 'Unclassified error', retry: false },
      ]} />

      {/* Retry guidance */}
      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Retry Strategy</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--c-text2)' }}>
        Each error code includes a <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>retry</code> field indicating whether retrying the call is likely to succeed.
      </p>

      <Callout type="info">
        For retryable errors, we recommend exponential backoff starting with a 30-second delay. For subscriber errors like <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>NO_ANSWER</code> or <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>BUSY</code>, wait at least 5 minutes before retrying.
      </Callout>

      <Callout type="warning">
        Do not retry calls with <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>NUMBER_NOT_FOUND</code> or <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--c-code-bg)' }}>NUMBER_INVALID</code> — the number will never be reachable.
      </Callout>

      {/* Error codes endpoint */}
      <h2 className="text-xl font-semibold mb-3 mt-8 pt-8" style={{ borderTop: '1px solid var(--c-border)' }}>Error Codes Endpoint</h2>
      <p className="text-sm mb-3" style={{ color: 'var(--c-text2)' }}>
        Retrieve all available error codes programmatically:
      </p>
      <CodeBlock>{`GET /api/v1/error-codes

# Response:
{
  "codes": [
    {
      "code": "NO_ANSWER",
      "category": "subscriber",
      "label": "No answer",
      "description": "Phone rang but no one answered",
      "retry": true,
      "sip_codes": [408, 480]
    },
    ...
  ]
}`}</CodeBlock>

      <PageNav
        prev={{ label: 'Voice Providers', path: '/docs/providers' }}
        next={{ label: 'Client SDK', path: '/docs/sdk' }}
      />
    </>
  )
}

function ErrorTable({ errors }) {
  return (
    <div className="rounded-lg overflow-hidden mb-4" style={{ border: '1px solid var(--c-border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--c-bg2)', borderBottom: '1px solid var(--c-border)' }}>
            <th className="text-left px-4 py-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text3)' }}>Code</th>
            <th className="text-left px-4 py-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text3)' }}>Description</th>
            <th className="text-left px-4 py-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text3)' }}>Retry</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((e) => (
            <tr key={e.code} style={{ borderBottom: '1px solid var(--c-border-light)' }}>
              <td className="px-4 py-2">
                <code className="text-xs font-semibold text-blue-400">{e.code}</code>
              </td>
              <td className="px-4 py-2" style={{ color: 'var(--c-text2)' }}>{e.desc}</td>
              <td className="px-4 py-2">
                {e.retry ? (
                  <span className="text-xs font-medium text-emerald-400">Yes</span>
                ) : (
                  <span className="text-xs font-medium text-red-400">No</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
