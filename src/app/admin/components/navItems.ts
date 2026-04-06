export type NavItem = {
  href: string;
  label: string;
  icon: string; // SVG path data
};

export type NavGroup = {
  group: string;
  items: NavItem[];
};

export const navItems: NavGroup[] = [
  {
    group: "Overview",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        icon: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
      },
    ],
  },
  {
    group: "Manajemen",
    items: [
      {
        href: "/admin/sertifikasi",
        label: "Sertifikasi",
        icon: "M12 2a6 6 0 1 0 0 12A6 6 0 0 0 12 2zm3.477 10.89L17 22l-5-3-5 3 1.523-9.11",
      },
      {
        href: "/admin/jadwal",
        label: "Jadwal",
        icon: "M3 4h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M2 10h20",
      },
      {
        href: "/admin/peserta",
        label: "Peserta",
        icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
      },
      {
        href: "/admin/pendaftaran",
        label: "Pendaftaran",
        icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6M9 15h6",
      },
      {
        href: "/admin/pembayaran",
        label: "Pembayaran",
        icon: "M1 4h22a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM1 10h22",
      },
    ],
  },
  {
    group: "Sistem",
    items: [
      {
        href: "/admin/pengguna",
        label: "Pengguna",
        icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
      },
      {
        href: "/admin/pengaturan",
        label: "Pengaturan",
        icon: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
      },
    ],
  },
];
