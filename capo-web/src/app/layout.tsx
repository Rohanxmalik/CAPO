import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalNavbar } from "@/components/layout/global-navbar";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "CAPO — Command & Agent Protocol Orchestrator",
  description: "The operating system for AI workforces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="h-full flex flex-col bg-background text-foreground overflow-hidden">
        <TooltipProvider delay={300}>
          <GlobalNavbar />
          <main className="flex-1 flex flex-col overflow-hidden min-h-0">
            {children}
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
