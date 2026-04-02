const team = [
  {
    name: "Nama1",
    role: "Role",
    expertise: "expertise",
    initials: "AF",
    color: "#2dd4bf",
    bio: "Bio",
  },
  {
    name: "Nama2",
    role: "Role",
    expertise: "Expertise",
    initials: "AD",
    color: "#4ade80",
    bio: "Bio",
  },
  {
    name: "Nama3",
    role: "Role",
    expertise: "Expertise",
    initials: "BH",
    color: "#2dd4bf",
    bio: "bio",
  },
  {
    name: "Nama4",
    role: "Role",
    expertise: "Expertise",
    initials: "RM",
    color: "#4ade80",
    bio: "bio",
  },
  {
    name: "Nama5",
    role: "Role",
    expertise: "Expertise",
    initials: "DP",
    color: "#2dd4bf",
    bio: "Bio",
  },
  {
    name: "Nama6",
    role: "Role",
    expertise: "Expertise",
    initials: "YA",
    color: "#4ade80",
    bio: "Bio",
  },
];

export default function AboutTeam() {
  return (
    <section className="bg-[#1e2b3a] border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #2dd4bf, #4ade80)",
            }}
          >
            Tim Kami
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Dipimpin oleh para
            <br />
            profesional berpengalaman
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Tim kami terdiri dari praktisi industri, akademisi, dan asesor
            bersertifikat yang berdedikasi untuk kualitas sertifikasi terbaik.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((t) => (
            <div
              key={t.name}
              className="group p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Avatar placeholder */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-black flex-shrink-0"
                  style={{ background: `${t.color}18`, color: t.color }}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white text-sm leading-snug mb-0.5">
                    {t.name}
                  </h3>
                  <p className="text-xs text-teal-400 font-medium">{t.role}</p>
                </div>
              </div>

              {/* Expertise badge */}
              <div className="mb-3">
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full"
                  style={{ background: `${t.color}12`, color: t.color }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle
                      cx="5"
                      cy="5"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M3 5L4.5 6.5L7 3.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t.expertise}
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">{t.bio}</p>

              {/* Bottom accent */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] text-slate-600">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M1 5.5L4 8.5L10 2.5"
                    stroke="#2dd4bf"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Asesor Bersertifikat BNSP
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
      </div>
    </section>
  );
}
