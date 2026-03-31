import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "./constants.js";

export default function NavLinks() {
  return (
    <div className="hidden lg:flex items-center gap-1">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `font-mono text-xs tracking-wider px-3 py-1.5 rounded transition-all duration-200 border ${
              isActive
                ? "text-[#00ff41] bg-[#00ff41]/10 border-[#00ff41]/30"
                : "text-[#00ff41]/50 hover:text-[#00ff41] hover:bg-[#00ff41]/5 border-transparent hover:border-[#00ff41]/30"
            }`
          }
        >
          <span className="text-[#00ff41]/30">~/</span>
          {link.label.toLowerCase()}
        </NavLink>
      ))}
    </div>
  );
}
