"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/_components/Header";
import Footer from "@/_components/Footer";
import { Toaster } from "@/components/ui/toaster";
// AUTHENTICATION DISABLED - Uncomment below to re-enable authentication
// import { useEffect, useState } from "react";
// import type { NextRequest } from "next/server";

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
  // AUTHENTICATION DISABLED - Uncomment below to re-enable authentication
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const checkAuthToken = () => {
  //   const token = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("token="));
  //   if (token) setIsLoggedIn(true); // Set the state based on token presence
  // };

  // useEffect(() => {
  //   checkAuthToken(); // Check on initial load

  //   // Optionally, you could listen for changes to the cookies if needed
  //   const interval = setInterval(() => {
  //     checkAuthToken();
  //   }, 1000); // Polling to check if token changes (could be optimized)

  //   return () => clearInterval(interval); // Clean up
  // }, []);

      return (
        <html lang="en">
          <body className={inter.className}>
            <div className="overflow-x-hidden flex flex-col min-h-screen relative overflow-y-auto">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url(/image.png)',
                }}
              ></div>
              
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col min-h-screen">
                <div className="flex-1">
                  {children}
                </div>
                <Footer />
              </div>
              <Toaster />
            </div>
          </body>
        </html>
      );
}
