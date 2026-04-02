type Props = {
  currentPage: number;
  totalPages: number;
  globalOffset: number;
  totalFiltered: number;
  itemsPerPage: number;
  getPageNumbers: () => (number | "...")[];
  goToPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  globalOffset,
  totalFiltered,
  itemsPerPage,
  getPageNumbers,
  goToPage,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-xs text-slate-500">
        Menampilkan{" "}
        <span className="text-slate-300 font-medium">
          {globalOffset + 1}–
          {Math.min(globalOffset + itemsPerPage, totalFiltered)}
        </span>{" "}
        dari <span className="text-slate-300 font-medium">{totalFiltered}</span>{" "}
        sertifikasi
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 border border-white/10 bg-white/3 hover:bg-white/8 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ← Previous
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-slate-600 text-xs"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page as number)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                currentPage === page
                  ? "bg-teal-500/20 text-teal-400 border border-teal-500/40"
                  : "text-slate-400 border border-white/10 bg-white/3 hover:bg-white/8"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 border border-white/10 bg-white/3 hover:bg-white/8 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
