import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../../../api/apiClient.js'

const DEFAULTS = { platform: '', url: '', username: '' }

const PLATFORMS = [
  'GitHub', 'HTB', 'HackerOne', 'BugCrowd',
  'X', 'Instagram', 'Facebook', 'Snapchat',
  'LinkedIn', 'TryHackMe', 'YouTube'
]

export default function DashSocials() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState(DEFAULTS)
  const [editId, setEditId] = useState(null)
  const [validationError, setValidationError] = useState('')

  const { data: socials = [], isLoading, isError } = useQuery({
    queryKey: ['socials'],
    queryFn: async () => (await api.get('/socials')).data,
  })

  const addMutation = useMutation({
    mutationFn: data => api.post('/socials', data),
    onSuccess: () => { 
      queryClient.invalidateQueries(['socials'])
      setForm(DEFAULTS)
      setTimeout(() => addMutation.reset(), 3000)
    },
  })

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/socials/${id}`, data),
    onSuccess: () => { 
      queryClient.invalidateQueries(['socials'])
      setEditId(null)
      setForm(DEFAULTS)
      setTimeout(() => editMutation.reset(), 3000)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: id => api.delete(`/socials/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['socials'])
      setTimeout(() => deleteMutation.reset(), 3000)
    },
  })

  function handleSubmit() {
    if (!form.platform || !form.username || !form.url) {
      setValidationError("required_fields_missing: platform, username, and url")
      return;
    }
    setValidationError("")
    if (editId) {
      editMutation.mutate({ id: editId, data: form })
    } else {
      addMutation.mutate(form)
    }
  }

  function handleEdit(social) {
    setEditId(social._id)
    setForm({
      platform: social.platform || '',
      url:      social.url      || '',
      username: social.username || '',
    })
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      {isLoading && <p className="font-mono text-[10px] text-[#00ff41]/50 uppercase">loading_socials...</p>}
      {isError && <p className="font-mono text-[10px] text-red-500 uppercase">error: failed_to_fetch_socials</p>}

      {/* Form */}
      <div className="border border-[#00ff41]/20 rounded p-5 bg-[#00ff41]/2 flex flex-col gap-3">
        <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
          {editId ? 'edit social' : 'add social'}
        </p>

        {/* Platform */}
        <select
          value={form.platform}
          onChange={e => setForm(p => ({ ...p, platform: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-[#0a0a0a] border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
        >
          <option value="">Select platform</option>
          {PLATFORMS.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {/* Username */}
        <input
          type="text"
          placeholder="Username (e.g. @Hasrat270)"
          value={form.username}
          onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
        />

        {/* URL */}
        <input
          type="text"
          placeholder="Profile URL"
          value={form.url}
          onChange={e => setForm(p => ({ ...p, url: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
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
            {(addMutation.isSuccess || editMutation.isSuccess) && "> [SUCCESS]: social_record_updated"}
            {deleteMutation.isSuccess && "> [SUCCESS]: social_deleted"}
            {addMutation.isError && `> [ERROR]: save_failed: ${addMutation.error?.response?.data?.message || 'internal_error'}`}
            {editMutation.isError && `> [ERROR]: edit_failed: ${editMutation.error?.response?.data?.message || 'internal_error'}`}
            {deleteMutation.isError && `> [ERROR]: delete_failed: ${deleteMutation.error?.response?.data?.message || 'internal_error'}`}
            {validationError && `> [ERROR]: ${validationError}`}
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {socials.map(social => (
          <div
            key={social._id}
            className="flex items-center justify-between border border-[#00ff41]/20 rounded px-4 py-3 bg-[#00ff41]/2 hover:border-[#00ff41]/40 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-[#00ff41]">{social.platform}</span>
              <span className="font-mono text-[10px] text-[#00ff41]/40">{social.username}</span>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] text-[#00ff41]/30 hover:text-[#00ff41] transition-colors duration-200 truncate max-w-32"
              >
                {social.url}
              </a>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => handleEdit(social)}
                className="font-mono text-[10px] text-[#00ff41]/50 hover:text-[#00ff41] transition-colors duration-200"
              >
                edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(social._id)}
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