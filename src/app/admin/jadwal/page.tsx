// src/app/admin/jadwal/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";
import SertifikasiJadwalList from "./components/SertifikasiJadwalList";
import SertifikasiJadwalFilter from "./components/SertifikasiJadwalFilter";

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function JadwalPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = sp.q ?? "";
  const page = parseInt(sp.page ?? "1");
  const limit = 20;

  const where = q
    ? { nama: { contains: q, mode: "insensitive" as const } }
    : {};

  const [sertifikasiList, total] = await Promise.all([
    prisma.sertifikasi.findMany({
      where,
      select: {
        id: true,
        nama: true,
        slug: true,
        kategori: true,
        isActive: true,
        _count: { select: { jadwal: true } },
        jadwal: {
          where: { tanggalMulai: { gte: new Date() } },
          orderBy: { tanggalMulai: "asc" },
          take: 1,
          select: { tanggalMulai: true, metodePelaksanaan: true },
        },
      },
      orderBy: { nama: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.sertifikasi.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#e2e8f0" }}>
            Jadwal
          </h1>
          <p className="text-sm mt-1" style={{ color: "#475569" }}>
            {total} sertifikasi
          </p>
        </div>
      </div>

      {/* Filter */}
      <Suspense>
        <SertifikasiJadwalFilter />
      </Suspense>

      {/* List */}
      <Suspense fallback={<div style={{ color: "#475569" }}>Memuat...</div>}>
        <SertifikasiJadwalList
          sertifikasiList={sertifikasiList}
          total={total}
          page={page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
}
