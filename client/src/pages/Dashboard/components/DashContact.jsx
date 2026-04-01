import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useLayoutEffect } from 'react'
import api from '../../../api/apiClient.js'

const DEFAULTS = { email: '', phone: '', whatsapp: '' }

export default function DashContact() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState(DEFAULTS)
  const [validationError, setValidationError] = useState('')

  const { data: contact, isLoading, isError } = useQuery({
    queryKey: ['contact'],
    queryFn: async () => (await api.get('/contact')).data[0],
  })

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useLayoutEffect(() => {
    if (contact) {
      setForm({
        email:    contact.email    || '',
        phone:    contact.phone    || '',
        whatsapp: contact.whatsapp || '',
      })
    }
  }, [contact])

  const saveMutation = useMutation({
    mutationFn: data => contact?._id
      ? api.put(`/contact/${contact._id}`, data)
      : api.post('/contact', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['contact'])
      setTimeout(() => saveMutation.reset(), 3000)
    },
  })

  function handleSave() {
    if (!form.email && !form.phone && !form.whatsapp) {
      setValidationError("required_fields_missing: at least one contact method")
      return;
    }
    setValidationError("")
    saveMutation.mutate(form)
  }

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  if (isLoading) return <p className="font-mono text-[10px] text-[#00ff41]/50 uppercase">loading_contact_info...</p>
  if (isError) return <p className="font-mono text-[10px] text-red-500 uppercase">error: failed_to_fetch_contact</p>

  return (
    <div className="flex flex-col gap-8 max-w-2xl">

      <div className="border border-[#00ff41]/20 rounded p-5 bg-[#00ff41]/2 flex flex-col gap-3">
        <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
          contact info
        </p>

        {[
          { key: 'email',    label: 'email',    placeholder: 'hasrat@example.com' },
          { key: 'phone',    label: 'phone',    placeholder: '+92 xxx xxxxxxx'    },
          { key: 'whatsapp', label: 'whatsapp', placeholder: '+92 xxx xxxxxxx'    },
        ].map(field => (
          <div key={field.key} className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
              {field.label}
            </label>
            <input
              type="text"
              name={field.key}
              value={form[field.key]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="font-mono text-sm text-[#00ff41] bg-transparent border border-[#00ff41]/20 rounded px-4 py-2.5 outline-none focus:border-[#00ff41]/60 transition-all duration-200 placeholder:text-[#00ff41]/20"
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={saveMutation.isPending}
          className="font-mono text-xs text-[#0a0a0a] bg-[#00ff41] px-4 py-2 rounded hover:bg-[#00ff41]/80 transition-colors duration-200 disabled:opacity-50 self-start mt-2"
        >
          {saveMutation.isPending ? 'saving...' : '$ ./save.sh'}
        </button>

        {/* Global Status/Error Box */}
        {(validationError || saveMutation.isError || saveMutation.isSuccess) && (
          <div className={`mt-2 border p-3 rounded font-mono text-[11px] ${
            saveMutation.isSuccess ? 'bg-[#00ff41]/5 border-[#00ff41]/30 text-[#00ff41]' : 'bg-red-500/5 border-red-500/30 text-red-400'
          }`}>
            {saveMutation.isSuccess && "> [SUCCESS]: contact_info_updated"}
            {saveMutation.isError && `> [ERROR]: save_failed: ${saveMutation.error?.response?.data?.message || 'internal_error'}`}
            {validationError && `> [ERROR]: ${validationError}`}
          </div>
        )}
      </div>

    </div>
  )
}