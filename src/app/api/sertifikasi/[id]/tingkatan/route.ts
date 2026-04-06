import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// POST /api/sertifikasi/[id]/tingkatan — tambah tingkatan
export async function POST(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const sertifikasiId = parseInt(id);
  const body = await req.json();
  const { nama, tarif, durasi, kuota, dokumenSkemaUrl, dokumenSkemaId } = body;

  if (!nama || tarif === undefined) {
    return NextResponse.json(
      { error: "Nama dan tarif wajib diisi" },
      { status: 400 },
    );
  }

  const tingkatan = await prisma.tingkatan.create({
    data: {
      sertifikasiId,
      nama,
      tarif: parseInt(tarif),
      durasi: durasi ? parseInt(durasi) : null,
      kuota: kuota ? parseInt(kuota) : 20,
      dokumenSkemaUrl: dokumenSkemaUrl || null,
      dokumenSkemaId: dokumenSkemaId || null,
    },
  });

  return NextResponse.json(tingkatan, { status: 201 });
}
