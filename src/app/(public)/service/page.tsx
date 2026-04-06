import { prisma } from "@/lib/prisma";
import ServicePageClient from "@/section/service/ServicePageClient";

export const metadata = {
  title: "Skema Sertifikasi | Alantra Sarana Energi",
  description:
    "86 skema sertifikasi kompetensi terakreditasi BNSP untuk tenaga kerja industri migas dan energi Indonesia.",
};

export default async function ServicePage() {
  const sertifikasi = await prisma.sertifikasi.findMany({
    orderBy: [{ kategori: "asc" }, { nama: "asc" }],
    select: {
      id: true,
      nama: true,
      slug: true,
      kategori: true,
      deskripsi: true,
      tingkatan: {
        select: {
          id: true,
          nama: true,
          tarif: true,
          dokumenSkemaUrl: true,
        },
        orderBy: { id: "asc" },
      },
      jadwal: {
        select: {
          id: true,
          tanggalMulai: true,
          tanggalSelesai: true,
          lokasi: true,
          metodePelaksanaan: true,
        },
        orderBy: { tanggalMulai: "asc" },
      },
    },
  });

  const kategori = [
    ...new Set(sertifikasi.map((s: { kategori: string }) => s.kategori)),
  ].sort() as string[];

  return <ServicePageClient sertifikasi={sertifikasi} kategori={kategori} />;
}
