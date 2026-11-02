import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieConsent } from "@/components/CookieConsent";
import { UnderConstruction } from "@/components/UnderConstruction";
import { getSiteSettings } from "@/lib/settings";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ace Flex Solutions | Connecting Winners in Technology",
  description:
    "Boutique werving en bemiddeling van freelance technici in de procesindustrie. Naast de klant staan, niet erboven.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const underConstruction = process.env.UNDER_CONSTRUCTION === "true";

  if (underConstruction) {
    return (
      <html lang="nl" className={`${montserrat.variable} ${inter.variable} antialiased`}>
        <body>
          <UnderConstruction />
        </body>
      </html>
    );
  }

  return (
    <html
      lang="nl"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
      style={
        {
          "--background": settings.kleuren.achtergrond,
          "--foreground": settings.kleuren.voorgrond,
          "--accent": settings.kleuren.accent,
          "--line": settings.kleuren.lijn,
          "--panel": settings.kleuren.paneel,
        } as React.CSSProperties
      }
    >
      <body className="min-h-full flex flex-col">
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
