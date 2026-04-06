// src/app/api/pendaftaran/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/pendaftaran/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const pendaftaran = await prisma.pendaftaran.findUnique({
      where: { id },
      include: {
        peserta: {
          include: { user: { select: { name: true, email: true } } },
        },
        sertifikasi: { select: { nama: true, slug: true } },
        tingkatan: { select: { nama: true, tarif: true, durasi: true } },
        jadwal: true,
        dokumen: true,
        pembayaran: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!pendaftaran) {
      return NextResponse.json(
        { error: "Pendaftaran tidak ditemukan" },
        { status: 404 },
      );
    }

    // Peserta hanya boleh lihat miliknya sendiri
    if (session.user.role !== "ADMIN") {
      const peserta = await prisma.peserta.findUnique({
        where: { userId: session.user.id },
      });
      if (!peserta || pendaftaran.pesertaId !== peserta.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    return NextResponse.json(pendaftaran);
  } catch (error) {
    console.error("[GET /api/pendaftaran/[id]]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
