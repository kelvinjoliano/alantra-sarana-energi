import Link from "next/link";
import { Sertifikasi, Jadwal } from "./types";
import { formatTanggal } from "./format";

type Props = {
  sertifikasi: Sertifikasi;
  onClose: () => void;
};

export default function ModalJadwal({ sertifikasi, onClose }: Props) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
        <div>
          <h3 className="text-white font-bold text-base uppercase tracking-wide">
            Jadwal
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">{sertifikasi.nama}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white transition-colors p-1"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 4L14 14M14 4L4 14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Notice */}
      <div className="px-6 py-3 bg-yellow-500/10 border-b border-yellow-500/20">
        <p className="text-yellow-400 text-xs font-medium">
          * Jadwal Terdiri Dari 1 Hari Bimtek dan 2 Hari Asesmen
        </p>
      </div>

      {/* Table */}
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-[#1a2332]">
            <tr className="border-b border-white/8">
              <th className="text-left px-5 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider w-10">
                No
              </th>
              <th className="text-left px-5 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                Jadwal *
              </th>
              <th className="text-left px-5 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                Lokasi
              </th>
              <th className="text-left px-5 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                Metode
              </th>
              <th className="text-right px-5 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {sertifikasi.jadwal.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-slate-500 text-xs"
                >
                  Belum ada jadwal tersedia
                </td>
              </tr>
            ) : (
              sertifikasi.jadwal.map((j: Jadwal, i: number) => (
                <tr
                  key={j.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                >
                  <td className="px-5 py-3.5 text-slate-500 text-xs">
                    {i + 1}
                  </td>
                  <td className="px-5 py-3.5 text-white">
                    {formatTanggal(j.tanggalMulai)} s.d{" "}
                    {formatTanggal(j.tanggalSelesai)}
                  </td>
                  <td className="px-5 py-3.5 text-slate-300 text-xs">
                    {j.lokasi ? (
                      <span className="flex items-center gap-1">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M6 1C4.067 1 2.5 2.567 2.5 4.5C2.5 7.25 6 11 6 11C6 11 9.5 7.25 9.5 4.5C9.5 2.567 7.933 1 6 1ZM6 6C5.172 6 4.5 5.328 4.5 4.5C4.5 3.672 5.172 3 6 3C6.828 3 7.5 3.672 7.5 4.5C7.5 5.328 6.828 6 6 6Z"
                            fill="currentColor"
                          />
                        </svg>
                        {j.lokasi}
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold text-white ${
                        j.metodePelaksanaan === "Online"
                          ? "bg-blue-500/15 text-blue-400"
                          : "bg-teal-500/15 text-teal-400"
                      }`}
                    >
                      {j.metodePelaksanaan}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/daftar?sertifikasi=${sertifikasi.slug}&jadwal=${j.id}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                      style={{
                        background:
                          "linear-gradient(135deg, #0d9488 0%, #16a34a 100%)",
                      }}
                    >
                      Daftar
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5H8M5.5 2.5L8 5L5.5 7.5"
                          stroke="white"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-white/8 flex justify-between items-center">
        <span className="text-slate-500 text-xs">
          {sertifikasi.jadwal.length} jadwal tersedia
        </span>
        <button
          onClick={onClose}
          className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-400 border border-white/10 hover:bg-white/5 transition-all"
        >
          Tutup
        </button>
      </div>
    </>
  );
}
