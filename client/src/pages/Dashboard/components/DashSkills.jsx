import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../../../api/apiClient.js'

export default function DashSkills() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState({ name: '', category: '', level: '' })
  const [editId, setEditId] = useState(null)
  const [validationError, setValidationError] = useState('')

  // Fetch
  const { data: skills = [], isLoading, isError } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => (await api.get('/skills')).data,
  })

  // Add
  const addMutation = useMutation({
    mutationFn: data => api.post('/skills', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['skills'])
      setForm({ name: '', category: '', level: '' })
      setTimeout(() => addMutation.reset(), 3000)
    },
  })

  // Edit
  const editMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/skills/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['skills'])
      setEditId(null)
      setForm({ name: '', category: '', level: '' })
      setTimeout(() => editMutation.reset(), 3000)
    },
  })

  // Delete
  const deleteMutation = useMutation({
    mutationFn: id => api.delete(`/skills/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['skills'])
      setTimeout(() => deleteMutation.reset(), 3000)
    },
  })

  function handleSubmit() {
    if (!form.name || !form.category || !form.level) {
      setValidationError("required_fields_missing: name, category, and level")
      return;
    }
    setValidationError("")
    if (editId) {
      editMutation.mutate({ id: editId, data: form })
    } else {
      addMutation.mutate(form)
    }
  }

  function handleEdit(skill) {
    setEditId(skill._id)
    setForm({ name: skill.name, category: skill.category, level: skill.level })
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      {isLoading && <p className="font-mono text-[10px] text-[#00ff41]/50 uppercase">loading_skills...</p>}
      {isError && <p className="font-mono text-[10px] text-red-500 uppercase">error: failed_to_fetch_skills</p>}

      {/* Form */}
      <div className="border border-[#00ff41]/20 rounded p-5 bg-[#00ff41]/2 flex flex-col gap-3">
        <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
          {editId ? 'edit skill' : 'add skill'}
        </p>

        {[
          { key: 'name',     placeholder: 'Burp Suite' },
          { key: 'category', placeholder: 'Web'        },
          { key: 'level',    placeholder: '85'         },
        ].map(f => (
          <input
            key={f.key}
            type="text"
            placeholder={f.placeholder}
            value={form[f.key]}
            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
            className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
          />
        ))}

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="font-mono text-xs text-[#0a0a0a] bg-[#00ff41] px-4 py-2 rounded hover:bg-[#00ff41]/80 transition-colors duration-200"
          >
            {editId ? '$ ./update.sh' : '$ ./add.sh'}
          </button>
          {editId && (
            <button
              onClick={() => { setEditId(null); setForm({ name: '', category: '', level: '' }); setValidationError("") }}
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
            {(addMutation.isSuccess || editMutation.isSuccess) && "> [SUCCESS]: skill_record_updated"}
            {deleteMutation.isSuccess && "> [SUCCESS]: skill_deleted"}
            {addMutation.isError && `> [ERROR]: save_failed: ${addMutation.error?.response?.data?.message || 'internal_error'}`}
            {editMutation.isError && `> [ERROR]: edit_failed: ${editMutation.error?.response?.data?.message || 'internal_error'}`}
            {deleteMutation.isError && `> [ERROR]: delete_failed: ${deleteMutation.error?.response?.data?.message || 'internal_error'}`}
            {validationError && `> [ERROR]: ${validationError}`}
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {skills.map(skill => (
          <div
            key={skill._id}
            className="flex items-center justify-between border border-[#00ff41]/20 rounded px-4 py-3 bg-[#00ff41]/2 hover:border-[#00ff41]/40 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-[#00ff41]">{skill.name}</span>
              <span className="font-mono text-[10px] text-[#00ff41]/40">{skill.category}</span>
              <span className="font-mono text-[10px] text-[#00ff41]/40">{skill.level}%</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(skill)}
                className="font-mono text-[10px] text-[#00ff41]/50 hover:text-[#00ff41] transition-colors duration-200"
              >
                edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(skill._id)}
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