import { useState } from 'react'
import useAuth from '../context/useAuth.js'

export default function Login() {
  const { login, loginLoading, loginError } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(form)
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 w-full max-w-md px-4">

        {/* Terminal header */}
        <div className="mb-8 text-center">
          <p className="font-mono text-[#00ff41]/40 text-xs tracking-widest mb-2">
            {'┌─[Hasrat270@portfolio]─[~/auth]'}
          </p>
          <h1 className="font-mono text-2xl font-bold text-[#00ff41]">
            sudo login
          </h1>
          <p className="font-mono text-[10px] text-[#00ff41]/30 mt-1">
            authorized personnel only
          </p>
        </div>

        {/* Form */}
        <div className="border border-[#00ff41]/20 rounded bg-[#00ff41]/2 p-6 flex flex-col gap-4">
          <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
            ./authenticate.sh
          </p>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
              email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@portfolio.sh"
              className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/2 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 focus:bg-[#00ff41]/5 transition-all duration-200 placeholder:text-[#00ff41]/20"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
              password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/2 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 focus:bg-[#00ff41]/5 transition-all duration-200 placeholder:text-[#00ff41]/20"
            />
          </div>

          {/* Error */}
          {loginError && (
            <p className="font-mono text-xs text-red-400/70">
              {'>'} {loginError.response?.data?.message || 'Login failed'}
            </p>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loginLoading}
            className="font-mono text-sm text-[#0a0a0a] bg-[#00ff41] px-6 py-3 rounded hover:bg-[#00ff41]/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loginLoading ? 'authenticating...' : '$ ./login.sh'}
          </button>
        </div>

      </div>
    </section>
  )
}