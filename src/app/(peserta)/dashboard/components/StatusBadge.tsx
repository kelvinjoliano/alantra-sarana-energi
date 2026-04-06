// src/app/(peserta)/dashboard/components/StatusBadge.tsx

type StatusConfig = {
  label: string;
  bg: string;
  color: string;
};

const statusConfig: { [key: string]: StatusConfig } = {
  MENUNGGU_PEMBAYARAN: {
    label: "Menunggu Pembayaran",
    bg: "#2d1f0a",
    color: "#fbbf24",
  },
  MENUNGGU_VERIFIKASI: {
    label: "Menunggu Verifikasi",
    bg: "#0a1f2d",
    color: "#38bdf8",
  },
  AKTIF: {
    label: "Aktif",
    bg: "#0a2d1f",
    color: "#34d399",
  },
  SELESAI: {
    label: "Selesai",
    bg: "#1e1e2d",
    color: "#818cf8",
  },
  DITOLAK: {
    label: "Ditolak",
    bg: "#2d0a0a",
    color: "#f87171",
  },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? {
    label: status,
    bg: "#1e3448",
    color: "#94a3b8",
  };

  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full font-medium shrink-0"
      style={{ background: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}
