import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../../../api/apiClient.js'

const DEFAULTS = {
  name: '', issuer: '', issueDate: '',
  expiryDate: '', credentialUrl: '', badgeUrl: ''
}

export default function DashCerts() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState(DEFAULTS)
  const [editId, setEditId] = useState(null)
  const [validationError, setValidationError] = useState('')

  const { data: certs = [], isLoading, isError } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => (await api.get('/certifications')).data,
  })

  const addMutation = useMutation({
    mutationFn: data => api.post('/certifications', data),
    onSuccess: () => { 
      queryClient.invalidateQueries(['certifications'])
      setForm(DEFAULTS)
      setTimeout(() => addMutation.reset(), 3000)
    },
  })

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/certifications/${id}`, data),
    onSuccess: () => { 
      queryClient.invalidateQueries(['certifications'])
      setEditId(null)
      setForm(DEFAULTS)
      setTimeout(() => editMutation.reset(), 3000)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: id => api.delete(`/certifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['certifications'])
      setTimeout(() => deleteMutation.reset(), 3000)
    },
  })

  function handleSubmit() {
    if (!form.name || !form.issuer) {
      setValidationError("required_fields_missing: name and issuer")
      return;
    }
    setValidationError("")
    if (editId) {
      editMutation.mutate({ id: editId, data: form })
    } else {
      addMutation.mutate(form)
    }
  }

  function handleEdit(cert) {
    setEditId(cert._id)
    setForm({
      name:          cert.name          || '',
      issuer:        cert.issuer        || '',
      issueDate:     cert.issueDate     ? cert.issueDate.slice(0, 10)  : '',
      expiryDate:    cert.expiryDate    ? cert.expiryDate.slice(0, 10) : '',
      credentialUrl: cert.credentialUrl || '',
      badgeUrl:      cert.badgeUrl      || '',
    })
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      {isLoading && <p className="font-mono text-[10px] text-[#00ff41]/50 uppercase">loading_certifications...</p>}
      {isError && <p className="font-mono text-[10px] text-red-500 uppercase">error: failed_to_fetch_certs</p>}

      {/* Form */}
      <div className="border border-[#00ff41]/20 rounded p-5 bg-[#00ff41]/2 flex flex-col gap-3">
        <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
          {editId ? 'edit certification' : 'add certification'}
        </p>

        {/* Name + Issuer */}
        <input
          type="text"
          placeholder="Certification name"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
        />
        <input
          type="text"
          placeholder="Issuer (e.g. Offensive Security)"
          value={form.issuer}
          onChange={e => setForm(p => ({ ...p, issuer: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
        />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">issue date</label>
            <input
              type="date"
              value={form.issueDate}
              onChange={e => setForm(p => ({ ...p, issueDate: e.target.value }))}
              className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">expiry date</label>
            <input
              type="date"
              value={form.expiryDate}
              onChange={e => setForm(p => ({ ...p, expiryDate: e.target.value }))}
              className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200"
            />
          </div>
        </div>

        {/* URLs */}
        <input
          type="text"
          placeholder="Credential URL"
          value={form.credentialUrl}
          onChange={e => setForm(p => ({ ...p, credentialUrl: e.target.value }))}
          className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
        />
        <input
          type="text"
          placeholder="Badge Image URL"
          value={form.badgeUrl}
          onChange={e => setForm(p => ({ ...p, badgeUrl: e.target.value }))}
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
            {(addMutation.isSuccess || editMutation.isSuccess) && "> [SUCCESS]: cert_record_updated"}
            {deleteMutation.isSuccess && "> [SUCCESS]: cert_deleted"}
            {addMutation.isError && `> [ERROR]: save_failed: ${addMutation.error?.response?.data?.message || 'internal_error'}`}
            {editMutation.isError && `> [ERROR]: edit_failed: ${editMutation.error?.response?.data?.message || 'internal_error'}`}
            {deleteMutation.isError && `> [ERROR]: delete_failed: ${deleteMutation.error?.response?.data?.message || 'internal_error'}`}
            {validationError && `> [ERROR]: ${validationError}`}
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {certs.map(cert => (
          <div
            key={cert._id}
            className="flex items-center justify-between border border-[#00ff41]/20 rounded px-4 py-3 bg-[#00ff41]/2 hover:border-[#00ff41]/40 transition-all duration-200"
          >
            <div className="flex items-center gap-4 min-w-0">
              {cert.badgeUrl && (
                <img
                  src={cert.badgeUrl}
                  alt={cert.name}
                  className="w-8 h-8 object-contain shrink-0"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              )}
              <div className="min-w-0">
                <p className="font-mono text-sm text-[#00ff41] truncate">{cert.name}</p>
                <p className="font-mono text-[10px] text-[#00ff41]/40">{cert.issuer}</p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => handleEdit(cert)}
                className="font-mono text-[10px] text-[#00ff41]/50 hover:text-[#00ff41] transition-colors duration-200"
              >
                edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(cert._id)}
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