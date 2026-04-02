const contacts = [
  {
    title: "Telepon",
    value: "(+62) 822 - 4106 - 5361",
    sub: "Senin–Jumat, 08.00–17.00 WIB",
    href: "tel:+6281234567890",
    color: "#2dd4bf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 4.5C3 4.5 5 4 6.5 6C8 8 8 9 9.5 10.5C11 12 12.5 14 12.5 14L14 12.5C14 12.5 12.5 11 12 10.5C11.5 10 11.5 10 12 9.5L13 8.5C13 8.5 10.5 6 10 5.5C9.5 5 9 5 8.5 5.5L7.5 6.5C7 7 7 7 6.5 6.5C6 6 4.5 3 4.5 3L3 4.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Email",
    value: "alantrasaranaenergi@gmail.com",
    sub: "Respons dalam 1×24 jam",
    href: "mailto:alantrasaranaenergi@gmail.com",
    color: "#4ade80",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect
          x="2"
          y="4"
          width="16"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M2 7L10 12L18 7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "WhatsApp",
    value: "(+62) 822 - 4106 - 5361",
    sub: "Chat langsung dengan tim kami",
    href: "https://wa.me/6281234567890",
    color: "#2dd4bf",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2C5.58 2 2 5.58 2 10C2 11.55 2.44 13 3.2 14.24L2 18L5.9 16.83C7.1 17.56 8.5 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M7 9C7 9 7 11 9 13C11 15 13 13 13 13"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Alamat",
    value:
      "Prudential Centre 22Th FL, Unit 2207 Jalan Raya Kasablanka Kav.88. Jakarta Selatan",
    sub: "DKI Jakarta 12870",
    href: "https://maps.google.com",
    color: "#4ade80",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2C7.24 2 5 4.24 5 7C5 11 10 18 10 18C10 18 15 11 15 7C15 4.24 12.76 2 10 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="7" r="2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];

export default function ContactInfo() {
  return (
    <section className="bg-[#1e2b3a] border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={
                c.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="group flex flex-col gap-3 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${c.color}18`, color: c.color }}
              >
                {c.icon}
              </div>
              <div>
                <p className="text-[11px] text-slate-600 uppercase tracking-wide font-medium mb-1">
                  {c.title}
                </p>
                <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                  {c.value}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{c.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
