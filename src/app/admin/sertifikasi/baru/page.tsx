import { SertifikasiForm } from "../components/SertifikasiForm";

export default function SertifikasiBaruPage() {
  return (
    <div style={{ maxWidth: "720px" }}>
      <div className="mb-6">
        <h1 className="text-xl font-semibold" style={{ color: "#f1f5f9" }}>
          Tambah Sertifikasi
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
          Isi detail sertifikasi baru. Tingkatan dapat ditambahkan setelah
          disimpan.
        </p>
      </div>

      <SertifikasiForm mode="baru" />
    </div>
  );
}
