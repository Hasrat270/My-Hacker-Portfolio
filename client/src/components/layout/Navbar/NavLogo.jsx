import { NavLink } from "react-router-dom";

export default function NavLogo() {
  return (
    <NavLink to="/" className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff41]" />
      </span>
      <span className="font-mono text-[#00ff41] text-sm tracking-widest">
        Hasrat270<span className="animate-pulse">▋</span>
      </span>
    </NavLink>
  );
}
