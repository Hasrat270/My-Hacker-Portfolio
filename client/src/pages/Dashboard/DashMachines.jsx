import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../../services/axios.js'

const DEFAULTS = { name: '', os: 'Linux', difficulty: 'Easy', points: '', solvedAt: '', writeupUrl: '', tags: '', details: '' }

export default function DashMachines() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState(DEFAULTS)
  const [editId, setEditId] = useState(null)

  const { data: machines = [] } = useQuery({
    queryKey: ['machines'],
    queryFn: async () => (await api.get('/machines')).data,
  })

  const addMutation = useMutation({
    mutationFn: data => api.post('/machines', data),
    onSuccess: () => { queryClient.invalidateQueries(['machines']); setForm(DEFAULTS) },
  })

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/machines/${id}`, data),
    onSuccess: () => { queryClient.invalidateQueries(['machines']); setEditId(null); setForm(DEFAULTS) },
  })

  const deleteMutation = useMutation({
    mutationFn: id => api.delete(`/machines/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['machines']),
  })

  function handleSubmit() {
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
    if (editId) {
      editMutation.mutate({ id: editId, data: payload })
    } else {
      addMutation.mutate(payload)
    }
  }

  function handleEdit(machine) {
    setEditId(machine._id)
    setForm({
      name:       machine.name       || '',
      os:         machine.os         || 'Linux',
      difficulty: machine.difficulty || 'Easy',
      points:     machine.points     || '',
      solvedAt:   machine.solvedAt   ? machine.solvedAt.slice(0, 10) : '',
      writeupUrl: machine.writeupUrl || '',
      tags:       machine.tags?.join(', ') || '',
      details:    machine.details    || '',
    })
  }

  const DIFFICULTY_COLORS = {
    Easy:   'text-[#00ff41]',
    Medium: 'text-yellow-400',
    Hard:   'text-orange-400',
    Insane: 'text-red-400',
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl">

      {/* Form */}
      <div className="border border-[#00ff41]/20 rounded p-5 bg-[#00ff41]/[0.02] flex flex-col gap-3">
        <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
          {editId ? 'edit machine' : 'add machine'}
        </p>

        {/* Name */}
        <input
          type="text"
          placeholder="Machine name"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
        />

        {/* OS + Difficulty */}
        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.os}
            onChange={e => setForm(p => ({ ...p, os: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-[#0a0a0a] border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
          >
            <option value="Linux">Linux</option>
            <option value="Windows">Windows</option>
          </select>

          <select
            value={form.difficulty}
            onChange={e => setForm(p => ({ ...p, difficulty: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-[#0a0a0a] border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            <option value="Insane">Insane</option>
          </select>
        </div>

        {/* Points + Date */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Points"
            value={form.points}
            onChange={e => setForm(p => ({ ...p, points: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
          />
          <input
            type="date"
            value={form.solvedAt}
            onChange={e => setForm(p => ({ ...p, solvedAt: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
          />
        </div>

        {/* Writeup URL */}
        <input
          type="text"
          placeholder="Writeup URL"
          value={form.writeupUrl}
          onChange={e => setForm(p => ({ ...p, writeupUrl: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
        />

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma separated: SMB, RCE, PrivEsc)"
          value={form.tags}
          onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
        />

        {/* Details */}
        <textarea
          placeholder="Machine details / approach..."
          value={form.details}
          onChange={e => setForm(p => ({ ...p, details: e.target.value }))}
          rows={3}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20 resize-none"
        />

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
        {machines.map(machine => (
          <div
            key={machine._id}
            className="flex items-center justify-between border border-[#00ff41]/20 rounded px-4 py-3 bg-[#00ff41]/[0.02] hover:border-[#00ff41]/40 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-[#00ff41]">{machine.name}</span>
              <span className="font-mono text-[10px] text-[#00ff41]/40">{machine.os}</span>
              <span className={`font-mono text-[10px] ${DIFFICULTY_COLORS[machine.difficulty]}`}>
                {machine.difficulty}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(machine)}
                className="font-mono text-[10px] text-[#00ff41]/50 hover:text-[#00ff41] transition-colors duration-200"
              >
                edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(machine._id)}
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