// src/app/admin/jadwal/[sertifikasiId]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import JadwalTable from "./components/JadwalTable";

interface PageProps {
  params: Promise<{ sertifikasiId: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function JadwalSertifikasiPage({
  params,
  searchParams,
}: PageProps) {
  const { sertifikasiId: rawId } = await params;
  const sp = await searchParams;
  const sertifikasiId = parseInt(rawId);
  const page = parseInt(sp.page ?? "1");
  const limit = 20;

  const sertifikasi = await prisma.sertifikasi.findUnique({
    where: { id: sertifikasiId },
    select: { id: true, nama: true, slug: true, kategori: true },
  });

  if (!sertifikasi) notFound();

  const [jadwals, total] = await Promise.all([
    prisma.jadwal.findMany({
      where: { sertifikasiId },
      include: {
        tingkatan: { select: { id: true, nama: true, tarif: true } },
        _count: { select: { pendaftaran: true } },
      },
      orderBy: { tanggalMulai: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.jadwal.count({ where: { sertifikasiId } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/jadwal"
              className="text-sm"
              style={{ color: "#475569" }}
            >
              Jadwal
            </Link>
            <span style={{ color: "#334155" }}>/</span>
            <span className="text-sm" style={{ color: "#94a3b8" }}>
              {sertifikasi.nama}
            </span>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "#e2e8f0" }}>
            {sertifikasi.nama}
          </h1>
          <p className="text-sm mt-1" style={{ color: "#475569" }}>
            {total} jadwal
          </p>
        </div>
        <Link
          href={`/admin/jadwal/${sertifikasiId}/baru`}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: "#14b8a6", color: "#0f1720" }}
        >
          + Tambah Jadwal
        </Link>
      </div>

      {/* Table */}
      <JadwalTable
        jadwals={jadwals}
        sertifikasiId={sertifikasiId}
        total={total}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}
