import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { NAV_LINKS } from "./constants.js";

export default function MobileDrawer({ open }) {
  const { isAuthenticated } = useSelector((s) => s.auth);

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" />}

      <div
        className={`
        fixed top-14 left-0 right-0 z-40 lg:hidden
        bg-[#0a0a0a] border-b border-[#00ff41]/20
        transition-all duration-300 ease-in-out
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
      `}
      >
        <div className="px-4 py-3 border-b border-[#00ff41]/10">
          <p className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
            {"┌─["}
            <span className="text-[#00ff41]/70">Hasrat270@portfolio</span>
            {"]─[~]"}
          </p>
          <p className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
            {"└─$ "}
            <span className="text-[#00ff41]/60">navigate --to</span>
          </p>
        </div>

        <div className="px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-mono text-sm px-3 py-2.5 rounded transition-all duration-200 border ${
                  isActive
                    ? "text-[#00ff41] bg-[#00ff41]/10 border-[#00ff41]/30"
                    : "text-[#00ff41]/50 hover:text-[#00ff41] hover:bg-[#00ff41]/5 border-transparent"
                }`
              }
            >
              <span className="text-[#00ff41]/30 mr-1">~/</span>
              {link.label.toLowerCase()}
            </NavLink>
          ))}

          <div className="mt-3 pt-3 border-t border-[#00ff41]/10 flex flex-col gap-2">
            <NavLink
              to="/resume"
              onClick={() => { /* Drawer auto-closes when navigation happens if parent handles it, but just strictly matching NavActions here is enough */ }}
              className="font-mono text-sm text-[#00ff41] border border-[#00ff41]/40 px-3 py-2.5 rounded hover:bg-[#00ff41]/10 hover:border-[#00ff41] transition-all duration-200 text-center"
            >
              $ ./resume.sh
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className="font-mono text-sm text-[#0a0a0a] bg-[#00ff41] px-3 py-2.5 rounded text-center hover:bg-[#00ff41]/80 transition-colors"
              >
                dashboard
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
