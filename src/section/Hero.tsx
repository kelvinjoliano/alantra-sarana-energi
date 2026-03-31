import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1a2332] min-h-[92vh] flex items-center">
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #4ade80 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #1e6fa8 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block animate-pulse" />
              Lembaga Sertifikasi Profesi · Terakreditasi Resmi
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight text-white mb-6">
              Sertifikasi{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #2dd4bf 0%, #4ade80 100%)",
                }}
              >
                Kompetensi
              </span>
              <br />
              Profesional Anda
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
              Alantra Sarana Energi hadir sebagai mitra sertifikasi terpercaya
              untuk tenaga kerja Indonesia. Terakreditasi resmi, proses mudah,
              dan diakui industri nasional.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link
                href="/daftar"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                style={{
                  background:
                    "linear-gradient(135deg, #0d9488 0%, #16a34a 100%)",
                }}
              >
                Daftar Sekarang
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8H13M9 4L13 8L9 12"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/service"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white border border-slate-600 hover:border-slate-400 bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                Lihat Skema Sertifikasi
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { value: "12.000+", label: "Tersertifikasi" },
                { value: "30+", label: "Skema" },
                { value: "98%", label: "Kelulusan" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Logo card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Card glow */}
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-20 scale-105"
                style={{
                  background: "linear-gradient(135deg, #2dd4bf, #4ade80)",
                }}
              />

              <div
                className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-10 flex flex-col items-center gap-6"
                style={{ minWidth: 320 }}
              >
                {/* Logo Image */}
                <Image
                  src="/images/logo-alantra-v2.png"
                  alt="Alantra Sarana Energi"
                  width={480}
                  height={320}
                  className="object-contain mix-blend-lighten"
                  priority
                />

                {/* Divider */}
                <div className="w-full h-px bg-white/10" />

                {/* BNSP Badge */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L1.5 5.5H6.5L8 1Z"
                      stroke="#2dd4bf"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                  <span>Terakreditasi Resmi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(26,35,50,0.6))",
        }}
      />
    </section>
  );
}
