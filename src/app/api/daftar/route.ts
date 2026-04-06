// src/app/api/daftar/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function generateNoPendaftaran(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ASE-PUB-${year}-`;
  const last = await prisma.pendaftaranPublik.findFirst({
    where: { noPendaftaran: { startsWith: prefix } },
    orderBy: { createdAt: "desc" },
  });
  const lastNumber = last ? parseInt(last.noPendaftaran.split("-")[3]) + 1 : 1;
  return `${prefix}${String(lastNumber).padStart(4, "0")}`;
}

async function uploadToCloudinary(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const folder = "pendaftaran-publik";
    const resourceType = mimeType === "application/pdf" ? "raw" : "image";

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: fileName,
        access_mode: "public",
        type: "upload",
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );

    uploadStream.end(buffer);
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const namaLengkap = (formData.get("nama") as string).toUpperCase();
    const email = formData.get("email") as string;
    const nik = formData.get("nik") as string;
    const noHp = formData.get("noHp") as string;
    const tempatLahir = (formData.get("tempatLahir") as string).toUpperCase();
    const tanggalLahir = formData.get("tanggalLahir") as string;
    const jenisKelamin = formData.get("jenisKelamin") as string;
    const alamat = formData.get("alamat") as string;
    const kodePos = formData.get("kodePos") as string;
    const pendidikan = formData.get("pendidikan") as string;
    const skema = formData.get("skema") as string;
    const metode = formData.get("metode") as string;
    const penanggungjawab = formData.get("penanggungjawab") as string;

    if (
      !namaLengkap ||
      !email ||
      !nik ||
      !noHp ||
      !tempatLahir ||
      !tanggalLahir ||
      !jenisKelamin ||
      !alamat ||
      !kodePos ||
      !pendidikan ||
      !skema ||
      !metode ||
      !penanggungjawab
    ) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 },
      );
    }

    const fotoKtp = formData.get("fotoKtp") as File | null;
    const fotoIjazah = formData.get("fotoIjazah") as File | null;
    const pasFoto = formData.get("pasFoto") as File | null;
    const suratPengalaman = formData.get("suratPengalaman") as File | null;

    if (!fotoKtp || !fotoIjazah || !pasFoto || !suratPengalaman) {
      return NextResponse.json(
        { error: "Semua dokumen wajib diupload" },
        { status: 400 },
      );
    }

    const safeName = namaLengkap.replace(/\s+/g, "_").toLowerCase();
    const timestamp = Date.now();

    async function uploadFile(file: File, label: string) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop();
      const fileName = `${safeName}_${label}_${timestamp}.${ext}`;
      return uploadToCloudinary(buffer, fileName, file.type);
    }

    const [ktp, ijazah, foto, surat] = await Promise.all([
      uploadFile(fotoKtp, "ktp"),
      uploadFile(fotoIjazah, "ijazah"),
      uploadFile(pasFoto, "pasfoto"),
      uploadFile(suratPengalaman, "surat"),
    ]);

    const noPendaftaran = await generateNoPendaftaran();

    const pendaftaran = await prisma.pendaftaranPublik.create({
      data: {
        noPendaftaran,
        namaLengkap,
        email,
        nik,
        noHp,
        tempatLahir,
        tanggalLahir,
        jenisKelamin,
        alamat,
        kodePos,
        pendidikan,
        skema,
        metode,
        penanggungjawab,
        ktpUrl: ktp.url,
        ktpPublicId: ktp.publicId,
        ijazahUrl: ijazah.url,
        ijazahPublicId: ijazah.publicId,
        pasFotoUrl: foto.url,
        pasFotoPublicId: foto.publicId,
        suratUrl: surat.url,
        suratPublicId: surat.publicId,
      },
    });

    return NextResponse.json(
      { message: "Pendaftaran berhasil dikirim", id: pendaftaran.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/daftar]", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan, coba lagi" },
      { status: 500 },
    );
  }
}
