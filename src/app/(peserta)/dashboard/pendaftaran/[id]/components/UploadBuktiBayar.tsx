// src/app/(peserta)/dashboard/pendaftaran/[id]/components/UploadBuktiBayar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UploadBuktiBayar({ pendaftaranId }: { pendaftaranId: string }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploaded, setUploaded] = useState<{
    cloudinaryId: string;
    cloudinaryUrl: string;
  } | null>(null);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selected);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload gagal");
      const data = await res.json();

      setUploaded({
        cloudinaryId: data.public_id,
        cloudinaryUrl: data.secure_url,
      });
    } catch {
      setError("Gagal mengupload file, coba lagi");
      setFile(null);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit() {
    if (!uploaded) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/pendaftaran/${pendaftaranId}/pembayaran`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buktiCloudinaryId: uploaded.cloudinaryId,
          buktiCloudinaryUrl: uploaded.cloudinaryUrl,
          metodePembayaran: "TRANSFER_BANK",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal submit bukti bayar");

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "#111c27", border: "1px solid #1e3448" }}
    >
      <h2
        className="text-sm font-semibold mb-1 uppercase tracking-wide"
        style={{ color: "#64748b" }}
      >
        Upload Bukti Pembayaran
      </h2>
      <p className="text-xs mb-4" style={{ color: "#475569" }}>
        Upload screenshot atau foto bukti transfer
      </p>

      {!uploaded ? (
        <label
          className="flex flex-col items-center justify-center gap-2 rounded-lg cursor-pointer"
          style={{
            border: "2px dashed #1e3448",
            padding: "32px",
            opacity: uploading ? 0.6 : 1,
          }}
        >
          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            disabled={uploading}
            onChange={handleFileChange}
          />
          {uploading ? (
            <p className="text-sm" style={{ color: "#64748b" }}>
              Mengupload...
            </p>
          ) : (
            <>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Klik untuk pilih file
              </p>
              <p className="text-xs" style={{ color: "#475569" }}>
                JPG, PNG, atau PDF — maks 5MB
              </p>
            </>
          )}
        </label>
      ) : (
        <div className="space-y-4">
          {/* Preview */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-lg"
            style={{ background: "#0a2d1f", border: "1px solid #14b8a6" }}
          >
            <span style={{ color: "#34d399" }}>✓</span>
            <p className="text-sm flex-1 truncate" style={{ color: "#e2e8f0" }}>
              {file?.name}
            </p>
            <button
              onClick={() => {
                setFile(null);
                setUploaded(null);
              }}
              className="text-xs"
              style={{ color: "#64748b" }}
            >
              Ganti
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3 rounded-xl font-semibold text-sm"
            style={{
              background: "#14b8a6",
              color: "#0f1720",
              opacity: submitting ? 0.6 : 1,
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "Mengirim..." : "Konfirmasi Pembayaran"}
          </button>
        </div>
      )}

      {error && (
        <p
          className="mt-3 text-sm rounded-lg px-4 py-3"
          style={{ background: "#3f1515", color: "#f87171" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
