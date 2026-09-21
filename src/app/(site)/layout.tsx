import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { UnderConstruction } from "@/components/UnderConstruction";
import { getSiteSettings } from "@/lib/settings";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ace Flex Solution | technisch personeel voor de procesindustrie",
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
      <html lang="nl" className={`${archivoBlack.variable} ${inter.variable} ${plexMono.variable} antialiased`}>
        <body>
          <UnderConstruction />
        </body>
      </html>
    );
  }

  return (
    <html
      lang="nl"
      className={`${archivoBlack.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
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
      </body>
    </html>
  );
}
