// src/app/(peserta)/daftar/[jadwalId]/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DaftarForm } from "./components/DaftarForm";

interface Props {
  params: Promise<{ jadwalId: string }>;
}

export default async function DaftarPage({ params }: Props) {
  const { jadwalId } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callbackUrl=/daftar/${jadwalId}`);
  }

  // Ambil profil peserta
  const peserta = await prisma.peserta.findUnique({
    where: { userId: session.user.id },
    include: { user: { select: { name: true, email: true } } },
  });

  // Belum punya profil sama sekali → redirect lengkapi profil
  if (!peserta || !peserta.noTelepon || !peserta.nik) {
    redirect(`/dashboard/profile?callbackUrl=/daftar/${jadwalId}`);
  }

  // Ambil data jadwal
  const jadwal = await prisma.jadwal.findUnique({
    where: { id: parseInt(jadwalId) },
    include: {
      sertifikasi: true,
      tingkatan: true,
    },
  });

  if (!jadwal || !jadwal.isPublished) {
    redirect("/service");
  }

  // Cek sudah daftar belum
  const sudahDaftar = await prisma.pendaftaran.findFirst({
    where: {
      pesertaId: peserta.id,
      jadwalId: jadwal.id,
      status: { notIn: ["DITOLAK"] },
    },
  });

  if (sudahDaftar) {
    redirect(`/dashboard/pendaftaran/${sudahDaftar.id}`);
  }

  // Cek kuota
  const jumlahPendaftar = await prisma.pendaftaran.count({
    where: {
      jadwalId: jadwal.id,
      status: { notIn: ["DITOLAK"] },
    },
  });

  const kuotaSisa = jadwal.kuotaTersedia - jumlahPendaftar;

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "#0f1720" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm mb-1" style={{ color: "#14b8a6" }}>
            Formulir Pendaftaran
          </p>
          <h1 className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
            {jadwal.sertifikasi.nama}
          </h1>
          {jadwal.tingkatan && (
            <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
              Tingkatan: {jadwal.tingkatan.nama}
            </p>
          )}
        </div>

        {/* Info Jadwal */}
        <div
          className="rounded-xl p-5 mb-6"
          style={{ background: "#111c27", border: "1px solid #1e3448" }}
        >
          <h2
            className="text-sm font-semibold mb-4 uppercase tracking-wide"
            style={{ color: "#64748b" }}
          >
            Detail Jadwal
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem
              label="Tanggal Mulai"
              value={new Date(jadwal.tanggalMulai).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            <InfoItem
              label="Tanggal Selesai"
              value={new Date(jadwal.tanggalSelesai).toLocaleDateString(
                "id-ID",
                { day: "numeric", month: "long", year: "numeric" },
              )}
            />
            <InfoItem label="Metode" value={jadwal.metodePelaksanaan} />
            <InfoItem
              label="Lokasi"
              value={jadwal.lokasi ?? "Akan dikonfirmasi"}
            />
            <InfoItem
              label="Kuota Sisa"
              value={`${kuotaSisa} dari ${jadwal.kuotaTersedia} tempat`}
              highlight={kuotaSisa <= 5}
            />
            <InfoItem
              label="Biaya"
              value={
                jadwal.tingkatan
                  ? `Rp ${jadwal.tingkatan.tarif.toLocaleString("id-ID")}`
                  : "-"
              }
            />
          </div>
        </div>

        {/* Form */}
        <DaftarForm
          jadwalId={jadwal.id}
          tingkatanId={jadwal.tingkatanId!}
          totalBiaya={jadwal.tingkatan?.tarif ?? 0}
          peserta={{
            nama: peserta.user.name ?? "",
            email: peserta.user.email ?? "",
            telepon: peserta.noTelepon ?? "",
            nik: peserta.nik ?? "",
            perusahaan: peserta.perusahaan ?? "",
            jabatan: peserta.jabatan ?? "",
          }}
        />
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs mb-1" style={{ color: "#64748b" }}>
        {label}
      </p>
      <p
        className="text-sm font-medium"
        style={{ color: highlight ? "#f59e0b" : "#e2e8f0" }}
      >
        {value}
      </p>
    </div>
  );
}
