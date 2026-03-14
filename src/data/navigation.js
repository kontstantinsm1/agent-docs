export const topTabs = [
  { label: 'Documentation', path: '/docs', prefix: '/docs' },
  { label: 'API Reference', path: '/api', prefix: '/api' },
  { label: 'Client SDK', path: '/sdk', prefix: '/sdk' },
  { label: 'Integrations', path: '/tools/mcp-server', prefix: '/tools' },
]

export const sidebars = {
  '/docs': [
    {
      title: 'Getting Started',
      links: [
        { label: 'Introduction', path: '/docs' },
        { label: 'Quick Start', path: '/docs/quickstart' },
      ],
    },
    {
      title: 'Core Concepts',
      links: [
        { label: 'Agents', path: '/docs/agents' },
        { label: 'Calls & Telephony', path: '/docs/telephony' },
        { label: 'Webhooks', path: '/docs/webhooks' },
        { label: 'Voice Providers', path: '/docs/providers' },
        { label: 'Errors', path: '/docs/errors' },
      ],
    },
  ],
  '/api': [
    {
      title: 'Overview',
      links: [
        { label: 'Authentication', path: '/api' },
      ],
    },
    {
      title: 'Calls',
      links: [
        { label: 'Create Call', path: '/api/calls/create', method: 'POST' },
        { label: 'Get Call', path: '/api/calls/get', method: 'GET' },
        { label: 'List Calls', path: '/api/calls/list', method: 'GET' },
        { label: 'Get Transcript', path: '/api/calls/transcript', method: 'GET' },
        { label: 'Get Result', path: '/api/calls/result', method: 'GET' },
        { label: 'Hangup Call', path: '/api/calls/hangup', method: 'POST' },
      ],
    },
    {
      title: 'Agents',
      links: [
        { label: 'Create Agent', path: '/api/agents/create', method: 'POST' },
        { label: 'List Agents', path: '/api/agents/list', method: 'GET' },
        { label: 'Get Agent', path: '/api/agents/get', method: 'GET' },
        { label: 'Update Agent', path: '/api/agents/update', method: 'PUT' },
        { label: 'Delete Agent', path: '/api/agents/delete', method: 'DELETE' },
        { label: 'Agent Schema', path: '/api/agents/schema', method: 'GET' },
      ],
    },
    {
      title: 'Telephony',
      links: [
        { label: 'List Numbers', path: '/api/telephony/numbers', method: 'GET' },
        { label: 'List Providers', path: '/api/telephony/providers', method: 'GET' },
      ],
    },
    {
      title: 'Webhooks',
      links: [
        { label: 'Create Webhook', path: '/api/webhooks/create', method: 'POST' },
        { label: 'List Webhooks', path: '/api/webhooks/list', method: 'GET' },
        { label: 'Delete Webhook', path: '/api/webhooks/delete', method: 'DELETE' },
        { label: 'Event Payload', path: '/api/webhooks/events' },
      ],
    },
  ],
  '/sdk': [
    {
      title: 'Getting Started',
      links: [
        { label: 'Overview', path: '/sdk' },
        { label: 'Installation', path: '/sdk', hash: '#installation' },
        { label: 'Quick Start', path: '/sdk', hash: '#quick-start' },
        { label: 'Configuration', path: '/sdk', hash: '#config' },
      ],
    },
    {
      title: 'API',
      links: [
        { label: 'Calls', path: '/sdk', hash: '#calls' },
        { label: 'Agents', path: '/sdk', hash: '#agents' },
        { label: 'Numbers', path: '/sdk', hash: '#numbers' },
        { label: 'Webhooks', path: '/sdk', hash: '#webhooks' },
      ],
    },
    {
      title: 'Advanced',
      links: [
        { label: 'Webhook Verification', path: '/sdk', hash: '#webhook-verification' },
        { label: 'Error Handling', path: '/sdk', hash: '#error-handling' },
        { label: 'Types', path: '/sdk', hash: '#types' },
      ],
    },
  ],
  '/tools': [
    {
      title: 'MCP Server',
      links: [
        { label: 'Overview', path: '/tools/mcp-server' },
        { label: 'Quick Start', path: '/tools/mcp-server', hash: '#quick-start' },
        { label: 'Configuration', path: '/tools/mcp-server', hash: '#configuration' },
        { label: 'Registries', path: '/tools/mcp-server', hash: '#registries' },
        { label: 'Troubleshooting', path: '/tools/mcp-server', hash: '#troubleshooting' },
      ],
    },
  ],
}
