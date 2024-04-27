import { Inter } from "next/font/google";

import { BaseLayout } from "@/components/layout/BaseLayout";
import { ThemeProvider } from "@/components/Provider/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teck Picks",
  description: "Tech Picks is a collection of tech articles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BaseLayout> {children}</BaseLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
