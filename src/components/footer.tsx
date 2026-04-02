import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  Layanan: [
    { label: "Skema Sertifikasi", href: "/service" },
    { label: "Jadwal Ujian", href: "/service#jadwal" },
    { label: "Verifikasi Sertifikat", href: "/verify" },
    { label: "Konsultasi", href: "/contact" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Tim & Asesor", href: "/about#tim" },
    { label: "Akreditasi", href: "/about#akreditasi" },
    { label: "Karir", href: "/karir" },
  ],
  Dukungan: [
    { label: "Panduan Pendaftaran", href: "/panduan" },
    { label: "FAQ", href: "/faq" },
    { label: "Hubungi Kami", href: "/contact" },
    { label: "Kebijakan Privasi", href: "/privacy" },
  ],
};

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect
          x="2"
          y="2"
          width="14"
          height="14"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="13" cy="5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect
          x="2"
          y="2"
          width="14"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M5.5 7.5V12.5M5.5 5.5V5.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M8.5 12.5V9.5C8.5 8.4 9.4 7.5 10.5 7.5C11.6 7.5 12.5 8.4 12.5 9.5V12.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M8.5 7.5V12.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6282241065361",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 2C5.13 2 2 5.13 2 9C2 10.39 2.39 11.69 3.07 12.79L2 16L5.33 14.95C6.4 15.57 7.66 15.93 9 15.93C12.87 15.93 16 12.8 16 8.93C16 5.06 12.87 2 9 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 7C6.5 7 6.5 8.5 8 10C9.5 11.5 11 11.5 11 11.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#111c29] border-t border-white/[0.06]">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand col — spans 2 */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/logo-alantra-v2.png"
                alt="Alantra Sarana Energi"
                width={148}
                height={44}
                className="object-contain"
              />
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
              Lembaga Sertifikasi Profesi resmi terakreditasi BNSP. Kami hadir
              untuk memastikan setiap profesional Indonesia mendapat pengakuan
              kompetensi yang layak.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-teal-400 border border-white/[0.06] hover:border-teal-400/30 hover:bg-teal-400/5 transition-all duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M2 3.5C2 3.5 4 3 5.5 5C7 7 7 8 8.5 9.5C10 11 11.5 13 11.5 13L13 11.5C13 11.5 11.5 10 11 9.5C10.5 9 10.5 9 11 8.5L12 7.5C12 7.5 9.5 5 9 4.5C8.5 4 8 4 7.5 4.5L6.5 5.5C6 6 6 6 5.5 5.5C5 5 3.5 2 3.5 2L2 3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              label: "Telepon",
              value: "(+62) 822 - 4106 - 5361",
            },
            {
              icon: (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect
                    x="1.5"
                    y="3"
                    width="12"
                    height="9"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M1.5 5.5L7.5 9L13.5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              ),
              label: "Email",
              value: "alantrasaranaenergi@gmail.com",
            },
            {
              icon: (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M7.5 1.5C5.01 1.5 3 3.51 3 6C3 9.5 7.5 13.5 7.5 13.5C7.5 13.5 12 9.5 12 6C12 3.51 9.99 1.5 7.5 1.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="7.5"
                    cy="6"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              ),
              label: "Alamat",
              value: "Jakarta Selatan, DKI Jakarta",
            },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-teal-400"
                style={{ background: "rgba(45,212,191,0.08)" }}
              >
                {c.icon}
              </div>
              <div>
                <div className="text-[11px] text-slate-600 uppercase tracking-wide font-medium">
                  {c.label}
                </div>
                <div className="text-sm text-slate-400 mt-0.5">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Alantra Sarana Energi. Hak cipta
            dilindungi.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
            Terakreditasi BNSP Resmi
          </div>
        </div>
      </div>
    </footer>
  );
}
