import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '../../services/axios.js'

const difficultyColor = {
  Easy:   '#00ff41',
  Medium: '#ffaa00',
  Hard:   '#ff4444',
  Insane: '#ff00ff',
}

const osIcon = { Linux: '🐧', Windows: '🪟' }

function MachineCard({ machine }) {
  const navigate = useNavigate()
  const color = difficultyColor[machine.difficulty] ?? '#00ff41'

  return (
    <div
      onClick={() => navigate(`/machines/${machine._id}`)}
      className="border border-[#00ff41]/20 rounded bg-[#00ff41]/2 hover:bg-[#00ff41]/5 hover:border-[#00ff41]/40 transition-all duration-200 p-5 flex flex-col gap-4 group cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{osIcon[machine.os] ?? '💻'}</span>
          <h3 className="font-mono text-sm text-[#00ff41] font-bold truncate">{machine.name}</h3>
        </div>
        <span
          className="font-mono text-[10px] px-2 py-0.5 rounded border shrink-0"
          style={{ color, borderColor: `${color}44`, backgroundColor: `${color}11` }}
        >
          {machine.difficulty}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">OS</span>
          <span className="font-mono text-xs text-[#00ff41]/70">{machine.os ?? '—'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">PTS</span>
          <span className="font-mono text-xs text-[#00ff41]/70">{machine.points ?? '—'}</span>
        </div>
        {machine.solvedAt && (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">DATE</span>
            <span className="font-mono text-xs text-[#00ff41]/70">
              {new Date(machine.solvedAt).toLocaleDateString('en-GB')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Machines() {
  const { data: machines = [], isLoading, isError } = useQuery({
    queryKey: ['machines'],
    queryFn: async () => (await api.get('/machines')).data,
  })

  return (
    <section id="machines" className="min-h-screen py-20 relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="font-mono text-xs text-[#00ff41]/40 tracking-widest mb-2">ls ~/machines</p>
          <h2 className="font-mono text-2xl text-[#00ff41] font-bold">~/machines</h2>
          <div className="mt-2 h-px w-24 bg-[#00ff41]/30" />
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {Object.entries(difficultyColor).map(([diff, color]) => (
            <div key={diff} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-mono text-[10px] text-[#00ff41]/40">{diff}</span>
            </div>
          ))}
        </div>

        {isLoading && <p className="font-mono text-sm text-[#00ff41]/40 animate-pulse">loading machines...</p>}
        {isError && <p className="font-mono text-sm text-red-500/70">error: failed to fetch machines</p>}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {machines.map(machine => (
              <MachineCard key={machine._id} machine={machine} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}