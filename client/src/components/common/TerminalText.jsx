export default function TerminalText({ prompt, command, children, className = '' }) {
  return (
    <div className={`font-mono text-[10px] text-[#00ff41]/30 leading-relaxed ${className}`}>
      {prompt && <p>{prompt}</p>}
      {command && (
        <p>└─$ <span className="text-[#00ff41]/60">{command}</span></p>
      )}
      {children && (
        <p className="text-[#00ff41]/50 mt-1">{children}</p>
      )}
    </div>
  )
}