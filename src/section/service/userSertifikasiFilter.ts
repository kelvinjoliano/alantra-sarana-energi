import { useState, useMemo } from "react";
import { Sertifikasi } from "./types";

const ITEMS_PER_PAGE = 6;

export function useSertifikasiFilter(sertifikasi: Sertifikasi[]) {
  const [search, setSearch] = useState("");
  const [activeKategori, setActiveKategori] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return sertifikasi.filter((s) => {
      const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase());
      const matchKategori =
        activeKategori === "Semua" || s.kategori === activeKategori;
      return matchSearch && matchKategori;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sertifikasi, search, activeKategori]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const globalOffset = (currentPage - 1) * ITEMS_PER_PAGE;

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getPageNumbers(): (number | "...")[] {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  return {
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
  };
}
