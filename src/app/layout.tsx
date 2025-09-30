import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { ViewTransitions } from "next-view-transitions";

import "./globals.css";
import localFont from "next/font/local";

import BackgroundWeb from "@/components/BackgroundWeb";
import Dock from "../components/Dock";

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
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SpeedInsights />
          <Analytics />
          
          <BackgroundWeb />
          {children}
          <Dock />
        </body>
      </html>
    </ViewTransitions >
  );
}
