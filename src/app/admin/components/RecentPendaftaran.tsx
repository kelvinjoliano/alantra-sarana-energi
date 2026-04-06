import { formatDate } from "@/lib/format";

export type RecentPendaftaranItem = {
  id: string;
  status: string;
  createdAt: Date;
  peserta: {
    user: {
      name: string | null;
      email: string;
    };
  } | null;
  jadwal: {
    sertifikasi: {
      nama: string;
    };
  } | null;
};

type Props = {
  data: RecentPendaftaranItem[];
};

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  MENUNGGU: {
    label: "Menunggu",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.1)",
  },
  DIVERIFIKASI: {
    label: "Diverifikasi",
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.1)",
  },
  AKTIF: { label: "Aktif", color: "#14b8a6", bg: "rgba(20, 184, 166, 0.1)" },
  SELESAI: {
    label: "Selesai",
    color: "#64748b",
    bg: "rgba(100, 116, 139, 0.1)",
  },
  DITOLAK: { label: "Ditolak", color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
};

export function RecentPendaftaran({ data }: Props) {
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
        <a
          href="/admin/pendaftaran"
          className="text-xs"
          style={{ color: "#14b8a6", textDecoration: "none" }}
        >
          Lihat semua →
        </a>
      </div>

      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((reg) => {
            const statusCfg =
              STATUS_CONFIG[reg.status] ?? STATUS_CONFIG["MENUNGGU"];
            return (
              <div
                key={reg.id}
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full text-xs font-semibold flex-shrink-0"
                  style={{
                    width: "30px",
                    height: "30px",
                    background: "rgba(139, 92, 246, 0.15)",
                    color: "#8b5cf6",
                  }}
                >
                  {reg.peserta?.user?.name?.charAt(0)?.toUpperCase() ?? "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-medium truncate"
                    style={{ color: "#cbd5e1" }}
                  >
                    {reg.peserta?.user?.name ?? "—"}
                  </p>
                  <p className="text-xs truncate" style={{ color: "#475569" }}>
                    {reg.jadwal?.sertifikasi?.nama ?? "—"}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: statusCfg.bg, color: statusCfg.color }}
                  >
                    {statusCfg.label}
                  </span>
                  <span className="text-xs" style={{ color: "#334155" }}>
                    {formatDate(reg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-2">
      <div style={{ color: "#334155" }}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <p className="text-xs" style={{ color: "#475569" }}>
        Belum ada pendaftaran
      </p>
    </div>
  );
}
