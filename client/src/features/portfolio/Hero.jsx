import useTypewriter from "../../hooks/useTypewriter.js";

const roles = [
  "Penetration Tester",
  "Bug Hunter",
  "CTF Player",
  "Web Hacker",
  "HTB Player",
];

export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#00ff41]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <p className="font-mono text-[#00ff41]/50 text-sm mb-4 tracking-widest">
          ┌─[<span className="text-[#00ff41]/80">Hasrat270@portfolio</span>]─[~]
        </p>
        <h1 className="font-mono text-4xl sm:text-6xl lg:text-7xl font-bold text-[#00ff41] mb-4 tracking-tight">
          Hasrat Khan
        </h1>
        <div className="font-mono text-lg sm:text-2xl text-[#00ff41]/70 mb-8 h-8">
          <span className="text-[#00ff41]/40">$ </span>
          {role}
          <span className="animate-pulse text-[#00ff41]">▋</span>
        </div>
        <p className="font-mono text-[#00ff41]/40 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          {"// Breaking things ethically. Finding what others miss."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#machines" className="font-mono text-sm text-[#0a0a0a] bg-[#00ff41] px-6 py-3 rounded hover:bg-[#00ff41]/80 transition-colors duration-200 w-full sm:w-auto">
            $ ./view-work.sh
          </a>
          <a href="#contact" className="font-mono text-sm text-[#00ff41] border border-[#00ff41]/40 px-6 py-3 rounded hover:bg-[#00ff41]/10 hover:border-[#00ff41] transition-all duration-200 w-full sm:w-auto">
            $ ./contact-me.sh
          </a>
        </div>
        <div className="mt-16 flex flex-col items-center gap-1">
          <span className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">scroll</span>
          <div className="w-px h-8 bg-linear-to-b from-[#00ff41]/30 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}