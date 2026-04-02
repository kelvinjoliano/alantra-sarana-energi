"use client";

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const subjects = [
  "Informasi Sertifikasi",
  "Pendaftaran Peserta",
  "Kemitraan Perusahaan",
  "Daftar Asesor",
  "Pertanyaan Lainnya",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, email, phone, subject, message } = form;
    const body = `Nama: ${name}%0AEmail: ${email}%0ATelepon: ${phone}%0A%0APesan:%0A${message}`;
    const mailtoLink = `mailto:info@alantraenergi.co.id?subject=${encodeURIComponent(subject || "Inquiry dari Website")}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const isValid = form.name && form.email && form.message;

  return (
    <div>
      <p
        className="text-xs font-semibold tracking-widest uppercase mb-3 bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg, #2dd4bf, #4ade80)" }}
      >
        Kirim Pesan
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
        Sampaikan pertanyaan Anda
      </h2>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
        Isi form di bawah dan pesan Anda akan langsung terkirim ke email kami.
      </p>

      <div className="flex flex-col gap-4">
        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-500 font-medium">
              Nama Lengkap <span className="text-teal-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.06] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-500 font-medium">
              Email <span className="text-teal-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.06] transition-all"
            />
          </div>
        </div>

        {/* Phone + Subject */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-500 font-medium">
              Telepon
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+62 812-xxxx-xxxx"
              className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.06] transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-500 font-medium">Subjek</label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] bg-[#1a2332] text-sm text-slate-300 focus:outline-none focus:border-teal-500/50 transition-all"
            >
              <option value="" className="text-slate-500">
                Pilih subjek...
              </option>
              {subjects.map((s) => (
                <option key={s} value={s} className="bg-[#1a2332]">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-500 font-medium">
            Pesan <span className="text-teal-400">*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tuliskan pertanyaan atau pesan Anda di sini..."
            className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.06] transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #0d9488 0%, #16a34a 100%)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 8L14 2L9 14L7.5 9L2 8Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          Kirim Pesan via Email
        </button>

        <p className="text-[11px] text-slate-600 text-center">
          Pesan akan dibuka di aplikasi email Anda secara otomatis.
        </p>
      </div>
    </div>
  );
}
