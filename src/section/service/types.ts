export type Tingkatan = {
  id: number;
  nama: string;
  tarif: number;
  dokumenSkemaUrl: string | null;
};

export type Jadwal = {
  id: number;
  tanggalMulai: Date | string;
  tanggalSelesai: Date | string;
  lokasi: string | null;
  metodePelaksanaan: string;
};

export type Sertifikasi = {
  id: number;
  nama: string;
  slug: string;
  kategori: string;
  deskripsi: string | null;
  tingkatan: Tingkatan[];
  jadwal: Jadwal[];
};

export type ModalType = "tingkatan" | "jadwal" | null;
