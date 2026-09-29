import type { Metadata, Viewport } from "next";
import { Sora, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WEBXPAY — Lead the Future of Digital Payments in Sri Lanka",
  description:
    "Every transaction multiplies value. Sri Lanka's leading digital finance platform connecting merchants, citizens, and government on one trusted rail.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${manrope.variable} ${spaceGrotesk.variable} h-full antialiased overflow-x-hidden`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-zinc-900 selection:bg-[#f1ff5c] selection:text-zinc-950 overflow-x-hidden max-w-full"
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
