import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/**
 * Type system — geometric display (Plus Jakarta Sans), readable body (Inter),
 * and monospaced keyframe/scroll-% labels (JetBrains Mono).
 */
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Scrollytelling.ai — Turn static content into scroll-driven stories",
    template: "%s · Scrollytelling.ai",
  },
  description:
    "Combine text, 3D graphics, data visualizations and media into seamless interactive web experiences — no code required.",
  keywords: [
    "scrollytelling",
    "scroll animation",
    "GSAP ScrollTrigger",
    "data visualization",
    "3D web experiences",
    "no-code storytelling",
  ],
  authors: [{ name: "Scrollytelling.ai" }],
  openGraph: {
    title: "Scrollytelling.ai — Scroll-Driven Immersive Stories",
    description:
      "Turn static content into scroll-driven immersive stories. No code required.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0E",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-obsidian text-offwhite antialiased selection:bg-indigo-glow/40">
        {children}
      </body>
    </html>
  );
}
