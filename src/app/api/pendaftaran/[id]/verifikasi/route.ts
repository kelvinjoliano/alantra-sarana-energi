// src/app/api/pendaftaran/[id]/verifikasi/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusPendaftaran, StatusPembayaran } from "@prisma/client";

// PATCH /api/pendaftaran/[id]/verifikasi
// Admin approve atau tolak pendaftaran
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { aksi, catatanAdmin } = body;
    // aksi: "SETUJUI" | "TOLAK"

    if (!aksi || !["SETUJUI", "TOLAK"].includes(aksi)) {
      return NextResponse.json(
        { error: "Aksi tidak valid. Gunakan SETUJUI atau TOLAK" },
        { status: 400 },
      );
    }

    const pendaftaran = await prisma.pendaftaran.findUnique({
      where: { id },
    });

    if (!pendaftaran) {
      return NextResponse.json(
        { error: "Pendaftaran tidak ditemukan" },
        { status: 404 },
      );
    }

    if (pendaftaran.status !== StatusPendaftaran.MENUNGGU_VERIFIKASI) {
      return NextResponse.json(
        { error: "Pendaftaran tidak dalam status menunggu verifikasi" },
        { status: 400 },
      );
    }

    const isSetujui = aksi === "SETUJUI";

    const updated = await prisma.$transaction([
      prisma.pendaftaran.update({
        where: { id },
        data: {
          status: isSetujui
            ? StatusPendaftaran.AKTIF
            : StatusPendaftaran.DITOLAK,
          statusPembayaran: isSetujui
            ? StatusPembayaran.LUNAS
            : StatusPembayaran.DIKEMBALIKAN,
          catatanAdmin: catatanAdmin ?? null,
          verifikasiOleh: session.user.id,
          verifikasiAt: new Date(),
        },
      }),
      // Update isVerified di dokumen bukti bayar
      prisma.dokumen.updateMany({
        where: { pendaftaranId: id, tipe: "BUKTI_BAYAR" },
        data: { isVerified: isSetujui },
      }),
      // Update dikonfirmasiOleh di tabel pembayaran
      prisma.pembayaran.updateMany({
        where: { pendaftaranId: id },
        data: {
          dikonfirmasiOleh: session.user.id,
          dikonfirmasiAt: new Date(),
        },
      }),
    ]);

    return NextResponse.json({
      message: isSetujui
        ? "Pendaftaran berhasil disetujui"
        : "Pendaftaran ditolak",
      pendaftaran: updated[0],
    });
  } catch (error) {
    console.error("[PATCH /api/pendaftaran/[id]/verifikasi]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
