// src/app/admin/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import { StatCards } from "./components/StatCards";
import { QuickActions } from "./components/QuickAction";
import { RecentPendaftaranPublik } from "./components/RecentPendaftaranPublik";

async function getDashboardStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalSertifikasi,
    sertifikasiAktif,
    totalJadwal,
    jadwalTerbit,
    totalPendaftar,
    pendaftarBaru,
    pendaftarDiproses,
    pendaftarHariIni,
    recentPendaftaran,
  ] = await Promise.all([
    prisma.sertifikasi.count(),
    prisma.sertifikasi.count({ where: { isActive: true } }),
    prisma.jadwal.count(),
    prisma.jadwal.count({ where: { isPublished: true } }),
    prisma.pendaftaranPublik.count(),
    prisma.pendaftaranPublik.count({ where: { status: "BARU" } }),
    prisma.pendaftaranPublik.count({ where: { status: "DIPROSES" } }),
    prisma.pendaftaranPublik.count({
      where: { createdAt: { gte: today } },
    }),
    prisma.pendaftaranPublik.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        noPendaftaran: true,
        namaLengkap: true,
        skema: true,
        metode: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    totalSertifikasi,
    sertifikasiAktif,
    totalJadwal,
    jadwalTerbit,
    totalPendaftar,
    pendaftarBaru,
    pendaftarDiproses,
    pendaftarHariIni,
    recentPendaftaran,
  };
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const stats = await getDashboardStats();

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1" style={{ color: "#f1f5f9" }}>
          Selamat datang, {session.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm" style={{ color: "#64748b" }}>
          Ringkasan aktivitas platform sertifikasi PT. Alantra Sarana Energi
        </p>
      </div>

      <StatCards
        totalSertifikasi={stats.totalSertifikasi}
        sertifikasiAktif={stats.sertifikasiAktif}
        jadwalTerbit={stats.jadwalTerbit}
        totalJadwal={stats.totalJadwal}
        totalPendaftar={stats.totalPendaftar}
        pendaftarBaru={stats.pendaftarBaru}
        pendaftarDiproses={stats.pendaftarDiproses}
        pendaftarHariIni={stats.pendaftarHariIni}
      />

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        <QuickActions />
        <RecentPendaftaranPublik data={stats.recentPendaftaran} />
      </div>
    </div>
  );
}
