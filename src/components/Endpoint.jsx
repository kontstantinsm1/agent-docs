const methodColors = {
  GET: 'bg-emerald-500/10 text-emerald-400',
  POST: 'bg-blue-500/10 text-blue-400',
  PUT: 'bg-yellow-500/10 text-yellow-400',
  DELETE: 'bg-red-500/10 text-red-400',
  PATCH: 'bg-orange-500/10 text-orange-400',
}

export default function Endpoint({ method, path, description, children }) {
  return (
    <div className="my-5 rounded-lg overflow-hidden" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: '1px solid var(--c-border-light)', background: 'var(--c-bg2)' }}>
        <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${methodColors[method] || ''}`}>
          {method}
        </span>
        <code className="text-sm font-medium" style={{ color: 'var(--c-text)' }}>{path}</code>
      </div>
      <div className="px-5 py-4">
        {description && <p className="text-sm mb-3" style={{ color: 'var(--c-text2)' }}>{description}</p>}
        {children}
      </div>
    </div>
  )
}

export function ParamTable({ params }) {
  return (
    <table className="w-full text-sm my-3">
      <thead>
        <tr style={{ borderBottom: '1px solid var(--c-border)' }}>
          <th className="text-left text-[11px] font-semibold uppercase tracking-wider pb-2 pr-4" style={{ color: 'var(--c-text3)' }}>Parameter</th>
          <th className="text-left text-[11px] font-semibold uppercase tracking-wider pb-2 pr-4" style={{ color: 'var(--c-text3)' }}>Type</th>
          <th className="text-left text-[11px] font-semibold uppercase tracking-wider pb-2" style={{ color: 'var(--c-text3)' }}>Description</th>
        </tr>
      </thead>
      <tbody>
        {params.map((p) => (
          <tr key={p.name} style={{ borderBottom: '1px solid var(--c-border-light)' }}>
            <td className="py-2.5 pr-4">
              <code className="text-[13px] text-blue-400">{p.name}</code>
            </td>
            <td className="py-2.5 pr-4">
              <span className="font-mono text-xs text-purple-400">{p.type}</span>
              {p.required ? (
                <span className="ml-1.5 text-[10px] font-semibold text-red-400">required</span>
              ) : (
                <span className="ml-1.5 text-[10px]" style={{ color: 'var(--c-text3)' }}>optional</span>
              )}
            </td>
            <td className="py-2.5" style={{ color: 'var(--c-text2)' }}>{p.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
