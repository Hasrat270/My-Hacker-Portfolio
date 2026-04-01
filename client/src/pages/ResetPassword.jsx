import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import api from '../services/axios.js'

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const resetMutation = useMutation({
    mutationFn: (newPassword) => api.put(`/auth/reset-password/${token}`, { password: newPassword }), 
    onSuccess: () => {
      alert('Password updated successfully!')
      navigate('/login')
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Token expired or invalid') 
    }
  })

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters') 
      return
    }

    resetMutation.mutate(password)
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Terminal header */}
        <div className="mb-8 text-center">
          <p className="font-mono text-[#00ff41]/40 text-xs tracking-widest mb-2">
            {'┌─[Hasrat270@portfolio]─[~/auth/reset]'}
          </p>
          <h1 className="font-mono text-2xl font-bold text-[#00ff41]">
            sudo passwd
          </h1>
          <p className="font-mono text-[10px] text-[#00ff41]/30 mt-1">
            updating system credentials
          </p>
        </div>

        {/* Form */}
        <div className="border border-[#00ff41]/20 rounded bg-[#00ff41]/2 p-6 flex flex-col gap-4">
          <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
            ./reset-sequence.sh
          </p>

          {/* New Password */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
              new password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/2 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 focus:bg-[#00ff41]/5 transition-all duration-200 placeholder:text-[#00ff41]/20"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
              confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/2 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 focus:bg-[#00ff41]/5 transition-all duration-200 placeholder:text-[#00ff41]/20"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="font-mono text-xs text-red-400/70">
              {'>'} ERR: {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={resetMutation.isPending}
            className="font-mono text-sm text-[#0a0a0a] bg-[#00ff41] px-6 py-3 rounded hover:bg-[#00ff41]/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {resetMutation.isPending ? 'updating...' : '$ ./update-passwd.sh'}
          </button>
        </div>
      </div>
    </section>
  )
}