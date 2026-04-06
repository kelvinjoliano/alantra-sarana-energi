// src/app/admin/jadwal/[sertifikasiId]/_components/JadwalTable.tsx
"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type Jadwal = {
  id: number;
  tanggalMulai: Date | string;
  tanggalSelesai: Date | string;
  lokasi: string | null;
  metodePelaksanaan: string;
  kuotaTersedia: number;
  isPublished: boolean;
  tingkatan: { nama: string; tarif: number } | null;
  _count: { pendaftaran: number };
};

type Props = {
  jadwals: Jadwal[];
  sertifikasiId: number;
  total: number;
  page: number;
  totalPages: number;
};

export default function JadwalTable({
  jadwals,
  sertifikasiId,
  total,
  page,
  totalPages,
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [deleting, setDeleting] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    setDeleting(id);
    setError(null);
    const res = await fetch(`/api/jadwal/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) setError(data.error ?? "Gagal menghapus");
    else router.refresh();
    setDeleting(null);
    setConfirmId(null);
  };

  const fmt = (d: Date | string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (!jadwals.length) {
    return (
      <div
        className="rounded-xl flex flex-col items-center justify-center py-16 gap-3"
        style={{
          background: "#111c27",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#334155"
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <p className="text-sm" style={{ color: "#475569" }}>
          Belum ada jadwal
        </p>
        <Link
          href={`/admin/jadwal/${sertifikasiId}/baru`}
          className="text-xs px-4 py-2 rounded-lg"
          style={{
            background: "rgba(20,184,166,0.1)",
            color: "#14b8a6",
            border: "1px solid rgba(20,184,166,0.2)",
          }}
        >
          Tambah Jadwal
        </Link>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-lg text-sm"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#f87171",
          }}
        >
          {error}
        </div>
      )}

      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "#111c27",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  "Tingkatan",
                  "Tanggal",
                  "Lokasi",
                  "Metode",
                  "Kuota",
                  "Status",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide"
                    style={{ color: "#475569" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jadwals.map((j, i) => (
                <tr
                  key={j.id}
                  style={{
                    borderBottom:
                      i < jadwals.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <td className="px-4 py-3">
                    {j.tingkatan ? (
                      <p className="font-medium" style={{ color: "#e2e8f0" }}>
                        {j.tingkatan.nama}
                      </p>
                    ) : (
                      <span style={{ color: "#334155", fontStyle: "italic" }}>
                        Semua tingkatan
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p style={{ color: "#94a3b8" }}>{fmt(j.tanggalMulai)}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                      s/d {fmt(j.tanggalSelesai)}
                    </p>
                  </td>
                  <td className="px-4 py-3" style={{ color: "#94a3b8" }}>
                    {j.lokasi ?? (
                      <span style={{ color: "#334155", fontStyle: "italic" }}>
                        —
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(20,184,166,0.1)",
                        color: "#14b8a6",
                      }}
                    >
                      {j.metodePelaksanaan}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-center"
                    style={{ color: "#94a3b8" }}
                  >
                    {j.kuotaTersedia}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={
                        j.isPublished
                          ? {
                              background: "rgba(20,184,166,0.1)",
                              color: "#14b8a6",
                            }
                          : {
                              background: "rgba(100,116,139,0.1)",
                              color: "#64748b",
                            }
                      }
                    >
                      {j.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/jadwal/${sertifikasiId}/${j.id}`}
                        className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#94a3b8",
                        }}
                      >
                        Edit
                      </Link>
                      {confirmId === j.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(j.id)}
                            disabled={deleting === j.id}
                            className="text-xs px-3 py-1.5 rounded-lg"
                            style={{
                              background: "rgba(239,68,68,0.15)",
                              color: "#f87171",
                            }}
                          >
                            {deleting === j.id ? "..." : "Hapus"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="text-xs px-2 py-1.5 rounded-lg"
                            style={{ color: "#475569" }}
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(j.id)}
                          className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                          style={{
                            background: "rgba(239,68,68,0.06)",
                            border: "1px solid rgba(239,68,68,0.12)",
                            color: "#f87171",
                          }}
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p className="text-xs" style={{ color: "#475569" }}>
              {total} jadwal
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/admin/jadwal/${sertifikasiId}?${new URLSearchParams({ ...Object.fromEntries(sp.entries()), page: p.toString() })}`}
                  className="w-7 h-7 rounded text-xs font-medium transition-colors flex items-center justify-center"
                  style={
                    p === page
                      ? {
                          background: "rgba(20,184,166,0.15)",
                          color: "#14b8a6",
                        }
                      : { color: "#475569" }
                  }
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
