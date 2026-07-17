import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Background from "@/components/Background/bg";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { LaunchScreen } from "@/components/Launch";
import RouteTransition from "@/components/hero/transitions/RouteTransition";
import RouteProgressBar from "@/components/hero/transitions/RouteProgressBar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Cursor from "@/components/Cursor/cursor";

import ScrollIndicator from "@/components/ScrollIndicator";
import SocialSidebar from "@/components/SocialSidebar/SocialSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farrukh.dev",
  description: "Full Stack Developer • Game Developer • Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white antialiased">
        {/* One-time / per-visit overlays */}
        <LaunchScreen />
        <LoadingScreen />
        <RouteProgressBar />

        {/* Persistent chrome */}
        <Background />
        <Cursor />
        <SocialSidebar />
        <ScrollProgress />
        <ScrollIndicator />

        {/* Page content */}
        <main className="relative z-10">
          <RouteTransition>{children}</RouteTransition>
        </main>
      </body>
    </html>
  );
}
