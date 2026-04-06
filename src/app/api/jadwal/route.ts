import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sertifikasiId = searchParams.get("sertifikasiId");
  const tingkatanId = searchParams.get("tingkatanId");
  const isPublished = searchParams.get("isPublished");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  const where: Record<string, unknown> = {};
  if (sertifikasiId) where.sertifikasiId = parseInt(sertifikasiId);
  if (tingkatanId) where.tingkatanId = parseInt(tingkatanId);
  if (isPublished !== null && isPublished !== "") {
    where.isPublished = isPublished === "true";
  }

  const [jadwals, total] = await Promise.all([
    prisma.jadwal.findMany({
      where,
      include: {
        sertifikasi: { select: { id: true, nama: true, kode: true } },
        tingkatan: { select: { id: true, nama: true, tarif: true } },
        _count: { select: { pendaftaran: true } },
      },
      orderBy: { tanggalMulai: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.jadwal.count({ where }),
  ]);

  return NextResponse.json({ jadwals, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    sertifikasiId,
    tingkatanId,
    tanggalMulai,
    tanggalSelesai,
    lokasi,
    metodePelaksanaan,
    kuotaTersedia,
  } = body;

  if (!sertifikasiId || !tingkatanId || !tanggalMulai || !tanggalSelesai) {
    return NextResponse.json(
      { error: "Field wajib tidak lengkap" },
      { status: 400 },
    );
  }

  if (new Date(tanggalSelesai) < new Date(tanggalMulai)) {
    return NextResponse.json(
      { error: "Tanggal selesai tidak boleh sebelum tanggal mulai" },
      { status: 400 },
    );
  }

  // Ambil kuota default dari tingkatan jika tidak di-override
  const tingkatan = await prisma.tingkatan.findUnique({
    where: { id: parseInt(tingkatanId) },
  });
  if (!tingkatan) {
    return NextResponse.json(
      { error: "Tingkatan tidak ditemukan" },
      { status: 404 },
    );
  }

  const jadwal = await prisma.jadwal.create({
    data: {
      sertifikasiId: parseInt(sertifikasiId),
      tingkatanId: parseInt(tingkatanId),
      tanggalMulai: new Date(tanggalMulai),
      tanggalSelesai: new Date(tanggalSelesai),
      lokasi: lokasi || null,
      metodePelaksanaan: metodePelaksanaan || "Offline",
      kuotaTersedia: kuotaTersedia ? parseInt(kuotaTersedia) : tingkatan.kuota,
      isPublished: false,
    },
    include: {
      sertifikasi: { select: { id: true, nama: true } },
      tingkatan: { select: { id: true, nama: true } },
    },
  });

  return NextResponse.json(jadwal, { status: 201 });
}
