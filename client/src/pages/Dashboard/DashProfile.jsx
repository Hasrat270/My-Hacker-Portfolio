import { useState, useLayoutEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios.js";

export default function DashProfile() {
  const queryClient = useQueryClient();
  const [validationError, setValidationError] = useState("");

  const [form, setForm] = useState({
    name: "", designation: "", bio: "", email: "", phone: "",
    whatsapp: "", htbMachines: "", cves: "", ctfWins: "",
    bugBounties: "", labsSolved: "", rank: "",
  });

  // 1. Initial Profile Fetch
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/profile");
      return res.data;
    },
  });

  useLayoutEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        designation: profile.designation || "",
        bio: profile.bio || "",
        email: profile.email || "",
        phone: profile.phone || "",
        whatsapp: profile.whatsapp || "",
        htbMachines: profile.htbMachines || "",
        cves: profile.cves || "",
        ctfWins: profile.ctfWins || "",
        bugBounties: profile.bugBounties || "",
        labsSolved: profile.labsSolved || "",
        rank: profile.rank || "",
      });
    }
  }, [profile]);

  // 2. Mutations with Feedback Logic
  const saveMutation = useMutation({
    mutationFn: (data) => api.put("/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      setTimeout(() => saveMutation.reset(), 3000); // Reset success message after 3s
    },
  });

  const picMutation = useMutation({
    mutationFn: (file) => {
      const fd = new FormData();
      fd.append("profilePic", file);
      return api.post("/profile/upload-pic", fd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      setTimeout(() => picMutation.reset(), 3000);
    },
  });

  const resumeMutation = useMutation({
    mutationFn: (file) => {
      const fd = new FormData();
      fd.append("resume", file);
      return api.post("/profile/upload-resume", fd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      setTimeout(() => resumeMutation.reset(), 3000);
    },
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (validationError) setValidationError("");
  }

  function handleSave() {
    if (!form.name || !form.email) {
      setValidationError("required_fields_missing: identity_not_verified");
      return;
    }
    saveMutation.mutate(form);
  }

  // Consistent Header Component
  const Header = ({ path, title, subtext, isErrorState = false }) => (
    <div className="mb-8 text-left">
      <p className="font-mono text-[#00ff41]/40 text-[10px] tracking-widest mb-2 uppercase">
        ┌─[Hasrat270@portfolio]─[{path}]
      </p>
      <h1 className={`font-mono text-2xl font-bold uppercase tracking-tight ${isErrorState ? 'text-red-500' : 'text-[#00ff41]'}`}>
        {title}
      </h1>
      <p className="font-mono text-[10px] text-[#00ff41]/30 mt-1 uppercase">
        {subtext}
      </p>
    </div>
  );

  if (isLoading) return (
    <div className="flex flex-col gap-4 py-10">
      <Header path="~/dashboard/profile" title="loading_profile..." subtext="[ decrypting identity data ]" />
      <div className="h-1 w-full bg-[#00ff41]/5 overflow-hidden">
        <div className="h-full bg-[#00ff41]/40 animate-progress origin-left" style={{ width: '40%' }}></div>
      </div>
    </div>
  );

  if (isError) return (
    <Header path="~/dashboard/profile" title="access_denied" subtext="[ error: failed_to_fetch_profile_manifest ]" isErrorState={true} />
  );

  return (
    <div className="flex flex-col gap-8 max-w-2xl pb-20">
      <Header path="~/dashboard/profile" title="sudo config --user" subtext="[ modifying identity parameters ]" />

      {/* Profile Pic Section */}
      <div className="flex items-center gap-6 border border-[#00ff41]/10 p-4 rounded bg-[#00ff41]/2">
        <div className="w-20 h-20 rounded border border-[#00ff41]/30 overflow-hidden bg-[#00ff41]/5 flex items-center justify-center shrink-0">
          {profile?.profilePic ? (
            <img src={profile.profilePic} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <span className="font-mono text-[#00ff41]/30 text-2xl">H</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest uppercase">profile avatar</p>
          <label className="font-mono text-xs text-[#0a0a0a] bg-[#00ff41] px-4 py-2 rounded hover:bg-[#00ff41]/80 transition-all cursor-pointer uppercase text-center">
            {picMutation.isPending ? "uploading..." : "$ ./change_pic.sh"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && picMutation.mutate(e.target.files[0])} />
          </label>
          {picMutation.isSuccess && <p className="font-mono text-[10px] text-[#00ff41]">✓ patch_applied: avatar_updated</p>}
          {picMutation.isError && <p className="font-mono text-[10px] text-red-500">✕ error: upload_failed</p>}
        </div>
      </div>

      {/* Resume Section */}
      <div className="border border-[#00ff41]/20 rounded p-4 bg-[#00ff41]/2 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest mb-1 uppercase">resume_manifest</p>
          {profile?.resume ? (
            <a href={profile.resume} target="_blank" rel="noreferrer" className="font-mono text-xs text-[#00ff41]/60 hover:text-[#00ff41] underline underline-offset-4 decoration-[#00ff41]/20">
              {'>'} view_current_resume.pdf
            </a>
          ) : (
            <p className="font-mono text-xs text-[#00ff41]/30 italic">no_resume_found</p>
          )}
        </div>
        <label className="font-mono text-xs text-[#00ff41] border border-[#00ff41]/40 px-4 py-2 rounded hover:bg-[#00ff41]/10 transition-all cursor-pointer shrink-0 uppercase">
          {resumeMutation.isPending ? "uploading..." : "$ ./update_pdf.sh"}
          <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files[0] && resumeMutation.mutate(e.target.files[0])} />
        </label>
      </div>

      {/* Form Fields - Re-ordered and Complete */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { key: "name", label: "full_name", placeholder: "Hasrat Khan" },
          { key: "designation", label: "role", placeholder: "Penetration Tester" },
          { key: "email", label: "contact_email", placeholder: "hasrat@example.com" },
          { key: "phone", label: "contact_phone", placeholder: "+92 xxx xxxxxxx" },
          { key: "whatsapp", label: "whatsapp_id", placeholder: "+92 xxx xxxxxxx" },
          { key: "rank", label: "htb_rank", placeholder: "Pro Hacker" },
          { key: "htbMachines", label: "machines_pwned", placeholder: "50+" },
          { key: "labsSolved", label: "labs_completed", placeholder: "100+" },
          { key: "cves", label: "cves_registered", placeholder: "3" },
          { key: "ctfWins", label: "ctf_victories", placeholder: "12" },
          { key: "bugBounties", label: "bounties_collected", placeholder: "8" },
        ].map((field) => (
          <div key={field.key} className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest uppercase">{field.label}</label>
            <input
              type="text"
              name={field.key}
              value={form[field.key]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 transition-all placeholder:text-[#00ff41]/10"
            />
          </div>
        ))}

        {/* Bio - Span Full Width */}
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest uppercase">system_biography</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Security enthusiast and ethical hacker..."
            rows={4}
            className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 transition-all resize-none"
          />
        </div>
      </div>

      {/* Global Status/Error Box */}
      {(validationError || saveMutation.isError || saveMutation.isSuccess) && (
        <div className={`border p-3 rounded font-mono text-[11px] ${
          saveMutation.isSuccess ? 'bg-[#00ff41]/5 border-[#00ff41]/30 text-[#00ff41]' : 'bg-red-500/5 border-red-500/30 text-red-400'
        }`}>
          {saveMutation.isSuccess && "> [SUCCESS]: profile_manifest_updated. all_changes_synced."}
          {saveMutation.isError && `> [ERROR]: sync_failed: ${saveMutation.error?.response?.data?.message || 'internal_server_error'}`}
          {validationError && `> [ERROR]: ${validationError}`}
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saveMutation.isPending}
        className="font-mono text-sm text-[#0a0a0a] bg-[#00ff41] px-10 py-4 rounded hover:bg-[#00ff41]/80 transition-all disabled:opacity-50 self-start uppercase font-bold tracking-widest"
      >
        {saveMutation.isPending ? "transmitting_data..." : "$ ./save_changes.sh"}
      </button>
    </div>
  );
}