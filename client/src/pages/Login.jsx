import { useState } from 'react'
import useAuth from '../context/useAuth.js'

export default function Login() {
  const { login, loginLoading, loginError } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [validationError, setValidationError] = useState('')

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (validationError) setValidationError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidationError('')

    if (!form.email || !form.password) {
      setValidationError('required_fields_missing: credentials_null')
      return
    }

    if (!validateEmail(form.email)) {
      setValidationError('invalid_protocol: email_format_malformed')
      return
    }

    login(form)
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <p className="font-mono text-[#00ff41]/40 text-[10px] tracking-widest mb-2 uppercase">
            ┌─[Hasrat270@portfolio]─[~/auth]
          </p>
          <h1 className="font-mono text-2xl font-bold text-[#00ff41] uppercase tracking-tight">
            sudo login
          </h1>
          <p className="font-mono text-[10px] text-[#00ff41]/30 mt-1 uppercase">
            [ initiating authentication sequence ]
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="border border-[#00ff41]/20 rounded bg-[#00ff41]/2 p-6 flex flex-col gap-4">
          <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest uppercase">./authenticate.sh</p>

          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest uppercase">email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@portfolio.sh"
              className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 transition-all placeholder:text-[#00ff41]/20"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest uppercase">password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 transition-all placeholder:text-[#00ff41]/20"
            />
          </div>

          {(validationError || loginError) && (
            <p className="font-mono text-[11px] text-red-500/80 bg-red-500/5 border border-red-500/20 px-3 py-2 rounded">
              {'>'} [ERROR]: {validationError || loginError.response?.data?.message || 'access_denied'}
            </p>
          )}

          <button
            type="submit"
            disabled={loginLoading}
            className="font-mono text-sm text-[#0a0a0a] bg-[#00ff41] px-6 py-3 rounded hover:bg-[#00ff41]/80 transition-colors disabled:opacity-50 mt-2 uppercase"
          >
            {loginLoading ? 'authenticating...' : '$ ./login.sh'}
          </button>
        </form>
      </div>
    </section>
  )
}