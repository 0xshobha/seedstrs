import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrustGuard | Decentralized Freelance Escrow",
  description: "Secure, trustless escrow for freelancers and clients on Polygon Mumbai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-zinc-100 min-h-screen selection:bg-indigo-500/30 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
