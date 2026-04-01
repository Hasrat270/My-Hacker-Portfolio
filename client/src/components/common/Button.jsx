export default function Button({ children, onClick, variant = 'primary', disabled, className = '' }) {
  const base = 'font-mono text-xs px-4 py-2 rounded transition-all duration-200 disabled:opacity-50'
  const variants = {
    primary: 'text-[#0a0a0a] bg-[#00ff41] hover:bg-[#00ff41]/80',
    outline: 'text-[#00ff41] border border-[#00ff41]/40 hover:bg-[#00ff41]/10 hover:border-[#00ff41]',
    danger:  'text-red-400 border border-red-400/30 hover:bg-red-400/10',
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}