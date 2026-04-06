// src/app/api/profil/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      nik,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      alamat,
      kota,
      provinsi,
      noTelepon,
      perusahaan,
      jabatan,
    } = body;

    if (!noTelepon) {
      return NextResponse.json(
        { error: "Nomor telepon wajib diisi" },
        { status: 400 },
      );
    }

    const peserta = await prisma.peserta.upsert({
      where: { userId: session.user.id },
      update: {
        nik: nik || null,
        tempatLahir: tempatLahir || null,
        tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
        jenisKelamin: jenisKelamin || null,
        alamat: alamat || null,
        kota: kota || null,
        provinsi: provinsi || null,
        noTelepon,
        perusahaan: perusahaan || null,
        jabatan: jabatan || null,
      },
      create: {
        userId: session.user.id,
        nik: nik || null,
        tempatLahir: tempatLahir || null,
        tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
        jenisKelamin: jenisKelamin || null,
        alamat: alamat || null,
        kota: kota || null,
        provinsi: provinsi || null,
        noTelepon,
        perusahaan: perusahaan || null,
        jabatan: jabatan || null,
      },
    });

    return NextResponse.json(peserta);
  } catch (error) {
    console.error("[POST /api/profil]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
