"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/service", label: "Layanan" },
  { href: "/contact", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#1a2332]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-[#1a2332] border-b border-white/[0.06]"
      }`}
    >
      <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/images/logo-alantra-v2.png"
            alt="Alantra Sarana Energi"
            width={148}
            height={44}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-0.5 flex-1 justify-center list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all duration-150"
          >
            Masuk
          </Link>
          <div className="w-px h-5 bg-white/10" />
          <Link
            href="/daftar"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #0d9488 0%, #16a34a 100%)",
            }}
          >
            Daftar
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/[0.08] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block w-5 h-[1.5px] bg-slate-300 rounded-sm transition-all duration-200 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-slate-300 rounded-sm transition-all duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-slate-300 rounded-sm transition-all duration-200 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-white/[0.06] px-4 pt-3 pb-5 flex flex-col gap-1 bg-[#1a2332] animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="w-full py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all duration-150 text-center"
            >
              Masuk
            </Link>
            <Link
              href="/daftar"
              onClick={() => setOpen(false)}
              className="w-full py-2.5 text-sm font-semibold text-white text-center rounded-lg transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #16a34a 100%)",
              }}
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
