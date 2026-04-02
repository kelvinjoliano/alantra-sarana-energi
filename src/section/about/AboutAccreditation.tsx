const accreditations = [
  {
    code: "BNSP",
    title: "Badan Nasional Sertifikasi Profesi",
    number: "LSP-1234/BNSP/2015",
    desc: "Lisensi resmi penyelenggara sertifikasi profesi di Indonesia.",
    status: "Aktif",
    validUntil: "2026",
    color: "#2dd4bf",
  },
  {
    code: "ISO",
    title: "ISO/IEC 17024:2012",
    number: "ID-2345-2018",
    desc: "Standar internasional untuk lembaga sertifikasi personil.",
    status: "Aktif",
    validUntil: "2027",
    color: "#4ade80",
  },
  {
    code: "KEMNAKER",
    title: "Kementerian Ketenagakerjaan RI",
    number: "KEP.123/MEN/2016",
    desc: "Pengakuan resmi sebagai lembaga pelatihan dan sertifikasi kerja.",
    status: "Aktif",
    validUntil: "2025",
    color: "#2dd4bf",
  },
];

const legalDocs = [
  { label: "Akta Pendirian", value: "No. 45 Tahun 2015" },
  { label: "NPWP", value: "12.345.678.9-012.000" },
  { label: "NIB", value: "1234567890123" },
  { label: "Domisili", value: "Jakarta Selatan, DKI Jakarta" },
  { label: "Bidang Usaha", value: "Lembaga Sertifikasi Profesi" },
  { label: "Status", value: "Aktif & Beroperasi" },
];

export default function AboutAccreditation() {
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
            Akreditasi & Legalitas
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Diakui, Terpercaya,
            <br />
            dan Berstandar Nasional
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Semua proses sertifikasi kami berpedoman pada regulasi resmi dan
            standar mutu yang telah diakui oleh lembaga nasional maupun
            internasional.
          </p>
        </div>

        {/* Accreditations */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {accreditations.map((a) => (
            <div
              key={a.code}
              className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200 overflow-hidden"
            >
              {/* Glow */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none translate-x-8 -translate-y-8 blur-xl"
                style={{ background: a.color }}
              />

              {/* Code badge */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-black tracking-widest"
                  style={{ background: `${a.color}18`, color: a.color }}
                >
                  {a.code}
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  {a.status}
                </span>
              </div>

              <h3 className="font-semibold text-white text-sm mb-1 leading-snug">
                {a.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {a.desc}
              </p>

              {/* Number & valid */}
              <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-600">Nomor</span>
                  <span className="text-slate-400 font-mono">{a.number}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-600">Berlaku s/d</span>
                  <span className="text-slate-400">{a.validUntil}</span>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${a.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Legal info */}
        <div className="p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-teal-400 flex-shrink-0"
              style={{ background: "rgba(45,212,191,0.1)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="3"
                  y="2"
                  width="12"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M6 6H12M6 9H12M6 12H10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-white">
              Informasi Legal Perusahaan
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {legalDocs.map((d) => (
              <div key={d.label} className="flex flex-col gap-0.5">
                <span className="text-[11px] text-slate-600 uppercase tracking-wide font-medium">
                  {d.label}
                </span>
                <span className="text-sm text-slate-300 font-medium">
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
