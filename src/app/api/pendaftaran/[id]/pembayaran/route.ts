// src/app/api/pendaftaran/[id]/pembayaran/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusPendaftaran, StatusPembayaran } from "@prisma/client";

// POST /api/pendaftaran/[id]/pembayaran
// Peserta upload bukti bayar
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { buktiCloudinaryId, buktiCloudinaryUrl, metodePembayaran, catatan } =
      body;

    if (!buktiCloudinaryId || !buktiCloudinaryUrl) {
      return NextResponse.json(
        { error: "Bukti pembayaran wajib diupload" },
        { status: 400 },
      );
    }

    const pendaftaran = await prisma.pendaftaran.findUnique({
      where: { id },
      include: { peserta: true },
    });

    if (!pendaftaran) {
      return NextResponse.json(
        { error: "Pendaftaran tidak ditemukan" },
        { status: 404 },
      );
    }

    // Pastikan peserta hanya bisa upload miliknya sendiri
    if (session.user.role !== "ADMIN") {
      const peserta = await prisma.peserta.findUnique({
        where: { userId: session.user.id },
      });
      if (!peserta || pendaftaran.pesertaId !== peserta.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    // Hanya boleh upload jika status MENUNGGU_PEMBAYARAN
    if (pendaftaran.status !== StatusPendaftaran.MENUNGGU_PEMBAYARAN) {
      return NextResponse.json(
        { error: "Status pendaftaran tidak memungkinkan upload bukti bayar" },
        { status: 400 },
      );
    }

    // Buat record pembayaran + update status pendaftaran (atomic)
    const [pembayaran] = await prisma.$transaction([
      prisma.pembayaran.create({
        data: {
          pendaftaranId: id,
          jumlah: pendaftaran.totalBiaya,
          metodePembayaran: metodePembayaran ?? "TRANSFER_BANK",
          buktiCloudinaryId,
          buktiCloudinaryUrl,
          tanggalBayar: new Date(),
          catatan: catatan ?? null,
        },
      }),
      prisma.pendaftaran.update({
        where: { id },
        data: {
          status: StatusPendaftaran.MENUNGGU_VERIFIKASI,
          statusPembayaran: StatusPembayaran.MENUNGGU_KONFIRMASI,
        },
      }),
      // Simpan juga ke tabel Dokumen
      prisma.dokumen.create({
        data: {
          pesertaId: pendaftaran.pesertaId,
          pendaftaranId: id,
          nama: "Bukti Pembayaran",
          tipe: "BUKTI_BAYAR",
          cloudinaryId: buktiCloudinaryId,
          cloudinaryUrl: buktiCloudinaryUrl,
        },
      }),
    ]);

    return NextResponse.json(pembayaran, { status: 201 });
  } catch (error) {
    console.error("[POST /api/pendaftaran/[id]/pembayaran]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
