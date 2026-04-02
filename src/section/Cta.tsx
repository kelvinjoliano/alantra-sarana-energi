import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#1e2b3a] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 p-10 md:p-16 text-center"
          style={{
            background:
              "linear-gradient(135deg, #0f2027 0%, #1a3a2a 50%, #0f2027 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Border glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ boxShadow: "inset 0 0 60px rgba(45,212,191,0.04)" }}
          />

          <div className="relative">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
              style={{
                borderColor: "rgba(45,212,191,0.3)",
                background: "rgba(45,212,191,0.08)",
                color: "#2dd4bf",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block animate-pulse" />
              Mulai Perjalanan Anda
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
              Siap Meraih Sertifikat
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #2dd4bf 0%, #4ade80 100%)",
                }}
              >
                Kompetensi Anda?
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
              Bergabunglah dengan lebih dari 12.000 profesional yang sudah
              tersertifikasi bersama Alantra Sarana Energi.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link
                href="/daftar"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
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
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-200"
              >
                Konsultasi Gratis
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13H3L4.5 11.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600">
              {[
                "Terakreditasi BNSP",
                "Gratis Konsultasi",
                "Sertifikat 7 Hari",
                "Diakui Nasional",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="#2dd4bf"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
