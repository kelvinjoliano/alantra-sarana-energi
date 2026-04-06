import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// GET /api/sertifikasi — list dengan search, filter, pagination
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const kategori = searchParams.get("kategori") ?? "";
  const isActive = searchParams.get("isActive");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = 10;
  const skip = (page - 1) * limit;

  const where = {
    ...(q && {
      OR: [
        { nama: { contains: q, mode: "insensitive" as const } },
        { kategori: { contains: q, mode: "insensitive" as const } },
      ],
    }),
    ...(kategori && { kategori }),
    ...(isActive !== null &&
      isActive !== "" && {
        isActive: isActive === "true",
      }),
  };

  const [data, total] = await Promise.all([
    prisma.sertifikasi.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { tingkatan: true, jadwal: true, pendaftaran: true },
        },
      },
    }),
    prisma.sertifikasi.count({ where }),
  ]);

  return NextResponse.json({
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

// POST /api/sertifikasi — tambah baru
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { nama, kategori, deskripsi, isActive } = body;

  if (!nama || !kategori) {
    return NextResponse.json(
      { error: "Nama dan kategori wajib diisi" },
      { status: 400 },
    );
  }

  // Generate slug unik
  let slug = slugify(nama);
  const existing = await prisma.sertifikasi.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const sertifikasi = await prisma.sertifikasi.create({
    data: {
      nama,
      slug,
      kategori,
      deskripsi: deskripsi || null,
      isActive: isActive ?? true,
    },
  });

  return NextResponse.json(sertifikasi, { status: 201 });
}
