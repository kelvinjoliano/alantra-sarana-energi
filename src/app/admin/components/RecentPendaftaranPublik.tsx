// src/app/admin/components/RecentPendaftaranPublik.tsx

import Link from "next/link";

type Item = {
  id: string;
  noPendaftaran: string;
  namaLengkap: string;
  skema: string;
  metode: string;
  status: string;
  createdAt: Date;
};

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  BARU: { label: "Baru", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.1)" },
  DIPROSES: {
    label: "Diproses",
    color: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.1)",
  },
  SELESAI: {
    label: "Selesai",
    color: "#34d399",
    bg: "rgba(52, 211, 153, 0.1)",
  },
  DITOLAK: {
    label: "Ditolak",
    color: "#f87171",
    bg: "rgba(248, 113, 113, 0.1)",
  },
};

export function RecentPendaftaranPublik({ data }: { data: Item[] }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "#111c27",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
          Pendaftaran Terbaru
        </h2>
        <Link
          href="/admin/pendaftaran-publik"
          className="text-xs"
          style={{ color: "#14b8a6", textDecoration: "none" }}
        >
          Lihat semua →
        </Link>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <p className="text-xs" style={{ color: "#475569" }}>
            Belum ada pendaftaran
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((item) => {
            const cfg = STATUS_CONFIG[item.status] ?? STATUS_CONFIG["BARU"];
            return (
              <Link
                key={item.id}
                href={`/admin/pendaftaran-publik/${item.id}`}
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full text-xs font-semibold flex-shrink-0"
                  style={{
                    width: "30px",
                    height: "30px",
                    background: "rgba(20, 184, 166, 0.15)",
                    color: "#14b8a6",
                  }}
                >
                  {item.namaLengkap.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-medium truncate"
                    style={{ color: "#cbd5e1" }}
                  >
                    {item.namaLengkap}
                  </p>
                  <p className="text-xs truncate" style={{ color: "#475569" }}>
                    {item.skema}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                  <span className="text-xs" style={{ color: "#334155" }}>
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
