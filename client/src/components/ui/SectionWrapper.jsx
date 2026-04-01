export default function SectionWrapper({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#00ff41]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}