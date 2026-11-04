import type { Metadata } from "next";
import { Outfit, Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA Global Education | Study Abroad Consultancy",
  description:
    "Your gateway to world-class education abroad. Explore destinations, find universities, and begin your journey with expert guidance from AURA Global Education.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} ${syne.variable} ${spaceGrotesk.variable} font-heading antialiased bg-[#07090E] text-slate-100 min-h-screen overflow-x-hidden selection:bg-amber-400 selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}

