"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SertifikasiTable } from "./components/SertifikasiTable";
import { SertifikasiFilter } from "./components/SertifikasiFilter";

type Stats = {
  data: any[];
  total: number;
  page: number;
  totalPages: number;
};

export default function SertifikasiPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sertifikasi?${searchParams.toString()}`);
      const json = await res.json();
      setResult(json);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/admin/sertifikasi?${params.toString()}`);
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: "#f1f5f9" }}>
            Sertifikasi
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#64748b" }}>
            {result ? `${result.total} sertifikasi terdaftar` : "Memuat..."}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/sertifikasi/baru")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
          style={{ background: "#14b8a6", color: "#0f1720" }}
        >
          <span>+</span> Tambah Sertifikasi
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <SertifikasiFilter />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
        </div>
      ) : result ? (
        <SertifikasiTable
          data={result.data}
          total={result.total}
          page={result.page}
          totalPages={result.totalPages}
          onPageChange={handlePageChange}
          onRefresh={fetchData}
        />
      ) : null}
    </div>
  );
}
