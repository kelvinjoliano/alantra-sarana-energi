// src/app/(peserta)/daftar/[jadwalId]/components/DaftarForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PesertaInfo {
  nama: string;
  email: string;
  telepon: string;
  nik: string;
  perusahaan: string;
  jabatan: string;
}

interface Props {
  jadwalId: number;
  tingkatanId: number;
  totalBiaya: number;
  peserta: PesertaInfo;
}

type UploadedFile = {
  cloudinaryId: string;
  cloudinaryUrl: string;
  nama: string;
} | null;

export function DaftarForm({
  jadwalId,
  tingkatanId,
  totalBiaya,
  peserta,
}: Props) {
  const router = useRouter();
  const [catatan, setCatatan] = useState("");
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [dokumen, setDokumen] = useState<{
    ktp: UploadedFile;
    ijazah: UploadedFile;
  }>({ ktp: null, ijazah: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(file: File, tipe: "ktp" | "ijazah") {
    setUploading((prev) => ({ ...prev, [tipe]: true }));
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload gagal");
      const data = await res.json();

      setDokumen((prev) => ({
        ...prev,
        [tipe]: {
          cloudinaryId: data.public_id,
          cloudinaryUrl: data.secure_url,
          nama: file.name,
        },
      }));
    } catch {
      setError(`Gagal upload ${tipe.toUpperCase()}, coba lagi`);
    } finally {
      setUploading((prev) => ({ ...prev, [tipe]: false }));
    }
  }

  async function handleSubmit() {
    setError("");

    if (!dokumen.ktp) {
      setError("KTP wajib diupload");
      return;
    }
    if (!dokumen.ijazah) {
      setError("Ijazah wajib diupload");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/pendaftaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jadwalId,
          tingkatanId,
          catatan,
          dokumen: {
            ktp: dokumen.ktp,
            ijazah: dokumen.ijazah,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mendaftar");

      router.push(`/dashboard/pendaftaran/${data.id}?success=1`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Data Diri (read-only, dari profil) */}
      <Section title="Data Diri">
        <p className="text-xs mb-4" style={{ color: "#64748b" }}>
          Data diambil dari profil kamu.{" "}
          <a href="/dashboard/profil" style={{ color: "#14b8a6" }}>
            Ubah profil
          </a>
        </p>
        <div className="grid grid-cols-2 gap-4">
          <ReadonlyField label="Nama Lengkap" value={peserta.nama} />
          <ReadonlyField label="Email" value={peserta.email} />
          <ReadonlyField label="No. Telepon" value={peserta.telepon} />
          <ReadonlyField label="NIK" value={peserta.nik} />
          <ReadonlyField
            label="Perusahaan/Instansi"
            value={peserta.perusahaan || "-"}
          />
          <ReadonlyField label="Jabatan" value={peserta.jabatan || "-"} />
        </div>
      </Section>

      {/* Upload Dokumen */}
      <Section title="Dokumen Persyaratan">
        <div className="space-y-4">
          <UploadField
            label="KTP *"
            accept="image/*,.pdf"
            uploaded={dokumen.ktp}
            isUploading={uploading.ktp}
            onChange={(file) => handleUpload(file, "ktp")}
          />
          <UploadField
            label="Ijazah Terakhir *"
            accept="image/*,.pdf"
            uploaded={dokumen.ijazah}
            isUploading={uploading.ijazah}
            onChange={(file) => handleUpload(file, "ijazah")}
          />
        </div>
      </Section>

      {/* Catatan */}
      <Section title="Catatan (opsional)">
        <textarea
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          rows={3}
          placeholder="Ada informasi tambahan yang ingin disampaikan?"
          className="w-full rounded-lg px-4 py-3 text-sm resize-none"
          style={{
            background: "#0f1720",
            border: "1px solid #1e3448",
            color: "#e2e8f0",
            outline: "none",
          }}
        />
      </Section>

      {/* Total Biaya */}
      <div
        className="rounded-xl p-5 flex items-center justify-between"
        style={{ background: "#111c27", border: "1px solid #14b8a6" }}
      >
        <div>
          <p className="text-sm" style={{ color: "#94a3b8" }}>
            Total Biaya Pendaftaran
          </p>
          <p className="text-2xl font-bold mt-1" style={{ color: "#14b8a6" }}>
            Rp {totalBiaya.toLocaleString("id-ID")}
          </p>
        </div>
        <p className="text-xs text-right" style={{ color: "#64748b" }}>
          Pembayaran dilakukan
          <br />
          setelah pendaftaran disubmit
        </p>
      </div>

      {error && (
        <p
          className="text-sm rounded-lg px-4 py-3"
          style={{ background: "#3f1515", color: "#f87171" }}
        >
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || Object.values(uploading).some(Boolean)}
        className="w-full py-4 rounded-xl font-semibold text-sm transition-opacity"
        style={{
          background: "#14b8a6",
          color: "#0f1720",
          opacity: loading || Object.values(uploading).some(Boolean) ? 0.6 : 1,
          cursor:
            loading || Object.values(uploading).some(Boolean)
              ? "not-allowed"
              : "pointer",
        }}
      >
        {loading ? "Memproses..." : "Submit Pendaftaran"}
      </button>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "#111c27", border: "1px solid #1e3448" }}
    >
      <h2
        className="text-sm font-semibold mb-4 uppercase tracking-wide"
        style={{ color: "#64748b" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs mb-1" style={{ color: "#64748b" }}>
        {label}
      </p>
      <p
        className="text-sm px-3 py-2 rounded-lg"
        style={{ background: "#0f1720", color: "#94a3b8" }}
      >
        {value}
      </p>
    </div>
  );
}

function UploadField({
  label,
  accept,
  uploaded,
  isUploading,
  onChange,
}: {
  label: string;
  accept: string;
  uploaded: UploadedFile;
  isUploading?: boolean;
  onChange: (file: File) => void;
}) {
  return (
    <div>
      <p className="text-xs mb-2" style={{ color: "#64748b" }}>
        {label}
      </p>
      {uploaded ? (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg"
          style={{ background: "#0d2b1e", border: "1px solid #14b8a6" }}
        >
          <span style={{ color: "#14b8a6" }}>✓</span>
          <span className="text-sm truncate" style={{ color: "#e2e8f0" }}>
            {uploaded.nama}
          </span>
          <button
            onClick={() => onChange(new File([], ""))}
            className="ml-auto text-xs"
            style={{ color: "#64748b" }}
          >
            Ganti
          </button>
        </div>
      ) : (
        <label
          className="flex flex-col items-center justify-center gap-2 rounded-lg cursor-pointer transition-colors"
          style={{
            border: "2px dashed #1e3448",
            padding: "24px",
            background: isUploading ? "#111c27" : "transparent",
          }}
        >
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChange(file);
            }}
          />
          {isUploading ? (
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
      )}
    </div>
  );
}
