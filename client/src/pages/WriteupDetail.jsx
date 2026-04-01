import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import DOMPurify from 'dompurify'
import api from '../api/apiClient.js'
import SEO from '../components/layout/SEO.jsx'

const DIFFICULTY_COLORS = {
  Easy:   'text-[#00ff41] border-[#00ff41]/40',
  Medium: 'text-yellow-400 border-yellow-400/40',
  Hard:   'text-orange-400 border-orange-400/40',
  Insane: 'text-red-400 border-red-400/40',
}

export default function WriteupDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()

  const { data: writeup, isLoading, isError } = useQuery({
    queryKey: ['writeup', id],
    queryFn: async () => (await api.get(`/writeups/${id}`)).data,
  })

  if (isLoading) return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="font-mono text-[#00ff41]/40 text-sm animate-pulse">loading writeup...</p>
    </section>
  )

  if (isError || !writeup) return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="font-mono text-red-400/60 text-sm">writeup not found</p>
    </section>
  )

  return (
    <>
      <SEO 
        title={`${writeup.title} - Writeup | Hasrat Khan`}
        description={`Penetration testing writeup for ${writeup.title} on ${writeup.platform}.`}
        type="article"
      />
      <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="font-mono text-xs text-[#00ff41]/40 hover:text-[#00ff41] transition-colors duration-200 mb-8 flex items-center gap-2"
        >
          ← back
        </button>

        {/* Cover Image */}
        {writeup.coverImage && (
          <img
            src={writeup.coverImage}
            alt={writeup.title}
            className="w-full h-48 object-cover rounded border border-[#00ff41]/20 mb-8 opacity-80"
          />
        )}

        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[#00ff41]/40 text-xs tracking-widest mb-2">
            ~/writeups/{writeup.platform?.toLowerCase()}
          </p>
          <h1 className="font-mono text-2xl sm:text-3xl font-bold text-[#00ff41] mb-4">
            {writeup.title}
          </h1>
          <div className="mt-2 w-16 h-px bg-[#00ff41]/40 mb-4" />

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] text-[#00ff41]/50 tracking-widest">
              {writeup.platform}
            </span>
            <span className={`font-mono text-[10px] border px-2 py-0.5 rounded ${DIFFICULTY_COLORS[writeup.difficulty] || 'text-[#00ff41]/50 border-[#00ff41]/20'}`}>
              {writeup.difficulty}
            </span>
            {writeup.publishedAt && (
              <span className="font-mono text-[10px] text-[#00ff41]/30">
                {new Date(writeup.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric'
                })}
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {writeup.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {writeup.tags.map(tag => (
              <span
                key={tag}
                className="font-mono text-[10px] text-[#00ff41]/50 bg-[#00ff41]/5 border border-[#00ff41]/20 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* External URL */}
        {writeup.url && (
          <a
            href={writeup.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block font-mono text-xs text-[#00ff41] border border-[#00ff41]/40 px-4 py-2 rounded hover:bg-[#00ff41]/10 transition-all duration-200 mb-8"
          >
            $ ./view-original.sh →
          </a>
        )}

        {/* Markdown Content */}
        {writeup.content && (
          <div className="border border-[#00ff41]/20 rounded bg-[#00ff41]/2 p-6">
            <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest mb-6">
              cat writeup.md
            </p>
            <div className="prose prose-invert max-w-none
              prose-headings:font-mono prose-headings:text-[#00ff41]
              prose-p:font-mono prose-p:text-[#00ff41]/70 prose-p:leading-relaxed
              prose-code:font-mono prose-code:text-[#00ff41] prose-code:bg-[#00ff41]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-[#00ff41]/5 prose-pre:border prose-pre:border-[#00ff41]/20 prose-pre:rounded
              prose-strong:text-[#00ff41]
              prose-a:text-[#00ff41]/70 prose-a:hover:text-[#00ff41]
              prose-li:font-mono prose-li:text-[#00ff41]/70
              prose-blockquote:border-l-[#00ff41]/40 prose-blockquote:text-[#00ff41]/50
            ">
              <ReactMarkdown>{DOMPurify.sanitize(writeup.content)}</ReactMarkdown>
            </div>
          </div>
        )}

      </div>
    </section>
    </>
  )
}