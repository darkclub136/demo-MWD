import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces-var",
  subsets: ["latin", "vietnamese"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khởi & Mây — Thiệp cưới",
  description:
    "Khởi & Mây sắp về chung một nhà! Trân trọng mời bạn đến chung vui vào ngày 20 & 21 tháng 10 năm 2026.",
  icons: {
    icon: "/sites/elaro-framer-website-d569c65d/root-8a5edab2/seo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
