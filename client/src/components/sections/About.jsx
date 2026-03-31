export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen bg-[#0a0a0a] flex items-center relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        {/* Section header */}
        <div className="mb-12">
          <p className="font-mono text-[#00ff41]/40 text-xs tracking-widest mb-2">
            ~/about
          </p>
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-[#00ff41]">
            whoami
          </h2>
          <div className="mt-2 w-16 h-px bg-[#00ff41]/40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Profile pic */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Glow behind pic */}
              <div className="absolute inset-0 bg-[#00ff41]/10 rounded blur-2xl scale-110" />

              {/* Picture frame */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded border border-[#00ff41]/30 overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Hasrat Khan"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback if no image */}
                <div className="hidden w-full h-full bg-[#00ff41]/5 items-center justify-center">
                  <span className="font-mono text-4xl text-[#00ff41]/40">
                    H
                  </span>
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0a0a0a] border border-[#00ff41]/30 px-3 py-1 rounded font-mono text-[10px] text-[#00ff41]/70 whitespace-nowrap">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff41] mr-1.5 animate-pulse" />
                available for work
              </div>
            </div>
          </div>

          {/* Right — Bio */}
          <div className="flex flex-col gap-6">
            {/* Terminal bio */}
            <div className="border border-[#00ff41]/20 rounded bg-[#00ff41]/2 p-5">
              <p className="font-mono text-[10px] text-[#00ff41]/30 mb-3 tracking-widest">
                cat about.txt
              </p>
              <p className="font-mono text-[#00ff41]/70 text-sm leading-relaxed">
                Security enthusiast and ethical hacker focused on web
                application penetration testing and bug bounty hunting. I break
                things to make them stronger — finding vulnerabilities before
                the bad guys do.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "HTB Machines", value: "50+" },
                { label: "CVEs Found", value: "3" },
                { label: "CTF Wins", value: "12" },
                { label: "Bug Bounties", value: "8" },
                { label: "Labs Solved", value: "100+" },
                { label: "Rank", value: "Pro Hacker" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-[#00ff41]/20 rounded p-3 bg-[#00ff41]/2 hover:bg-[#00ff41]/5 hover:border-[#00ff41]/40 transition-all duration-200"
                >
                  <p className="font-mono text-[#00ff41] text-lg font-bold">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[#00ff41]/40 text-[10px] tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "GitHub", href: "https://github.com/Hasrat270" },
                { label: "HTB", href: "https://app.hackthebox.com" },
                { label: "HackerOne", href: "https://hackerone.com" },
                { label: "LinkedIn", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-[#00ff41]/60 border border-[#00ff41]/20 px-3 py-1.5 rounded hover:text-[#00ff41] hover:border-[#00ff41]/50 hover:bg-[#00ff41]/5 transition-all duration-200"
                >
                  ~/{link.label.toLowerCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
