import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useQuery } from '@tanstack/react-query'
import api from '../api/apiClient.js'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs`;
export default function Resume() {
  const [pages, setPages]     = useState(null)
  const [current, setCurrent] = useState(1)

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get('/profile')
      return res.data
    },
  })

  const resumeUrl = profile?.resume

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      // Direct stream bypassing proxy avoids Cloudinary 404 Node-Blocks
      const response = await fetch(resumeUrl);
      const rawBlob = await response.blob();
      
      // Enforce PDF type to prevent generic UUID fallback
      const pdfBlob = new Blob([rawBlob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      
      const link = document.createElement('a');
      link.href = url;
      // Use property assignment instead of setAttribute for browser lock
      link.download = 'resume.pdf'; 
      
      document.body.appendChild(link);
      link.click();
      
      // We purposefully DO NOT revoke the ObjectURL immediately.
      // Chrome's download manager is asynchronous. If we revoke it too fast,
      // it loses the anchor tag context and falls back to the UUID of the blob!
      setTimeout(() => {
        document.body.removeChild(link);
        // Best practice: Now that the browser download has natively started,
        // we can safely clear the 600KB blob from RAM to prevent SPA memory leaks.
        window.URL.revokeObjectURL(url);
      }, 10000);
    } catch (error) {
      console.error("Native download failed:", error);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <div className="mb-8">
          <p className="font-mono text-[#00ff41]/40 text-xs tracking-widest mb-2">~/resume</p>
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-[#00ff41]">resume.pdf</h2>
          <div className="mt-2 w-16 h-px bg-[#00ff41]/40" />
        </div>

        {!resumeUrl ? (
          <p className="font-mono text-sm text-[#00ff41]/40">no resume uploaded yet</p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrent(p => Math.max(1, p - 1))}
                  disabled={current <= 1}
                  className="font-mono text-xs text-[#00ff41] border border-[#00ff41]/30 px-3 py-1.5 rounded hover:bg-[#00ff41]/10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  prev
                </button>
                <span className="font-mono text-xs text-[#00ff41]/50">
                  {current} / {pages || '?'}
                </span>
                <button
                  onClick={() => setCurrent(p => Math.min(pages, p + 1))}
                  disabled={current >= pages}
                  className="font-mono text-xs text-[#00ff41] border border-[#00ff41]/30 px-3 py-1.5 rounded hover:bg-[#00ff41]/10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  next
                </button>
              </div>
              <a
                href="#"
                onClick={handleDownload}
                className="font-mono text-xs text-[#0a0a0a] bg-[#00ff41] px-4 py-1.5 rounded hover:bg-[#00ff41]/80 transition-colors duration-200"
              >
                $ ./download.sh
              </a>
            </div>

            <div className="border border-[#00ff41]/20 rounded overflow-hidden bg-[#00ff41]/2 flex justify-center p-4">
              <Document
                file={resumeUrl}
                onLoadSuccess={({ numPages }) => setPages(numPages)}
                loading={<p className="font-mono text-xs text-[#00ff41]/40 py-20">loading resume...</p>}
                error={<p className="font-mono text-xs text-red-400/60 py-20">failed to load resume</p>}
              >
                <Page
                  pageNumber={current}
                  width={Math.min(window.innerWidth - 80, 800)}
                  renderTextLayer
                  renderAnnotationLayer
                />
              </Document>
            </div>
          </>
        )}
      </div>
    </section>
  )
}