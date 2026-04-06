"use client";

// src/app/admin/layout.tsx

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    href: "/admin/sertifikasi",
    label: "Sertifikasi",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    href: "/admin/jadwal",
    label: "Jadwal",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    href: "/admin/pendaftaran-publik",
    label: "Pendaftaran",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0f1720" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
          <p className="text-sm" style={{ color: "#64748b" }}>
            Memuat...
          </p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#0f1720", color: "#e2e8f0" }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: "220px",
          background: "#111c27",
          borderRight: "1px solid rgba(20, 184, 166, 0.12)",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: "1px solid rgba(20, 184, 166, 0.1)" }}
        >
          <div
            className="flex items-center justify-center rounded-lg flex-shrink-0"
            style={{
              width: "32px",
              height: "32px",
              background: "rgba(20, 184, 166, 0.15)",
              border: "1px solid rgba(20, 184, 166, 0.3)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#14b8a6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div className="min-w-0">
            <p
              className="font-semibold text-sm leading-tight truncate"
              style={{ color: "#f1f5f9" }}
            >
              Alantra
            </p>
            <p
              className="text-xs leading-tight truncate"
              style={{ color: "#64748b" }}
            >
              Admin Panel
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150"
                    style={{
                      background: active
                        ? "rgba(20, 184, 166, 0.12)"
                        : "transparent",
                      color: active ? "#2dd4bf" : "#94a3b8",
                      fontWeight: active ? "500" : "400",
                      textDecoration: "none",
                    }}
                  >
                    <span
                      style={{
                        color: active ? "#14b8a6" : "#475569",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                    {active && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#14b8a6" }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info + sign out */}
        <div
          className="p-3"
          style={{ borderTop: "1px solid rgba(20, 184, 166, 0.1)" }}
        >
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div
              className="flex items-center justify-center rounded-full text-xs font-semibold flex-shrink-0"
              style={{
                width: "30px",
                height: "30px",
                background: "rgba(20, 184, 166, 0.2)",
                color: "#14b8a6",
              }}
            >
              {session?.user?.name?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-medium truncate"
                style={{ color: "#cbd5e1" }}
              >
                {session?.user?.name ?? "Admin"}
              </p>
              <p className="text-xs truncate" style={{ color: "#475569" }}>
                Administrator
              </p>
            </div>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex-shrink-0 p-1 rounded transition-colors"
              style={{ color: "#475569" }}
              title="Keluar"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className="flex items-center justify-between px-4 lg:px-6 py-4 flex-shrink-0 sticky top-0 z-10"
          style={{
            background: "rgba(15, 23, 32, 0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(20, 184, 166, 0.1)",
            minHeight: "60px",
          }}
        >
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: "#64748b" }}
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <Breadcrumb pathname={pathname} />

          {/* Online indicator */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
            style={{
              background: "rgba(20, 184, 166, 0.08)",
              border: "1px solid rgba(20, 184, 166, 0.2)",
              color: "#14b8a6",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#14b8a6" }}
            />
            Online
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

function Breadcrumb({ pathname }: { pathname: string }) {
  const segments = pathname.split("/").filter(Boolean);
  const labelMap: Record<string, string> = {
    admin: "Admin",
    sertifikasi: "Sertifikasi",
    jadwal: "Jadwal",
    "pendaftaran-publik": "Pendaftaran",
    baru: "Tambah Baru",
  };

  return (
    <nav
      className="flex items-center gap-1.5 text-sm"
      style={{ color: "#64748b" }}
    >
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        const href = "/" + segments.slice(0, i + 1).join("/");
        const isCuid = seg.length > 15 && /^[a-z0-9]+$/.test(seg);
        const label =
          labelMap[seg] ??
          (isCuid ? "Detail" : /^\d+$/.test(seg) ? "Detail" : seg);
        return (
          <span key={href} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
            {isLast ? (
              <span style={{ color: "#e2e8f0", fontWeight: "500" }}>
                {label}
              </span>
            ) : (
              <Link
                href={href}
                style={{ color: "#64748b", textDecoration: "none" }}
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
