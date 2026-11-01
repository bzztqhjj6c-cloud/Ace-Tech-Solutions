import Link from "next/link";
import { Container } from "@/components/Container";
import { PhotoHero } from "@/components/PhotoHero";
import { OpdrachtenBrowser } from "@/components/OpdrachtenBrowser";
import { getVacatures } from "@/lib/vacatures";

// TODO: vervangen door een foto van Ace Flex Solution zelf zodra beschikbaar.
// Rechtenvrij (Unsplash-licentie).
const HERO_IMAGE = "https://images.unsplash.com/photo-1512813759302-a44af29da3c1?w=2400&q=80&fm=jpg&fit=crop";

export const revalidate = 60;

export default async function OpdrachtenPage() {
  const vacatures = await getVacatures();

  return (
    <>
      <PhotoHero
        image={HERO_IMAGE}
        imageAlt="Industriële installatie met leidingen en machines"
        objectPosition="center 60%"
        headline="Vind hier dé uitdagende opdracht die bij je past"
      />

      <div className="border-b-2 border-line bg-panel py-16 md:py-20">
        <Container className="max-w-2xl">
          <p className="eyebrow text-accent tracking-[0.2em]">[ ZZP opdrachten ]</p>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Dit zijn de opdrachten die op dit moment openstaan bij onze opdrachtgevers in de
            procesindustrie, van storingsmonteur tot maintenance manager. Geen eindeloze
            cv-matching, maar een kort gesprek om te kijken of het klikt.
          </p>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Elke opdracht hieronder is vooraf met de opdrachtgever zelf doorgesproken: welke
            installaties, welke ploegendienst, wat er precies gevraagd wordt. Geen vage
            vacatureteksten die overal hetzelfde klinken, maar concrete informatie waarmee je
            direct weet of het iets voor je is.
          </p>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Reageer je op een opdracht, dan hoor je snel of het een match is. Past het niet,
            dan zeggen we dat ook gewoon. Geen stilte en geen wachten op een generiek
            &quot;we nemen contact met je op&quot;.
          </p>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Staat je opdracht er niet bij?{" "}
            <Link href="/contact" className="text-accent underline hover:no-underline">
              Laat dan je contactgegevens achter
            </Link>{" "}
            Dan denken we graag met je mee, ook als er nu niets tussenstaat wat past.
          </p>
        </Container>
      </div>

      <div className="py-16 md:py-24">
        <Container>
          <OpdrachtenBrowser vacatures={vacatures} />
        </Container>
      </div>
    </>
  );
}