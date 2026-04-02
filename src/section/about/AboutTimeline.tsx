const milestones = [
  {
    year: "2025",
    title: "Establishment & Foundation",
    desc: [
      "Founded by industry professionals with deep expertise in oil, gas, and mining operations.",
      "Legally registered as a training and certification provider.",
      "Initial focus on technical and operational training for field-level personnel.",
    ],
    color: "#2dd4bf",
  },
  {
    year: "2026",
    title: "Recognition & Strategic Partnerships",
    desc: [
      "Officially registered with SKK Migas, the Ministry of Energy and Mineral Resources (ESDM), and national certification bodies.",
      "Partnered with 10+ medium-scale oil & mining companies for workforce development.",
      "Introduced 15 training modules including HSSE, drilling operations, and basic geotechnics.",
    ],
    color: "#4ade80",
  },
  {
    year: "2027",
    title: "Digital Transformation & Global Standards",
    desc: [
      "Launched an e-learning platform for remote and hybrid training programs.",
      "Collaborated with international organizations to align curricula with global standards (API, OSHA, ISO).",
      "Accredited as an official Competency Assessment Center (TUK) by relevant Indonesian LSPs.",
    ],
    color: "#2dd4bf",
  },
];

export default function AboutTimeline() {
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
            Our Milestone
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Perjalanan Kami Membangun Kepercayaan
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Kami siap tumbuh menjadi mitra sertifikasi terpercaya bagi ribuan
            profesional Indonesia.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-white/[0.06] hidden md:block" />

          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative flex gap-0 md:gap-10 group">
                {/* Year (desktop) */}
                <div className="hidden md:flex flex-col items-end w-[88px] flex-shrink-0 pt-6">
                  <span
                    className="text-sm font-black tracking-tight bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${m.color}, ${m.color}aa)`,
                    }}
                  >
                    {m.year}
                  </span>
                </div>

                {/* Dot */}
                <div className="hidden md:flex flex-col items-center flex-shrink-0 relative">
                  <div
                    className="mt-7 w-3 h-3 rounded-full border-2 z-10 transition-all duration-200 group-hover:scale-125"
                    style={{ borderColor: m.color, background: "#1a2332" }}
                  />
                  {i < milestones.length - 1 && (
                    <div className="flex-1 w-px bg-transparent" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-10 pl-0 md:pl-8">
                  {/* Mobile year */}
                  <span
                    className="md:hidden text-xs font-black tracking-widest bg-clip-text text-transparent block mb-1"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${m.color}, ${m.color}aa)`,
                    }}
                  >
                    {m.year}
                  </span>

                  <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] group-hover:bg-white/[0.05] group-hover:border-white/10 transition-all duration-200">
                    <h3 className="font-semibold text-white text-sm mb-3">
                      {m.title}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {m.desc.map((text, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            className="mt-0.5 flex-shrink-0"
                          >
                            <path
                              d="M2 6L4.5 8.5L10 3"
                              stroke={m.color}
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
