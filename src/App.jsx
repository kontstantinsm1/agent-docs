import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Introduction from './pages/Introduction'
import QuickStart from './pages/QuickStart'
import { Agents, Telephony, Webhooks, Providers } from './pages/Concepts'
import Errors from './pages/Errors'
import ClientSdk from './pages/ClientSdk'
import ApiReference, {
  CallCreate, CallGet, CallList, CallTranscript, CallHangup,
  AgentCreate, AgentList, AgentGet, AgentUpdate, AgentDelete, AgentSchema,
  TelephonyNumbers, TelephonyProviders,
  WebhookCreate, WebhookList, WebhookDelete, WebhookEvents,
} from './pages/ApiReference'
import McpServer from './pages/McpServer'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/docs" replace />} />

          {/* Docs */}
          <Route path="/docs" element={<Introduction />} />
          <Route path="/docs/quickstart" element={<QuickStart />} />
          <Route path="/docs/agents" element={<Agents />} />
          <Route path="/docs/telephony" element={<Telephony />} />
          <Route path="/docs/webhooks" element={<Webhooks />} />
          <Route path="/docs/providers" element={<Providers />} />
          <Route path="/docs/errors" element={<Errors />} />
          <Route path="/docs/sdk" element={<ClientSdk />} />

          {/* API Reference */}
          <Route path="/api" element={<ApiReference />} />
          <Route path="/api/calls/create" element={<CallCreate />} />
          <Route path="/api/calls/get" element={<CallGet />} />
          <Route path="/api/calls/list" element={<CallList />} />
          <Route path="/api/calls/transcript" element={<CallTranscript />} />
          <Route path="/api/calls/hangup" element={<CallHangup />} />
          <Route path="/api/agents/create" element={<AgentCreate />} />
          <Route path="/api/agents/list" element={<AgentList />} />
          <Route path="/api/agents/get" element={<AgentGet />} />
          <Route path="/api/agents/update" element={<AgentUpdate />} />
          <Route path="/api/agents/delete" element={<AgentDelete />} />
          <Route path="/api/agents/schema" element={<AgentSchema />} />
          <Route path="/api/telephony/numbers" element={<TelephonyNumbers />} />
          <Route path="/api/telephony/providers" element={<TelephonyProviders />} />
          <Route path="/api/webhooks/create" element={<WebhookCreate />} />
          <Route path="/api/webhooks/list" element={<WebhookList />} />
          <Route path="/api/webhooks/delete" element={<WebhookDelete />} />
          <Route path="/api/webhooks/events" element={<WebhookEvents />} />

          {/* Tools */}
          <Route path="/tools/mcp-server" element={<McpServer />} />

          <Route path="*" element={<Navigate to="/docs" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
