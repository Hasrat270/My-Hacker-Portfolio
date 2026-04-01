import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/axios.js'

const FILTERS = ['All', 'HTB', 'TryHackMe', 'PortSwigger']

const DIFFICULTY_COLORS = {
  Easy:   'text-[#00ff41] border-[#00ff41]/40',
  Medium: 'text-yellow-400 border-yellow-400/40',
  Hard:   'text-orange-400 border-orange-400/40',
  Insane: 'text-red-400 border-red-400/40',
}

export default function Writeups() {
  const [active, setActive] = useState('All')
  const navigate = useNavigate()

  const { data: writeups = [], isLoading } = useQuery({
    queryKey: ['writeups'],
    queryFn: async () => (await api.get('/writeups')).data,
  })

  const filtered = active === 'All'
    ? writeups
    : writeups.filter(w => w.platform === active)

  return (
    <section id="writeups" className="relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="mb-12">
          <p className="font-mono text-[#00ff41]/40 text-xs tracking-widest mb-2">~/writeups</p>
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-[#00ff41]">writeups</h2>
          <div className="mt-2 w-16 h-px bg-[#00ff41]/40" />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 ${
                active === f
                  ? 'text-[#00ff41] bg-[#00ff41]/10 border-[#00ff41]/50'
                  : 'text-[#00ff41]/40 border-[#00ff41]/20 hover:text-[#00ff41] hover:border-[#00ff41]/40'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="font-mono text-xs text-[#00ff41]/30 self-center ml-2">
            {filtered.length} results
          </span>
        </div>

        {isLoading && (
          <p className="font-mono text-sm text-[#00ff41]/40 animate-pulse">loading writeups...</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(w => (
            <div
              key={w._id}
              onClick={() => navigate(`/writeups/${w._id}`)}
              className="group border border-[#00ff41]/20 rounded bg-[#00ff41]/[0.02] hover:bg-[#00ff41]/5 hover:border-[#00ff41]/40 transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
            >
              {w.coverImage ? (
                <img
                  src={w.coverImage}
                  alt={w.title}
                  className="w-full h-32 object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                />
              ) : (
                <div className="w-full h-32 bg-[#00ff41]/5 flex items-center justify-center border-b border-[#00ff41]/10">
                  <span className="font-mono text-[#00ff41]/20 text-xs tracking-widest">{w.platform}</span>
                </div>
              )}

              <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#00ff41]/50 tracking-widest">{w.platform}</span>
                  <span className={`font-mono text-[10px] border px-2 py-0.5 rounded ${DIFFICULTY_COLORS[w.difficulty] || 'text-[#00ff41]/50 border-[#00ff41]/20'}`}>
                    {w.difficulty}
                  </span>
                </div>

                <h3 className="font-mono text-sm text-[#00ff41]/90 group-hover:text-[#00ff41] transition-colors duration-200 leading-snug">
                  {w.title}
                </h3>

                <div className="flex flex-wrap gap-1 mt-auto">
                  {w.tags?.map(tag => (
                    <span key={tag} className="font-mono text-[10px] text-[#00ff41]/40 bg-[#00ff41]/5 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {w.publishedAt && (
                  <p className="font-mono text-[10px] text-[#00ff41]/25 mt-1">
                    {new Date(w.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}