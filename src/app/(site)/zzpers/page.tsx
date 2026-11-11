import Link from "next/link";
import { Veelgesteld, type VraagAntwoord } from "@/components/Veelgesteld";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { PhotoHero } from "@/components/PhotoHero";
import { FUNCTIEGROEPEN } from "@/lib/types";
import { PREMIUM_TILE_STYLE, PREMIUM_CTA_STYLE } from "@/lib/premiumStyle";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CONTACT_EMAIL } from "@/lib/contact";

const WHATSAPP_NUMMER = "31615151606";

// TODO: vervangen door een foto van Ace Flex Solutions zelf zodra beschikbaar.
// Rechtenvrij (Unsplash-licentie).
const HERO_IMAGE = "https://images.unsplash.com/photo-1661263989536-d44cbe1c2ff0?w=2400&q=80&fm=jpg&fit=crop";

const WAT_JE_KRIJGT = [
  ["Eerlijke tarieven, geen gedoe", "Je weet vooraf waar je aan toe bent. Geen verborgen inhoudingen, geen bemiddelaar die aan beide kanten meesnoept."],
  ["Opdrachten die passen bij je vakgebied", "Geen willekeurige klussen om een rooster te vullen. We matchen op basis van wat je kan en wilt, niet op wie het eerst beschikbaar is."],
  ["ÉÉN aanspreekpunt", "Je schakelt met dezelfde persoon en niet met een wisselend accountteam of een callcenter vol onbekenden."],
  ["Snel duidelijkheid", "Reageer je op een opdracht, dan hoor je snel of het een match is. Geen weken wachten op een antwoord dat niet komt."],
];

const ZO_WERKT_HET = [
  ["App, bel of mail", "Kies zelf hoe je contact opneemt."],
  ["Je hoort snel iets terug", "Meestal dezelfde dag nog."],
  ["Aan de slag, op jouw voorwaarden", "Simpel!"],
];

const VRAGEN_ZZP: VraagAntwoord[] = [
  {
    vraag: "Hoe vaak word ik uitbetaald?",
    antwoord:
      "Wekelijks. Je weet vooraf waar je aan toe bent, zonder verborgen inhoudingen.",
  },
  {
    vraag: "Welk tarief krijg ik?",
    antwoord:
      "Een marktconform tarief. Je weet vooraf waar je aan toe bent: geen verborgen inhoudingen en geen bemiddelaar die aan beide kanten meesnoept.",
  },
  {
    vraag: "Met wie heb ik contact?",
    antwoord:
      "Met één vast aanspreekpunt. Je schakelt met dezelfde persoon en niet met een wisselend accountteam of een callcenter vol onbekenden.",
  },
  {
    vraag: "Voor welke functies zoeken jullie zzp'ers?",
    antwoord:
      "Storingsmonteurs en onderhoudsmonteurs (elektrotechnisch, mechanisch en allround), engineers, hoofden technische dienst en werkvoorbereiders, voor opdrachten in de procesindustrie en aanverwante sectoren in West-Nederland.",
  },
  {
    vraag: "Hoe snel hoor ik iets?",
    antwoord:
      "Meestal dezelfde dag nog. Past het niet, dan zeggen we dat ook gewoon. Geen weken wachten op een antwoord dat niet komt.",
  },
  {
    vraag: "Er staat nu geen opdracht tussen die bij mij past. Wat nu?",
    antwoord:
      "Laat je gegevens achter en sluit aan bij ons netwerk. Komt er een opdracht die bij je past, dan bellen we jou als eerste.",
  },
  {
    vraag: "Hoe neem ik contact op?",
    antwoord:
      "Zoals jij wilt: app, bel of mail, of laat je gegevens achter via het formulier op de site.",
  },
];

export const metadata = pageMetadata({
  title: "Voor ZZP'ers | Ace Flex Solutions",
  description:
    "Jij kent je vak. Wij kennen de opdrachten. Geen eindeloze bemiddelaars, geen kleine lettertjes achteraf. Eén aanspreekpunt dat je belt zodra er een opdracht is die past.",
  path: "/zzpers",
});

