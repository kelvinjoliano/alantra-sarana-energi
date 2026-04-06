// src/app/admin/jadwal/[sertifikasiId]/baru/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import JadwalForm from "../components/JadwalForm";
import Link from "next/link";

export default async function TambahJadwalPage({
  params,
}: {
  params: Promise<{ sertifikasiId: string }>;
}) {
  const { sertifikasiId: rawId } = await params;
  const sertifikasiId = parseInt(rawId);

  const sertifikasi = await prisma.sertifikasi.findUnique({
    where: { id: sertifikasiId },
    include: {
      tingkatan: {
        select: { id: true, nama: true, tarif: true },
        orderBy: { id: "asc" },
      },
    },
  });

  if (!sertifikasi) notFound();

  return (
    <div style={{ maxWidth: "720px" }}>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Link
            href="/admin/jadwal"
            className="text-sm"
            style={{ color: "#475569" }}
          >
            Jadwal
          </Link>
          <span style={{ color: "#334155" }}>/</span>
          <Link
            href={`/admin/jadwal/${sertifikasiId}`}
            className="text-sm"
            style={{ color: "#475569" }}
          >
            {sertifikasi.nama}
          </Link>
          <span style={{ color: "#334155" }}>/</span>
          <span className="text-sm" style={{ color: "#94a3b8" }}>
            Tambah
          </span>
        </div>
        <h1 className="text-xl font-semibold" style={{ color: "#f1f5f9" }}>
          Tambah Jadwal
        </h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>
          {sertifikasi.nama}
        </p>
      </div>

      <JadwalForm
        sertifikasiId={sertifikasiId}
        sertifikasiNama={sertifikasi.nama}
        tingkatanList={sertifikasi.tingkatan}
      />
    </div>
  );
}
