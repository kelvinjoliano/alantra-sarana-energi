// src/app/api/pendaftaran-publik/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    const { status, catatanAdmin } = body;

    const validStatus = ["BARU", "DIPROSES", "SELESAI", "DITOLAK"];
    if (!validStatus.includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid" },
        { status: 400 },
      );
    }

    const updated = await prisma.pendaftaranPublik.update({
      where: { id },
      data: {
        status,
        catatanAdmin: catatanAdmin || null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PATCH /api/pendaftaran-publik/[id]]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
