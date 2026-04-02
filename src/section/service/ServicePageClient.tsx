"use client";

import { useState } from "react";
import { Sertifikasi, ModalType } from "./types";
import { useSertifikasiFilter } from "./userSertifikasiFilter";
import SearchBar from "./SearchBar";
import KategoriFilter from "./KategoriFilter";
import SertifikasiCard from "./SertifikasiCard";
import Pagination from "./Pagination";
import ModalTingkatan from "./ModalTingkatan";
import ModalJadwal from "./ModalJadwal";

const ITEMS_PER_PAGE = 6;

type Props = {
  sertifikasi: Sertifikasi[];
  kategori: string[];
};

export default function ServicePageClient({ sertifikasi, kategori }: Props) {
  const [modal, setModal] = useState<ModalType>(null);
  const [activeSertifikasi, setActiveSertifikasi] =
    useState<Sertifikasi | null>(null);

  const {
    search,
    setSearch,
    activeKategori,
    setActiveKategori,
    currentPage,
    totalPages,
    paginated,
    globalOffset,
    filtered,
    goToPage,
    getPageNumbers,
  } = useSertifikasiFilter(sertifikasi);

  function openModal(type: ModalType, item: Sertifikasi) {
    setActiveSertifikasi(item);
    setModal(type);
  }

  function closeModal() {
    setModal(null);
    setActiveSertifikasi(null);
  }

  return (
    <main className="min-h-screen bg-[#0f1720]">
      {/* Hero */}
      <section className="relative bg-[#1a2332] border-b border-white/5 py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            86 Skema Sertifikasi
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Skema Sertifikasi
          </h1>
          <p className="text-slate-400 max-w-xl text-sm">
            Pilih sertifikasi kompetensi yang sesuai dengan bidang keahlian
            Anda. Semua skema terakreditasi resmi oleh BNSP.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          totalFiltered={filtered.length}
        />

        <KategoriFilter
          kategori={kategori}
          active={activeKategori}
          onChange={setActiveKategori}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-sm">
            Tidak ada sertifikasi yang cocok
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {paginated.map((s, i) => (
                <SertifikasiCard
                  key={s.id}
                  sertifikasi={s}
                  nomor={globalOffset + i + 1}
                  onOpenModal={openModal}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              globalOffset={globalOffset}
              totalFiltered={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
              getPageNumbers={getPageNumbers}
              goToPage={goToPage}
            />
          </>
        )}
      </div>

      {/* Modal */}
      {modal && activeSertifikasi && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={closeModal}
        >
          <div
            className="bg-[#1a2332] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {modal === "tingkatan" ? (
              <ModalTingkatan
                sertifikasi={activeSertifikasi}
                onClose={closeModal}
              />
            ) : (
              <ModalJadwal
                sertifikasi={activeSertifikasi}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
