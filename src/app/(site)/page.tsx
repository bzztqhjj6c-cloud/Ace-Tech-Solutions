import Link from "next/link";
import { Container } from "@/components/Container";
import { VacatureCard } from "@/components/VacatureCard";
import { PhotoHero } from "@/components/PhotoHero";
import { FUNCTIEGROEPEN, SECTOREN } from "@/lib/types";
import { getSiteSettings } from "@/lib/settings";
import { getVacatures } from "@/lib/vacatures";
import { SectorIcon } from "@/components/SectorIcon";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PREMIUM_TILE_STYLE, PREMIUM_CTA_STYLE } from "@/lib/premiumStyle";

const WAT_TECHNICI_ZOEKEN = [
  "Wekelijks uitbetaald",
  "Eén vast aanspreekpunt",
  "Opdrachten in jouw vakgebied",
];

// TODO: vervangen door een foto van Ace Flex Solution zelf zodra beschikbaar.
// Rechtenvrij (Unsplash-licentie), zelfde bron als de vorige versie van de site.
// Breedbeeld (landscape) in plaats van staand, omdat dit beter cropt op grote schermen.
const HERO_IMAGE = "https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=2400&q=80&fm=jpg&fit=crop";

export const revalidate = 60;

export default async function HomePage() {
  const settings = await getSiteSettings();
  const vacatures = (await getVacatures()).filter((v) => v.status === "open").slice(0, 3);

  return (
    <>
      <PhotoHero
        image={HERO_IMAGE}
        imageAlt="Lassen met vonken tijdens technisch werk"
        objectPosition="55% 45%"
        headline={settings.tagline}
      >
        <div
          className="mt-10 inline-flex flex-col divide-y divide-accent/20 border border-accent/40 backdrop-blur-sm sm:flex-row sm:divide-x sm:divide-y-0"
          style={PREMIUM_TILE_STYLE}
        >
          {WAT_TECHNICI_ZOEKEN.map((item) => (
            <div key={item} className="hero-drop-in flex items-center justify-center gap-2.5 px-6 py-4">
              <span className="text-base text-accent">✓</span>
              <span className="font-mono text-sm font-semibold uppercase tracking-wide text-foreground">{item}</span>
            </div>
          ))}
        </div>

        <Link
          href="/opdrachten"
          className="hero-drop-in hero-drop-in-cta mt-6 px-10 py-4 font-mono text-base font-bold uppercase tracking-[0.1em] text-[#0B2038] transition-opacity hover:opacity-90"
          style={PREMIUM_CTA_STYLE}
        >
          Sluit je nu aan
        </Link>
      </PhotoHero>

      <div className="border-b-2 border-line bg-panel py-16 md:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["9+ jaar ervaring in de procesindustrie", "Jarenlang actief in de procesindustrie, met een netwerk dat er al staat. Geen koude start."],
              ["Vind je perfecte match", "Eerst luisteren naar wat bij jou past, dan pas koppelen aan een opdracht."],
              ["Eerlijk en transparant", "Duidelijke afspraken, geen verrassingen achteraf."],
              ["Zelfstandig werken, maar nooit alleen staan", "Je bepaalt je eigen koers, met altijd één vast aanspreekpunt binnen handbereik."],
            ].map(([title, body]) => (
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

      <div className="border-b-2 border-line py-16 md:py-24">
        <Container>
          <p className="eyebrow text-accent tracking-[0.2em]">[ Branches ]</p>
          <h2 className="font-display mt-2 text-3xl uppercase tracking-wide">Waar wij thuis zijn</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {SECTOREN.map((s) => (
              <ScrollReveal key={s} className="h-full">
                <div
                  className="flex h-full min-w-0 flex-col items-start gap-4 border border-accent/30 p-6 transition-colors hover:border-accent"
                  style={PREMIUM_TILE_STYLE}
                >
                  <SectorIcon sector={s} className="h-8 w-8 text-accent" />
                  <span className="min-w-0 break-words font-display text-sm uppercase leading-tight tracking-wide">
                    {s === "Voedingsmiddelen" ? (
                      <>
                        <span className="sm:hidden">Voedings-<br />middelen</span>
                        <span className="hidden sm:inline">Voedingsmiddelen</span>
                      </>
                    ) : (
                      s
                    )}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>

      <div className="border-b-2 border-line bg-panel py-16 md:py-24">
        <Container>
          <p className="eyebrow text-accent tracking-[0.2em]">[ Functies ]</p>
          <h2 className="font-display mt-2 text-3xl uppercase tracking-wide">Rollen die wij plaatsen</h2>
          <div className="mt-10 grid auto-rows-fr grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {FUNCTIEGROEPEN.map((f) => (
              <ScrollReveal key={f} className="h-full">
                <div
                  className="flex h-full min-h-24 min-w-0 items-center border border-accent/30 px-5 py-4 transition-colors hover:border-accent"
                  style={PREMIUM_TILE_STYLE}
                >
                  <span className="min-w-0 break-words font-display text-sm uppercase leading-tight tracking-wide">{f}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>

      {vacatures.length > 0 && (
        <div className="border-t-2 border-line py-16 md:py-24">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-accent tracking-[0.2em]">[ Openstaande opdrachten ]</p>
                <h2 className="font-display mt-2 text-3xl uppercase tracking-wide">Actuele opdrachten</h2>
              </div>
              <Link href="/opdrachten" className="eyebrow hover:text-accent">
                Alle opdrachten →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {vacatures.map((v) => (
                <ScrollReveal key={v.slug}>
                  <VacatureCard vacature={v} />
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
