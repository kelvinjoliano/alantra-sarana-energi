// src/app/(peserta)/dashboard/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { StatusBadge } from "./components/StatusBadge";
import { formatRupiah } from "@/lib/format";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const peserta = await prisma.peserta.findUnique({
    where: { userId: session!.user.id },
    include: {
      pendaftaran: {
        take: 3,
        orderBy: { createdAt: "desc" },
        include: {
          sertifikasi: { select: { nama: true } },
          tingkatan: { select: { nama: true } },
          jadwal: { select: { tanggalMulai: true, metodePelaksanaan: true } },
        },
      },
    },
  });

  const profilLengkap = peserta?.nik && peserta?.noTelepon;

  const stats = peserta
    ? {
        total: peserta.pendaftaran.length,
        aktif: peserta.pendaftaran.filter((p) => p.status === "AKTIF").length,
        menunggu: peserta.pendaftaran.filter(
          (p) =>
            p.status === "MENUNGGU_PEMBAYARAN" ||
            p.status === "MENUNGGU_VERIFIKASI",
        ).length,
      }
    : { total: 0, aktif: 0, menunggu: 0 };

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-semibold" style={{ color: "#f1f5f9" }}>
          Halo, {session?.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: "#64748b" }}>
          Pantau status pendaftaran sertifikasimu di sini
        </p>
      </div>

      {/* Alert profil belum lengkap */}
      {!profilLengkap && (
        <div
          className="rounded-xl px-5 py-4 flex items-center justify-between"
          style={{ background: "#2d1f0a", border: "1px solid #92400e" }}
        >
          <div>
            <p className="text-sm font-medium" style={{ color: "#fbbf24" }}>
              Profil belum lengkap
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#92400e" }}>
              Lengkapi NIK dan nomor telepon untuk bisa mendaftar sertifikasi
            </p>
          </div>
          <Link
            href="/dashboard/profil"
            className="text-xs px-4 py-2 rounded-lg font-medium shrink-0"
            style={{ background: "#fbbf24", color: "#0f1720" }}
          >
            Lengkapi
          </Link>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Pendaftaran", value: stats.total },
          { label: "Sedang Berjalan", value: stats.aktif },
          { label: "Menunggu", value: stats.menunggu },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-5"
            style={{ background: "#111c27", border: "1px solid #1e3448" }}
          >
            <p className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>
              {stat.value}
            </p>
            <p className="text-xs mt-1" style={{ color: "#64748b" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Pendaftaran Terbaru */}
      <div
        className="rounded-xl"
        style={{ background: "#111c27", border: "1px solid #1e3448" }}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
            Pendaftaran Terbaru
          </h2>
          <Link
            href="/dashboard/pendaftaran"
            className="text-xs"
            style={{ color: "#14b8a6" }}
          >
            Lihat semua →
          </Link>
        </div>

        {!peserta?.pendaftaran.length ? (
          <div className="px-5 pb-8 text-center">
            <p className="text-sm mb-3" style={{ color: "#64748b" }}>
              Belum ada pendaftaran
            </p>
            <Link
              href="/service"
              className="text-sm px-5 py-2.5 rounded-lg font-medium"
              style={{ background: "#14b8a6", color: "#0f1720" }}
            >
              Lihat Sertifikasi
            </Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "#1e3448" }}>
            {peserta.pendaftaran.map((p) => (
              <Link
                key={p.id}
                href={`/dashboard/pendaftaran/${p.id}`}
                className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-[#1e3448]"
              >
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#e2e8f0" }}
                  >
                    {p.sertifikasi.nama}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                    {p.tingkatan.nama} ·{" "}
                    {p.jadwal
                      ? new Date(p.jadwal.tanggalMulai).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "short", year: "numeric" },
                        )
                      : "Jadwal belum ditentukan"}
                  </p>
                </div>
                <StatusBadge status={p.status} />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Action */}
      <Link
        href="/service"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
        style={{ background: "#1e3448", color: "#14b8a6" }}
      >
        + Daftar Sertifikasi Baru
      </Link>
    </div>
  );
}
