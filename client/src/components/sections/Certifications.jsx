import { useQuery } from "@tanstack/react-query";
import api from "../../services/axios.js";

const fetchCerts = () => api.get("/certifications").then(r => r.data);

function CertCard({ cert }) {
  return (
    <div className="border border-[#00ff41]/20 rounded bg-[#00ff41]/2 hover:bg-[#00ff41]/5 hover:border-[#00ff41]/40 transition-all duration-200 p-5 flex flex-col gap-4 group">

      {/* Badge + Name */}
      <div className="flex items-center gap-4">
        {cert.badgeUrl ? (
          <img
            src={cert.badgeUrl}
            alt={cert.name}
            className="w-14 h-14 object-contain rounded shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded border border-[#00ff41]/20 flex items-center justify-center shrink-0 bg-[#00ff41]/5">
            <span className="font-mono text-lg text-[#00ff41]/40">
              {cert.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="font-mono text-sm text-[#00ff41] font-bold leading-tight">
            {cert.name}
          </h3>
          {cert.issuer && (
            <p className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
              {cert.issuer}
            </p>
          )}
        </div>
      </div>

      {/* Dates */}
      <div className="flex flex-wrap gap-4">
        {cert.issueDate && (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">ISSUED</span>
            <span className="font-mono text-xs text-[#00ff41]/60">
              {new Date(cert.issueDate).toLocaleDateString("en-GB")}
            </span>
          </div>
        )}
        {cert.expiryDate && (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">EXPIRES</span>
            <span className="font-mono text-xs text-[#00ff41]/60">
              {new Date(cert.expiryDate).toLocaleDateString("en-GB")}
            </span>
          </div>
        )}
      </div>

      {/* Credential link */}
      {cert.credentialUrl && (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] text-[#00ff41]/40 hover:text-[#00ff41] transition-colors duration-200 mt-auto"
        >
          ~/verify-credential →
        </a>
      )}
    </div>
  );
}

export default function Certifications() {
  const { data: certs = [], isLoading, isError } = useQuery({
    queryKey: ["certifications"],
    queryFn: fetchCerts,
  });

  return (
    <section id="certs" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-size-[50px_50px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-[#00ff41]/40 tracking-widest mb-2">
            ls ~/certifications
          </p>
          <h2 className="font-mono text-2xl text-[#00ff41] font-bold">~/certifications</h2>
          <div className="mt-2 h-px w-24 bg-[#00ff41]/30" />
        </div>

        {isLoading && (
          <p className="font-mono text-sm text-[#00ff41]/40 animate-pulse">
            loading certifications...
          </p>
        )}
        {isError && (
          <p className="font-mono text-sm text-red-500/70">
            error: failed to fetch certifications
          </p>
        )}

        {!isLoading && !isError && certs.length === 0 && (
          <p className="font-mono text-sm text-[#00ff41]/30">
            // no certifications found
          </p>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map(cert => (
              <CertCard key={cert._id} cert={cert} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}