const values = [
  {
    title: "Integritas",
    subtitle: "Integrity",
    desc: "Kami senantiasa menerapkan standar etika dan moral tertinggi dengan selalu mengedepankan azas kejujuran dan keadilan dalam setiap kegiatan.",
    color: "#2dd4bf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2L12 7H17L13 10.5L14.5 16L10 13L5.5 16L7 10.5L3 7H8L10 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Pengembangan Berkelanjutan",
    subtitle: "Continuous Development",
    desc: "Kami bertekad untuk senantiasa mengembangkan perusahaan kami berikut sumber daya manusianya.",
    color: "#4ade80",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 3C10 3 6 5 6 10C6 13 7.5 15.5 10 17C12.5 15.5 14 13 14 10C14 5 10 3 10 3Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M10 3V17"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M6 10H14"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Keunggulan",
    subtitle: "Excellence",
    desc: "Kami terus berupaya untuk mencapai standar kinerja tertinggi dalam setiap aspek operasional kami.",
    color: "#2dd4bf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
  },
  {
    title: "Proaktif",
    subtitle: "Proactive",
    desc: "Kami terus mencari dan mengadopsi teknik dan pendekatan baru untuk meningkatkan mutu bisnis kami.",
    color: "#4ade80",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M10 6V10L13 12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M13 4L15 2M15 4L13 2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Tanggung Jawab",
    subtitle: "Accountability",
    desc: "Kami bertanggung jawab kepada seluruh pemangku kepentingan atas segala keputusan dan tindakan yang kami ambil.",
    color: "#2dd4bf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect
          x="3"
          y="3"
          width="14"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.4"
        />
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
    title: "Kerjasama Kelompok",
    subtitle: "Team Work",
    desc: "Kami mendorong keanekaragaman tenaga kerja berdasarkan azas saling percaya dan menghormati, bersama-sama mencapai sasaran.",
    color: "#4ade80",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="13" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M3 17C3 14.8 4.8 13 7 13H13C15.2 13 17 14.8 17 17"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function AboutCompany() {
  return (
    <section className="bg-[#1e2b3a]">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Tentang + Visi Misi */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left: Tentang */}
          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #2dd4bf, #4ade80)",
              }}
            >
              Tentang Perusahaan
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-6">
              Membangun Kompetensi,
              <br />
              Menggerakkan Industri
            </h2>
            <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
              <p>
                PT. Alantra Sarana Energi adalah perusahaan pelatihan dan
                pengembangan yang khusus untuk industri minyak & gas serta
                pertambangan. Kami menyediakan solusi pelatihan yang
                komprehensif dan relevan dengan industri yang dirancang untuk
                meningkatkan kompetensi tenaga kerja, keselamatan operasional,
                dan keahlian teknis.
              </p>
              <p>
                Dengan tim profesional berpengalaman dan pakar industri, kami
                menyelenggarakan program pelatihan secara tatap muka maupun
                online yang disesuaikan untuk memenuhi kebutuhan dinamis
                perusahaan yang beroperasi di sektor hulu, tengah, dan hilir
                minyak & gas, serta dalam operasi pertambangan. Kursus kami
                mencakup berbagai topik, termasuk kesehatan, keselamatan, dan
                lingkungan (HSE), operasi pengeboran dan produksi, geologi dan
                geofisika, eksplorasi mineral, pengoperasian peralatan berat,
                serta kepatuhan terhadap regulasi.
              </p>
              <p>
                Kami berkomitmen untuk mendukung pengembangan tenaga kerja dan
                keunggulan operasional dengan membekali para profesional dengan
                pengetahuan dan keterampilan yang diperlukan untuk berkembang di
                lingkungan yang menantang dan terus berkembang. Di PT. Alantra
                Sarana Energi, kami percaya pada pembelajaran praktis dan
                langsung yang memberikan hasil nyata.
              </p>
            </div>
          </div>

          {/* Right: Visi & Misi */}
          <div className="flex flex-col gap-5">
            {/* Visi */}
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03]">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-teal-400 flex-shrink-0"
                  style={{ background: "rgba(45,212,191,0.1)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle
                      cx="9"
                      cy="9"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <circle
                      cx="9"
                      cy="9"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeDasharray="2 2"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-base">Visi</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Menjadi perusahaan energi yang terintegrasi dengan pertambangan
                berbasis ESG kelas dunia.
              </p>
            </div>

            {/* Misi */}
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03]">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-green-400 flex-shrink-0"
                  style={{ background: "rgba(74,222,128,0.1)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3 9H15M9 3L15 9L9 15"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-base">Misi</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Mengembangkan bisnis energi yang terintegrasi dan sinergis pertambangan.",
                  "Menciptakan kemandirian internal mendukung lini bisnis perusahaan.",
                  "Menciptakan nilai tambah dan mengembangkan budaya digital.",
                  "Menciptakan sumber daya manusia yang unggul dan mampu bersaing secara efektif di tingkat global.",
                  "Berorientasi pada kemajuan serta pembangunan regional dan komunitas.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-slate-400"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <path
                        d="M2 7L5.5 10.5L12 3.5"
                        stroke="#2dd4bf"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #2dd4bf, #4ade80)",
            }}
          >
            Core Values
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
            Prinsip yang Memandu Langkah Kami
          </h2>
          <p className="text-slate-500 text-sm mb-10">
            Enam nilai inti yang menjadi landasan budaya dan cara kerja Alantra
            Sarana Energi.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="group p-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200 relative overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute top-0 left-0 w-28 h-28 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none -translate-x-8 -translate-y-8 blur-2xl"
                  style={{ background: v.color }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${v.color}18`, color: v.color }}
                >
                  {v.icon}
                </div>

                {/* Title bilingual */}
                <div className="mb-2">
                  <h4 className="font-semibold text-white text-sm leading-snug">
                    {v.title}
                  </h4>
                  <span
                    className="text-[10px] font-semibold tracking-wide"
                    style={{ color: v.color }}
                  >
                    {v.subtitle}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {v.desc}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${v.color}, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
