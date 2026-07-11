import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Codexa - Complete Developer Interview Preparation Platform",
  description: "Master Data Structures, Algorithms, System Design, and Core CS Fundamentals with curated roadmaps, 1000+ problems, and expert-led resources.",
  metadataBase: new URL("https://codexa.in"),
  openGraph: {
    title: "Codexa - Complete Developer Interview Preparation Platform",
    description: "Master Data Structures, Algorithms, System Design, and Core CS Fundamentals.",
    url: "https://codexa.in",
    siteName: "Codexa",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Codexa platform preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codexa - Complete Developer Interview Preparation Platform",
    description: "Curated roadmaps, 1000+ problems, and expert-led resources.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
