
import { Inter } from "next/font/google";
import "./globals.css";
import "./video-background.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { PromoModal } from "@/components/promo-modal";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import { AppProviders } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
        <head>
            <title>Ranking Family Multimedia</title>
            <meta name="description" content="Crafting the Sound of Tomorrow. Welcome to the Family." />
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6208745110537063"
     crossOrigin="anonymous"></Script>
        </head>
      <body
        className={cn("min-h-screen font-sans antialiased", inter.className)}
      >
        <AppProviders>
          <Header />
          {children}
          <PromoModal />
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
