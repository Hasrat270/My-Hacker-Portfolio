import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth.js";
import DashProfile from "./DashProfile.jsx";
import DashSkills from "./DashSkills.jsx";
import DashMachines from "./DashMachines.jsx";
import DashWriteups from "./DashWriteups.jsx";
import DashCerts from "./DashCerts.jsx";
import DashSocials from "./DashSocials.jsx";
import DashContact from "./DashContact.jsx";
import DashLabs from "./DashLabs.jsx";

const TABS = [
  { key: "profile", label: "profile" },
  { key: "skills", label: "skills" },
  { key: "machines", label: "machines" },
  { key: "writeups", label: "writeups" },
  { key: "certs", label: "certs" },
  { key: "socials", label: "socials" },
  { key: "contact", label: "contact" },
  { key: "labs", label: "labs" }, // ← add karo
];

const COMPONENTS = {
  profile: <DashProfile />,
  skills: <DashSkills />,
  machines: <DashMachines />,
  labs: <DashLabs />, // ← add karo
  writeups: <DashWriteups />,
  certs: <DashCerts />,
  socials: <DashSocials />,
  contact: <DashContact />,
};

export default function Dashboard() {
  const [active, setActive] = useState("profile");
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full z-50 bg-[#0a0a0a] border-r border-[#00ff41]/20
        flex flex-col transition-all duration-300
        ${open ? "w-56" : "w-14"}
      `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-[#00ff41]/20">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff41]" />
          </span>
          {open && (
            <span className="font-mono text-[#00ff41] text-xs tracking-widest whitespace-nowrap">
              dashboard
            </span>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center justify-center h-10 border-b border-[#00ff41]/10 text-[#00ff41]/40 hover:text-[#00ff41] transition-colors duration-200"
        >
          <span className="font-mono text-xs">{open ? "«" : "»"}</span>
        </button>

        {/* Nav tabs */}
        <nav className="flex flex-col gap-1 p-2 flex-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-3 px-2 py-2 rounded transition-all duration-200 w-full text-left ${
                active === tab.key
                  ? "text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/30"
                  : "text-[#00ff41]/40 hover:text-[#00ff41] hover:bg-[#00ff41]/5 border border-transparent"
              }`}
            >
              <span className="font-mono text-xs shrink-0">~/</span>
              {open && (
                <span className="font-mono text-xs whitespace-nowrap">
                  {tab.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-2 border-t border-[#00ff41]/20 flex flex-col gap-2">
          {open && user && (
            <p className="font-mono text-[10px] text-[#00ff41]/30 px-2 truncate">
              {user.email}
            </p>
          )}
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-2 py-2 rounded text-red-400/50 hover:text-red-400 hover:bg-red-400/5 border border-transparent transition-all duration-200 w-full"
          >
            <span className="font-mono text-xs shrink-0">✕</span>
            {open && <span className="font-mono text-xs">logout</span>}
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-2 py-2 rounded text-[#00ff41]/40 hover:text-[#00ff41] hover:bg-[#00ff41]/5 border border-transparent transition-all duration-200 w-full"
          >
            <span className="font-mono text-xs shrink-0">←</span>
            {open && <span className="font-mono text-xs">portfolio</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ${open ? "ml-56" : "ml-14"}`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-8 border-b border-[#00ff41]/20 pb-4">
            <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
              ~/dashboard/{active}
            </p>
            <h1 className="font-mono text-xl font-bold text-[#00ff41] mt-1">
              {active}
            </h1>
          </div>

          {/* Active component */}
          {COMPONENTS[active]}
        </div>
      </main>
    </div>
  );
}