export default function ZzpersPage() {
  return (
    <>
      <PhotoHero
        image={HERO_IMAGE}
        imageAlt="Technicus met helm loopt zelfverzekerd door een procesinstallatie"
        objectPosition="center 30%"
        headline="Jij kent je vak. Wij kennen de opdrachten."
      >
        <p
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/90"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
        >
          Geen eindeloze bemiddelaars, geen kleine lettertjes achteraf. Eén aanspreekpunt dat
          je belt zodra er een opdracht is die past.
        </p>
      </PhotoHero>

      <div className="border-b-2 border-line bg-panel py-16 md:py-24">
        <Container>
          <h2 className="eyebrow text-accent tracking-[0.2em]">[ Wat je van ons krijgt ]</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WAT_JE_KRIJGT.map(([title, body]) => (
              <ScrollReveal key={title} className="h-full">
                <div className="h-full border border-accent/30 p-6" style={PREMIUM_TILE_STYLE}>
                  <span className="block h-px w-10 bg-accent" />
                  <h3 className="font-display mt-4 text-lg uppercase leading-tight tracking-wide">{title}</h3>
                  <p className="mt-2 text-sm opacity-70">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-16 md:py-24">
        <p className="eyebrow text-accent tracking-[0.2em]">[ Zo werkt het ]</p>
        <h2 className="font-display mt-2 max-w-2xl text-3xl uppercase leading-tight tracking-wide sm:text-4xl">
          Gewoon een gesprek
        </h2>

        <div className="mt-10 grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="grid gap-6 sm:grid-cols-3">
              {ZO_WERKT_HET.map(([title, body], i) => (
                <ScrollReveal key={title} className="h-full">
                  <div className="h-full border border-accent/30 p-6" style={PREMIUM_TILE_STYLE}>
                    <span className="font-display text-3xl text-accent">0{i + 1}</span>
                    <h3 className="font-display mt-4 text-lg uppercase leading-tight tracking-wide">{title}</h3>
                    <p className="mt-2 text-sm opacity-70">{body}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMMER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-[#0B2038] transition-opacity hover:opacity-90"
              style={PREMIUM_CTA_STYLE}
            >
              App ons, we horen graag van je
            </a>
          </div>

          <ScrollReveal className="h-fit">
            <aside className="border border-accent/30 p-6" style={PREMIUM_TILE_STYLE}>
            <p className="eyebrow text-accent tracking-[0.2em]">[ Functiegroepen ]</p>
            <ul className="mt-4 space-y-2 text-sm">
              {FUNCTIEGROEPEN.map((f) => (
                <li key={f} className="border-b border-accent/20 pb-2">{f}</li>
              ))}
            </ul>
            <Link
              href="/opdrachten"
              className="mt-6 block px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.1em] text-[#0B2038] transition-opacity hover:opacity-90"
              style={PREMIUM_CTA_STYLE}
            >
              Bekijk opdrachten
            </Link>
            </aside>
          </ScrollReveal>
        </div>
      </Container>

      <Veelgesteld titel="Vragen van zzp'ers" items={VRAGEN_ZZP} />

      <div className="bg-panel py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl uppercase leading-tight tracking-wide">
                Sluit je aan bij Ace Flex Solutions?
              </h2>
              <p className="mt-4 text-lg leading-relaxed opacity-90">
                Op zoek naar je volgende opdracht, of gewoon nieuwsgierig wat er voor je
                openstaat? Laat het weten en we kijken samen wat past.
              </p>
            </div>

            <ScrollReveal className="h-full">
              <div className="h-full border border-accent/30 p-6" style={PREMIUM_TILE_STYLE}>
              <p className="eyebrow text-accent tracking-[0.2em]">[ Contact ]</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="eyebrow opacity-60">Mail</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent">
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow opacity-60">Telefoon</dt>
                  <dd className="mt-1">
                    <a href="tel:+31615151606" className="hover:text-accent">
                      +31 6 15 15 16 06
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow opacity-60">WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMMER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent"
                    >
                      Stuur een bericht →
                    </a>
                  </dd>
                </div>
              </dl>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </div>
    </>
  );
}
