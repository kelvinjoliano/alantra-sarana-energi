import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LSP Sertifikasi",
  description: "Website resmi sertifikasi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          min-h-full flex flex-col antialiased
        `}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
