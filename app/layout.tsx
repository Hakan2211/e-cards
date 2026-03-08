import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-card4You - Personalized Digital Greeting Cards",
  description:
    "Create and send stunning personalized e-cards with AI-generated images, custom messages, voice recordings, and music. The ultimate digital greeting card experience.",
  keywords: [
    "e-card",
    "greeting card",
    "personalized card",
    "digital card",
    "birthday card",
    "wedding card",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
