import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import NavLogo from "./NavLogo.jsx";
import NavLinks from "./NavLinks.jsx";
import NavActions from "./NavActions.jsx";
import Hamburger from "./Hamburger.jsx";
import MobileDrawer from "./MobileDrawer.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        className={`
        fixed top-0 left-0 right-0 z-50
        border-b border-[#00ff41]/20
        bg-[#0a0a0a]/95 backdrop-blur-sm
        transition-shadow duration-300
        ${scrolled ? "shadow-[0_0_30px_rgba(0,255,65,0.07)]" : ""}
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <NavLogo />
            <NavLinks />
            <div className="flex items-center gap-3">
              <NavActions />
              <Hamburger open={open} onClick={() => setOpen((o) => !o)} />
            </div>
          </div>
        </div>
      </nav>

      <MobileDrawer open={open} />

      <div className="h-14" />
    </>
  );
}
