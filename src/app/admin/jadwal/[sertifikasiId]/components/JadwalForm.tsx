// src/app/admin/jadwal/[sertifikasiId]/_components/JadwalForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Tingkatan = {
  id: number;
  nama: string;
  tarif: number;
};

type JadwalData = {
  id?: number;
  tingkatanId?: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  lokasi?: string | null;
  metodePelaksanaan: string;
  kuotaTersedia: number;
  isPublished?: boolean;
};

type Props = {
  sertifikasiId: number;
  sertifikasiNama: string;
  tingkatanList: Tingkatan[];
  initial?: JadwalData;
};

export default function JadwalForm({
  sertifikasiId,
  tingkatanList,
  initial,
}: Props) {
  const router = useRouter();
  const isEdit = !!initial?.id;

  const [form, setForm] = useState({
    tingkatanId: initial?.tingkatanId?.toString() ?? "",
    tanggalMulai: initial?.tanggalMulai?.slice(0, 10) ?? "",
    tanggalSelesai: initial?.tanggalSelesai?.slice(0, 10) ?? "",
    lokasi: initial?.lokasi ?? "",
    metodePelaksanaan: initial?.metodePelaksanaan ?? "Offline",
    kuotaTersedia: initial?.kuotaTersedia?.toString() ?? "20",
    isPublished: initial?.isPublished ?? false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setError("");
    if (!form.tanggalMulai || !form.tanggalSelesai) {
      return setError("Tanggal mulai dan selesai wajib diisi");
    }
    if (new Date(form.tanggalSelesai) < new Date(form.tanggalMulai)) {
      return setError("Tanggal selesai tidak boleh sebelum tanggal mulai");
    }

    setLoading(true);
    const res = await fetch(
      isEdit ? `/api/jadwal/${initial!.id}` : "/api/jadwal",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sertifikasiId,
          tingkatanId: form.tingkatanId ? parseInt(form.tingkatanId) : null,
          tanggalMulai: form.tanggalMulai,
          tanggalSelesai: form.tanggalSelesai,
          lokasi: form.lokasi || null,
          metodePelaksanaan: form.metodePelaksanaan,
          kuotaTersedia: parseInt(form.kuotaTersedia) || 20,
          isPublished: form.isPublished,
        }),
      },
    );
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error ?? "Terjadi kesalahan");
    router.push(`/admin/jadwal/${sertifikasiId}`);
    router.refresh();
  };

  const inputStyle = {
    background: "#0f1720",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e2e8f0",
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: "#111c27",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {error && (
        <div
          className="mb-5 px-4 py-3 rounded-lg text-sm"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#f87171",
          }}
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-5">
        {/* Tingkatan */}
        <div>
          <label
            className="block text-xs font-medium mb-2"
            style={{ color: "#94a3b8" }}
          >
            Tingkatan
            <span className="ml-1 font-normal" style={{ color: "#475569" }}>
              (opsional — kosongkan untuk semua tingkatan)
            </span>
          </label>
          <select
            value={form.tingkatanId}
            onChange={(e) => set("tingkatanId", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
            style={{
              ...inputStyle,
              color: form.tingkatanId ? "#e2e8f0" : "#475569",
            }}
          >
            <option value="">Semua Tingkatan</option>
            {tingkatanList.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Tanggal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              className="block text-xs font-medium mb-2"
              style={{ color: "#94a3b8" }}
            >
              Tanggal Mulai <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="date"
              value={form.tanggalMulai}
              onChange={(e) => set("tanggalMulai", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label
              className="block text-xs font-medium mb-2"
              style={{ color: "#94a3b8" }}
            >
              Tanggal Selesai <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="date"
              value={form.tanggalSelesai}
              onChange={(e) => set("tanggalSelesai", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Lokasi & Metode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              className="block text-xs font-medium mb-2"
              style={{ color: "#94a3b8" }}
            >
              Lokasi
            </label>
            <input
              type="text"
              placeholder="cth: Hotel Grand Mercure, Jakarta"
              value={form.lokasi}
              onChange={(e) => set("lokasi", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <label
              className="block text-xs font-medium mb-2"
              style={{ color: "#94a3b8" }}
            >
              Metode Pelaksanaan
            </label>
            <select
              value={form.metodePelaksanaan}
              onChange={(e) => set("metodePelaksanaan", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ ...inputStyle, color: "#e2e8f0" }}
            >
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Kuota & Publish */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              className="block text-xs font-medium mb-2"
              style={{ color: "#94a3b8" }}
            >
              Kuota Tersedia
            </label>
            <input
              type="number"
              value={form.kuotaTersedia}
              onChange={(e) => set("kuotaTersedia", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={inputStyle}
              min={1}
            />
          </div>

          <div className="flex items-end pb-1">
            <div
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div>
                <p className="text-xs font-medium" style={{ color: "#94a3b8" }}>
                  Publish Jadwal
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                  {form.isPublished
                    ? "Tampil ke publik"
                    : "Draft — tidak tampil ke publik"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => set("isPublished", !form.isPublished)}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  width: "44px",
                  height: "24px",
                  borderRadius: "9999px",
                  background: form.isPublished ? "#14b8a6" : "#1e293b",
                  border: form.isPublished
                    ? "1px solid #0d9488"
                    : "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  transition: "background 0.2s ease, border 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    width: "18px",
                    height: "18px",
                    borderRadius: "9999px",
                    background: "white",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                    transition: "transform 0.2s ease",
                    transform: form.isPublished
                      ? "translateX(22px)"
                      : "translateX(3px)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex items-center gap-3 mt-6 pt-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2.5 rounded-lg text-sm font-medium"
          style={{
            background: "#14b8a6",
            color: "#0f1720",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? "Menyimpan..."
            : isEdit
              ? "Simpan Perubahan"
              : "Tambah Jadwal"}
        </button>
        <button
          onClick={() => router.back()}
          disabled={loading}
          className="px-5 py-2.5 rounded-lg text-sm"
          style={{ color: "#64748b" }}
        >
          Batal
        </button>
      </div>
    </div>
  );
}
