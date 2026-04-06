"use client";

import { useState, useRef } from "react";
import { formatRupiah } from "@/lib/format";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tingkatan = {
  id: number;
  nama: string;
  tarif: number;
  durasi: number | null;
  kuota: number;
  dokumenSkemaUrl?: string | null;
  dokumenSkemaId?: string | null;
};

type Props = {
  sertifikasiId: number;
  initialData: Tingkatan[];
};

const EMPTY_FORM = {
  nama: "",
  tarif: "",
  durasi: "",
  kuota: "20",
  dokumenSkemaUrl: "",
  dokumenSkemaId: "",
};

// ─── FileUploadField ──────────────────────────────────────────────────────────

type FileUploadFieldProps = {
  dokumenSkemaUrl: string;
  uploading: boolean;
  uploadError: string | null;
  onFileChange: (file: File) => void;
  onClear: () => void;
};

function FileUploadField({
  dokumenSkemaUrl,
  uploading,
  uploadError,
  onFileChange,
  onClear,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="col-span-2">
      <label className="block text-xs mb-1" style={{ color: "#64748b" }}>
        Dokumen Skema PDF{" "}
        <span style={{ color: "#334155" }}>(opsional, maks 5 MB)</span>
      </label>

      {dokumenSkemaUrl ? (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
          style={{
            background: "rgba(20,184,166,0.08)",
            border: "1px solid rgba(20,184,166,0.2)",
          }}
        >
          <span style={{ color: "#2dd4bf" }}>📄</span>
          <span
            className="flex-1 text-xs truncate"
            style={{ color: "#2dd4bf" }}
          >
            Dokumen tersimpan
          </span>
          <a
            href={dokumenSkemaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
            style={{ color: "#14b8a6" }}
          >
            Lihat ↗
          </a>
          <button
            type="button"
            onClick={onClear}
            className="text-xs ml-1"
            style={{ color: "#64748b" }}
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-1 py-4 rounded-lg"
          style={{
            background: "#0f1720",
            border: "1px dashed rgba(255,255,255,0.08)",
            color: "#475569",
            opacity: uploading ? 0.6 : 1,
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? (
            <span className="text-xs">Mengupload...</span>
          ) : (
            <>
              <span>⬆</span>
              <span className="text-xs">Klik untuk pilih PDF</span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileChange(file);
          e.target.value = "";
        }}
      />

      {uploadError && (
        <p className="text-xs mt-1" style={{ color: "#f87171" }}>
          {uploadError}
        </p>
      )}
    </div>
  );
}

// ─── TingkatanForm ────────────────────────────────────────────────────────────

type TingkatanFormProps = {
  form: typeof EMPTY_FORM;
  setField: (key: keyof typeof EMPTY_FORM, value: string) => void;
  loading: boolean;
  onSave: () => void;
  onCancel: () => void;
  mode: "add" | "edit";
};

function TingkatanForm({
  form,
  setField,
  loading,
  onSave,
  onCancel,
  mode,
}: TingkatanFormProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error ?? "Upload gagal");
        return;
      }
      setField("dokumenSkemaUrl", data.url);
      setField("dokumenSkemaId", data.publicId);
    } catch {
      setUploadError("Upload gagal, periksa koneksi");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="rounded-lg p-4 mb-4"
      style={{
        background: "rgba(20,184,166,0.04)",
        border: "1px solid rgba(20,184,166,0.12)",
      }}
    >
      <p className="text-xs font-medium mb-3" style={{ color: "#2dd4bf" }}>
        {mode === "add" ? "Tambah Tingkatan" : "Edit Tingkatan"}
      </p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Nama */}
        <div className="col-span-2">
          <label className="block text-xs mb-1" style={{ color: "#64748b" }}>
            Nama Tingkatan *
          </label>
          <input
            type="text"
            value={form.nama}
            onChange={(e) => setField("nama", e.target.value)}
            placeholder="cth: Tingkat Dasar"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: "#0f1720",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0",
            }}
          />
        </div>

        {/* Tarif */}
        <div>
          <label className="block text-xs mb-1" style={{ color: "#64748b" }}>
            Tarif (Rp) *
          </label>
          <input
            type="number"
            value={form.tarif}
            onChange={(e) => setField("tarif", e.target.value)}
            placeholder="cth: 2500000"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: "#0f1720",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0",
            }}
          />
        </div>

        {/* Kuota */}
        <div>
          <label className="block text-xs mb-1" style={{ color: "#64748b" }}>
            Kuota
          </label>
          <input
            type="number"
            value={form.kuota}
            onChange={(e) => setField("kuota", e.target.value)}
            placeholder="20"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: "#0f1720",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0",
            }}
          />
        </div>

        {/* Durasi */}
        <div>
          <label className="block text-xs mb-1" style={{ color: "#64748b" }}>
            Durasi (hari)
          </label>
          <input
            type="number"
            value={form.durasi}
            onChange={(e) => setField("durasi", e.target.value)}
            placeholder="Opsional"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: "#0f1720",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#e2e8f0",
            }}
          />
        </div>

        {/* Upload PDF */}
        <FileUploadField
          dokumenSkemaUrl={form.dokumenSkemaUrl}
          uploading={uploading}
          uploadError={uploadError}
          onFileChange={handleFile}
          onClear={() => {
            setUploadError(null);
            setField("dokumenSkemaUrl", "");
            setField("dokumenSkemaId", "");
          }}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSave}
          disabled={loading || uploading}
          className="text-xs px-4 py-2 rounded-lg font-medium"
          style={{
            background: "#14b8a6",
            color: "#0f1720",
            opacity: loading || uploading ? 0.7 : 1,
          }}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
        <button
          onClick={onCancel}
          className="text-xs px-3 py-2 rounded-lg"
          style={{ color: "#64748b" }}
        >
          Batal
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function TingkatanManager({ sertifikasiId, initialData }: Props) {
  const [list, setList] = useState<Tingkatan[]>(initialData);
  const [editId, setEditId] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const setField = (key: keyof typeof EMPTY_FORM, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setShowAdd(false);
    setEditId(null);
    setError(null);
  };

  const handleAdd = async () => {
    if (!form.nama || !form.tarif) {
      setError("Nama dan tarif wajib diisi");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/sertifikasi/${sertifikasiId}/tingkatan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error);
        return;
      }
      setList((prev) => [...prev, json]);
      resetForm();
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
    if (!form.nama || !form.tarif) {
      setError("Nama dan tarif wajib diisi");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/sertifikasi/${sertifikasiId}/tingkatan/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const json = await res.json();
      if (!res.ok) {
        setError(json.error);
        return;
      }
      setList((prev) => prev.map((t) => (t.id === id ? json : t)));
      resetForm();
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/sertifikasi/${sertifikasiId}/tingkatan/${id}`,
        { method: "DELETE" },
      );
      const json = await res.json();
      if (!res.ok) {
        setError(json.error);
        return;
      }
      setList((prev) => prev.filter((t) => t.id !== id));
      setConfirmDeleteId(null);
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (t: Tingkatan) => {
    setEditId(t.id);
    setShowAdd(false);
    setForm({
      nama: t.nama,
      tarif: t.tarif.toString(),
      durasi: t.durasi?.toString() ?? "",
      kuota: t.kuota.toString(),
      dokumenSkemaUrl: t.dokumenSkemaUrl ?? "",
      dokumenSkemaId: t.dokumenSkemaId ?? "",
    });
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: "#111c27",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold" style={{ color: "#cbd5e1" }}>
          Tingkatan & Tarif
        </h2>
        {!showAdd && editId === null && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
            style={{
              background: "rgba(20,184,166,0.1)",
              color: "#14b8a6",
              border: "1px solid rgba(20,184,166,0.2)",
            }}
          >
            <span>+</span> Tambah Tingkatan
          </button>
        )}
      </div>

      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-lg text-sm"
          style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}
        >
          {error}
        </div>
      )}

      {(showAdd || editId !== null) && (
        <TingkatanForm
          form={form}
          setField={setField}
          loading={loading}
          onSave={() => (editId !== null ? handleEdit(editId) : handleAdd())}
          onCancel={resetForm}
          mode={editId !== null ? "edit" : "add"}
        />
      )}

      {list.length === 0 && !showAdd ? (
        <p className="text-sm text-center py-6" style={{ color: "#475569" }}>
          Belum ada tingkatan. Tambah tingkatan untuk sertifikasi ini.
        </p>
      ) : (
        <div className="flex flex-col gap-2 mt-2">
          {list.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-4 px-4 py-3 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "#e2e8f0" }}>
                  {t.nama}
                </p>
                <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                  <span className="text-xs" style={{ color: "#14b8a6" }}>
                    {formatRupiah(t.tarif)}
                  </span>
                  {t.durasi && (
                    <span className="text-xs" style={{ color: "#475569" }}>
                      {t.durasi} hari
                    </span>
                  )}
                  <span className="text-xs" style={{ color: "#475569" }}>
                    Kuota: {t.kuota}
                  </span>
                  {t.dokumenSkemaUrl && (
                    <a
                      href={t.dokumenSkemaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs"
                      style={{ color: "#2dd4bf" }}
                    >
                      📄 Skema PDF ↗
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => startEdit(t)}
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#94a3b8",
                  }}
                >
                  Edit
                </button>
                {confirmDeleteId === t.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(t.id)}
                      disabled={loading}
                      className="text-xs px-3 py-1.5 rounded-lg"
                      style={{
                        background: "rgba(239,68,68,0.15)",
                        color: "#f87171",
                      }}
                    >
                      {loading ? "..." : "Hapus"}
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="text-xs px-2 py-1.5"
                      style={{ color: "#475569" }}
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(t.id)}
                    className="text-xs px-3 py-1.5 rounded-lg"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
