import { useNavigate } from 'react-router-dom'

export default function NotFound({ code = '404', message = 'Page not found' }) {
  const navigate = useNavigate()

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 text-center px-4">
        <p className="font-mono text-[#00ff41]/30 text-xs tracking-widest mb-4">
          {'┌─[Hasrat270@portfolio]─[~]'}
        </p>

        <h1 className="font-mono text-8xl sm:text-9xl font-bold text-[#00ff41] mb-4 opacity-20">
          {code}
        </h1>

        <div className="font-mono text-[#00ff41] text-xl sm:text-2xl mb-2">
          error: {message}
        </div>

        <p className="font-mono text-[#00ff41]/40 text-sm mb-8">
          {'// the page you are looking for does not exist'}
        </p>

        <div className="font-mono text-[10px] text-[#00ff41]/25 mb-8 leading-relaxed">
          <p>{'└─$ cd ~'}</p>
          <p className="text-[#00ff41]/40 animate-pulse">{'> redirecting...'}</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="font-mono text-sm text-[#0a0a0a] bg-[#00ff41] px-6 py-3 rounded hover:bg-[#00ff41]/80 transition-colors duration-200"
        >
          $ ./go-home.sh
        </button>
      </div>
    </section>
  )
}