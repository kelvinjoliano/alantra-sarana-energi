// src/app/(peserta)/dashboard/profil/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfilForm } from "./components/ProfilForm";

export default async function ProfilPage() {
  const session = await getServerSession(authOptions);

  const peserta = await prisma.peserta.findUnique({
    where: { userId: session!.user.id },
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold" style={{ color: "#f1f5f9" }}>
          Profil Saya
        </h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>
          Lengkapi data diri untuk bisa mendaftar sertifikasi
        </p>
      </div>

      <ProfilForm
        userId={session!.user.id}
        initialData={{
          name: peserta?.user.name ?? "",
          email: peserta?.user.email ?? "",
          nik: peserta?.nik ?? "",
          tempatLahir: peserta?.tempatLahir ?? "",
          tanggalLahir: peserta?.tanggalLahir
            ? new Date(peserta.tanggalLahir).toISOString().split("T")[0]
            : "",
          jenisKelamin: peserta?.jenisKelamin ?? "",
          alamat: peserta?.alamat ?? "",
          kota: peserta?.kota ?? "",
          provinsi: peserta?.provinsi ?? "",
          noTelepon: peserta?.noTelepon ?? "",
          perusahaan: peserta?.perusahaan ?? "",
          jabatan: peserta?.jabatan ?? "",
        }}
      />
    </div>
  );
}
