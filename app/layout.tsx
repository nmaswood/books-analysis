import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"


export const metadata: Metadata = {
  title: "Gutenberg",
  description: "Book app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class">

        <body
          className={`${inter.className} antialiased dark:bg-background-dark bg-background min-h-screen flex flex-col`}
        >
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Toaster />

          <Footer />
        </body>
      </ThemeProvider>
    </html >
  );
}
