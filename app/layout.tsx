import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Background from "@/components/Background/bg";
import LoadingScreen from "@/components/Loading/LoadingScreen";
import { LaunchScreen } from "@/components/Launch";

import RouteTransition from "@/components/hero/transitions/RouteTransition";
import RouteProgressBar from "@/components/hero/transitions/RouteProgressBar";

import Navbar from "@/components/Navbar/navbar";
import ScrollProgress from "@/components/Navbar/ScrollProgress";
import ScrollIndicator from "@/components/ScrollIndicator";

import Cursor from "@/components/Cursor/cursor";
import SocialSidebar from "@/components/SocialSidebar/SocialSidebar";

import ThemeProvider from "@/components/Providers/themeProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";


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
  description:
    "Full Stack Developer • Game Developer • Portfolio",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >

      <body
        className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-[var(--background)]
        text-[var(--foreground)]
        antialiased
        "
      >


        <ThemeProvider>


          {/* Global Effects */}
          <Background />

          <Cursor />

          <SocialSidebar />

          <ScrollProgress />

          <ScrollIndicator />

          {/* Persistent, fixed nav — must stay OUTSIDE RouteTransition/SmoothScroll */}
          <Navbar />


          {/* Loading Layers */}
          <LaunchScreen />

          <LoadingScreen />

          <RouteProgressBar />



          {/* Smooth Page System */}

          <SmoothScroll>

            <main
              className="
              relative
              z-10
              "
            >

              <RouteTransition>

                {children}

              </RouteTransition>


            </main>

          </SmoothScroll>


        </ThemeProvider>


      </body>

    </html>

  );
}