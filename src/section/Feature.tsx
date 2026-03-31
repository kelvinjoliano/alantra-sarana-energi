const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2L13.5 8H20L14.5 12L16.5 18.5L11 15L5.5 18.5L7.5 12L2 8H8.5L11 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Terakreditasi Resmi",
    desc: "Sertifikat kami diakui oleh lembaga nasional terpercaya di seluruh Indonesia.",
    accent: "#2dd4bf",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect
          x="3"
          y="3"
          width="16"
          height="16"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M7 11L10 14L15 8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Proses Mudah & Cepat",
    desc: "Pendaftaran online, ujian mudah, dan sertifikat terbit dalam 7 hari kerja.",
    accent: "#4ade80",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M11 7V11L14 13"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Jadwal Fleksibel",
    desc: "Atur jadwal Anda bersama tim kami — tersedia setiap hari kerja.",
    accent: "#2dd4bf",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M4 17L8 13L12 15L18 8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    title: "Tingkatkan Karir",
    desc: "Lebih dari 5.000 profesional telah meningkatkan jenjang karir mereka bersama kami.",
    accent: "#4ade80",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 3C7.5 3 4 6 4 10C4 13 6 15.5 8.5 16.5L8 19H14L13.5 16.5C16 15.5 18 13 18 10C18 6 14.5 3 11 3Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M8 19H14"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Dukungan Penuh",
    desc: "Tim konsultan kami siap membantu dari proses pendaftaran hingga ujian berlangsung.",
    accent: "#2dd4bf",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M3 6H19M3 11H19M3 16H13"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Skema Beragam",
    desc: "Tersedia 30+ skema sertifikasi di berbagai bidang industri dan profesi.",
    accent: "#4ade80",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#1a2332]">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #2dd4bf, #4ade80)",
            }}
          >
            Mengapa Alantra
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
            Sertifikasi yang Anda percaya,
            <br />
            karir yang berkembang
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Kami hadir untuk memastikan setiap profesional mendapatkan pengakuan
            kompetensi yang layak.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200 overflow-hidden"
            >
              {/* Glow on hover */}
              <div
                className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none -translate-x-8 -translate-y-8 blur-2xl"
                style={{ background: f.accent }}
              />

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200"
                style={{ background: `${f.accent}18`, color: f.accent }}
              >
                {f.icon}
              </div>

              <h3 className="font-semibold text-white mb-2 text-[15px]">
                {f.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${f.accent}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
