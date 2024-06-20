import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trials",
  description: "Fun and interactive puzzles to solve with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
