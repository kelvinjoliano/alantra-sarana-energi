// src/app/(peserta)/dashboard/pendaftaran/[id]/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { StatusBadge } from "../../components/StatusBadge";
import { UploadBuktiBayar } from "./components/UploadBuktiBayar";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string }>;
}

export default async function PendaftaranDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { success } = await searchParams;
  const session = await getServerSession(authOptions);

  const peserta = await prisma.peserta.findUnique({
    where: { userId: session!.user.id },
  });

  if (!peserta) redirect("/dashboard");

  const pendaftaran = await prisma.pendaftaran.findUnique({
    where: { id },
    include: {
      sertifikasi: { select: { nama: true, slug: true } },
      tingkatan: { select: { nama: true, tarif: true, durasi: true } },
      jadwal: true,
      dokumen: true,
      pembayaran: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!pendaftaran || pendaftaran.pesertaId !== peserta.id) {
    redirect("/dashboard/pendaftaran");
  }

  const buktiBayar = pendaftaran.pembayaran[0] ?? null;

  return (
    <div className="space-y-6">
      {success && (
        <div
          className="rounded-xl px-5 py-4"
          style={{ background: "#0a2d1f", border: "1px solid #14b8a6" }}
        >
          <p className="text-sm font-medium" style={{ color: "#34d399" }}>
            ✓ Pendaftaran berhasil disubmit!
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
            Silakan lakukan pembayaran dan upload bukti di bawah ini.
          </p>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs mb-1" style={{ color: "#64748b" }}>
            {pendaftaran.noPendaftaran}
          </p>
          <h1 className="text-xl font-semibold" style={{ color: "#f1f5f9" }}>
            {pendaftaran.sertifikasi.nama}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#94a3b8" }}>
            {pendaftaran.tingkatan.nama}
          </p>
        </div>
        <StatusBadge status={pendaftaran.status} />
      </div>

      {pendaftaran.jadwal && (
        <Section title="Detail Jadwal">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem
              label="Tanggal Mulai"
              value={new Date(
                pendaftaran.jadwal.tanggalMulai,
              ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            <InfoItem
              label="Tanggal Selesai"
              value={new Date(
                pendaftaran.jadwal.tanggalSelesai,
              ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
            <InfoItem
              label="Metode"
              value={pendaftaran.jadwal.metodePelaksanaan}
            />
            <InfoItem
              label="Lokasi"
              value={pendaftaran.jadwal.lokasi ?? "Akan dikonfirmasi"}
            />
          </div>
        </Section>
      )}

      <Section title="Pembayaran">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs mb-1" style={{ color: "#64748b" }}>
              Total Biaya
            </p>
            <p className="text-2xl font-bold" style={{ color: "#14b8a6" }}>
              Rp {pendaftaran.totalBiaya.toLocaleString("id-ID")}
            </p>
          </div>
          <StatusBadge status={pendaftaran.statusPembayaran} />
        </div>

        {pendaftaran.status === "MENUNGGU_PEMBAYARAN" && (
          <div
            className="rounded-lg p-4 mb-4"
            style={{ background: "#0f1720", border: "1px solid #1e3448" }}
          >
            <p
              className="text-xs font-semibold mb-2"
              style={{ color: "#64748b" }}
            >
              TRANSFER KE REKENING
            </p>
            <p className="text-sm font-medium" style={{ color: "#e2e8f0" }}>
              Bank BCA — 1234567890
            </p>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              a.n. PT. Alantra Sarana Energi
            </p>
          </div>
        )}

        {buktiBayar?.buktiCloudinaryUrl && (
          <div
            className="rounded-lg p-4 flex items-center justify-between"
            style={{ background: "#0a2d1f", border: "1px solid #14b8a6" }}
          >
            <div>
              <p className="text-xs mb-1" style={{ color: "#34d399" }}>
                ✓ Bukti pembayaran sudah diupload
              </p>
              <p className="text-xs" style={{ color: "#64748b" }}>
                {buktiBayar.tanggalBayar
                  ? new Date(buktiBayar.tanggalBayar).toLocaleDateString(
                      "id-ID",
                      { day: "numeric", month: "long", year: "numeric" },
                    )
                  : "-"}
              </p>
            </div>
            <a
              href={buktiBayar.buktiCloudinaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg"
              style={{ background: "#1e3448", color: "#94a3b8" }}
            >
              Lihat
            </a>
          </div>
        )}
      </Section>

      {pendaftaran.status === "MENUNGGU_PEMBAYARAN" && (
        <UploadBuktiBayar pendaftaranId={pendaftaran.id} />
      )}

      {pendaftaran.catatanAdmin && (
        <Section title="Catatan dari Admin">
          <p className="text-sm" style={{ color: "#f87171" }}>
            {pendaftaran.catatanAdmin}
          </p>
        </Section>
      )}

      {pendaftaran.dokumen.filter((d) => d.tipe !== "BUKTI_BAYAR").length >
        0 && (
        <Section title="Dokumen Persyaratan">
          <div className="space-y-2">
            {pendaftaran.dokumen
              .filter((d) => d.tipe !== "BUKTI_BAYAR")
              .map((dok) => (
                <div
                  key={dok.id}
                  className="flex items-center justify-between px-4 py-3 rounded-lg"
                  style={{ background: "#0f1720" }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: "#14b8a6" }}>📄</span>
                    <div>
                      <p className="text-sm" style={{ color: "#e2e8f0" }}>
                        {dok.nama}
                      </p>
                      <p className="text-xs" style={{ color: "#64748b" }}>
                        {dok.tipe}
                      </p>
                    </div>
                  </div>
                  <a
                    href={dok.cloudinaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg"
                    style={{ background: "#1e3448", color: "#94a3b8" }}
                  >
                    Lihat
                  </a>
                </div>
              ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "#111c27", border: "1px solid #1e3448" }}
    >
      <h2
        className="text-sm font-semibold mb-4 uppercase tracking-wide"
        style={{ color: "#64748b" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs mb-1" style={{ color: "#64748b" }}>
        {label}
      </p>
      <p className="text-sm font-medium" style={{ color: "#e2e8f0" }}>
        {value}
      </p>
    </div>
  );
}
