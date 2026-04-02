import { Sertifikasi, Tingkatan } from "./types";
import { formatRupiah } from "./format";

type Props = {
  sertifikasi: Sertifikasi;
  onClose: () => void;
};

export default function ModalTingkatan({ sertifikasi, onClose }: Props) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
        <div>
          <h3 className="text-white font-bold text-base uppercase tracking-wide">
            Tingkatan
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
          * Tarif Sertifikasi Termasuk Bimtek (Pengenalan Teknis Asesmen)
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
                Tingkatan
              </th>
              <th className="text-left px-5 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                Tarif *
              </th>
              <th className="text-left px-5 py-3 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                Dokumen Skema *
              </th>
            </tr>
          </thead>
          <tbody>
            {sertifikasi.tingkatan.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-slate-500 text-xs"
                >
                  Belum ada data tingkatan
                </td>
              </tr>
            ) : (
              sertifikasi.tingkatan.map((t: Tingkatan, i: number) => (
                <tr
                  key={t.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                >
                  <td className="px-5 py-3.5 text-slate-500 text-xs">
                    {i + 1}
                  </td>
                  <td className="px-5 py-3.5 text-white font-medium">
                    {t.nama}
                  </td>
                  <td className="px-5 py-3.5 text-teal-400 font-semibold">
                    {formatRupiah(t.tarif)}
                  </td>
                  <td className="px-5 py-3.5">
                    {t.dokumenSkemaUrl ? (
                      <a
                        href={t.dokumenSkemaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all"
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                        >
                          <path
                            d="M5.5 1v6M2.5 4.5l3 3 3-3M1 9.5h9"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Unduh
                      </a>
                    ) : (
                      <span className="text-slate-600 text-xs">—</span>
                    )}
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
          {sertifikasi.tingkatan.length} tingkatan
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
