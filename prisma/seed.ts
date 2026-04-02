import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function toSlug(nama: string): string {
  return nama
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const sertifikasiData = [
  // ── K3 & HSE ──────────────────────────────────────────────
  { nama: "Operator K3 Migas", kategori: "K3 & HSE" },
  { nama: "Auditor K3 Migas", kategori: "K3 & HSE" },
  { nama: "Operator Gas Tester", kategori: "K3 & HSE" },
  { nama: "Pengawas K3 Migas", kategori: "K3 & HSE" },
  { nama: "Pengawas Utama K3 Migas", kategori: "K3 & HSE" },
  { nama: "Petugas Penanganan Bahaya Gas H2S", kategori: "K3 & HSE" },

  // ── Pengeboran & Produksi ──────────────────────────────────
  { nama: "Welding Inspector", kategori: "Pengeboran & Produksi" },
  { nama: "Inspektur Rig", kategori: "Pengeboran & Produksi" },
  { nama: "Operator Muda Produksi", kategori: "Pengeboran & Produksi" },
  { nama: "Operator Madya Produksi", kategori: "Pengeboran & Produksi" },
  { nama: "Operator Kepala Produksi", kategori: "Pengeboran & Produksi" },
  { nama: "Pengawas Operasi Produksi", kategori: "Pengeboran & Produksi" },
  { nama: "Pengawas Utama Produksi", kategori: "Pengeboran & Produksi" },
  { nama: "Operator Lantai Pengeboran", kategori: "Pengeboran & Produksi" },
  { nama: "Operator Menara Pengeboran", kategori: "Pengeboran & Produksi" },
  { nama: "Juru Bor Darat", kategori: "Pengeboran & Produksi" },
  { nama: "Ahli Pengendali Pengeboran", kategori: "Pengeboran & Produksi" },

  // ── Perawatan Sumur ────────────────────────────────────────
  { nama: "Operator Lantai Perawatan Sumur", kategori: "Perawatan Sumur" },
  { nama: "Operator Menara Perawatan Sumur", kategori: "Perawatan Sumur" },
  { nama: "Operator Unit Perawatan Sumur", kategori: "Perawatan Sumur" },
  { nama: "Ahli Pengendali Perawatan Sumur", kategori: "Perawatan Sumur" },
  { nama: "Pengawas Perawatan Sumur", kategori: "Perawatan Sumur" },

  // ── Pengangkatan & Rigging ─────────────────────────────────
  { nama: "Operator Pesawat Angkat Mobil", kategori: "Pengangkatan & Rigging" },
  {
    nama: "Operator Pesawat Angkat Putar Tetap",
    kategori: "Pengangkatan & Rigging",
  },
  { nama: "Operator Forklift", kategori: "Pengangkatan & Rigging" },
  { nama: "Juru Ikat Beban", kategori: "Pengangkatan & Rigging" },
  { nama: "Pipe Fitter", kategori: "Pengangkatan & Rigging" },
  {
    nama: "Operator Pesawat Angkat Jembatan",
    kategori: "Pengangkatan & Rigging",
  },

  // ── Pengujian & Laboratorium ───────────────────────────────
  { nama: "Operator Pengujian Air", kategori: "Pengujian & Laboratorium" },
  {
    nama: "Operator Pengujian Crude Oil",
    kategori: "Pengujian & Laboratorium",
  },
  {
    nama: "Operator Pengujian Minyak Pelumas",
    kategori: "Pengujian & Laboratorium",
  },
  { nama: "Operator Pengujian Gas Bumi", kategori: "Pengujian & Laboratorium" },
  {
    nama: "Operator Pengujian Petrokimia",
    kategori: "Pengujian & Laboratorium",
  },

  // ── Lingkungan & Limbah ────────────────────────────────────
  { nama: "Pengendali Limbah Cair", kategori: "Lingkungan & Limbah" },
  { nama: "Operator Pengambilan Contoh BBM", kategori: "Lingkungan & Limbah" },
  {
    nama: "Operator Pengambilan Contoh Limbah",
    kategori: "Lingkungan & Limbah",
  },
  { nama: "Operator Pengambilan Contoh Air", kategori: "Lingkungan & Limbah" },

  // ── Instrumentasi & Kalibrasi ──────────────────────────────
  { nama: "Teknisi Instrumentasi", kategori: "Instrumentasi & Kalibrasi" },
  { nama: "Pengawas Instrumentasi", kategori: "Instrumentasi & Kalibrasi" },
  { nama: "Teknisi Kalibrasi Suhu", kategori: "Instrumentasi & Kalibrasi" },
  { nama: "Teknisi Kalibrasi Tekanan", kategori: "Instrumentasi & Kalibrasi" },
  { nama: "Teknisi Kalibrasi Densitas", kategori: "Instrumentasi & Kalibrasi" },
  { nama: "Teknisi Kalibrasi Volume", kategori: "Instrumentasi & Kalibrasi" },

  // ── Operasi CDU & Gas Bumi ─────────────────────────────────
  { nama: "Teknisi Operasi Yunior CDU", kategori: "Operasi CDU & Gas Bumi" },
  { nama: "Operator SPPLPG", kategori: "Operasi CDU & Gas Bumi" },
  {
    nama: "Pengawas atau Kepala Regu SPPLPG",
    kategori: "Operasi CDU & Gas Bumi",
  },
  { nama: "Pengukur Isi Tangki BBM", kategori: "Operasi CDU & Gas Bumi" },
  { nama: "Operator Pemrosesan Gas Bumi", kategori: "Operasi CDU & Gas Bumi" },

  // ── Kelistrikan & Sistem Tenaga ────────────────────────────
  {
    nama: "Teknisi Sistem Pembangkit",
    kategori: "Kelistrikan & Sistem Tenaga",
  },
  {
    nama: "Teknisi Sistem Distribusi",
    kategori: "Kelistrikan & Sistem Tenaga",
  },
  { nama: "Teknisi Sistem Utilitas", kategori: "Kelistrikan & Sistem Tenaga" },
  {
    nama: "Supervisor Teknik Listrik",
    kategori: "Kelistrikan & Sistem Tenaga",
  },
  { nama: "Inspektur Kelistrikan", kategori: "Kelistrikan & Sistem Tenaga" },
  { nama: "Operator Boiler Kelas 1", kategori: "Kelistrikan & Sistem Tenaga" },
  { nama: "Operator Boiler Kelas 2", kategori: "Kelistrikan & Sistem Tenaga" },
  { nama: "Pengawas Operasi Boiler", kategori: "Kelistrikan & Sistem Tenaga" },

  // ── Geologi & Drilling Engineering ────────────────────────
  { nama: "Mud Logger", kategori: "Geologi & Drilling Engineering" },
  { nama: "Pressure Engineer", kategori: "Geologi & Drilling Engineering" },
  { nama: "Wellsite Geologist", kategori: "Geologi & Drilling Engineering" },

  // ── Pengelasan & Fabrikasi ─────────────────────────────────
  { nama: "Weider Pengelasan Bawah Air", kategori: "Pengelasan & Fabrikasi" },
  { nama: "Welding Supervisor", kategori: "Pengelasan & Fabrikasi" },

  // ── Bongkar Muat & Logistik ────────────────────────────────
  { nama: "Loading Master", kategori: "Bongkar Muat & Logistik" },
  { nama: "Operator Blending", kategori: "Bongkar Muat & Logistik" },

  // ── Inspeksi Teknik ────────────────────────────────────────
  { nama: "Inspektur Crane", kategori: "Inspeksi Teknik" },
  { nama: "Inspektur Bejana Tekan", kategori: "Inspeksi Teknik" },
  { nama: "Inspektur Handak", kategori: "Inspeksi Teknik" },
  { nama: "Inspektur Pipa Penyalur", kategori: "Inspeksi Teknik" },
  { nama: "Inspektur Piping", kategori: "Inspeksi Teknik" },
  { nama: "Inspektur Rotating Equipment", kategori: "Inspeksi Teknik" },
  { nama: "Inspektur Tangki Timbun", kategori: "Inspeksi Teknik" },
  { nama: "Inspektur Platform", kategori: "Inspeksi Teknik" },

  // ── Scaffolding ────────────────────────────────────────────
  { nama: "Operator Scaffolding", kategori: "Scaffolding" },
  { nama: "Perancang Scaffolding", kategori: "Scaffolding" },
  { nama: "Pengawas Scaffolding", kategori: "Scaffolding" },
  { nama: "Quality Control Scaffolding", kategori: "Scaffolding" },

  // ── Fluida & Mekanik ───────────────────────────────────────
  { nama: "Juru Aduk Fluida", kategori: "Fluida & Mekanik" },
  { nama: "Ahli Fluida", kategori: "Fluida & Mekanik" },
  { nama: "Teknisi Perawatan Mekanik", kategori: "Fluida & Mekanik" },
  { nama: "Supervisor Perawatan Mekanik", kategori: "Fluida & Mekanik" },

  // ── SPBU & Distribusi BBM ──────────────────────────────────
  { nama: "Operator SPBU", kategori: "SPBU & Distribusi BBM" },
  { nama: "Pengawas SPBU", kategori: "SPBU & Distribusi BBM" },
  { nama: "Pengelola SPBU", kategori: "SPBU & Distribusi BBM" },

  // ── PRD ────────────────────────────────────────────────────
  { nama: "Teknisi PRD", kategori: "PRD" },
  { nama: "Pengawas PRD", kategori: "PRD" },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Hapus data lama
  await prisma.jadwal.deleteMany();
  await prisma.tingkatan.deleteMany();
  await prisma.sertifikasi.deleteMany();

  // Jadwal contoh (bisa di-update nanti via dashboard/admin)
  const jadwalContoh = [
    { mulai: new Date("2026-04-13"), selesai: new Date("2026-04-15") },
    { mulai: new Date("2026-04-27"), selesai: new Date("2026-04-29") },
    { mulai: new Date("2026-05-11"), selesai: new Date("2026-05-13") },
    { mulai: new Date("2026-06-02"), selesai: new Date("2026-06-04") },
    { mulai: new Date("2026-06-22"), selesai: new Date("2026-06-24") },
    { mulai: new Date("2026-07-06"), selesai: new Date("2026-07-08") },
    { mulai: new Date("2026-07-20"), selesai: new Date("2026-07-22") },
    { mulai: new Date("2026-08-03"), selesai: new Date("2026-08-05") },
    { mulai: new Date("2026-08-18"), selesai: new Date("2026-08-20") },
    { mulai: new Date("2026-08-31"), selesai: new Date("2026-09-02") },
  ];

  for (const item of sertifikasiData) {
    const slug = toSlug(item.nama);

    const sertifikasi = await prisma.sertifikasi.create({
      data: {
        nama: item.nama,
        slug,
        kategori: item.kategori,
        deskripsi: `Sertifikasi kompetensi ${item.nama} yang diakui secara nasional oleh BNSP untuk tenaga kerja industri migas dan energi.`,
        tingkatan: {
          create: [
            {
              nama: "OPERATOR AGT",
              tarif: 1650000,
              dokumenSkemaUrl: null,
            },
          ],
        },
        jadwal: {
          create: jadwalContoh.map((j) => ({
            tanggalMulai: j.mulai,
            tanggalSelesai: j.selesai,
          })),
        },
      },
    });

    console.log(`✅ ${sertifikasi.nama}`);
  }

  console.log(
    `\n🎉 Seeding selesai! Total: ${sertifikasiData.length} sertifikasi`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
