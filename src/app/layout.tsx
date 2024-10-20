import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BackgroundWeb from "@/components/BackgroundWeb";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sebastián Contreras Marín",
  description: "Este es mi portafolio personal donde se mostraran mis proyectos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundWeb />
        {children}
      </body>
    </html>
  );
}
