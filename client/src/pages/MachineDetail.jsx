import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/axios.js";

const DIFFICULTY_COLORS = {
  Easy: "text-[#00ff41] border-[#00ff41]/40",
  Medium: "text-yellow-400 border-yellow-400/40",
  Hard: "text-orange-400 border-orange-400/40",
  Insane: "text-red-400 border-red-400/40",
};

export default function MachineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: machine, isLoading, isError, error } = useQuery({
    queryKey: ["machine", id],
    queryFn: async () => {
      const res = await api.get(`/machines/${id}`);
      return res.data;
    },
  });

  // Consistant Header Wrapper for all states
  const Header = ({ path, title, subtext, isErrorState = false }) => (
    <div className="mb-8 text-center sm:text-left">
      <p className="font-mono text-[#00ff41]/40 text-[10px] tracking-widest mb-2 uppercase">
        ┌─[Hasrat270@portfolio]─[{path}]
      </p>
      <h1 className={`font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight ${isErrorState ? 'text-red-500' : 'text-[#00ff41]'}`}>
        {title}
      </h1>
      <p className="font-mono text-[10px] text-[#00ff41]/30 mt-1 uppercase">
        {subtext}
      </p>
    </div>
  );

  if (isLoading) return (
    <section className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <Header path={`~/machines/${id}`} title="loading..." subtext="[ fetching machine data from mainframe ]" />
    </section>
  );

  if (isError || !machine) return (
    <section className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <Header 
        path={`~/machines/null`} 
        title="404: not found" 
        subtext="[ error: machine_entry_missing_or_corrupted ]" 
        isErrorState={true}
      />
      <button onClick={() => navigate(-1)} className="font-mono text-xs text-[#00ff41] border border-[#00ff41]/20 px-4 py-2 rounded hover:bg-[#00ff41]/10 mt-4 uppercase">
        $ ./return-to-base.sh
      </button>
    </section>
  );

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <button
          onClick={() => navigate(-1)}
          className="font-mono text-[10px] text-[#00ff41]/40 hover:text-[#00ff41] transition-colors mb-8 flex items-center gap-2 uppercase tracking-widest"
        >
          {`<-- cd ..`}
        </button>

        <Header 
          path={`~/machines/${machine.name?.toLowerCase()}`} 
          title={`cat ${machine.name}`} 
          subtext="[ viewing secure machine intelligence ]" 
        />

        {/* Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "os", value: machine.os || "—" },
            { label: "difficulty", value: machine.difficulty || "—" },
            { label: "points", value: machine.points || "—" },
            {
              label: "solved",
              value: machine.solvedAt
                ? new Date(machine.solvedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                : "—",
            },
          ].map((item) => (
            <div key={item.label} className="border border-[#00ff41]/20 rounded p-3 bg-[#00ff41]/2">
              <p className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest mb-1 uppercase">{item.label}</p>
              <p className={`font-mono text-sm font-bold ${item.label === "difficulty" ? DIFFICULTY_COLORS[item.value]?.split(" ")[0] : "text-[#00ff41]"}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tags */}
        {machine.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {machine.tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] text-[#00ff41]/50 bg-[#00ff41]/5 border border-[#00ff41]/20 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Details */}
        {machine.details && (
          <div className="border border-[#00ff41]/20 rounded bg-[#00ff41]/2 p-5 mb-8">
            <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest mb-3 uppercase">./details.txt</p>
            <p className="font-mono text-sm text-[#00ff41]/70 leading-relaxed whitespace-pre-wrap">
              {machine.details}
            </p>
          </div>
        )}

        {/* Writeup link */}
        {machine.writeupUrl && (
          <a
            href={machine.writeupUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block font-mono text-sm text-[#0a0a0a] bg-[#00ff41] px-6 py-3 rounded hover:bg-[#00ff41]/80 transition-colors uppercase"
          >
            $ ./read-writeup.sh
          </a>
        )}
      </div>
    </section>
  );
}