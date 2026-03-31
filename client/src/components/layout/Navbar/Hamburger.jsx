export default function Hamburger({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
      aria-label="Toggle menu"
    >
      <span
        className={`block w-5 h-px bg-[#00ff41] transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-1.75" : ""}`}
      />
      <span
        className={`block w-5 h-px bg-[#00ff41] transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
      />
      <span
        className={`block w-5 h-px bg-[#00ff41] transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-1.75" : ""}`}
      />
    </button>
  );
}
