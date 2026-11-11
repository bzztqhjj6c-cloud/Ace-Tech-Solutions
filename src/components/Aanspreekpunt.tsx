import Image from "next/image";
import { Container } from "@/components/Container";
import { PREMIUM_CTA_STYLE } from "@/lib/premiumStyle";

export const AANSPREEKPUNT = {
  naam: "Kay Vente",
  foto: "/images/kay-vente.jpg",
  alt: "Kay Vente van Ace Flex Solutions in een werkplaats",
};

// Blok "Jouw vaste aanspreekpunt" met profielfoto, voor Over ons.
export function Aanspreekpunt({ email, telefoon }: { email: string; telefoon: string }) {
  return (
    <div className="border-t-2 border-line bg-panel py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
          <Image
            src={AANSPREEKPUNT.foto}
            alt={AANSPREEKPUNT.alt}
            width={900}
            height={1125}
            sizes="(min-width: 768px) 340px, 100vw"
            className="h-auto w-full max-w-sm border border-accent/30"
          />
          <div className="max-w-xl">
            <h2 className="eyebrow text-accent tracking-[0.2em]">[ Jouw vaste aanspreekpunt ]</h2>
            <p className="font-display mt-2 text-3xl uppercase leading-tight tracking-wide">{AANSPREEKPUNT.naam}</p>
            <p className="mt-4 text-lg leading-relaxed opacity-90">
              Je schakelt met dezelfde persoon en niet met een wisselend accountteam of een
              callcenter vol onbekenden. Of je nu een opdracht zoekt of technisch personeel nodig
              hebt: één vast aanspreekpunt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${telefoon}`}
                className="border-2 border-transparent px-6 py-3 text-center font-mono text-sm font-bold uppercase tracking-[0.1em] text-[#0B2038] transition-opacity hover:opacity-90"
                style={PREMIUM_CTA_STYLE}
              >
                Bel {telefoon}
              </a>
              <a
                href={`mailto:${email}`}
                className="border-2 border-accent px-6 py-3 text-center font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-accent/10"
              >
                Mail {email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
