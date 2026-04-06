// src/app/(peserta)/dashboard/components/DashboardNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface Props {
  user: { name?: string | null; email?: string | null };
}

const navItems = [
  { href: "/dashboard", label: "Beranda" },
  { href: "/dashboard/pendaftaran", label: "Pendaftaran Saya" },
  { href: "/dashboard/profile", label: "Profil" },
];

export function DashboardNav({ user }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 px-4"
      style={{
        background: "#111c27",
        borderBottom: "1px solid #1e3448",
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="font-bold text-sm"
          style={{ color: "#14b8a6" }}
        >
          ASE Portal
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-sm transition-colors"
                style={{
                  background: isActive ? "#1e3448" : "transparent",
                  color: isActive ? "#14b8a6" : "#94a3b8",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* User + Logout */}
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "#64748b" }}>
            {user.name?.split(" ")[0]}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs px-3 py-1.5 rounded-lg transition-colors"
            style={{
              background: "#1e3448",
              color: "#94a3b8",
            }}
          >
            Keluar
          </button>
        </div>
      </div>
    </nav>
  );
}
