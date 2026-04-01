import { NAV_LINKS } from "./Navbar/constants.js";

const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/Hasrat270" },
  { label: "HTB",       href: "https://app.hackthebox.com"   },
  { label: "HackerOne", href: "https://hackerone.com"        },
  { label: "BugCrowd",  href: "https://bugcrowd.com"         },
  { label: "LinkedIn",  href: "#"                            },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#00ff41]/10 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff41]" />
              </span>
              <span className="font-mono text-[#00ff41] text-sm tracking-widest font-bold">
                Hasrat270
              </span>
            </div>
            <p className="font-mono text-[10px] text-[#00ff41]/30 leading-relaxed">
              {"// Breaking things ethically."}<br />
              {"// Finding what others miss."}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest uppercase mb-1">
              Quick Links
            </p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <a
                  key={link.path}
                  href={link.path}
                  className="font-mono text-xs text-[#00ff41]/40 hover:text-[#00ff41] transition-colors duration-200"
                >
                  <span className="text-[#00ff41]/20">~/</span>
                  {link.label.toLowerCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest uppercase mb-1">
              Find Me
            </p>
            <div className="flex flex-col gap-2">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-[#00ff41]/40 hover:text-[#00ff41] transition-colors duration-200"
                >
                  <span className="text-[#00ff41]/20">→ </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#00ff41]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-[#00ff41]/25">
            © {year} Hasrat Khan — All rights reserved
          </p>
          <p className="font-mono text-[10px] text-[#00ff41]/25">
            {"// crafted with TEA + Kali Linux"}
          </p>
        </div>

      </div>
    </footer>
  );
}