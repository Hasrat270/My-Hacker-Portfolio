import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import api from '../../../api/apiClient.js'

const DEFAULTS = {
  title: '', platform: 'HTB', difficulty: 'Easy',
  tags: '', url: '', content: '', publishedAt: ''
}

export default function DashWriteups() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState(DEFAULTS)
  const [editId, setEditId] = useState(null)
  const [validationError, setValidationError] = useState('')

  const { data: writeups = [], isLoading, isError } = useQuery({
    queryKey: ['writeups'],
    queryFn: async () => (await api.get('/writeups')).data,
  })

  const addMutation = useMutation({
    mutationFn: data => api.post('/writeups', data),
    onSuccess: () => { 
      queryClient.invalidateQueries(['writeups'])
      setForm(DEFAULTS)
      setTimeout(() => addMutation.reset(), 3000)
    },
  })

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/writeups/${id}`, data),
    onSuccess: () => { 
      queryClient.invalidateQueries(['writeups'])
      setEditId(null)
      setForm(DEFAULTS)
      setTimeout(() => editMutation.reset(), 3000)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: id => api.delete(`/writeups/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['writeups'])
      setTimeout(() => deleteMutation.reset(), 3000)
    },
  })

  function handleSubmit() {
    if (!form.title) {
      setValidationError("required_fields_missing: title")
      return;
    }
    setValidationError("")
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    }
    if (editId) {
      editMutation.mutate({ id: editId, data: payload })
    } else {
      addMutation.mutate(payload)
    }
  }

  function handleEdit(w) {
    setEditId(w._id)
    setForm({
      title:       w.title       || '',
      platform:    w.platform    || 'HTB',
      difficulty:  w.difficulty  || 'Easy',
      tags:        w.tags?.join(', ') || '',
      url:         w.url         || '',
      content:     w.content     || '',
      publishedAt: w.publishedAt ? w.publishedAt.slice(0, 10) : '',
    })
  }

  const DIFFICULTY_COLORS = {
    Easy:   'text-[#00ff41]',
    Medium: 'text-yellow-400',
    Hard:   'text-orange-400',
    Insane: 'text-red-400',
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      {isLoading && <p className="font-mono text-[10px] text-[#00ff41]/50 uppercase">loading_writeups...</p>}
      {isError && <p className="font-mono text-[10px] text-red-500 uppercase">error: failed_to_fetch_writeups</p>}

      {/* Form */}
      <div className="border border-[#00ff41]/20 rounded p-5 bg-[#00ff41]/2 flex flex-col gap-3">
        <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
          {editId ? 'edit writeup' : 'add writeup'}
        </p>

        {/* Title */}
        <input
          type="text"
          placeholder="Writeup title"
          value={form.title}
          onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
        />

        {/* Platform + Difficulty */}
        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.platform}
            onChange={e => setForm(p => ({ ...p, platform: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-[#0a0a0a] border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
          >
            <option value="HTB">HTB</option>
            <option value="TryHackMe">TryHackMe</option>
            <option value="PortSwigger">PortSwigger</option>
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

        {/* Tags + Date */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Tags (SQLi, XSS, RCE)"
            value={form.tags}
            onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
          />
          <input
            type="date"
            value={form.publishedAt}
            onChange={e => setForm(p => ({ ...p, publishedAt: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
          />
        </div>

        {/* URL */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="External URL (optional)"
            value={form.url}
            onChange={e => setForm(p => ({ ...p, url: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
          />
          <p className="font-mono text-[9px] text-[#00ff41]/30 ml-1">
            {"> [HINT]: This becomes '$ ./view-original.sh' button — use http:// for external link (Medium, GitHub, HTB...)"}
          </p>
        </div>

        {/* Markdown Editor */}
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">content (markdown)</p>
          <div data-color-mode="dark">
            <MDEditor
              value={form.content}
              onChange={val => setForm(p => ({ ...p, content: val || '' }))}
              height={300}
              preview="edit"
              style={{
                background: 'transparent',
                border: '1px solid rgba(0,255,65,0.2)',
                borderRadius: '4px',
              }}
            />
          </div>
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
              onClick={() => { setEditId(null); setForm(DEFAULTS); setValidationError("") }}
              className="font-mono text-xs text-[#00ff41]/50 border border-[#00ff41]/20 px-4 py-2 rounded hover:text-[#00ff41] transition-colors duration-200"
            >
              cancel
            </button>
          )}
        </div>

        {/* Global Status/Error Box */}
        {(validationError || addMutation.isError || editMutation.isError || addMutation.isSuccess || editMutation.isSuccess || deleteMutation.isError || deleteMutation.isSuccess) && (
          <div className={`mt-2 border p-3 rounded font-mono text-[11px] ${
            (addMutation.isSuccess || editMutation.isSuccess || deleteMutation.isSuccess) ? 'bg-[#00ff41]/5 border-[#00ff41]/30 text-[#00ff41]' : 'bg-red-500/5 border-red-500/30 text-red-400'
          }`}>
            {(addMutation.isSuccess || editMutation.isSuccess) && "> [SUCCESS]: writeup_record_updated"}
            {deleteMutation.isSuccess && "> [SUCCESS]: writeup_deleted"}
            {addMutation.isError && `> [ERROR]: save_failed: ${addMutation.error?.response?.data?.message || 'internal_error'}`}
            {editMutation.isError && `> [ERROR]: edit_failed: ${editMutation.error?.response?.data?.message || 'internal_error'}`}
            {deleteMutation.isError && `> [ERROR]: delete_failed: ${deleteMutation.error?.response?.data?.message || 'internal_error'}`}
            {validationError && `> [ERROR]: ${validationError}`}
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {writeups.map(w => (
          <div
            key={w._id}
            className="flex items-center justify-between border border-[#00ff41]/20 rounded px-4 py-3 bg-[#00ff41]/2 hover:border-[#00ff41]/40 transition-all duration-200"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="font-mono text-sm text-[#00ff41] truncate">{w.title}</span>
              <span className="font-mono text-[10px] text-[#00ff41]/40 shrink-0">{w.platform}</span>
              <span className={`font-mono text-[10px] shrink-0 ${DIFFICULTY_COLORS[w.difficulty]}`}>
                {w.difficulty}
              </span>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => handleEdit(w)}
                className="font-mono text-[10px] text-[#00ff41]/50 hover:text-[#00ff41] transition-colors duration-200"
              >
                edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(w._id)}
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