import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import api from '../../api/apiClient.js'
import Card from '../../components/common/Card.jsx'
import Button from '../../components/common/Button.jsx'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState('')

  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation({
    mutationFn: (emailData) => api.post('/auth/forgot-password', emailData),
  })

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidationError('')

    if (!email) {
      setValidationError('required_field_missing: email_is_null')
      return
    }

    if (!validateEmail(email)) {
      setValidationError('invalid_protocol: email_format_malformed')
      return
    }

    mutate({ email }) 
  }

  const handleEmailChange = (e) => {
    if (isError) reset() 
    if (validationError) setValidationError('')
    setEmail(e.target.value)
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <p className="font-mono text-[#00ff41]/40 text-[10px] tracking-widest mb-2 uppercase">
            ┌─[Hasrat270@portfolio]─[~/auth/forgot]
          </p>
          <h1 className="font-mono text-2xl font-bold text-[#00ff41] uppercase tracking-tight">
            sudo recover --user
          </h1>
          <p className="font-mono text-[10px] text-[#00ff41]/30 mt-1 uppercase">
            [ initiating recovery sequence ]
          </p>
        </div>

        <Card className="p-6">
          {isSuccess ? (
            <div className="flex flex-col gap-4 py-4">
              <p className="font-mono text-sm text-[#00ff41]">
                {'>'} [SUCCESS]: Recovery link dispatched to terminal.
              </p>
              <Button onClick={() => navigate('/login')} className="mt-4 uppercase">
                $ ./back-to-login.sh
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest uppercase">./request-reset-token.sh</p>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest uppercase">registered email</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="operator@portfolio.sh"
                  className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 transition-all placeholder:text-[#00ff41]/20"
                />
              </div>

              {(validationError || isError) && (
                <p className="font-mono text-[11px] text-red-500/80 bg-red-500/5 border border-red-500/20 px-3 py-2 rounded">
                  {'>'} [ERROR]: {validationError || error.response?.data?.message || 'system_access_denied'}
                </p>
              )}

              <Button type="submit" disabled={isPending} className="mt-2 uppercase">
                {isPending ? 'transmitting...' : '$ ./send-link.sh'}
              </Button>

              <div className="mt-4 text-center">
                <button type="button" onClick={() => navigate('/login')} className="font-mono text-[10px] text-[#00ff41]/40 hover:text-[#00ff41] transition-colors uppercase">
                  {'[ abort operation / back to login ]'}
                </button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}