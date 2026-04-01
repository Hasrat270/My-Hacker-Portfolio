import { useQuery } from "@tanstack/react-query";
import api from "../../api/apiClient.js";

const fetchLabs = () => api.get("/labs").then(r => r.data);

const difficultyColor = {
  Apprentice:   "#00ff41",
  Practitioner: "#ffaa00",
  Expert:       "#ff4444",
};

const platformColor = {
  PortSwigger: "#ff6633",
  HackTheBox:  "#9fef00",
  TryHackMe:   "#ff0000",
};

function LabCard({ lab }) {
  const dColor = difficultyColor[lab.difficulty] ?? "#00ff41";
  const pColor = platformColor[lab.platform] ?? "#00ff41";

  return (
    <div className="border border-[#00ff41]/20 rounded bg-[#00ff41]/2 hover:bg-[#00ff41]/5 hover:border-[#00ff41]/40 transition-all duration-200 p-5 flex flex-col gap-3 group">

      {/* Top */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-mono text-sm text-[#00ff41] font-bold leading-tight">
          {lab.name}
        </h3>
        <span
          className="font-mono text-[10px] px-2 py-0.5 rounded border shrink-0"
          style={{ color: dColor, borderColor: `${dColor}44`, backgroundColor: `${dColor}11` }}
        >
          {lab.difficulty}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3">
        {lab.platform && (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">PLATFORM</span>
            <span className="font-mono text-xs" style={{ color: pColor }}>
              {lab.platform}
            </span>
          </div>
        )}
        {lab.category && (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">CAT</span>
            <span className="font-mono text-xs text-[#00ff41]/60">{lab.category}</span>
          </div>
        )}
        {lab.solvedAt && (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">SOLVED</span>
            <span className="font-mono text-xs text-[#00ff41]/60">
              {new Date(lab.solvedAt).toLocaleDateString("en-GB")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Labs() {
  const { data: labs = [], isLoading, isError } = useQuery({
    queryKey: ["labs"],
    queryFn: fetchLabs,
  });

  const grouped = labs.reduce((acc, lab) => {
    const key = lab.platform ?? "Other";
    acc[key] ??= [];
    acc[key].push(lab);
    return acc;
  }, {});

  return (
    <section id="labs" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-[#00ff41]/40 tracking-widest mb-2">
            ls ~/labs
          </p>
          <h2 className="font-mono text-2xl text-[#00ff41] font-bold">~/labs</h2>
          <div className="mt-2 h-px w-24 bg-[#00ff41]/30" />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.entries(difficultyColor).map(([diff, color]) => (
            <div key={diff} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-mono text-[10px] text-[#00ff41]/40">{diff}</span>
            </div>
          ))}
        </div>

        {isLoading && (
          <p className="font-mono text-sm text-[#00ff41]/40 animate-pulse">loading labs...</p>
        )}
        {isError && (
          <p className="font-mono text-sm text-red-500/70">error: failed to fetch labs</p>
        )}

        {!isLoading && !isError && labs.length === 0 && (
          <p className="font-mono text-sm text-[#00ff41]/30">// no labs found</p>
        )}

        {!isLoading && !isError && Object.entries(grouped).map(([platform, items]) => (
          <div key={platform} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[#00ff41]/30">[</span>
              <h3
                className="font-mono text-sm tracking-widest uppercase"
                style={{ color: platformColor[platform] ?? "#00ff41" }}
              >
                {platform}
              </h3>
              <span className="font-mono text-xs text-[#00ff41]/30">]</span>
              <div className="flex-1 h-px bg-[#00ff41]/10" />
              <span className="font-mono text-[10px] text-[#00ff41]/30">
                {items.length} solved
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map(lab => (
                <LabCard key={lab._id} lab={lab} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}