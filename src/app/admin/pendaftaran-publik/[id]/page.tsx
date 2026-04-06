// src/app/admin/pendaftaran-publik/[id]/page.tsx

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { StatusBadgePubik } from "../components/StatusBadgePublik";
import { UpdateStatusForm } from "./components/UpdateStatusForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DetailPendaftaranPublikPage({ params }: Props) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const p = await prisma.pendaftaranPublik.findUnique({ where: { id } });
  if (!p) redirect("/admin/pendaftaran-publik");

  return (
    <div style={{ maxWidth: "900px" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs mb-1" style={{ color: "#64748b" }}>
            {p.noPendaftaran}
          </p>
          <h1 className="text-xl font-semibold" style={{ color: "#f1f5f9" }}>
            {p.namaLengkap}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#94a3b8" }}>
            {p.skema} · {p.metode}
          </p>
        </div>
        <StatusBadgePubik status={p.status} />
      </div>

      <div className="grid gap-5">
        {/* Data Diri */}
        <Section title="Data Diri">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Nama Lengkap" value={p.namaLengkap} />
            <InfoItem label="Email" value={p.email} />
            <InfoItem label="NIK" value={p.nik} />
            <InfoItem label="No HP" value={p.noHp} />
            <InfoItem label="Tempat Lahir" value={p.tempatLahir} />
            <InfoItem label="Tanggal Lahir" value={p.tanggalLahir} />
            <InfoItem label="Jenis Kelamin" value={p.jenisKelamin} />
            <InfoItem label="Kode Pos" value={p.kodePos} />
            <InfoItem label="Pendidikan" value={p.pendidikan} />
          </div>
          <div className="mt-4">
            <InfoItem label="Alamat Lengkap" value={p.alamat} />
          </div>
        </Section>

        {/* Sertifikasi */}
        <Section title="Sertifikasi">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Skema" value={p.skema} />
            <InfoItem label="Metode" value={p.metode} />
          </div>
        </Section>

        {/* Referral */}
        <Section title="Penanggung Jawab">
          <InfoItem label="Nama & No WA" value={p.penanggungjawab} />
        </Section>

        {/* Dokumen */}
        <Section title="Dokumen">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "KTP", url: p.ktpUrl },
              { label: "Ijazah", url: p.ijazahUrl },
              { label: "Pas Foto", url: p.pasFotoUrl },
              { label: "Surat Pengalaman Kerja", url: p.suratUrl },
            ].map((dok) => (
              <div
                key={dok.label}
                className="rounded-lg p-4"
                style={{ background: "#0f1720" }}
              >
                <p className="text-xs mb-2" style={{ color: "#64748b" }}>
                  {dok.label}
                </p>
                {dok.url ? (
                  <a
                    href={dok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium flex items-center gap-2"
                    style={{ color: "#14b8a6" }}
                  >
                    📄 Lihat Dokumen →
                  </a>
                ) : (
                  <p className="text-sm" style={{ color: "#475569" }}>
                    Tidak ada
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Info Pendaftaran */}
        <Section title="Info Pendaftaran">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem
              label="Tanggal Daftar"
              value={new Date(p.createdAt).toLocaleString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
            <InfoItem label="Status" value={p.status} />
          </div>
          {p.catatanAdmin && (
            <div className="mt-4">
              <InfoItem label="Catatan Admin" value={p.catatanAdmin} />
            </div>
          )}
        </Section>

        {/* Update Status */}
        <UpdateStatusForm
          id={p.id}
          currentStatus={p.status}
          currentCatatan={p.catatanAdmin ?? ""}
        />
      </div>
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
        {value || "-"}
      </p>
    </div>
  );
}
