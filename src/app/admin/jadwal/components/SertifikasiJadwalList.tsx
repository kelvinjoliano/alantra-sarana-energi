// src/app/admin/jadwal/_components/SertifikasiJadwalList.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type SertifikasiItem = {
  id: number;
  nama: string;
  slug: string;
  kategori: string;
  isActive: boolean;
  _count: { jadwal: number };
  jadwal: { tanggalMulai: Date | string; metodePelaksanaan: string }[];
};

type Props = {
  sertifikasiList: SertifikasiItem[];
  total: number;
  page: number;
  totalPages: number;
};

export default function SertifikasiJadwalList({
  sertifikasiList,
  total,
  page,
  totalPages,
}: Props) {
  const sp = useSearchParams();

  const fmt = (d: Date | string) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (!sertifikasiList.length) {
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
          Tidak ada sertifikasi ditemukan
        </p>
      </div>
    );
  }

  return (
    <div>
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
                  "Sertifikasi",
                  "Kategori",
                  "Total Jadwal",
                  "Jadwal Terdekat",
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
              {sertifikasiList.map((s, i) => (
                <tr
                  key={s.id}
                  style={{
                    borderBottom:
                      i < sertifikasiList.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium" style={{ color: "#e2e8f0" }}>
                      {s.nama}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                      /{s.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(59,130,246,0.1)",
                        color: "#60a5fa",
                      }}
                    >
                      {s.kategori}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-center"
                    style={{ color: "#94a3b8" }}
                  >
                    {s._count.jadwal}
                  </td>
                  <td className="px-4 py-3">
                    {s.jadwal[0] ? (
                      <div>
                        <p style={{ color: "#94a3b8" }}>
                          {fmt(s.jadwal[0].tanggalMulai)}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "#475569" }}
                        >
                          {s.jadwal[0].metodePelaksanaan}
                        </p>
                      </div>
                    ) : (
                      <span style={{ color: "#334155", fontStyle: "italic" }}>
                        —
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/jadwal/${s.id}`}
                        className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                        style={{
                          background: "rgba(20,184,166,0.1)",
                          border: "1px solid rgba(20,184,166,0.2)",
                          color: "#14b8a6",
                        }}
                      >
                        Kelola Jadwal
                      </Link>
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
              {total} sertifikasi
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/admin/jadwal?${new URLSearchParams({ ...Object.fromEntries(sp.entries()), page: p.toString() })}`}
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
