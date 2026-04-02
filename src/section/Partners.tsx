const partners = [
  { name: "Nama PT1", abbr: "PT1" },
  { name: "Nama PT2", abbr: "PT2" },
  { name: "Nama PT3", abbr: "PT3" },
  { name: "Nama PT4", abbr: "PT4" },
  { name: "Nama PT5", abbr: "PT5" },
  { name: "Nama PT6", abbr: "PT6" },
  { name: "Nama PT7", abbr: "PT7" },
  { name: "Nama PT8", abbr: "PT8" },
];

export default function PartnersSection() {
  return (
    <section className="bg-[#1e2b3a] border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">
            Dipercaya Oleh
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Perusahaan Terkemuka Indonesia
          </h2>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200"
            >
              {/* Avatar placeholder */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-black text-teal-400 flex-shrink-0 transition-colors duration-200"
                style={{ background: "rgba(45,212,191,0.1)" }}
              >
                {p.abbr}
              </div>
              <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors duration-200 leading-tight">
                {p.name}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-slate-600 mt-10">
          dan 100+ perusahaan lainnya di seluruh Indonesia
        </p>
      </div>
    </section>
  );
}
