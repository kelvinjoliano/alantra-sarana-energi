// src/app/admin/pendaftaran-publik/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PendaftaranPublikFilter } from "./components/PendaftaranPublikFilter";
import { StatusBadgePubik } from "./components/StatusBadgePublik";

interface Props {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function PendaftaranPublikPage({ searchParams }: Props) {
  const { status, search, page } = await searchParams;
  const currentPage = parseInt(page ?? "1");
  const limit = 20;
  const skip = (currentPage - 1) * limit;

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { namaLengkap: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { noHp: { contains: search, mode: "insensitive" } },
      { noPendaftaran: { contains: search, mode: "insensitive" } },
      { skema: { contains: search, mode: "insensitive" } },
    ];
  }

  const [data, total, statsRaw] = await Promise.all([
    prisma.pendaftaranPublik.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.pendaftaranPublik.count({ where }),
    prisma.pendaftaranPublik.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const stats = {
    BARU: 0,
    DIPROSES: 0,
    SELESAI: 0,
    DITOLAK: 0,
    ...Object.fromEntries(statsRaw.map((s) => [s.status, s._count._all])),
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1" style={{ color: "#f1f5f9" }}>
          Pendaftaran Publik
        </h1>
        <p className="text-sm" style={{ color: "#64748b" }}>
          Data pendaftaran dari form publik
        </p>
      </div>

      {/* Stat Cards */}
      <div
        className="grid gap-4 mb-6"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {[
          { label: "Baru", key: "BARU", color: "#38bdf8" },
          { label: "Diproses", key: "DIPROSES", color: "#fbbf24" },
          { label: "Selesai", key: "SELESAI", color: "#34d399" },
          { label: "Ditolak", key: "DITOLAK", color: "#f87171" },
        ].map((s) => (
          <Link
            key={s.key}
            href={`/admin/pendaftaran-publik?status=${s.key}`}
            className="rounded-xl p-4 transition-colors"
            style={{
              background: status === s.key ? "#1e3448" : "#111c27",
              border: `1px solid ${status === s.key ? s.color : "#1e3448"}`,
            }}
          >
            <p className="text-2xl font-bold" style={{ color: s.color }}>
              {stats[s.key as keyof typeof stats]}
            </p>
            <p className="text-xs mt-1" style={{ color: "#64748b" }}>
              {s.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Filter & Search */}
      <PendaftaranPublikFilter currentSearch={search} currentStatus={status} />

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#111c27", border: "1px solid #1e3448" }}
      >
        {data.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm" style={{ color: "#64748b" }}>
              Tidak ada data pendaftaran
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #1e3448" }}>
                  {[
                    "No. Pendaftaran",
                    "Nama",
                    "Skema",
                    "Metode",
                    "Tanggal",
                    "Status",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "#64748b" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((p) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: "1px solid #1e3448" }}
                    className="hover:bg-[#1e3448] transition-colors"
                  >
                    <td className="px-4 py-3" style={{ color: "#94a3b8" }}>
                      {p.noPendaftaran}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium" style={{ color: "#f1f5f9" }}>
                        {p.namaLengkap}
                      </p>
                      <p className="text-xs" style={{ color: "#64748b" }}>
                        {p.noHp}
                      </p>
                    </td>
                    <td className="px-4 py-3" style={{ color: "#e2e8f0" }}>
                      {p.skema}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#94a3b8" }}>
                      {p.metode}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#94a3b8" }}>
                      {new Date(p.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadgePubik status={p.status} />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/pendaftaran-publik/${p.id}`}
                        className="text-xs px-3 py-1.5 rounded-lg"
                        style={{ background: "#1e3448", color: "#14b8a6" }}
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs" style={{ color: "#64748b" }}>
            {skip + 1}–{Math.min(skip + limit, total)} dari {total} data
          </p>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Link
                href={`/admin/pendaftaran-publik?page=${currentPage - 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "#1e3448", color: "#94a3b8" }}
              >
                ← Prev
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={`/admin/pendaftaran-publik?page=${currentPage + 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
                className="text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "#1e3448", color: "#94a3b8" }}
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
