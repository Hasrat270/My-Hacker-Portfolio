import { useState, useLayoutEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/axios.js";

export default function DashProfile() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    designation: "",
    bio: "",
    email: "",
    phone: "",
    whatsapp: "",
    htbMachines: "",
    cves: "",
    ctfWins: "", // ← add
    bugBounties: "",
    labsSolved: "",
    rank: "", // ← add
  });

  // Fetch existing profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/profile");
      return res.data;
    },
  });

  // Fill form when profile loads
  useLayoutEffect(() => {
    if (profile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name:        profile.name        || "",
        designation: profile.designation || "",
        bio:         profile.bio         || "",
        email:       profile.email       || "",
        phone:       profile.phone       || "",
        whatsapp:    profile.whatsapp    || "",
        htbMachines: profile.htbMachines || "",
        cves:        profile.cves        || "",
        ctfWins:     profile.ctfWins     || "",
        bugBounties: profile.bugBounties || "",
        labsSolved:  profile.labsSolved  || "",
        rank:        profile.rank        || "",
      });
    }
  }, [profile]);

  // Save profile
  const saveMutation = useMutation({
    mutationFn: (data) => api.put("/profile", data),
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  // Upload profile pic
  const picMutation = useMutation({
    mutationFn: (file) => {
      const fd = new FormData();
      fd.append("profilePic", file);
      return api.post("/profile/upload-pic", fd);
    },
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  // Upload resume
  const resumeMutation = useMutation({
    mutationFn: (file) => {
      const fd = new FormData();
      fd.append("resume", file);
      return api.post("/profile/upload-resume", fd);
    },
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    saveMutation.mutate(form);
  }

  if (isLoading)
    return <p className="font-mono text-[#00ff41]/40 text-sm">loading...</p>;

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      {/* Profile Pic */}
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded border border-[#00ff41]/30 overflow-hidden bg-[#00ff41]/5 flex items-center justify-center shrink-0">
          {profile?.profilePic ? (
            <img
              src={profile.profilePic}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-mono text-[#00ff41]/30 text-2xl">H</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest">
            profile pic
          </p>
          <label className="font-mono text-xs text-[#00ff41] border border-[#00ff41]/40 px-3 py-1.5 rounded hover:bg-[#00ff41]/10 transition-all duration-200 cursor-pointer">
            {picMutation.isPending ? "uploading..." : "$ ./upload-pic.sh"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files[0] && picMutation.mutate(e.target.files[0])
              }
            />
          </label>
          {picMutation.isSuccess && (
            <p className="font-mono text-[10px] text-[#00ff41]/50">
              ✓ uploaded
            </p>
          )}
        </div>
      </div>

      {/* Resume Upload */}
      <div className="border border-[#00ff41]/20 rounded p-4 bg-[#00ff41]/2 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] text-[#00ff41]/30 tracking-widest mb-1">
            resume.pdf
          </p>
          {profile?.resume ? (
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-[#00ff41]/60 hover:text-[#00ff41] transition-colors"
            >
              view current resume
            </a>
          ) : (
            <p className="font-mono text-xs text-[#00ff41]/30">
              no resume uploaded
            </p>
          )}
        </div>
        <label className="font-mono text-xs text-[#00ff41] border border-[#00ff41]/40 px-3 py-1.5 rounded hover:bg-[#00ff41]/10 transition-all duration-200 cursor-pointer shrink-0">
          {resumeMutation.isPending ? "uploading..." : "$ ./upload-resume.sh"}
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) =>
              e.target.files[0] && resumeMutation.mutate(e.target.files[0])
            }
          />
        </label>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        {[
          { key: "name", label: "name", placeholder: "Hasrat Khan" },
          {
            key: "designation",
            label: "designation",
            placeholder: "Penetration Tester",
          },
          { key: "email", label: "email", placeholder: "hasrat@example.com" },
          { key: "phone", label: "phone", placeholder: "+92 xxx xxxxxxx" },
          {
             key: "whatsapp",
            label: "whatsapp",
            placeholder: "+92 xxx xxxxxxx",
          },
          { key: "htbMachines", label: "htb machines", placeholder: "50+"        },
          { key: "cves",        label: "cves found",   placeholder: "3"          },
          { key: "ctfWins",     label: "ctf wins",     placeholder: "12"         },
          { key: "bugBounties", label: "bug bounties", placeholder: "8"          },
          { key: "labsSolved",  label: "labs solved",  placeholder: "100+"       },
          { key: "rank",        label: "htb rank",     placeholder: "Pro Hacker" },
        ].map((field) => (
          <div key={field.key} className="flex flex-col gap-1">
            <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
              {field.label}
            </label>
            <input
              type="text"
              name={field.key}
              value={form[field.key]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/2 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 focus:bg-[#00ff41]/5 transition-all duration-200 placeholder:text-[#00ff41]/20"
            />
          </div>
        ))}

        {/* Bio */}
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] text-[#00ff41]/40 tracking-widest">
            bio
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Security enthusiast..."
            rows={4}
            className="font-mono text-sm text-[#00ff41] bg-[#00ff41]/2 border border-[#00ff41]/20 rounded px-4 py-3 outline-none focus:border-[#00ff41]/60 focus:bg-[#00ff41]/5 transition-all duration-200 placeholder:text-[#00ff41]/20 resize-none"
          />
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saveMutation.isPending}
        className="font-mono text-sm text-[#0a0a0a] bg-[#00ff41] px-6 py-3 rounded hover:bg-[#00ff41]/80 transition-colors duration-200 disabled:opacity-50 self-start"
      >
        {saveMutation.isPending ? "saving..." : "$ ./save.sh"}
      </button>

      {saveMutation.isSuccess && (
        <p className="font-mono text-xs text-[#00ff41]/50">✓ profile saved</p>
      )}
      {saveMutation.isError && (
        <p className="font-mono text-xs text-red-400/70">✕ save failed</p>
      )}
    </div>
  );
}
