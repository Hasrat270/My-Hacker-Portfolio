import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function NavActions() {
  const { isAuthenticated } = useSelector(s => s.auth)

  return (
    <div className="hidden lg:flex items-center gap-3">
      {isAuthenticated && (
        <NavLink
          to="/dashboard"
          className="font-mono text-xs text-[#0a0a0a] bg-[#00ff41] px-3 py-1.5 rounded hover:bg-[#00ff41]/80 transition-colors duration-200"
        >
          dashboard
        </NavLink>
      )}
      <NavLink
        to="/resume"
        className="font-mono text-xs text-[#00ff41] border border-[#00ff41]/40 px-3 py-1.5 rounded hover:bg-[#00ff41]/10 hover:border-[#00ff41] transition-all duration-200"
      >
        $ ./resume.sh
      </NavLink>
    </div>
  )
}