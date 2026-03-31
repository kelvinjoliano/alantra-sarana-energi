const stats = [
  {
    value: "12.000+",
    label: "Peserta Tersertifikasi",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2C6.686 2 4 4.686 4 8C4 10.21 5.172 12.144 6.938 13.25L6 18L10 16L14 18L13.062 13.25C14.828 12.144 16 10.21 16 8C16 4.686 13.314 2 10 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: "30+",
    label: "Skema Sertifikasi",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect
          x="3"
          y="3"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <rect
          x="11"
          y="3"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <rect
          x="3"
          y="11"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <rect
          x="11"
          y="11"
          width="6"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
  {
    value: "98%",
    label: "Tingkat Kelulusan",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M7 10L9 12L13 8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: "7 Hari",
    label: "Terbit Sertifikat",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect
          x="3"
          y="4"
          width="14"
          height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M3 8H17" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M7 2V5M13 2V5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function StatsSection() {
  return (
    <section className="bg-[#1e2b3a] border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative group flex flex-col items-center text-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-teal-400"
                style={{ background: "rgba(45,212,191,0.1)" }}
              >
                {s.icon}
              </div>
              {/* Value */}
              <div
                className="text-3xl font-black tracking-tight mb-1 bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #2dd4bf, #4ade80)",
                }}
              >
                {s.value}
              </div>
              {/* Label */}
              <div className="text-xs text-slate-500 font-medium leading-snug">
                {s.label}
              </div>

              {/* Subtle bottom accent */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  background: "linear-gradient(90deg, #2dd4bf, #4ade80)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
