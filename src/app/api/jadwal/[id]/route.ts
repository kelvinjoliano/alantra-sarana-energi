import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const jadwal = await prisma.jadwal.findUnique({
    where: { id: parseInt(id) },
    include: {
      sertifikasi: true,
      tingkatan: true,
      _count: { select: { pendaftaran: true } },
    },
  });
  if (!jadwal)
    return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  return NextResponse.json(jadwal);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const {
    tanggalMulai,
    tanggalSelesai,
    lokasi,
    metodePelaksanaan,
    kuotaTersedia,
    isPublished,
  } = body;

  if (
    tanggalMulai &&
    tanggalSelesai &&
    new Date(tanggalSelesai) < new Date(tanggalMulai)
  ) {
    return NextResponse.json(
      { error: "Tanggal selesai tidak boleh sebelum tanggal mulai" },
      { status: 400 },
    );
  }

  const jadwal = await prisma.jadwal.update({
    where: { id: parseInt(id) },
    data: {
      ...(tanggalMulai && { tanggalMulai: new Date(tanggalMulai) }),
      ...(tanggalSelesai && { tanggalSelesai: new Date(tanggalSelesai) }),
      ...(lokasi !== undefined && { lokasi: lokasi || null }),
      ...(metodePelaksanaan && { metodePelaksanaan }),
      ...(kuotaTersedia && { kuotaTersedia: parseInt(kuotaTersedia) }),
      ...(isPublished !== undefined && { isPublished }),
    },
    include: {
      sertifikasi: { select: { id: true, nama: true } },
      tingkatan: { select: { id: true, nama: true } },
    },
  });

  return NextResponse.json(jadwal);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const count = await prisma.pendaftaran.count({
    where: { jadwalId: parseInt(id) },
  });
  if (count > 0) {
    return NextResponse.json(
      { error: `Tidak bisa dihapus, ada ${count} pendaftaran terkait` },
      { status: 409 },
    );
  }

  await prisma.jadwal.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
