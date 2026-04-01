export default function Card({ children, className = '', hover = true }) {
  return (
    <div className={`
      border border-[#00ff41]/20 rounded bg-[#00ff41]/2 p-5
      ${hover ? 'hover:bg-[#00ff41]/5 hover:border-[#00ff41]/40 transition-all duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}