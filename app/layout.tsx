import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreshFarm - Pasar Hasil Tani",
  description: "Pasar hasil tani segar dari petani lokal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}