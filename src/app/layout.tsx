"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/_components/Header";
import Footer from "@/_components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" overflow-x-hidden flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
          <Header />
          {children}
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
