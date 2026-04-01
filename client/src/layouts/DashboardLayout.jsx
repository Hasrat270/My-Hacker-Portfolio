import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth.js";

const TABS = [
  { key: "profile", label: "profile", path: "/dashboard/profile" },
  { key: "skills", label: "skills", path: "/dashboard/skills" },
  { key: "machines", label: "machines", path: "/dashboard/machines" },
  { key: "writeups", label: "writeups", path: "/dashboard/writeups" },
  { key: "certs", label: "certs", path: "/dashboard/certs" },
  { key: "socials", label: "socials", path: "/dashboard/socials" },
  { key: "contact", label: "contact", path: "/dashboard/contact" },
  { key: "labs", label: "labs", path: "/dashboard/labs" },
];

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Active tab detection
  const activeTab = TABS.find((tab) => location.pathname.startsWith(tab.path))?.key || "profile";

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex w-full overflow-x-hidden">
      {/* Universal Drawer Overlay (Mobile Only) */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full z-50 bg-[#0a0a0a] border-r border-[#00ff41]/20
        flex flex-col transition-all duration-300
        ${open ? "w-56" : "w-14"}
      `}
      >
        <div className="flex items-center gap-3 px-4 h-14 border-b border-[#00ff41]/20">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff41]" />
          </span>
          {open && <span className="font-mono text-[#00ff41] text-xs tracking-widest uppercase">dashboard</span>}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center justify-center h-10 border-b border-[#00ff41]/10 text-[#00ff41]/40 hover:text-[#00ff41] transition-colors"
        >
          <span className="font-mono text-xs">{open ? "«" : "»"}</span>
        </button>

        <nav className="flex flex-col gap-1 p-2 flex-1 overflow-y-auto custom-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                navigate(tab.path);
                if (window.innerWidth < 768) setOpen(false);
              }}
              className={`flex items-center gap-3 px-2 py-2 rounded transition-all duration-200 w-full text-left ${
                activeTab === tab.key
                  ? "text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/30"
                  : "text-[#00ff41]/40 hover:text-[#00ff41] hover:bg-[#00ff41]/5 border border-transparent"
              }`}
            >
              <span className="font-mono text-xs">~/</span>
              {open && <span className="font-mono text-xs">{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-[#00ff41]/20 flex flex-col gap-2">
          {open && user && <p className="font-mono text-[10px] text-[#00ff41]/30 px-2 truncate">{user.email}</p>}
          <button onClick={() => logout()} className="flex items-center gap-3 px-2 py-2 rounded text-red-400/50 hover:text-red-400 hover:bg-red-400/5 transition-all w-full">
            <span className="font-mono text-xs">✕</span>
            {open && <span className="font-mono text-xs">logout</span>}
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-3 px-2 py-2 rounded text-[#00ff41]/40 hover:text-[#00ff41] hover:bg-[#00ff41]/5 transition-all w-full">
            <span className="font-mono text-xs">←</span>
            {open && <span className="font-mono text-xs">portfolio</span>}
          </button>
        </div>
      </aside>

      {/* Main content wrapper */}
      <main className={`flex-1 transition-all duration-300 ml-14 ${open ? "md:ml-56" : "md:ml-14"} w-full`}>
        <div className="p-3 sm:p-6 overflow-x-hidden w-full">
          <div className="mb-8 border-b border-[#00ff41]/20 pb-4">
            <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest uppercase">~/dashboard/{activeTab}</p>
            <h1 className="font-mono text-xl font-bold text-[#00ff41] mt-1 uppercase">{activeTab}</h1>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
