import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manifesto",
  description: "A structural recreation of a scrolling manifesto website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: "#b8b4ae" }}>
      <body className={`${inter.variable} antialiased`} style={{ background: "#b8b4ae" }}>
        {children}
      </body>
    </html>
  );
}
