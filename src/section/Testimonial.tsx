const testimonials = [
  {
    name: "Bambang Pamungkas",
    role: "Role",
    company: "Perusahaan",
    quote:
      "Proses sertifikasi sangat lancar. Materinya relevan dan ujiannya profesional. Sertifikat saya jadi nilai tambah nyata di CV.",
    initials: "RA",
    color: "#2dd4bf",
  },
  {
    name: "Dewi Puspitasari",
    role: "Role",
    company: "Perusahaan",
    quote:
      "Kami mewajibkan seluruh tim untuk tersertifikasi melalui Alantra. Hasilnya nyata — kompetensi tim meningkat signifikan.",
    initials: "DP",
    color: "#4ade80",
  },
  {
    name: "Budi Sudarsono",
    role: "Role",
    company: "Perusahaan",
    quote: "Sangat mudah dan cepat. Staff ramah. Highly recommended!",
    initials: "BS",
    color: "#2dd4bf",
  },
];

export default function TestimonialsSection() {
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
            Testimoni
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            Apa kata mereka yang
            <br />
            sudah bersama kami
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative flex flex-col p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200"
            >
              {/* Quote mark */}
              <div
                className="text-5xl font-black leading-none mb-4 select-none"
                style={{ color: `${t.color}30` }}
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill={t.color}
                  >
                    <path d="M6.5 1L8 5H12.5L9 7.5L10.5 12L6.5 9.5L2.5 12L4 7.5L0.5 5H5L6.5 1Z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${t.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
