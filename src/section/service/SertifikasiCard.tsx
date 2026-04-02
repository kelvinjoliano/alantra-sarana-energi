import Link from "next/link";
import { Sertifikasi, ModalType } from "./types";

type Props = {
  sertifikasi: Sertifikasi;
  nomor: number;
  onOpenModal: (type: ModalType, item: Sertifikasi) => void;
};

export default function SertifikasiCard({
  sertifikasi: s,
  nomor,
  onOpenModal,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 transition-colors p-5">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Nomor + konten */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="shrink-0 w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-500">
            {nomor}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-white font-semibold text-sm leading-snug">
                {s.nama}
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-500 text-[10px] font-bold tracking-wide uppercase shrink-0">
                {s.kategori}
              </span>
            </div>
            {s.deskripsi && (
              <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                {s.deskripsi}
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0 pl-10 sm:pl-0 sm:mt-0.5">
          <button
            onClick={() => onOpenModal("tingkatan", s)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 hover:bg-cyan-500/25 transition-all"
          >
            Tingkatan
          </button>
          <button
            onClick={() => onOpenModal("jadwal", s)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 transition-all"
          >
            Jadwal
          </button>
          <Link
            href={`/daftar?sertifikasi=${s.slug}`}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25 hover:bg-amber-500/25 transition-all"
          >
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}
