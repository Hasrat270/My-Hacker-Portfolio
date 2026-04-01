import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../../services/axios.js'

const DEFAULTS = { name: '', platform: 'PortSwigger', category: '', difficulty: 'Apprentice', solvedAt: '' }

export default function DashLabs() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState(DEFAULTS)
  const [editId, setEditId] = useState(null)

  const { data: labs = [] } = useQuery({
    queryKey: ['labs'],
    queryFn: async () => (await api.get('/labs')).data,
  })

  const addMutation = useMutation({
    mutationFn: data => api.post('/labs', data),
    onSuccess: () => { queryClient.invalidateQueries(['labs']); setForm(DEFAULTS) },
  })

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/labs/${id}`, data),
    onSuccess: () => { queryClient.invalidateQueries(['labs']); setEditId(null); setForm(DEFAULTS) },
  })

  const deleteMutation = useMutation({
    mutationFn: id => api.delete(`/labs/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['labs']),
  })

  function handleSubmit() {
    if (editId) {
      editMutation.mutate({ id: editId, data: form })
    } else {
      addMutation.mutate(form)
    }
  }

  function handleEdit(lab) {
    setEditId(lab._id)
    setForm({
      name:       lab.name       || '',
      platform:   lab.platform   || 'PortSwigger',
      category:   lab.category   || '',
      difficulty: lab.difficulty || 'Apprentice',
      solvedAt:   lab.solvedAt   ? lab.solvedAt.slice(0, 10) : '',
    })
  }

  const DIFFICULTY_COLORS = {
    Apprentice:   'text-[#00ff41]',
    Practitioner: 'text-yellow-400',
    Expert:       'text-red-400',
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl">

      {/* Form */}
      <div className="border border-[#00ff41]/20 rounded p-5 bg-[#00ff41]/2 flex flex-col gap-3">
        <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
          {editId ? 'edit lab' : 'add lab'}
        </p>

        <input
          type="text"
          placeholder="Lab name"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.platform}
            onChange={e => setForm(p => ({ ...p, platform: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-[#0a0a0a] border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
          >
            <option value="PortSwigger">PortSwigger</option>
            <option value="HackTheBox">HackTheBox</option>
            <option value="TryHackMe">TryHackMe</option>
          </select>

          <select
            value={form.difficulty}
            onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-[#0a0a0a] border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
          >
            <option value="Apprentice">Apprentice</option>
            <option value="Practitioner">Practitioner</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Category (e.g. SQLi, XSS)"
            value={form.category}
            onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
          />
          <input
            type="date"
            value={form.solvedAt}
            onChange={e => setForm(p => ({ ...p, solvedAt: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="font-mono text-xs text-[#0a0a0a] bg-[#00ff41] px-4 py-2 rounded hover:bg-[#00ff41]/80 transition-colors duration-200"
          >
            {editId ? '$ ./update.sh' : '$ ./add.sh'}
          </button>
          {editId && (
            <button
              onClick={() => { setEditId(null); setForm(DEFAULTS) }}
              className="font-mono text-xs text-[#00ff41]/50 border border-[#00ff41]/20 px-4 py-2 rounded hover:text-[#00ff41] transition-colors duration-200"
            >
              cancel
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {labs.map(lab => (
          <div
            key={lab._id}
            className="flex items-center justify-between border border-[#00ff41]/20 rounded px-4 py-3 bg-[#00ff41]/2 hover:border-[#00ff41]/40 transition-all duration-200"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="font-mono text-sm text-[#00ff41] truncate">{lab.name}</span>
              <span className="font-mono text-[10px] text-[#00ff41]/40 shrink-0">{lab.platform}</span>
              <span className={`font-mono text-[10px] shrink-0 ${DIFFICULTY_COLORS[lab.difficulty]}`}>
                {lab.difficulty}
              </span>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => handleEdit(lab)}
                className="font-mono text-[10px] text-[#00ff41]/50 hover:text-[#00ff41] transition-colors duration-200"
              >
                edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(lab._id)}
                className="font-mono text-[10px] text-red-400/50 hover:text-red-400 transition-colors duration-200"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}