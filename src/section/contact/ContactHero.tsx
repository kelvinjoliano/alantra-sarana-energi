export default function ContactHero() {
  return (
    <section className="relative bg-[#1a2332] overflow-hidden border-b border-white/[0.06]">
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #4ade80 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-28">
        <div
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
          style={{
            borderColor: "rgba(45,212,191,0.3)",
            background: "rgba(45,212,191,0.08)",
            color: "#2dd4bf",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
          Hubungi Kami
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-4 max-w-2xl">
          Ada yang Bisa{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #2dd4bf 0%, #4ade80 100%)",
            }}
          >
            Kami Bantu?
          </span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed max-w-lg">
          Tim kami siap menjawab pertanyaan seputar sertifikasi, pendaftaran,
          maupun kemitraan. Hubungi kami dan kami akan merespons dalam 1×24 jam.
        </p>
      </div>
    </section>
  );
}
