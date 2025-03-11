import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import AppProvider from "@/lib/AppProvider";

export const metadata: Metadata = {
  title: "DaanaKarma",
  description: "dāna is the act of giving or charity, giving is a form of karma",
};

const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn([
          nunito.className,
          "antialiased",
          "scroll-smooth bg-gradient-to-br from-orange-50 to-teal-100/20",
        ])}
      >
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
