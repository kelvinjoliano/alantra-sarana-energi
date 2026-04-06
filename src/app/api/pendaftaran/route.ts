// src/app/api/pendaftaran/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Generate noPendaftaran format: ASE-2025-0001
async function generateNoPendaftaran(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ASE-${year}-`;
  const last = await prisma.pendaftaran.findFirst({
    where: { noPendaftaran: { startsWith: prefix } },
    orderBy: { createdAt: "desc" },
  });

  const lastNumber = last ? parseInt(last.noPendaftaran.split("-")[2]) + 1 : 1;

  return `${prefix}${String(lastNumber).padStart(4, "0")}`;
}

// POST /api/pendaftaran
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { jadwalId, tingkatanId, catatan } = body;

    // Validasi input
    if (!jadwalId || !tingkatanId) {
      return NextResponse.json(
        { error: "jadwalId dan tingkatanId wajib diisi" },
        { status: 400 },
      );
    }

    // Ambil peserta dari session user
    const peserta = await prisma.peserta.findUnique({
      where: { userId: session.user.id },
    });

    if (!peserta) {
      return NextResponse.json(
        { error: "Profil peserta belum lengkap" },
        { status: 400 },
      );
    }

    // Cek jadwal valid & published
    const jadwal = await prisma.jadwal.findUnique({
      where: { id: jadwalId },
      include: { tingkatan: true },
    });

    if (!jadwal || !jadwal.isPublished) {
      return NextResponse.json(
        { error: "Jadwal tidak ditemukan atau belum dipublikasi" },
        { status: 404 },
      );
    }

    // Cek tingkatan valid
    const tingkatan = await prisma.tingkatan.findUnique({
      where: { id: tingkatanId },
    });

    if (!tingkatan) {
      return NextResponse.json(
        { error: "Tingkatan tidak ditemukan" },
        { status: 404 },
      );
    }

    // Cek kuota jadwal
    const jumlahPendaftar = await prisma.pendaftaran.count({
      where: {
        jadwalId,
        status: { notIn: ["DITOLAK"] },
      },
    });

    if (jumlahPendaftar >= jadwal.kuotaTersedia) {
      return NextResponse.json(
        { error: "Kuota jadwal sudah penuh" },
        { status: 400 },
      );
    }

    // Cek tidak double daftar
    const sudahDaftar = await prisma.pendaftaran.findFirst({
      where: {
        pesertaId: peserta.id,
        jadwalId,
        status: { notIn: ["DITOLAK"] },
      },
    });

    if (sudahDaftar) {
      return NextResponse.json(
        { error: "Anda sudah terdaftar di jadwal ini" },
        { status: 400 },
      );
    }

    const noPendaftaran = await generateNoPendaftaran();

    // SESUDAH — pakai $transaction sekalian simpan dokumen
    const pendaftaran = await prisma.$transaction(async (tx) => {
      const created = await tx.pendaftaran.create({
        data: {
          noPendaftaran,
          pesertaId: peserta.id,
          sertifikasiId: jadwal.sertifikasiId,
          tingkatanId,
          jadwalId,
          totalBiaya: tingkatan.tarif,
          catatan: catatan ?? null,
        },
      });

      if (body.dokumen?.ktp) {
        await tx.dokumen.create({
          data: {
            pesertaId: peserta.id,
            pendaftaranId: created.id,
            nama: "KTP",
            tipe: "KTP",
            cloudinaryId: body.dokumen.ktp.cloudinaryId,
            cloudinaryUrl: body.dokumen.ktp.cloudinaryUrl,
          },
        });
      }

      if (body.dokumen?.ijazah) {
        await tx.dokumen.create({
          data: {
            pesertaId: peserta.id,
            pendaftaranId: created.id,
            nama: "Ijazah",
            tipe: "IJAZAH",
            cloudinaryId: body.dokumen.ijazah.cloudinaryId,
            cloudinaryUrl: body.dokumen.ijazah.cloudinaryUrl,
          },
        });
      }

      return created;
    });

    return NextResponse.json(pendaftaran, { status: 201 });
  } catch (error) {
    console.error("[POST /api/pendaftaran]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET /api/pendaftaran
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "10");
    const skip = (page - 1) * limit;

    // ADMIN — lihat semua, PESERTA — lihat milik sendiri
    const isAdmin = session.user.role === "ADMIN";

    let whereClause: Record<string, unknown> = {};

    if (!isAdmin) {
      const peserta = await prisma.peserta.findUnique({
        where: { userId: session.user.id },
      });
      if (!peserta) return NextResponse.json({ data: [], total: 0 });
      whereClause.pesertaId = peserta.id;
    }

    if (status) whereClause.status = status;

    const [data, total] = await Promise.all([
      prisma.pendaftaran.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          peserta: {
            include: { user: { select: { name: true, email: true } } },
          },
          sertifikasi: { select: { nama: true } },
          tingkatan: { select: { nama: true, tarif: true } },
          jadwal: {
            select: {
              tanggalMulai: true,
              tanggalSelesai: true,
              lokasi: true,
              metodePelaksanaan: true,
            },
          },
        },
      }),
      prisma.pendaftaran.count({ where: whereClause }),
    ]);

    return NextResponse.json({ data, total, page, limit });
  } catch (error) {
    console.error("[GET /api/pendaftaran]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
