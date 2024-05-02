"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/_components/Header";
import Footer from "@/_components/Footer";
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "../graphApi/authConfig";
import { MsalProvider } from "@azure/msal-react";


const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

// export const metadata: Metadata = {
//   title: "Tabola",
//   description: "Tabola for fun",
// };
const msalInstance = new PublicClientApplication(msalConfig);
// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);


  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MsalProvider instance={msalInstance}>

          <div className=" overflow-x-hidden flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            {children}
            <Footer />
          </div></MsalProvider>
      </body>
    </html>


  );
}
