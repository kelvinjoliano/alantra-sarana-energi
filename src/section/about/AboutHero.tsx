export default function AboutHero() {
  return (
    <section className="relative bg-[#1a2332] overflow-hidden border-b border-white/[0.06]">
      {/* Glow blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #4ade80 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
          style={{
            borderColor: "rgba(45,212,191,0.3)",
            background: "rgba(45,212,191,0.08)",
            color: "#2dd4bf",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
          Tentang Kami
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6 max-w-2xl">
          Mitra Sertifikasi{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #2dd4bf 0%, #4ade80 100%)",
            }}
          >
            Terpercaya
          </span>{" "}
          untuk Profesional Indonesia
        </h1>

        <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
          Sejak 2020, Alantra Sarana Energi hadir sebagai lembaga sertifikasi
          profesi resmi yang berkomitmen membangun ekosistem tenaga kerja
          kompeten dan berdaya saing.
        </p>
      </div>
    </section>
  );
}
