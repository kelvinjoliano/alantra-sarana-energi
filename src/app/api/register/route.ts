// src/app/api/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password minimal 8 karakter" },
        { status: 400 },
      );
    }

    // Cek email sudah terdaftar
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Buat user + peserta profile sekaligus
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "PESERTA",
        peserta: {
          create: {},
        },
      },
    });

    return NextResponse.json(
      { message: "Akun berhasil dibuat", userId: user.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/register]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
