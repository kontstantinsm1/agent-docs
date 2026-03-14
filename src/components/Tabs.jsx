import { useState } from 'react'

export default function Tabs({ tabs, children }) {
  const [active, setActive] = useState(0)

  return (
    <div className="my-4">
      <div className="flex border-b border-zinc-800 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
              i === active
                ? 'text-blue-400 border-blue-400'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {Array.isArray(children) ? children[active] : children}
      </div>
    </div>
  )
}
