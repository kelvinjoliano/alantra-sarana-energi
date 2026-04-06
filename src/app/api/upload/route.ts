// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["application/pdf"];

// POST /api/upload — Upload PDF dokumen skema
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "File tidak ditemukan" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Hanya file PDF yang diperbolehkan" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 5 MB" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { url, publicId } = await uploadToCloudinary(
      buffer,
      "alantra/dokumen",
    );

    return NextResponse.json({ url, publicId }, { status: 200 });
  } catch (err) {
    console.error("[UPLOAD ERROR]", err);
    return NextResponse.json(
      { error: "Upload gagal, coba lagi" },
      { status: 500 },
    );
  }
}

// DELETE /api/upload?publicId=xxx — Hapus file lama dari Cloudinary
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const publicId = searchParams.get("publicId");

  if (!publicId) {
    return NextResponse.json({ error: "publicId diperlukan" }, { status: 400 });
  }

  try {
    await deleteFromCloudinary(publicId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE CLOUDINARY ERROR]", err);
    return NextResponse.json({ error: "Hapus file gagal" }, { status: 500 });
  }
}
