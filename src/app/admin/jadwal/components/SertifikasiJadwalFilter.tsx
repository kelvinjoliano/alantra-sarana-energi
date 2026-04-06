// src/app/admin/jadwal/_components/SertifikasiJadwalFilter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SertifikasiJadwalFilter() {
  const router = useRouter();
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";

  const update = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(sp.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      params.delete("page");
      router.push(`/admin/jadwal?${params.toString()}`);
    },
    [router, sp],
  );

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1" style={{ minWidth: "200px" }}>
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#475569"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Cari nama sertifikasi..."
          defaultValue={q}
          onChange={(e) => update({ q: e.target.value })}
          className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
          style={{
            background: "#111c27",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#e2e8f0",
          }}
        />
      </div>
      {q && (
        <button
          onClick={() => router.push("/admin/jadwal")}
          className="text-xs px-3 py-2 rounded-lg"
          style={{ color: "#64748b" }}
        >
          Reset
        </button>
      )}
    </div>
  );
}
