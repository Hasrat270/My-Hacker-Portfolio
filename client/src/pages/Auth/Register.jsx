import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import api from '../../api/apiClient.js'

// Tumhare UI components
import Card from '../../components/common/Card.jsx'
import Button from '../../components/common/Button.jsx'
import Badge from '../../components/common/Badge.jsx'
import TerminalText from '../../components/common/TerminalText.jsx'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const registerMutation = useMutation({
    mutationFn: (data) => api.post('/auth/register', data),
    onSuccess: () => {
      navigate('/login')
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Registration failed')
    }
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required')
      return
    }

    registerMutation.mutate(form)
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden p-4">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 w-full max-w-md">

        {/* Header using TerminalText component */}
        <div className="mb-8 text-center">
          <TerminalText 
            path="~/auth/register" 
            command="sudo adduser" 
            subtext="creating new operator profile"
          />
        </div>

        {/* Main Content using Card component */}
        <Card className="p-6">
          <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest mb-4">
            ./setup-profile.sh
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name Field */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
                display name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Hasrat270"
                className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/[0.02] border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 focus:bg-[#00ff41]/5 transition-all duration-200 placeholder:text-[#00ff41]/20"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
                email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="operator@portfolio.sh"
                className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/[0.02] border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 focus:bg-[#00ff41]/5 transition-all duration-200 placeholder:text-[#00ff41]/20"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
                access key
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/[0.02] border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 focus:bg-[#00ff41]/5 transition-all duration-200 placeholder:text-[#00ff41]/20"
              />
            </div>

            {/* Error Display using Badge or custom text */}
            {(error || registerMutation.isError) && (
              <div className="mt-2">
                <Badge variant="error">
                  {'>'} ERR: {error || registerMutation.error.response?.data?.message}
                </Badge>
              </div>
            )}

            {/* Submit Button using your Button component */}
            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="mt-2"
            >
              {registerMutation.isPending ? 'initializing...' : '$ ./register.sh'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
             <button 
                onClick={() => navigate('/login')}
                className="font-mono text-[10px] text-[#00ff41]/40 hover:text-[#00ff41] transition-colors border-b border-transparent hover:border-[#00ff41]/40 pb-0.5"
             >
                {'[ already registered? login here ]'}
             </button>
          </div>
        </Card>
      </div>
    </section>
  )
}