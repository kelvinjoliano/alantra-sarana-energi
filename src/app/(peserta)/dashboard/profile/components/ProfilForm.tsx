// src/app/(peserta)/dashboard/profil/components/ProfilForm.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface InitialData {
  name: string;
  email: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  alamat: string;
  kota: string;
  provinsi: string;
  noTelepon: string;
  perusahaan: string;
  jabatan: string;
}

interface Props {
  userId: string;
  initialData: InitialData;
}

export function ProfilForm({ initialData }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess(false);
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);

    if (!form.nik || !form.noTelepon) {
      setError("NIK dan nomor telepon wajib diisi");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal menyimpan profil");

      setSuccess(true);

      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Akun — read only */}
      <Section title="Akun">
        <div className="grid grid-cols-2 gap-4">
          <ReadonlyField label="Nama" value={form.name} />
          <ReadonlyField label="Email" value={form.email} />
        </div>
      </Section>

      {/* Data Diri */}
      <Section title="Data Diri">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="NIK *"
            name="nik"
            value={form.nik}
            onChange={handleChange}
            placeholder="16 digit NIK"
            maxLength={16}
          />
          <SelectField
            label="Jenis Kelamin"
            name="jenisKelamin"
            value={form.jenisKelamin}
            onChange={handleChange}
            options={[
              { value: "", label: "Pilih..." },
              { value: "Laki-laki", label: "Laki-laki" },
              { value: "Perempuan", label: "Perempuan" },
            ]}
          />
          <InputField
            label="Tempat Lahir"
            name="tempatLahir"
            value={form.tempatLahir}
            onChange={handleChange}
            placeholder="Kota tempat lahir"
          />
          <InputField
            label="Tanggal Lahir"
            name="tanggalLahir"
            type="date"
            value={form.tanggalLahir}
            onChange={handleChange}
          />
          <InputField
            label="No. Telepon *"
            name="noTelepon"
            value={form.noTelepon}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
          />
        </div>

        <div className="mt-4">
          <label className="block text-xs mb-1.5" style={{ color: "#64748b" }}>
            Alamat
          </label>
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            rows={2}
            placeholder="Alamat lengkap"
            className="w-full rounded-lg px-4 py-2.5 text-sm resize-none"
            style={{
              background: "#0f1720",
              border: "1px solid #1e3448",
              color: "#e2e8f0",
              outline: "none",
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <InputField
            label="Kota"
            name="kota"
            value={form.kota}
            onChange={handleChange}
            placeholder="Kota domisili"
          />
          <InputField
            label="Provinsi"
            name="provinsi"
            value={form.provinsi}
            onChange={handleChange}
            placeholder="Provinsi"
          />
        </div>
      </Section>

      {/* Pekerjaan */}
      <Section title="Pekerjaan">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Perusahaan / Instansi"
            name="perusahaan"
            value={form.perusahaan}
            onChange={handleChange}
            placeholder="Nama perusahaan"
          />
          <InputField
            label="Jabatan"
            name="jabatan"
            value={form.jabatan}
            onChange={handleChange}
            placeholder="Jabatan / posisi"
          />
        </div>
      </Section>

      {error && (
        <p
          className="text-sm rounded-lg px-4 py-3"
          style={{ background: "#3f1515", color: "#f87171" }}
        >
          {error}
        </p>
      )}

      {success && !callbackUrl && (
        <p
          className="text-sm rounded-lg px-4 py-3"
          style={{ background: "#0a2d1f", color: "#34d399" }}
        >
          ✓ Profil berhasil disimpan
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-semibold text-sm"
        style={{
          background: "#14b8a6",
          color: "#0f1720",
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Menyimpan..." : "Simpan Profil"}
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
      <p className="text-xs mb-1.5" style={{ color: "#64748b" }}>
        {label}
      </p>
      <p
        className="text-sm px-4 py-2.5 rounded-lg"
        style={{ background: "#0f1720", color: "#64748b" }}
      >
        {value || "-"}
      </p>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs mb-1.5"
        style={{ color: "#64748b" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full rounded-lg px-4 py-2.5 text-sm"
        style={{
          background: "#0f1720",
          border: "1px solid #1e3448",
          color: "#e2e8f0",
          outline: "none",
        }}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs mb-1.5"
        style={{ color: "#64748b" }}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg px-4 py-2.5 text-sm"
        style={{
          background: "#0f1720",
          border: "1px solid #1e3448",
          color: "#e2e8f0",
          outline: "none",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
