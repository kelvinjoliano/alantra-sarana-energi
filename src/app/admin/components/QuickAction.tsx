"use client";

// src/app/admin/components/QuickAction.tsx

import Link from "next/link";

const QUICK_ACTIONS = [
  {
    label: "Tambah Sertifikasi",
    href: "/admin/sertifikasi/baru",
    color: "#14b8a6",
  },
  {
    label: "Buat Jadwal",
    href: "/admin/jadwal",
    color: "#3b82f6",
  },
  {
    label: "Pendaftaran Masuk",
    href: "/admin/pendaftaran-publik",
    color: "#f59e0b",
  },
  {
    label: "Pendaftaran Baru",
    href: "/admin/pendaftaran-publik?status=BARU",
    color: "#f87171",
  },
];

export function QuickActions() {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "#111c27",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <h2 className="text-sm font-semibold mb-4" style={{ color: "#cbd5e1" }}>
        Aksi Cepat
      </h2>

      <div className="grid grid-cols-2 gap-2">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#94a3b8",
              textDecoration: "none",
            }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: action.color }}
            />
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
