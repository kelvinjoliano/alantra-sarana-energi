"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const KATEGORI_OPTIONS = [
  "Listrik",
  "Minyak dan Gas",
  "Konstruksi",
  "K3",
  "Lingkungan",
  "Manajemen",
  "Lainnya",
];

type FormData = {
  nama: string;
  kategori: string;
  deskripsi: string;
  isActive: boolean;
};

type Props = {
  mode: "baru" | "edit";
  id?: number;
  initialData?: Partial<FormData>;
};

export function SertifikasiForm({ mode, id, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    nama: initialData?.nama ?? "",
    kategori: initialData?.kategori ?? "",
    deskripsi: initialData?.deskripsi ?? "",
    isActive: initialData?.isActive ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!form.nama.trim() || !form.kategori) {
      setError("Nama dan kategori wajib diisi");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        mode === "baru" ? "/api/sertifikasi" : `/api/sertifikasi/${id}`,
        {
          method: mode === "baru" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Gagal menyimpan");
        return;
      }

      router.push("/admin/sertifikasi");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
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
        {/* Nama */}
        <div>
          <label
            className="block text-xs font-medium mb-2"
            style={{ color: "#94a3b8" }}
          >
            Nama Sertifikasi <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="text"
            value={form.nama}
            onChange={(e) => set("nama", e.target.value)}
            placeholder="cth: Sertifikasi Kompetensi Listrik Industri"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
            style={{
              background: "#0f1720",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0",
            }}
          />
        </div>

        {/* Kategori */}
        <div>
          <label
            className="block text-xs font-medium mb-2"
            style={{ color: "#94a3b8" }}
          >
            Kategori <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            value={form.kategori}
            onChange={(e) => set("kategori", e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
            style={{
              background: "#0f1720",
              border: "1px solid rgba(255,255,255,0.08)",
              color: form.kategori ? "#e2e8f0" : "#475569",
            }}
          >
            <option value="">Pilih kategori...</option>
            {KATEGORI_OPTIONS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        {/* Deskripsi */}
        <div>
          <label
            className="block text-xs font-medium mb-2"
            style={{ color: "#94a3b8" }}
          >
            Deskripsi
          </label>
          <textarea
            value={form.deskripsi}
            onChange={(e) => set("deskripsi", e.target.value)}
            placeholder="Deskripsi singkat tentang sertifikasi ini..."
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
            style={{
              background: "#0f1720",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0",
            }}
          />
        </div>

        {/* Status */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div>
            <p className="text-xs font-medium" style={{ color: "#94a3b8" }}>
              Status Aktif
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
              {form.isActive
                ? "Tampil di halaman publik"
                : "Nonaktif — tidak tampil di halaman publik"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => set("isActive", !form.isActive)}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              width: "44px",
              height: "24px",
              borderRadius: "9999px",
              background: form.isActive ? "#14b8a6" : "#1e293b",
              border: form.isActive
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
                transform: form.isActive
                  ? "translateX(22px)"
                  : "translateX(3px)",
              }}
            />
          </button>
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
          className="px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity"
          style={{
            background: "#14b8a6",
            color: "#0f1720",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? "Menyimpan..."
            : mode === "baru"
              ? "Simpan Sertifikasi"
              : "Simpan Perubahan"}
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
