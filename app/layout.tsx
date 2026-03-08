import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cardlar - Personalized Digital Greeting Cards",
  description:
    "Create and send stunning personalized greeting cards with AI-generated images, custom messages, voice recordings, and music. The ultimate digital card experience.",
  keywords: [
    "cardlar",
    "greeting card",
    "personalized card",
    "digital card",
    "birthday card",
    "wedding card",
    "e-card",
    "AI greeting card",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
