"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";

const SKEMA_OPTIONS = [
  "Operator K3",
  "Petugas K3",
  "Ahli K3",
  "Teknisi K3 Ketenagalistrikan",
  "Ahli K3 Ketenagalistrikan",
  "TKBT 2",
  "Operator Excavator",
  "Juru Ikat Beban/Rigger",
  "Lifting Supervisor",
  "Inspektor Pesawat Angkat",
  "Operator K3 Migas",
  "Pengawas K3 Migas",
  "Operator Scaffolding",
  "Pengawas Scaffolding",
  "Operator Mobil Crane",
  "Operator Forklift",
  "Authorized Gas Tester",
  "Petugas H2S",
  "Teknisi Ruang Terbatas",
  "Ahli Muda Ruang Terbatas",
  "Auditor SMK3",
  "Petugas P3K",
  "Petugas Investigasi Kecelakaan",
  "Ahli Higiene Industri Muda (HIMU)",
  "Ahli Higiene Industri Madya (HIMA)",
  "Ahli Higiene Industri Utama (HIU)",
  "TOT Level 3",
  "TOT Level 4",
  "TOT Level 6",
  "Pengawas Operasional Pertama (POP)",
  "Pengawas Operasional Madya (POM)",
  "Pengawas Operasional Utama (POU)",
  "Plate Welder",
  "Keamanan Pangan HACCP",
  "Other",
];

const BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

type FileField = "fotoKtp" | "fotoIjazah" | "pasFoto" | "suratPengalaman";

const FILE_LABELS: Record<FileField, string> = {
  fotoKtp: "FOTO KTP",
  fotoIjazah: "FOTO IJAZAH",
  pasFoto: "PAS FOTO WARNA MERAH",
  suratPengalaman: "SURAT KETERANGAN PENGALAMAN KERJA",
};

