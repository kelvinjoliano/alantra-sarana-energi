import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SertifikasiForm } from "../components/SertifikasiForm";
import { TingkatanManager } from "../components/TingkatanManager";

type Props = { params: Promise<{ id: string }> };

export default async function SertifikasiEditPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") notFound();

  const { id: rawId } = await params;
  const id = parseInt(rawId);
  if (isNaN(id)) notFound();

  const sertifikasi = await prisma.sertifikasi.findUnique({
    where: { id },
    include: {
      tingkatan: { orderBy: { id: "asc" } },
      _count: { select: { jadwal: true, pendaftaran: true } },
    },
  });

  if (!sertifikasi) notFound();

  return (
    <div style={{ maxWidth: "720px" }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-semibold" style={{ color: "#f1f5f9" }}>
            Edit Sertifikasi
          </h1>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={
              sertifikasi.isActive
                ? { background: "rgba(20,184,166,0.1)", color: "#14b8a6" }
                : { background: "rgba(100,116,139,0.1)", color: "#64748b" }
            }
          >
            {sertifikasi.isActive ? "Aktif" : "Nonaktif"}
          </span>
        </div>
        <p className="text-sm" style={{ color: "#64748b" }}>
          {sertifikasi.nama} · {sertifikasi._count.jadwal} jadwal ·{" "}
          {sertifikasi._count.pendaftaran} pendaftaran
        </p>
      </div>

      {/* Form edit info dasar */}
      <div className="mb-4">
        <SertifikasiForm
          mode="edit"
          id={sertifikasi.id}
          initialData={{
            nama: sertifikasi.nama,
            kategori: sertifikasi.kategori,
            deskripsi: sertifikasi.deskripsi ?? "",
            isActive: sertifikasi.isActive,
          }}
        />
      </div>

      {/* Tingkatan manager */}
      <TingkatanManager
        sertifikasiId={sertifikasi.id}
        initialData={sertifikasi.tingkatan}
      />
    </div>
  );
}
