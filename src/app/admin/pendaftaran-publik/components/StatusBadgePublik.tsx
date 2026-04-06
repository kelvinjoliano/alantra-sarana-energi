// src/app/admin/pendaftaran-publik/components/StatusBadgePublik.tsx

type Config = { label: string; bg: string; color: string };

const statusConfig: { [key: string]: Config } = {
  BARU: { label: "Baru", bg: "#0a1f2d", color: "#38bdf8" },
  DIPROSES: { label: "Diproses", bg: "#2d1f0a", color: "#fbbf24" },
  SELESAI: { label: "Selesai", bg: "#0a2d1f", color: "#34d399" },
  DITOLAK: { label: "Ditolak", bg: "#2d0a0a", color: "#f87171" },
};

export function StatusBadgePubik({ status }: { status: string }) {
  const config = statusConfig[status] ?? {
    label: status,
    bg: "#1e3448",
    color: "#94a3b8",
  };

  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full font-medium"
      style={{ background: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}