export default function DaftarPublikPage() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    nik: "",
    noHp: "",
    tempatLahir: "",
    tanggalLahir: { tanggal: "", bulan: "", tahun: "" },
    jenisKelamin: "",
    alamat: "",
    kodePos: "",
    pendidikan: "",
    skema: "",
    skemaCustom: "",
    metode: "",
    penanggungjawab: "",
  });

  const [files, setFiles] = useState<Record<FileField, File | null>>({
    fotoKtp: null,
    fotoIjazah: null,
    pasFoto: null,
    suratPengalaman: null,
  });

  const [compressing, setCompressing] = useState<Record<FileField, boolean>>({
    fotoKtp: false,
    fotoIjazah: false,
    pasFoto: false,
    suratPengalaman: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    if (name === "tanggal" || name === "bulan" || name === "tahun") {
      setForm((prev) => ({
        ...prev,
        tanggalLahir: { ...prev.tanggalLahir, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setError("");
  }

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: FileField,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError(`File ${FILE_LABELS[field]} melebihi batas 10MB`);
      return;
    }

    setError("");

    // Kompres jika gambar
    if (file.type.startsWith("image/")) {
      setCompressing((prev) => ({ ...prev, [field]: true }));
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });
        const compressedFile = new File([compressed], file.name, {
          type: compressed.type,
        });
        setFiles((prev) => ({ ...prev, [field]: compressedFile }));
      } catch {
        // Kalau gagal kompres, pakai file asli
        setFiles((prev) => ({ ...prev, [field]: file }));
      } finally {
        setCompressing((prev) => ({ ...prev, [field]: false }));
      }
    } else {
      // PDF — langsung pakai
      setFiles((prev) => ({ ...prev, [field]: file }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const { tanggal, bulan, tahun } = form.tanggalLahir;
    if (!tanggal || !bulan || !tahun) {
      setError("Tanggal lahir wajib diisi lengkap");
      return;
    }

    if (
      !files.fotoKtp ||
      !files.fotoIjazah ||
      !files.pasFoto ||
      !files.suratPengalaman
    ) {
      setError("Semua dokumen wajib diupload");
      return;
    }

    if (Object.values(compressing).some(Boolean)) {
      setError("Tunggu proses kompres file selesai");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      const tanggalLahir = `${tanggal} ${bulan} ${tahun}`;
      const skemaFinal = form.skema === "Other" ? form.skemaCustom : form.skema;

      formData.append("nama", form.nama);
      formData.append("email", form.email);
      formData.append("nik", form.nik);
      formData.append("noHp", `0${form.noHp}`);
      formData.append("tempatLahir", form.tempatLahir);
      formData.append("tanggalLahir", tanggalLahir);
      formData.append("jenisKelamin", form.jenisKelamin);
      formData.append("alamat", form.alamat);
      formData.append("kodePos", form.kodePos);
      formData.append("pendidikan", form.pendidikan);
      formData.append("skema", skemaFinal);
      formData.append("metode", form.metode);
      formData.append("penanggungjawab", form.penanggungjawab);
      formData.append("fotoKtp", files.fotoKtp);
      formData.append("fotoIjazah", files.fotoIjazah);
      formData.append("pasFoto", files.pasFoto);
      formData.append("suratPengalaman", files.suratPengalaman);

      const res = await fetch("/api/daftar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mengirim pendaftaran");

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#0f1720" }}
      >
        <div
          className="max-w-md w-full rounded-2xl p-10 text-center"
          style={{ background: "#111c27", border: "1px solid #14b8a6" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "#0a2d1f" }}
          >
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#f1f5f9" }}>
            Pendaftaran Berhasil!
          </h2>
          <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
            Data pendaftaran Anda telah kami terima. Tim kami akan menghubungi
            Anda melalui nomor HP yang terdaftar dalam waktu 1x24 jam.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: "#14b8a6", color: "#0f1720" }}
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: "#0f1720" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#f1f5f9" }}>
            Formulir Pendaftaran
          </h1>
          <p className="text-sm" style={{ color: "#64748b" }}>
            PT. Alantra Sarana Energi — Sertifikasi K3 & Kompetensi
          </p>
        </div>

        {error && (
          <div
            className="rounded-xl px-5 py-4 mb-6"
            style={{ background: "#3f1515", border: "1px solid #f87171" }}
          >
            <p className="text-sm" style={{ color: "#f87171" }}>
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Data Diri */}
          <Section title="Data Diri">
            <div className="space-y-4">
              <InputField
                label="NAMA LENGKAP (HURUF BESAR)"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Tulis nama lengkap dengan huruf besar"
                required
                inputStyle={{ textTransform: "uppercase" }}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
              <InputField
                label="NIK (Nomor Induk Kependudukan)"
                name="nik"
                value={form.nik}
                onChange={handleChange}
                placeholder="16 digit NIK sesuai KTP"
                maxLength={16}
                required
              />

              {/* No HP */}
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                  style={{ color: "#94a3b8" }}
                >
                  No HP <span style={{ color: "#f87171" }}>*</span>
                </label>
                <div className="flex gap-2">
                  <div
                    className="flex items-center px-3 rounded-lg text-sm shrink-0"
                    style={{
                      background: "#1e3448",
                      color: "#94a3b8",
                      border: "1px solid #1e3448",
                    }}
                  >
                    🇮🇩 +62
                  </div>
                  <input
                    name="noHp"
                    type="tel"
                    value={form.noHp}
                    onChange={handleChange}
                    placeholder="8xxxxxxxxxx"
                    required
                    className="flex-1 rounded-lg px-4 py-2.5 text-sm"
                    style={{
                      background: "#0f1720",
                      border: "1px solid #1e3448",
                      color: "#e2e8f0",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <InputField
                label="TEMPAT LAHIR"
                name="tempatLahir"
                value={form.tempatLahir}
                onChange={handleChange}
                placeholder="Kota tempat lahir"
                required
              />

              {/* Tanggal Lahir */}
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                  style={{ color: "#94a3b8" }}
                >
                  TANGGAL LAHIR <span style={{ color: "#f87171" }}>*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      name: "tanggal",
                      placeholder: "Tanggal",
                      options: Array.from({ length: 31 }, (_, i) => ({
                        value: String(i + 1),
                        label: String(i + 1),
                      })),
                    },
                    {
                      name: "bulan",
                      placeholder: "Bulan",
                      options: BULAN.map((b) => ({ value: b, label: b })),
                    },
                    {
                      name: "tahun",
                      placeholder: "Tahun",
                      options: Array.from(
                        { length: 60 },
                        (_, i) => new Date().getFullYear() - i,
                      ).map((y) => ({ value: String(y), label: String(y) })),
                    },
                  ].map((sel) => (
                    <select
                      key={sel.name}
                      name={sel.name}
                      value={
                        form.tanggalLahir[
                          sel.name as keyof typeof form.tanggalLahir
                        ]
                      }
                      onChange={handleChange}
                      required
                      className="rounded-lg px-3 py-2.5 text-sm"
                      style={{
                        background: "#0f1720",
                        border: "1px solid #1e3448",
                        color: "#e2e8f0",
                        outline: "none",
                      }}
                    >
                      <option value="">{sel.placeholder}</option>
                      {sel.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ))}
                </div>
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                  style={{ color: "#94a3b8" }}
                >
                  JENIS KELAMIN <span style={{ color: "#f87171" }}>*</span>
                </label>
                <div className="flex gap-3">
                  {["LAKI-LAKI", "PEREMPUAN"].map((jk) => (
                    <label
                      key={jk}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer flex-1 justify-center text-sm font-medium"
                      style={{
                        background:
                          form.jenisKelamin === jk ? "#14b8a6" : "#0f1720",
                        border: `1px solid ${form.jenisKelamin === jk ? "#14b8a6" : "#1e3448"}`,
                        color: form.jenisKelamin === jk ? "#0f1720" : "#94a3b8",
                      }}
                    >
                      <input
                        type="radio"
                        name="jenisKelamin"
                        value={jk}
                        checked={form.jenisKelamin === jk}
                        onChange={handleChange}
                        className="hidden"
                        required
                      />
                      {jk}
                    </label>
                  ))}
                </div>
              </div>

              {/* Alamat */}
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                  style={{ color: "#94a3b8" }}
                >
                  ALAMAT LENGKAP <span style={{ color: "#f87171" }}>*</span>
                </label>
                <textarea
                  name="alamat"
                  value={form.alamat}
                  onChange={handleChange}
                  rows={3}
                  required
                  placeholder="Alamat lengkap sesuai KTP"
                  className="w-full rounded-lg px-4 py-2.5 text-sm resize-none"
                  style={{
                    background: "#0f1720",
                    border: "1px solid #1e3448",
                    color: "#e2e8f0",
                    outline: "none",
                  }}
                />
              </div>

              <InputField
                label="KODE POS"
                name="kodePos"
                value={form.kodePos}
                onChange={handleChange}
                placeholder="Kode pos"
                maxLength={5}
                required
              />
            </div>
          </Section>

          {/* Sertifikasi */}
          <Section title="Sertifikasi">
            <div className="space-y-4">
              {/* Pendidikan */}
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                  style={{ color: "#94a3b8" }}
                >
                  LULUSAN PENDIDIKAN <span style={{ color: "#f87171" }}>*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["SLTP", "SLTA/SMK SEDERAJAT", "D3", "S1"].map((p) => (
                    <label
                      key={p}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer text-sm font-medium justify-center"
                      style={{
                        background:
                          form.pendidikan === p ? "#14b8a6" : "#0f1720",
                        border: `1px solid ${form.pendidikan === p ? "#14b8a6" : "#1e3448"}`,
                        color: form.pendidikan === p ? "#0f1720" : "#94a3b8",
                      }}
                    >
                      <input
                        type="radio"
                        name="pendidikan"
                        value={p}
                        checked={form.pendidikan === p}
                        onChange={handleChange}
                        className="hidden"
                        required
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </div>

              {/* Skema */}
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                  style={{ color: "#94a3b8" }}
                >
                  SKEMA YANG DIAMBIL <span style={{ color: "#f87171" }}>*</span>
                </label>
                <select
                  name="skema"
                  value={form.skema}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg px-4 py-2.5 text-sm"
                  style={{
                    background: "#0f1720",
                    border: "1px solid #1e3448",
                    color: form.skema ? "#e2e8f0" : "#475569",
                    outline: "none",
                  }}
                >
                  <option value="">Pilih skema sertifikasi...</option>
                  {SKEMA_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {form.skema === "Other" && (
                  <input
                    name="skemaCustom"
                    type="text"
                    value={form.skemaCustom}
                    onChange={handleChange}
                    placeholder="Tuliskan skema yang diinginkan"
                    required
                    className="w-full mt-2 rounded-lg px-4 py-2.5 text-sm"
                    style={{
                      background: "#0f1720",
                      border: "1px solid #14b8a6",
                      color: "#e2e8f0",
                      outline: "none",
                    }}
                  />
                )}
                {form.skema === "Other" && (
                  <p className="text-xs mt-1" style={{ color: "#64748b" }}>
                    Klik Other untuk memilih skema lain
                  </p>
                )}
              </div>

              {/* Metode */}
              <div>
                <label
                  className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                  style={{ color: "#94a3b8" }}
                >
                  METODE SERTIFIKASI <span style={{ color: "#f87171" }}>*</span>
                </label>
                <div className="flex gap-3">
                  {["Online", "Offline"].map((m) => (
                    <label
                      key={m}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer flex-1 justify-center text-sm font-medium"
                      style={{
                        background: form.metode === m ? "#14b8a6" : "#0f1720",
                        border: `1px solid ${form.metode === m ? "#14b8a6" : "#1e3448"}`,
                        color: form.metode === m ? "#0f1720" : "#94a3b8",
                      }}
                    >
                      <input
                        type="radio"
                        name="metode"
                        value={m}
                        checked={form.metode === m}
                        onChange={handleChange}
                        className="hidden"
                        required
                      />
                      {m}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Upload Dokumen */}
          <Section title="Dokumen">
            <p className="text-xs mb-4" style={{ color: "#64748b" }}>
              Gambar akan dikompres otomatis. Maks 10MB per file, format PDF
              atau JPG.
            </p>
            <div className="space-y-4">
              {(Object.keys(FILE_LABELS) as FileField[]).map((field) => (
                <div key={field}>
                  <label
                    className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                    style={{ color: "#94a3b8" }}
                  >
                    {FILE_LABELS[field]}{" "}
                    <span style={{ color: "#f87171" }}>*</span>
                  </label>
                  {compressing[field] ? (
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-lg"
                      style={{ background: "#1e3448" }}
                    >
                      <p className="text-sm" style={{ color: "#64748b" }}>
                        Mengkompres gambar...
                      </p>
                    </div>
                  ) : files[field] ? (
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-lg"
                      style={{
                        background: "#0a2d1f",
                        border: "1px solid #14b8a6",
                      }}
                    >
                      <span style={{ color: "#34d399" }}>✓</span>
                      <p
                        className="text-sm flex-1 truncate"
                        style={{ color: "#e2e8f0" }}
                      >
                        {files[field]!.name}
                      </p>
                      <span className="text-xs" style={{ color: "#64748b" }}>
                        {(files[field]!.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFiles((prev) => ({ ...prev, [field]: null }))
                        }
                        className="text-xs"
                        style={{ color: "#64748b" }}
                      >
                        Ganti
                      </button>
                    </div>
                  ) : (
                    <label
                      className="flex flex-col items-center justify-center gap-2 rounded-lg cursor-pointer py-6"
                      style={{ border: "2px dashed #1e3448" }}
                    >
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, field)}
                      />
                      <p className="text-sm" style={{ color: "#94a3b8" }}>
                        Klik untuk pilih file
                      </p>
                      <p className="text-xs" style={{ color: "#475569" }}>
                        PDF, JPG, atau PNG — maks 10MB
                      </p>
                    </label>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Penanggung Jawab */}
          <Section title="Informasi Tambahan">
            <InputField
              label="Nama dan No WA Penanggung Jawab yang Menginformasikan Brosur Pelatihan"
              name="penanggungjawab"
              value={form.penanggungjawab}
              onChange={handleChange}
              placeholder="Contoh: Budi Santoso / 08123456789"
              required
            />
          </Section>

          <button
            type="submit"
            disabled={loading || Object.values(compressing).some(Boolean)}
            className="w-full py-4 rounded-xl font-bold text-base tracking-wide"
            style={{
              background: "#14b8a6",
              color: "#0f1720",
              opacity:
                loading || Object.values(compressing).some(Boolean) ? 0.6 : 1,
              cursor:
                loading || Object.values(compressing).some(Boolean)
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {loading ? "Mengirim data & mengupload dokumen..." : "DAFTAR"}
          </button>

          <p className="text-center text-xs pb-6" style={{ color: "#475569" }}>
            Dengan mendaftar, Anda menyetujui penggunaan data untuk keperluan
            sertifikasi.
          </p>
        </form>
      </div>
    </div>
  );
}

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
        className="text-sm font-bold mb-5 uppercase tracking-widest"
        style={{ color: "#14b8a6" }}
      >
        {title}
      </h2>
      {children}
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
  required,
  maxLength,
  inputStyle,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  inputStyle?: React.CSSProperties;
}) {
  return (
    <div>
      <label
        className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
        style={{ color: "#94a3b8" }}
      >
        {label} {required && <span style={{ color: "#f87171" }}>*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        style={{
          background: "#0f1720",
          border: "1px solid #1e3448",
          color: "#e2e8f0",
          outline: "none",
          ...inputStyle,
        }}
        className="w-full rounded-lg px-4 py-2.5 text-sm"
      />
    </div>
  );
}
