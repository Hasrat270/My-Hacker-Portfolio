import { useQuery } from '@tanstack/react-query'
import api from '../../services/axios.js'

export default function Contact() {
  const { data: contactList = [] } = useQuery({
    queryKey: ['contact'],
    queryFn: async () => (await api.get('/contact')).data,
  })

  const { data: socials = [] } = useQuery({
    queryKey: ['socials'],
    queryFn: async () => (await api.get('/socials')).data,
  })

  const contact = contactList[0]

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="mb-12">
          <p className="font-mono text-[#00ff41]/40 text-xs tracking-widest mb-2">~/contact</p>
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-[#00ff41]">contact</h2>
          <div className="mt-2 w-16 h-px bg-[#00ff41]/40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="border border-[#00ff41]/20 rounded bg-[#00ff41]/[0.02] p-5">
              <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest mb-4">cat contact.txt</p>

              <div className="flex flex-col gap-4">
                {contact?.email && (
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">email</span>
                    <a href={`mailto:${contact.email}`} className="font-mono text-sm text-[#00ff41]/70 hover:text-[#00ff41] transition-colors duration-200">
                      {contact.email}
                    </a>
                  </div>
                )}
                {contact?.phone && (
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">phone</span>
                    <a href={`tel:${contact.phone}`} className="font-mono text-sm text-[#00ff41]/70 hover:text-[#00ff41] transition-colors duration-200">
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact?.whatsapp && (
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">whatsapp</span>
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/\s+/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-sm text-[#00ff41]/70 hover:text-[#00ff41] transition-colors duration-200"
                    >
                      {contact.whatsapp}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="font-mono text-[10px] text-[#00ff41]/25 leading-relaxed">
              <p>{'┌─[Hasrat270@portfolio]─[~/contact]'}</p>
              <p>{'└─$ echo "Let\'s work together"'}</p>
              <p className="text-[#00ff41]/40 mt-1">{'> Always open for new opportunities'}</p>
            </div>
          </div>

          {/* Right — Socials */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">ls ./socials</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socials.map(social => (
                <a
                  key={social._id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 border border-[#00ff41]/20 rounded p-3 bg-[#00ff41]/[0.02] hover:bg-[#00ff41]/5 hover:border-[#00ff41]/40 transition-all duration-200 group"
                >
                  <span className="font-mono text-[#00ff41]/30 text-xs group-hover:text-[#00ff41]/60 transition-colors duration-200">~/</span>
                  <div className="flex flex-col">
                    <span className="font-mono text-sm text-[#00ff41]/60 group-hover:text-[#00ff41] transition-colors duration-200">
                      {social.platform.toLowerCase()}
                    </span>
                    {social.username && (
                      <span className="font-mono text-[10px] text-[#00ff41]/30">{social.username}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}