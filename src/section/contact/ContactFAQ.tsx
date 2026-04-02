"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Bagaimana cara mendaftar program sertifikasi?",
    a: "Pendaftaran dapat dilakukan secara online melalui halaman Daftar di website kami. Isi formulir pendaftaran, pilih skema sertifikasi yang sesuai, dan tim kami akan menghubungi Anda dalam 1×24 jam untuk konfirmasi dan informasi lebih lanjut.",
  },
  {
    q: "Berapa lama proses sertifikasi berlangsung?",
    a: "Durasi proses sertifikasi bervariasi tergantung skema yang dipilih, umumnya 1–3 hari untuk asesmen. Setelah ujian dinyatakan lulus, sertifikat akan diterbitkan dalam 7 hari kerja.",
  },
  {
    q: "Apakah sertifikat yang diterbitkan diakui secara nasional?",
    a: "Ya, seluruh sertifikat yang kami terbitkan telah mendapat pengakuan resmi dari Badan Nasional Sertifikasi Profesi (BNSP) dan diakui oleh ratusan perusahaan serta instansi pemerintah di seluruh Indonesia.",
  },
  {
    q: "Apa saja syarat untuk mengikuti sertifikasi?",
    a: "Persyaratan berbeda untuk setiap skema sertifikasi. Secara umum, peserta harus memiliki latar belakang pendidikan atau pengalaman kerja yang relevan. Detail persyaratan dapat dilihat di halaman Layanan atau menghubungi tim kami.",
  },
  {
    q: "Bagaimana jika tidak lulus ujian sertifikasi?",
    a: "Peserta yang belum lulus dapat mengikuti ujian ulang (remedial) setelah melalui periode belajar tambahan. Kami juga menyediakan konsultasi persiapan ujian untuk membantu peserta memahami area yang perlu ditingkatkan.",
  },
  {
    q: "Apakah tersedia program untuk perusahaan / korporat?",
    a: "Ya, kami menyediakan program sertifikasi korporat dengan jadwal khusus, modul yang dapat disesuaikan, dan laporan kompetensi tim. Hubungi kami melalui form di atas atau email untuk mendapatkan penawaran khusus.",
  },
];

export default function ContactFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#1e2b3a] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header */}
          <div className="lg:sticky lg:top-24">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #2dd4bf, #4ade80)",
              }}
            >
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              Pertanyaan yang
              <br />
              sering diajukan
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Tidak menemukan jawaban yang kamu cari? Langsung hubungi tim kami
              melalui form di atas atau via WhatsApp.
            </p>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #0d9488, #16a34a)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M7.5 1.5C4.19 1.5 1.5 4.19 1.5 7.5C1.5 8.66 1.83 9.75 2.4 10.68L1.5 13.5L4.43 12.62C5.33 13.16 6.38 13.5 7.5 13.5C10.81 13.5 13.5 10.81 13.5 7.5C13.5 4.19 10.81 1.5 7.5 1.5Z"
                  stroke="white"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.5 7C5.5 7 5.5 8.5 7 10C8.5 11.5 10 10 10 10"
                  stroke="white"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              Tanya via WhatsApp
            </a>
          </div>

          {/* Right: Accordion */}
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-200"
                style={{
                  background:
                    open === i
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.02)",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-slate-200 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      background:
                        open === i
                          ? "rgba(45,212,191,0.15)"
                          : "rgba(255,255,255,0.05)",
                      color: open === i ? "#2dd4bf" : "#64748b",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={`transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M2 4L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                {open === i && (
                  <div className="px-5 pb-4">
                    <div className="w-full h-px bg-white/[0.06] mb-4" />
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
