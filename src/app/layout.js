// app/layout.js

import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/AuthProvider/AuthProvider";
import { VerificationProvider } from "@/context/VerificationContext";
import { UserProvider } from "@/lib/UserProvider/UserProvider";
import { TimeLineProvider } from "@/lib/TimeLineProvider/TimeLineProvider";
import Navbar from "@/shared/Navbar/Navbar";
import AuthGuard from "@/hooks/AuthGuard/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " Universe",
  description: "Build Your Future at Universe",
  // openGraph: {
  //   type: "website",
  //   title: "Universe",
  //   description: "Build Your Future at Universe",
  //   url: "https://www.tarsuniverse.com",
  //   siteName: "Universe",
  //   images: [
  //     {
  //       url: "/favicon.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "TARS Universe Logo",
  //     },
  //   ],
  //   locale: "en_US",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Universe",
  //   description: "Build Your Future at TARS",
  //   site: "@tarsuniverse",
  //   image: "/favicon.png",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gray-100">
      <head>
        <style>{`@import url("https://fonts.cdnfonts.com/css/azonix");`}</style>
        <style>{`@import url('https://fonts.cdnfonts.com/css/sf-pro-display');`}</style>
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="scroll-bar scroll-smooth">
        <AuthGuard>
          <AuthProvider>
            <VerificationProvider>
              <UserProvider>
                <TimeLineProvider>
                  <Navbar />
                  {children}
                </TimeLineProvider>
              </UserProvider>
            </VerificationProvider>
          </AuthProvider>
        </AuthGuard>
      </body>
    </html>
  );
}
