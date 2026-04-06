// src/app/admin/pendaftaran-publik/[id]/components/UpdateStatusForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = [
  { value: "BARU", label: "Baru" },
  { value: "DIPROSES", label: "Diproses" },
  { value: "SELESAI", label: "Selesai" },
  { value: "DITOLAK", label: "Ditolak" },
];

export function UpdateStatusForm({
  id,
  currentStatus,
  currentCatatan,
}: {
  id: string;
  currentStatus: string;
  currentCatatan: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [catatan, setCatatan] = useState(currentCatatan);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`/api/pendaftaran-publik/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, catatanAdmin: catatan }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal update status");

      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "#111c27", border: "1px solid #1e3448" }}
    >
      <h2
        className="text-sm font-semibold mb-4 uppercase tracking-wide"
        style={{ color: "#64748b" }}
      >
        Update Status
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1.5" style={{ color: "#64748b" }}>
            Status
          </label>
          <div className="grid grid-cols-4 gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                className="py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: status === opt.value ? "#14b8a6" : "#0f1720",
                  border: `1px solid ${status === opt.value ? "#14b8a6" : "#1e3448"}`,
                  color: status === opt.value ? "#0f1720" : "#94a3b8",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1.5" style={{ color: "#64748b" }}>
            Catatan Admin (opsional)
          </label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            rows={3}
            placeholder="Catatan untuk internal atau alasan penolakan..."
            className="w-full rounded-lg px-4 py-2.5 text-sm resize-none"
            style={{
              background: "#0f1720",
              border: "1px solid #1e3448",
              color: "#e2e8f0",
              outline: "none",
            }}
          />
        </div>

        {error && (
          <p
            className="text-sm rounded-lg px-4 py-3"
            style={{ background: "#3f1515", color: "#f87171" }}
          >
            {error}
          </p>
        )}

        {success && (
          <p
            className="text-sm rounded-lg px-4 py-3"
            style={{ background: "#0a2d1f", color: "#34d399" }}
          >
            ✓ Status berhasil diupdate
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-sm"
          style={{
            background: "#14b8a6",
            color: "#0f1720",
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}
