export default function ContactMap() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3 bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, #2dd4bf, #4ade80)",
          }}
        >
          Lokasi Kami
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
          Kunjungi kantor kami
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Kami berlokasi di pusat bisnis Jakarta Selatan, mudah dijangkau dari
          berbagai penjuru kota.
        </p>
      </div>

      {/* Map embed — ganti src dengan Google Maps embed URL kantor asli */}
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06]"
        style={{ height: 280 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8229!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNDknMjIuNCJF!5e0!3m2!1sen!2sid!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Alantra Sarana Energi"
        />
      </div>

      {/* Office detail card */}
      <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-teal-400 flex-shrink-0 mt-0.5"
            style={{ background: "rgba(45,212,191,0.1)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.51 10.49 1.5 8 1.5Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <circle
                cx="8"
                cy="6"
                r="1.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-0.5">
              Kantor Pusat
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prudential Centre 22Th FL, Unit 2207 Jalan Raya Kasablanka Kav.88
              <br />
              Jakarta Selatan, DKI Jakarta 12870
            </p>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-4 grid grid-cols-2 gap-3">
          {[
            { label: "Jam Operasional", value: "Sen–Jum 08.00–17.00" },
            { label: "Kode Pos", value: "12190" },
          ].map((d) => (
            <div key={d.label}>
              <p className="text-[10px] text-slate-600 uppercase tracking-wide font-medium mb-0.5">
                {d.label}
              </p>
              <p className="text-xs text-slate-400">{d.value}</p>
            </div>
          ))}
        </div>

        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-teal-400 border border-teal-500/20 hover:bg-teal-500/10 transition-all duration-150"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1C4.24 1 2 3.24 2 6C2 9.5 7 13 7 13C7 13 12 9.5 12 6C12 3.24 9.76 1 7 1Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <circle
              cx="7"
              cy="6"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
          Buka di Google Maps
        </a>
      </div>
    </div>
  );
}
