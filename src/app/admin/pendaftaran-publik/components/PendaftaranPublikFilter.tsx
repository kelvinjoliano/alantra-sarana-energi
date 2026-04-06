// src/app/admin/pendaftaran-publik/components/PendaftaranPublikFilter.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export function PendaftaranPublikFilter({
  currentSearch,
  currentStatus,
}: {
  currentSearch?: string;
  currentStatus?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(currentSearch ?? "");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (currentStatus) params.set("status", currentStatus);
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    setSearch("");
    router.push(pathname);
  }

  return (
    <div className="flex items-center gap-3 mb-4">
      <form onSubmit={handleSearch} className="flex gap-2 flex-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama, email, no HP, no pendaftaran..."
          className="flex-1 rounded-lg px-4 py-2 text-sm"
          style={{
            background: "#111c27",
            border: "1px solid #1e3448",
            color: "#e2e8f0",
            outline: "none",
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: "#14b8a6", color: "#0f1720" }}
        >
          Cari
        </button>
      </form>

      {(currentSearch || currentStatus) && (
        <button
          onClick={clearFilters}
          className="px-4 py-2 rounded-lg text-sm"
          style={{ background: "#1e3448", color: "#94a3b8" }}
        >
          Reset
        </button>
      )}
    </div>
  );
}
