// src/app/(peserta)/dashboard/pendaftaran/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { StatusBadge } from "../components/StatusBadge";

export default async function PendaftaranListPage() {
  const session = await getServerSession(authOptions);

  const peserta = await prisma.peserta.findUnique({
    where: { userId: session!.user.id },
  });

  const pendaftaran = peserta
    ? await prisma.pendaftaran.findMany({
        where: { pesertaId: peserta.id },
        orderBy: { createdAt: "desc" },
        include: {
          sertifikasi: { select: { nama: true } },
          tingkatan: { select: { nama: true, tarif: true } },
          jadwal: {
            select: {
              tanggalMulai: true,
              tanggalSelesai: true,
              metodePelaksanaan: true,
              lokasi: true,
            },
          },
          pembayaran: { orderBy: { createdAt: "desc" }, take: 1 },
        },
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: "#f1f5f9" }}>
            Pendaftaran Saya
          </h1>
          <p className="text-sm mt-1" style={{ color: "#64748b" }}>
            {pendaftaran.length} pendaftaran ditemukan
          </p>
        </div>
        <Link
          href="/service"
          className="text-sm px-4 py-2 rounded-lg font-medium"
          style={{ background: "#14b8a6", color: "#0f1720" }}
        >
          + Daftar Baru
        </Link>
      </div>

      {pendaftaran.length === 0 ? (
        <div
          className="rounded-xl p-12 text-center"
          style={{ background: "#111c27", border: "1px solid #1e3448" }}
        >
          <p className="text-sm mb-4" style={{ color: "#64748b" }}>
            Belum ada pendaftaran
          </p>
          <Link
            href="/service"
            className="text-sm px-5 py-2.5 rounded-lg font-medium"
            style={{ background: "#14b8a6", color: "#0f1720" }}
          >
            Lihat Sertifikasi Tersedia
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {pendaftaran.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/pendaftaran/${p.id}`}
              className="block rounded-xl p-5 transition-colors"
              style={{
                background: "#111c27",
                border: "1px solid #1e3448",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* No Pendaftaran */}
                  <p className="text-xs mb-1" style={{ color: "#64748b" }}>
                    {p.noPendaftaran}
                  </p>

                  {/* Nama Sertifikasi */}
                  <p
                    className="font-medium truncate"
                    style={{ color: "#f1f5f9" }}
                  >
                    {p.sertifikasi.nama}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "#94a3b8" }}>
                    {p.tingkatan.nama}
                  </p>

                  {/* Info Jadwal */}
                  {p.jadwal && (
                    <div className="flex items-center gap-3 mt-3">
                      <InfoChip
                        icon="📅"
                        label={new Date(
                          p.jadwal.tanggalMulai,
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      />
                      <InfoChip icon="📍" label={p.jadwal.lokasi ?? "TBD"} />
                      <InfoChip icon="🖥" label={p.jadwal.metodePelaksanaan} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <StatusBadge status={p.status} />
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#14b8a6" }}
                  >
                    Rp {p.tingkatan.tarif.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Action hint jika menunggu pembayaran */}
              {p.status === "MENUNGGU_PEMBAYARAN" && (
                <div
                  className="mt-4 rounded-lg px-4 py-2.5 flex items-center justify-between"
                  style={{ background: "#2d1f0a" }}
                >
                  <p className="text-xs" style={{ color: "#fbbf24" }}>
                    Segera lakukan pembayaran dan upload bukti
                  </p>
                  <span className="text-xs" style={{ color: "#fbbf24" }}>
                    →
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoChip({ icon, label }: { icon: string; label: string }) {
  return (
    <span
      className="flex items-center gap-1 text-xs px-2 py-1 rounded-md"
      style={{ background: "#1e3448", color: "#94a3b8" }}
    >
      {icon} {label}
    </span>
  );
}
