import { useQuery } from "@tanstack/react-query";
import api from "../../api/apiClient.js";

const fetchSkills = () => api.get("/skills").then(r => r.data);

const levelLabel = (level) => {
  if (level >= 80) return { text: "Expert",       color: "#00ff41" };
  if (level >= 50) return { text: "Intermediate", color: "#ffaa00" };
  return             { text: "Beginner",      color: "#ff4444" };
};

function Hexagon({ skill }) {
  const { text, color } = levelLabel(skill.level);
  const initials = skill.name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div
        className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{
          width: "90px",
          height: "104px",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          backgroundColor: color,
          filter: `drop-shadow(0 0 8px ${color}66)`,
        }}
      >
        <div
          className="absolute flex items-center justify-center"
          style={{
            width: "84px",
            height: "97px",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            backgroundColor: "#0a0a0a",
          }}
        >
          {skill.icon ? (
            <img src={skill.icon} alt={skill.name} className="w-9 h-9 object-contain" />
          ) : (
            <span className="font-mono font-bold text-sm" style={{ color }}>{initials}</span>
          )}
        </div>
      </div>
      <div className="text-center">
        <p className="font-mono text-xs text-[#00ff41]/80 leading-tight">{skill.name}</p>
        <p className="font-mono text-[10px] mt-0.5" style={{ color }}>{text}</p>
      </div>
    </div>
  );
}

export default function Skills() {
  const { data: skills = [], isLoading, isError } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  const grouped = skills.reduce((acc, skill) => {
    acc[skill.category] ??= [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="font-mono text-xs text-[#00ff41]/40 tracking-widest mb-2">cat skills.json</p>
          <h2 className="font-mono text-2xl text-[#00ff41] font-bold">~/skills</h2>
          <div className="mt-2 h-px w-24 bg-[#00ff41]/30" />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { text: "Beginner",      color: "#ff4444" },
            { text: "Intermediate",  color: "#ffaa00" },
            { text: "Expert",        color: "#00ff41" },
          ].map(({ text, color }) => (
            <div key={text} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-mono text-[10px] text-[#00ff41]/40">{text}</span>
            </div>
          ))}
        </div>

        {isLoading && (
          <p className="font-mono text-sm text-[#00ff41]/40 animate-pulse">loading skills...</p>
        )}
        {isError && (
          <p className="font-mono text-sm text-red-500/70">error: failed to fetch skills</p>
        )}

        {!isLoading && !isError && Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[#00ff41]/30">[</span>
              <h3 className="font-mono text-sm text-[#00ff41]/60 tracking-widest uppercase">{category}</h3>
              <span className="font-mono text-xs text-[#00ff41]/30">]</span>
              <div className="flex-1 h-px bg-[#00ff41]/10" />
            </div>
            <div className="flex flex-wrap gap-6">
              {items.map(skill => (
                <Hexagon key={skill._id} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}