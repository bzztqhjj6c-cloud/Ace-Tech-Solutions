import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { PhotoHero } from "@/components/PhotoHero";
import { OpdrachtenBrowser } from "@/components/OpdrachtenBrowser";
import { getVacatures } from "@/lib/vacatures";

// TODO: vervangen door een foto van Ace Flex Solutions zelf zodra beschikbaar.
// Rechtenvrij (Unsplash-licentie).
const HERO_IMAGE = "https://images.unsplash.com/photo-1512813759302-a44af29da3c1?w=2400&q=80&fm=jpg&fit=crop";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Opdrachten | Ace Flex Solutions",
  description:
    "Wij zoeken zelfstandige monteurs, engineers en technisch leidinggevenden voor de procesindustrie. Hieronder zie je waar je op kunt reageren.",
  path: "/opdrachten",
});

export default async function OpdrachtenPage() {
  const vacatures = await getVacatures();

  return (
    <>
      <PhotoHero
        image={HERO_IMAGE}
        imageAlt="Industriële installatie met leidingen en machines"
        objectPosition="center 60%"
        headline="Sluit aan bij het netwerk van Ace Flex Solutions"
      />

      <div className="border-b-2 border-line bg-panel py-16 md:py-20">
        <Container className="max-w-2xl">
          <p className="eyebrow text-accent tracking-[0.2em]">[ ZZP opdrachten en netwerk ]</p>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Wij zoeken zelfstandige monteurs, engineers en technisch leidinggevenden voor de
            procesindustrie. Hieronder zie je waar je op kunt reageren. Geen eindeloze
            cv-matching, maar een kort gesprek om te kijken of het klikt.
          </p>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Staat er een opdracht bij die past? Dan hoor je snel of het een match is. Staat er
            nog niets tussen, sluit dan aan bij ons netwerk. Komt er een opdracht die bij je
            past, dan bellen we jou als eerste.
          </p>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Past het niet, dan zeggen we dat ook gewoon. Geen stilte en geen wachten op een
            generiek &quot;we nemen contact met je op&quot;.
          </p>
          <p className="mt-4 text-lg leading-relaxed opacity-90">
            Wil je liever eerst even praten?{" "}
            <Link href="/contact" className="text-accent underline hover:no-underline">
              Laat je contactgegevens achter
            </Link>
            . Dan denken we graag met je mee, ook als er nu niets tussenstaat wat past.
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