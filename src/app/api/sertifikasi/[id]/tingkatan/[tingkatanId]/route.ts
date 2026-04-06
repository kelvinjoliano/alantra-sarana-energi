import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteFromCloudinary } from "@/lib/cloudinary";

type Params = { params: Promise<{ id: string; tingkatanId: string }> };

// PUT /api/sertifikasi/[id]/tingkatan/[tingkatanId]
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tingkatanId: rawId } = await params;
  const tingkatanId = parseInt(rawId);
  const body = await req.json();
  const { nama, tarif, durasi, kuota, dokumenSkemaUrl, dokumenSkemaId } = body;

  if (!nama || tarif === undefined) {
    return NextResponse.json(
      { error: "Nama dan tarif wajib diisi" },
      { status: 400 },
    );
  }

  const existing = await prisma.tingkatan.findUnique({
    where: { id: tingkatanId },
    select: { dokumenSkemaId: true },
  });

  if (
    existing?.dokumenSkemaId &&
    dokumenSkemaId &&
    existing.dokumenSkemaId !== dokumenSkemaId
  ) {
    await deleteFromCloudinary(existing.dokumenSkemaId).catch(console.error);
  }

  const tingkatan = await prisma.tingkatan.update({
    where: { id: tingkatanId },
    data: {
      nama,
      tarif: parseInt(tarif),
      durasi: durasi ? parseInt(durasi) : null,
      kuota: kuota ? parseInt(kuota) : 20,
      dokumenSkemaUrl: dokumenSkemaUrl || null,
      dokumenSkemaId: dokumenSkemaId || null,
    },
  });

  return NextResponse.json(tingkatan);
}

// DELETE /api/sertifikasi/[id]/tingkatan/[tingkatanId]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tingkatanId: rawId } = await params;
  const tingkatanId = parseInt(rawId);

  const pendaftaranCount = await prisma.pendaftaran.count({
    where: { tingkatanId },
  });

  if (pendaftaranCount > 0) {
    return NextResponse.json(
      {
        error: `Tidak dapat dihapus — ada ${pendaftaranCount} pendaftaran terkait`,
      },
      { status: 400 },
    );
  }

  const existing = await prisma.tingkatan.findUnique({
    where: { id: tingkatanId },
    select: { dokumenSkemaId: true },
  });

  if (existing?.dokumenSkemaId) {
    await deleteFromCloudinary(existing.dokumenSkemaId).catch(console.error);
  }

  await prisma.tingkatan.delete({ where: { id: tingkatanId } });
  return NextResponse.json({ success: true });
}
