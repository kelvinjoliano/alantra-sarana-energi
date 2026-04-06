"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const KATEGORI_OPTIONS = [
  "Listrik",
  "Minyak dan Gas",
  "Konstruksi",
  "K3",
  "Lingkungan",
  "Manajemen",
  "Lainnya",
];

export function SertifikasiFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const kategori = searchParams.get("kategori") ?? "";
  const isActive = searchParams.get("isActive") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      params.delete("page"); // reset ke halaman 1 saat filter berubah
      router.push(`/admin/sertifikasi?${params.toString()}`);
    },
    [searchParams, router],
  );

  const hasFilter = q || kategori || isActive;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
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
          placeholder="Cari nama atau kategori..."
          defaultValue={q}
          onChange={(e) => updateParams({ q: e.target.value })}
          className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
          style={{
            background: "#111c27",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#e2e8f0",
          }}
        />
      </div>

      {/* Kategori */}
      <select
        value={kategori}
        onChange={(e) => updateParams({ kategori: e.target.value })}
        className="px-3 py-2 rounded-lg text-sm outline-none"
        style={{
          background: "#111c27",
          border: "1px solid rgba(255,255,255,0.08)",
          color: kategori ? "#e2e8f0" : "#475569",
        }}
      >
        <option value="">Semua Kategori</option>
        {KATEGORI_OPTIONS.map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        value={isActive}
        onChange={(e) => updateParams({ isActive: e.target.value })}
        className="px-3 py-2 rounded-lg text-sm outline-none"
        style={{
          background: "#111c27",
          border: "1px solid rgba(255,255,255,0.08)",
          color: isActive ? "#e2e8f0" : "#475569",
        }}
      >
        <option value="">Semua Status</option>
        <option value="true">Aktif</option>
        <option value="false">Nonaktif</option>
      </select>

      {/* Reset */}
      {hasFilter && (
        <button
          onClick={() => router.push("/admin/sertifikasi")}
          className="text-xs px-3 py-2 rounded-lg"
          style={{ color: "#64748b" }}
        >
          Reset
        </button>
      )}
    </div>
  );
}
