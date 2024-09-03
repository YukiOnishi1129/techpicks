import { clsx } from "clsx";
import { Inter } from "next/font/google";

import { ApolloProvider, ThemeProvider } from "@/components/provider";

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
    <html lang="en">
      <body className={clsx(inter.className, "w-full")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloProvider>{children}</ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
