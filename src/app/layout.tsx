import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Analytics from "@/components/shared/analytics";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hashtel Technology Pvt. Ltd. | Commercial Electronics E-Commerce",
    template: "%s - Hashtel Technology Pvt. Ltd.",
  },
  description:
    "Hashtel Technology Pvt. Ltd. is a leading e-commerce platform specializing in commercial electronics. Shop industrial-grade electronics. Trusted by businesses nationwide.",
  keywords:
    "Hashtel Technology, commercial electronics, B2B electronics, mobile electronics, e-commerce, charger, earphones, power bank, wireless earphones",
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={`${inter.className} antialiased`}>
        {children} <Toaster />
      </body>
    </html>
  );
}
