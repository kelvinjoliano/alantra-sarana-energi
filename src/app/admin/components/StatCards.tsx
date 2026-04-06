// src/app/admin/components/StatCards.tsx

type StatCardsProps = {
  totalSertifikasi: number;
  sertifikasiAktif: number;
  jadwalTerbit: number;
  totalJadwal: number;
  totalPendaftar: number;
  pendaftarBaru: number;
  pendaftarDiproses: number;
  pendaftarHariIni: number;
};

type StatCard = {
  label: string;
  value: string | number;
  sub: string;
  accent: string;
  accentBg: string;
  icon: React.ReactNode;
};

export function StatCards(props: StatCardsProps) {
  const cards: StatCard[] = [
    {
      label: "Total Sertifikasi",
      value: props.totalSertifikasi,
      sub: `${props.sertifikasiAktif} aktif`,
      accent: "#14b8a6",
      accentBg: "rgba(20, 184, 166, 0.08)",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
    },
    {
      label: "Jadwal Berjalan",
      value: props.jadwalTerbit,
      sub: `dari ${props.totalJadwal} total jadwal`,
      accent: "#3b82f6",
      accentBg: "rgba(59, 130, 246, 0.08)",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: "Total Pendaftar",
      value: props.totalPendaftar,
      sub: `${props.pendaftarHariIni} masuk hari ini`,
      accent: "#8b5cf6",
      accentBg: "rgba(139, 92, 246, 0.08)",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: "Perlu Ditindak",
      value: props.pendaftarBaru + props.pendaftarDiproses,
      sub: `${props.pendaftarBaru} baru · ${props.pendaftarDiproses} diproses`,
      accent: "#f59e0b",
      accentBg: "rgba(245, 158, 11, 0.08)",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="grid mb-6"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "12px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl p-5 flex flex-col gap-3"
          style={{
            background: "#111c27",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center justify-between">
            <p
              className="text-xs font-medium uppercase tracking-wide"
              style={{ color: "#64748b", letterSpacing: "0.06em" }}
            >
              {card.label}
            </p>
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: "34px",
                height: "34px",
                background: card.accentBg,
                color: card.accent,
              }}
            >
              {card.icon}
            </div>
          </div>
          <div>
            <p
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#f1f5f9" }}
            >
              {card.value}
            </p>
            <p className="text-xs mt-1" style={{ color: "#475569" }}>
              {card.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
