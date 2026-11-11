import { Container } from "@/components/Container";
import { pageMetadata } from "@/lib/seo";
import { PhotoHero } from "@/components/PhotoHero";
import { PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";
import { ScrollReveal } from "@/components/ScrollReveal";

// TODO: vervangen door een foto van Ace Flex Solutions zelf zodra beschikbaar.
// Rechtenvrij (Unsplash-licentie).
const HERO_IMAGE = "https://images.unsplash.com/photo-1737874960921-d1205a4f55da?w=2400&q=80&fm=jpg&fit=crop";

const WAT_WE_OPLOSSEN = [
  "Uitbesteden van technische projecten",
  "Flexibele technische schil",
  "Vervanging of versterking van je technische dienst",
  "Overbrugging tot een vaste monteur",
];

export const metadata = pageMetadata({
  title: "Over ons | Ace Flex Solutions",
  description:
    "Ace Flex Solutions is er voor twee groepen. Voor zzp'ers die mooie, uitdagende opdrachten willen realiseren in de procesindustrie, en voor bedrijven die vaklui nodig hebben.",
  path: "/over-ons",
});

export default function OverOnsPage() {
  return (
    <>
      <PhotoHero
        image={HERO_IMAGE}
        imageAlt="Twee monteurs in een industriële werkplaats die samen een tablet bekijken en overleggen"
        objectPosition="center 30%"
        headline="Waar Ace Flex Solutions om draait"
      />

      <div className="border-b-2 border-line bg-panel py-16 md:py-24">
        <Container>
          <h2 className="eyebrow text-accent tracking-[0.2em]">[ Wat we oplossen ]</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WAT_WE_OPLOSSEN.map((title) => (
              <ScrollReveal key={title} className="h-full">
                <div className="h-full border border-accent/30 p-6" style={PREMIUM_TILE_STYLE}>
                  <span className="block h-px w-10 bg-accent" />
                  <h3 className="font-display mt-4 text-lg uppercase leading-tight tracking-wide">{title}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed opacity-90">
          <p>
            Een storing wacht niet op een geschikt moment. Een monteur die uitvalt, een vacature
            die al maanden openstaat, een ploegendienst die op omvallen staat: in de
            procesindustrie voel je dat direct terug op de vloer. Ace Flex Solutions zorgt dat
            dat niet gebeurt.
          </p>
          <p>
            Ace Flex Solutions is er voor twee groepen. Voor zzp&apos;ers die mooie, uitdagende
            opdrachten willen realiseren in de procesindustrie, met werk dat past bij hun kennis
            en ervaring. En voor bedrijven die vaklui nodig hebben om hun fabriek draaiende te
            houden of naar een hoger niveau te tillen.
          </p>
          <p>
              We plaatsen ervaren technici bij bedrijven in de voedingsmiddelenindustrie,
              kunststofindustrie, glasindustrie, verpakkingsindustrie, kartonindustrie, energiesector,
              steenindustrie en procesindustrie in de Randstad en Rijnmond. Niet als
            noodgreep, maar als serieuze versterking van je technische dienst, of dat nu is om
            een gat op te vangen, een team tijdelijk op sterkte te brengen, of structureel meer
            capaciteit en kennis in huis te halen. Ook technische projecten pakken we op, van
            modificaties tot onderhoudsstops, waarbij je kunt rekenen op vakmensen die het
            project van begin tot eind zelfstandig kunnen dragen.
          </p>
          <p>
            Wij snappen dat het niet alleen gaat om het vullen van een rooster. Het gaat om
            continuïteit: fabrieken die blijven draaien, installaties die betrouwbaar blijven
            presteren, en technische diensten die niet alleen overeind blijven, maar naar een
            hoger niveau worden getild. Daarvoor lever je geen willekeurige monteur, maar iemand
            die de branche kent, snel schakelt en zich zelfstandig staande houdt op de vloer.
          </p>
          <p>
            Ons netwerk bestaat uit vakmensen met jarenlange ervaring in de procesindustrie:
            mensen die weten wat een storing kost, wat een geplande stop vraagt, en wat er nodig
            is om een productielijn draaiende te houden onder druk. We werken vanuit een netwerk
            van technici en opdrachtgevers dat we jarenlang hebben opgebouwd in deze branche, en
            zetten die kennis nu in vanuit ons eigen bedrijf.
          </p>
          <p>
            Heb je een gat in je technische dienst, een storing die niet kan wachten, een
            project dat aandacht nodig heeft, of wil je structureel meer flexibiliteit in je
            team? Neem contact op, we denken graag mee over wat jouw fabriek nodig heeft.
          </p>
        </div>
      </Container>
    </>
  );
}
