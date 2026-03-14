import CodeBlock from '../components/CodeBlock'
import Tabs from '../components/Tabs'
import Callout from '../components/Callout'
import { PageNav } from './Introduction'

export default function McpServer() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">MCP Server</h1>
      <p className="text-base text-zinc-400 mb-6 leading-relaxed">
        Use the shadcn MCP server to browse, search, and install components from registries.
      </p>

      <p className="text-sm text-zinc-400 mb-3">
        The shadcn MCP Server allows AI assistants to interact with items from registries. You can browse available components, search for specific ones, and install them directly into your project using natural language.
      </p>
      <p className="text-sm text-zinc-400 mb-4">
        Registries are configured in your project's <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">components.json</code> file.
      </p>

      <CodeBlock title="components.json">{`{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}`}</CodeBlock>

      {/* Quick Start */}
      <section id="quick-start" className="border-t border-zinc-800 pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-3">Quick Start</h2>
        <p className="text-sm text-zinc-400 mb-4">Select your MCP client and follow the instructions to configure the shadcn MCP server.</p>

        <Tabs tabs={['Claude Code', 'Cursor', 'VS Code', 'Codex', 'OpenCode']}>
          {/* Claude Code */}
          <div>
            <p className="text-sm text-zinc-400 mb-2"><strong className="text-white">Run the following command</strong> in your project:</p>
            <CodeBlock>npx shadcn@latest mcp init --client claude</CodeBlock>
            <p className="text-sm text-zinc-400 mt-3 mb-2"><strong className="text-white">Restart Claude Code</strong> and try the following prompts:</p>
            <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
              <li>Show me all available components in the shadcn registry</li>
              <li>Add the button, dialog and card components to my project</li>
              <li>Create a contact form using components from the shadcn registry</li>
            </ul>
            <Callout type="info">
              You can use the <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">/mcp</code> command in Claude Code to debug the MCP server.
            </Callout>
          </div>

          {/* Cursor */}
          <div>
            <p className="text-sm text-zinc-400 mb-2"><strong className="text-white">Run the following command</strong> in your project:</p>
            <CodeBlock>npx shadcn@latest mcp init --client cursor</CodeBlock>
            <p className="text-sm text-zinc-400 mt-3 mb-2">Open <strong className="text-white">Cursor Settings</strong> and <strong className="text-white">Enable the MCP server</strong> for shadcn.</p>
          </div>

          {/* VS Code */}
          <div>
            <p className="text-sm text-zinc-400 mb-2"><strong className="text-white">Run the following command</strong> in your project:</p>
            <CodeBlock>npx shadcn@latest mcp init --client vscode</CodeBlock>
            <p className="text-sm text-zinc-400 mt-3">Open <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">.vscode/mcp.json</code> and click <strong className="text-white">Start</strong> next to the shadcn server.</p>
          </div>

          {/* Codex */}
          <div>
            <Callout type="warning">
              The <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">shadcn</code> CLI cannot automatically update <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">~/.codex/config.toml</code>. You'll need to add the configuration manually.
            </Callout>
            <CodeBlock>npx shadcn@latest mcp init --client codex</CodeBlock>
            <p className="text-sm text-zinc-400 mt-3 mb-2"><strong className="text-white">Then add</strong> to <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">~/.codex/config.toml</code>:</p>
            <CodeBlock title="~/.codex/config.toml">{`[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]`}</CodeBlock>
          </div>

          {/* OpenCode */}
          <div>
            <p className="text-sm text-zinc-400 mb-2"><strong className="text-white">Run the following command</strong> in your project:</p>
            <CodeBlock>npx shadcn@latest mcp init --client opencode</CodeBlock>
            <p className="text-sm text-zinc-400 mt-3"><strong className="text-white">Restart OpenCode</strong> and try the prompts.</p>
          </div>
        </Tabs>
      </section>

      {/* What is MCP */}
      <section className="border-t border-zinc-800 pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-3">What is MCP?</h2>
        <p className="text-sm text-zinc-400 mb-4">
          <a href="https://modelcontextprotocol.io" className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">Model Context Protocol (MCP)</a> is an open protocol that enables AI assistants to securely connect to external data sources and tools.
        </p>
        <ul className="text-sm text-zinc-400 space-y-2">
          <li><strong className="text-white">Browse Components</strong> — List all available components, blocks, and templates from any configured registry</li>
          <li><strong className="text-white">Search Across Registries</strong> — Find specific components by name or functionality</li>
          <li><strong className="text-white">Install with Natural Language</strong> — Add components using conversational prompts</li>
          <li><strong className="text-white">Multiple Registries</strong> — Access public, private, and third-party sources</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="border-t border-zinc-800 pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="space-y-4">
          {[
            { n: 1, title: 'Registry Connection', desc: 'MCP connects to configured registries (shadcn/ui, private, third-party)' },
            { n: 2, title: 'Natural Language', desc: 'You describe what you need in plain English' },
            { n: 3, title: 'AI Processing', desc: 'The assistant translates your request into registry commands' },
            { n: 4, title: 'Component Delivery', desc: 'Resources are fetched and installed in your project' },
          ].map((s) => (
            <div key={s.n} className="flex gap-4">
              <div className="shrink-0 w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-semibold text-blue-400">
                {s.n}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{s.title}</div>
                <div className="text-sm text-zinc-500">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Configuration */}
      <section id="configuration" className="border-t border-zinc-800 pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-3">Configuration</h2>

        <h3 className="text-base font-semibold mt-5 mb-2">Claude Code</h3>
        <CodeBlock title=".mcp.json">{`{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`}</CodeBlock>

        <h3 className="text-base font-semibold mt-5 mb-2">Cursor</h3>
        <CodeBlock title=".cursor/mcp.json">{`{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`}</CodeBlock>

        <h3 className="text-base font-semibold mt-5 mb-2">VS Code</h3>
        <CodeBlock title=".vscode/mcp.json">{`{
  "servers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`}</CodeBlock>
      </section>

      {/* Registries */}
      <section id="registries" className="border-t border-zinc-800 pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-3">Configuring Registries</h2>
        <CodeBlock title="components.json">{`{
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer \${REGISTRY_TOKEN}"
      }
    }
  }
}`}</CodeBlock>
        <Callout type="info">No configuration is needed to access the standard shadcn/ui registry.</Callout>

        <h3 className="text-base font-semibold mt-5 mb-2">Authentication</h3>
        <p className="text-sm text-zinc-400 mb-2">For private registries, set environment variables in <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">.env.local</code>:</p>
        <CodeBlock title=".env.local">{`REGISTRY_TOKEN=your_token_here
API_KEY=your_api_key_here`}</CodeBlock>
      </section>

      {/* Example Prompts */}
      <section className="border-t border-zinc-800 pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-4">Example Prompts</h2>

        <h3 className="text-base font-semibold mt-4 mb-2">Browse & Search</h3>
        <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
          <li>Show me all available components in the shadcn registry</li>
          <li>Find me a login form from the shadcn registry</li>
        </ul>

        <h3 className="text-base font-semibold mt-4 mb-2">Install Items</h3>
        <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
          <li>Add the button component to my project</li>
          <li>Create a login form using shadcn components</li>
        </ul>

        <h3 className="text-base font-semibold mt-4 mb-2">Work with Namespaces</h3>
        <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
          <li>Show me components from acme registry</li>
          <li>Install @internal/auth-form</li>
          <li>Build a landing page using hero, features sections from acme</li>
        </ul>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="border-t border-zinc-800 pt-8 mt-8">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>

        <h3 className="text-base font-semibold mt-4 mb-2">MCP Not Responding</h3>
        <ol className="text-sm text-zinc-400 space-y-1.5 list-decimal list-inside">
          <li><strong className="text-white">Check Configuration</strong> — Verify the MCP server is properly configured</li>
          <li><strong className="text-white">Restart MCP Client</strong> — Restart after configuration changes</li>
          <li><strong className="text-white">Verify Installation</strong> — Ensure shadcn is installed</li>
          <li><strong className="text-white">Check Network</strong> — Confirm registry access</li>
        </ol>

        <h3 className="text-base font-semibold mt-5 mb-2">No Tools or Prompts</h3>
        <ol className="text-sm text-zinc-400 space-y-1.5 list-decimal list-inside">
          <li><strong className="text-white">Clear npx cache</strong> — Run <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded">npx clear-npx-cache</code></li>
          <li><strong className="text-white">Re-enable</strong> — Re-enable the MCP server in your client</li>
          <li><strong className="text-white">Check Logs</strong> — In Cursor: View → Output → MCP: project-*</li>
        </ol>
      </section>

      <PageNav prev={{ label: 'Webhook Events', path: '/api/webhooks/events' }} />
    </>
  )
}
