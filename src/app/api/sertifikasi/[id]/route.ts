import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

// GET /api/sertifikasi/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id);
  const sertifikasi = await prisma.sertifikasi.findUnique({
    where: { id },
    include: {
      tingkatan: { orderBy: { id: "asc" } },
      _count: { select: { jadwal: true, pendaftaran: true } },
    },
  });

  if (!sertifikasi) {
    return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(sertifikasi);
}

// PUT /api/sertifikasi/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id);
  const body = await req.json();
  const { nama, kategori, deskripsi, isActive } = body;

  if (!nama || !kategori) {
    return NextResponse.json(
      { error: "Nama dan kategori wajib diisi" },
      { status: 400 },
    );
  }

  const sertifikasi = await prisma.sertifikasi.update({
    where: { id },
    data: { nama, kategori, deskripsi: deskripsi || null, isActive },
  });

  return NextResponse.json(sertifikasi);
}

// DELETE /api/sertifikasi/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id);

  // Cek apakah ada pendaftaran aktif
  const pendaftaranCount = await prisma.pendaftaran.count({
    where: { sertifikasiId: id },
  });

  if (pendaftaranCount > 0) {
    return NextResponse.json(
      {
        error: `Tidak dapat dihapus — ada ${pendaftaranCount} pendaftaran terkait`,
      },
      { status: 400 },
    );
  }

  await prisma.sertifikasi.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
