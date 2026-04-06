"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/lib/format";

type Tingkatan = {
  id: number;
  nama: string;
  tarif: number;
};

type Sertifikasi = {
  id: number;
  nama: string;
  slug: string;
  kategori: string;
  isActive: boolean;
  createdAt: string;
  tingkatan: Tingkatan[];
  _count: { tingkatan: number; jadwal: number; pendaftaran: number };
};

type Props = {
  data: Sertifikasi[];
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
};

export function SertifikasiTable({
  data,
  total,
  page,
  totalPages,
  onPageChange,
  onRefresh,
}: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    setError(null);
    try {
      const res = await fetch(`/api/sertifikasi/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Gagal menghapus");
      } else {
        onRefresh();
      }
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  if (data.length === 0) {
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
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
        <p className="text-sm" style={{ color: "#475569" }}>
          Belum ada sertifikasi
        </p>
        <button
          onClick={() => router.push("/admin/sertifikasi/baru")}
          className="text-xs px-4 py-2 rounded-lg"
          style={{
            background: "rgba(20,184,166,0.1)",
            color: "#14b8a6",
            border: "1px solid rgba(20,184,166,0.2)",
          }}
        >
          Tambah Sertifikasi
        </button>
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
                  "Nama",
                  "Kategori",
                  "Tingkatan",
                  "Jadwal",
                  "Pendaftaran",
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
              {data.map((item, i) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom:
                      i < data.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                  }}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium" style={{ color: "#e2e8f0" }}>
                        {item.nama}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#475569" }}
                      >
                        /{item.slug}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(59,130,246,0.1)",
                        color: "#60a5fa",
                      }}
                    >
                      {item.kategori}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-center"
                    style={{ color: "#94a3b8" }}
                  >
                    {item._count.tingkatan}
                  </td>
                  <td
                    className="px-4 py-3 text-center"
                    style={{ color: "#94a3b8" }}
                  >
                    {item._count.jadwal}
                  </td>
                  <td
                    className="px-4 py-3 text-center"
                    style={{ color: "#94a3b8" }}
                  >
                    {item._count.pendaftaran}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={
                        item.isActive
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
                      {item.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() =>
                          router.push(`/admin/sertifikasi/${item.id}`)
                        }
                        className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#94a3b8",
                        }}
                      >
                        Edit
                      </button>
                      {confirmId === item.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="text-xs px-3 py-1.5 rounded-lg"
                            style={{
                              background: "rgba(239,68,68,0.15)",
                              color: "#f87171",
                            }}
                          >
                            {deletingId === item.id ? "..." : "Hapus"}
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
                          onClick={() => setConfirmId(item.id)}
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
              {total} sertifikasi
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className="w-7 h-7 rounded text-xs font-medium transition-colors"
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
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
