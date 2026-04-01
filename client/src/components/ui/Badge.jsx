export default function Badge({ children, color = 'green' }) {
  const colors = {
    green:  { color: '#00ff41' },
    yellow: { color: '#ffaa00' },
    red:    { color: '#ff4444' },
    purple: { color: '#ff00ff' },
  }
  const c = colors[color]?.color ?? '#00ff41'
  return (
    <span
      className="font-mono text-[10px] px-2 py-0.5 rounded border"
      style={{ color: c, borderColor: `${c}44`, backgroundColor: `${c}11` }}
    >
      {children}
    </span>
  )
}