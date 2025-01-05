import { clsx } from "clsx";
import { Inter } from "next/font/google";

import { BaseLayout } from "@/shared/components/layout/BaseLayout";
import { ApolloProvider, ThemeProvider } from "@/shared/components/provider";
import { Toaster } from "@/shared/components/ui/sonner";

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check Picks",
  description:
    "Check Picks is a collection of the latest IT news. In particular, it has a good selection of news for software engineers. For example, React, Golang and AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "w-full")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloProvider>
            <BaseLayout>{children}</BaseLayout>
            <Toaster />
          </ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
