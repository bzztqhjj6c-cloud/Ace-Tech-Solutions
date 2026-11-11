import { Container } from "@/components/Container";
import { Veelgesteld, type VraagAntwoord } from "@/components/Veelgesteld";
import { pageMetadata } from "@/lib/seo";
import { PhotoHero } from "@/components/PhotoHero";
import { PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";
import { getSiteSettings } from "@/lib/settings";
import { ScrollReveal } from "@/components/ScrollReveal";

const WHATSAPP_NUMMER = "31615151606";

// TODO: vervangen door een foto van Ace Flex Solutions zelf zodra beschikbaar.
// Rechtenvrij (Unsplash-licentie).
const HERO_IMAGE = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=2400&q=80&fm=jpg&fit=crop";

const WAAROM_ACE_FLEX = [
  ["Flexibel inzetbaar", "Als vervanging bij ziekte of verlof, aanvulling op je team, of voor een tijdelijk project."],
  ["ÉÉN vast aanspreekpunt", "Je schakelt met dezelfde persoon, geen wisselend accountteam."],
  ["Matching op vakgebied", "We luisteren eerst naar wat er speelt en matchen op basis daarvan. Dat scheelt inwerktijd en misverstanden."],
  ["Zelfstandige professionals", "Onze technici zijn gewend zelfstandig te werken, zonder dat je ze aan de hand hoeft te nemen."],
];

const VRAGEN_OPDRACHTGEVERS: VraagAntwoord[] = [
  {
    vraag: "Wanneer kan ik bij jullie terecht?",
    antwoord:
      "Bij een storing, onderhoud of een structureel tekort aan technisch personeel. Als vervanging bij ziekte of verlof, als aanvulling op je team of voor een tijdelijk project. Ook technische projecten pakken we op, van modificaties tot onderhoudsstops.",
  },
  {
    vraag: "Hoe zorgen jullie voor een goede match?",
    antwoord:
      "We luisteren eerst naar wat er speelt en matchen op basis daarvan. Dat scheelt inwerktijd en misverstanden.",
  },
  {
    vraag: "Moet ik de technici begeleiden?",
    antwoord:
      "Nee. Onze technici zijn gewend zelfstandig te werken, zonder dat je ze aan de hand hoeft te nemen.",
  },
  {
    vraag: "Met wie heb ik contact?",
    antwoord:
      "Met één vast aanspreekpunt. Je schakelt met dezelfde persoon, geen wisselend accountteam.",
  },
  {
    vraag: "In welke sectoren en regio werken jullie?",
    antwoord:
      "In de voedingsmiddelenindustrie, kunststofindustrie, glasindustrie, verpakkingsindustrie, kartonindustrie, energiesector, steenindustrie en procesindustrie in West-Nederland.",
  },
  {
    vraag: "Wat voor technici leveren jullie?",
    antwoord:
      "Vakmensen met jarenlange ervaring in de procesindustrie: storingsmonteurs, onderhoudsmonteurs, engineers, hoofden technische dienst en werkvoorbereiders, die de branche kennen, snel schakelen en zich zelfstandig staande houden op de vloer.",
  },
];

export const metadata = pageMetadata({
  title: "Voor opdrachtgevers | Ace Flex Solutions",
  description:
    "Storing, onderhoud of een structureel tekort aan technisch personeel. Wij zorgen dat er een monteur staat die past. Daar draait het om.",
  path: "/opdrachtgevers",
});

export default async function OpdrachtgeversPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PhotoHero
        image={HERO_IMAGE}
        imageAlt="Technicus werkt aan een complexe industriële machine"
        objectPosition="38% 42%"
        headline="Opdracht geregeld."
      >
        <p
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/90"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
        >
          Storing, onderhoud of een structureel tekort aan technisch personeel. Wij zorgen dat
          er een monteur staat die past. Daar draait het om.
        </p>
      </PhotoHero>

      <div className="border-b-2 border-line bg-panel py-16 md:py-24">
        <Container>
          <h2 className="eyebrow text-accent tracking-[0.2em]">[ Waarom Ace Flex Solutions ]</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WAAROM_ACE_FLEX.map(([title, body]) => (
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
        <Container className="max-w-3xl">
          <p className="eyebrow text-accent tracking-[0.2em]">[ Voor opdrachtgevers ]</p>
          <div className="mt-6 space-y-6 text-lg leading-relaxed opacity-90">
            <p>
              Een storing wacht niet op een geschikt moment. Een monteur die uitvalt, een
              vacature die al maanden openstaat, een ploegendienst die op omvallen staat: in de
              procesindustrie voel je dat direct op de vloer. Ace Flex Solutions zorgt dat dat
              niet gebeurt.
            </p>
            <p>
              We plaatsen ervaren technici bij bedrijven in de voedingsmiddelenindustrie,
              kunststofindustrie, glasindustrie, verpakkingsindustrie, kartonindustrie, energiesector,
              steenindustrie en procesindustrie in West-Nederland. Niet als
              noodgreep, maar als serieuze versterking van je technische dienst: om een gat op te
              vangen, een team tijdelijk op sterkte te brengen, of structureel meer capaciteit en
              kennis in huis te halen. Ook technische projecten pakken we op, van modificaties
              tot onderhoudsstops, met vakmensen die het project zelfstandig van begin tot eind
              kunnen dragen.
            </p>
            <p>
              Het gaat niet alleen om het vullen van een rooster, maar om continuïteit: fabrieken
              die blijven draaien en technische diensten die naar een hoger niveau worden getild.
              Daarvoor lever je geen willekeurige monteur, maar iemand die de branche kent, snel
              schakelt en zich zelfstandig staande houdt op de vloer.
            </p>
            <p>
              Ons netwerk bestaat uit vakmensen met jarenlange ervaring in de procesindustrie,
              opgebouwd via een netwerk van technici en opdrachtgevers dat we jarenlang hebben
              ontwikkeld in deze branche.
            </p>
            <p>
              Heb je een gat in je technische dienst, een storing die niet kan wachten, een
              project dat aandacht nodig heeft, of wil je structureel meer flexibiliteit in je
              team? Neem contact op, we denken graag mee over wat jouw fabriek nodig heeft.
            </p>
          </div>
        </Container>
      </div>

      <Veelgesteld titel="Vragen van opdrachtgevers" items={VRAGEN_OPDRACHTGEVERS} />

      <div className="bg-panel py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl uppercase leading-tight tracking-wide">
                Samenwerken met Ace Flex Solutions?
              </h2>
              <p className="mt-4 text-lg leading-relaxed opacity-90">
                Of je nu snel een zzp&apos;er nodig hebt of wilt sparren over een technisch
                vraagstuk, wij helpen je graag verder. Bij Ace Flex Solutions denken we mee, schakelen we
                snel en leveren we vakmensen van topniveau. Daar draait het om. Wat kunnen wij
                voor jou betekenen?
              </p>
            </div>

            <ScrollReveal className="h-full">
              <div className="h-full border border-accent/30 p-6" style={PREMIUM_TILE_STYLE}>
              <p className="eyebrow text-accent tracking-[0.2em]">[ Contact ]</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="eyebrow opacity-60">Mail</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${settings.contact.email}`} className="hover:text-accent">
                      {settings.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow opacity-60">Telefoon</dt>
                  <dd className="mt-1">
                    <a href="tel:+31615151606" className="hover:text-accent">
                      {settings.contact.telefoon}
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
