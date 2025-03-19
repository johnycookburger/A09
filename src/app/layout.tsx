import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";

// Configure font with display strategy and subset
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Using 'swap' instead of auto to prevent invisible text during loading
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  // Disable preload since we're using swap
  preload: false
});

export const metadata: Metadata = {
  title: "Venue Explorer - Find Your Perfect Event Space",
  description: "Discover and book the perfect venue for your next event, from weddings to corporate gatherings.",
  viewport: "width=device-width, initial-scale=1",
  // Other metadata
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className} style={{ marginTop: "70px" }}>
        <NextAuthProvider session={nextAuthSession}>
          <TopMenu />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}