import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fmvega.net"),
  title: {
    default: "SecureNode IT — Hosting gestionado y consultoría tecnológica",
    template: "%s · SecureNode IT",
  },
  description:
    "Infraestructura cloud gestionada, ciberseguridad y consultoría tecnológica para empresas que no se pueden permitir una caída. Dominio fmvega.net.",
  openGraph: {
    title: "SecureNode IT",
    description:
      "Hosting IT gestionado y consultoría tecnológica de alta disponibilidad.",
    url: "https://fmvega.net",
    siteName: "SecureNode IT",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
