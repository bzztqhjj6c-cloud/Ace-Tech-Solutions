import { sanityClient } from "@/lib/sanity/client";
import { vacatureBySlugQuery, vacaturesQuery } from "@/lib/sanity/queries";
import { REGIOS, SECTOREN, type Regio, type Sector, type Vacature } from "@/lib/types";

// Zoals de vacature in Sanity staat: oude vacatures hebben één regio/sector,
// nieuwe (wervingspagina's) kunnen er meerdere hebben.
type SanityVacature = Omit<Vacature, "regios" | "sectoren"> & {
  regio?: string;
  regios?: string[];
  sector?: string;
  sectoren?: string[];
};

// "Steen" is opgegaan in "Bouwmaterialen" (steen, cement en beton).
const OUDE_SECTOREN: Record<string, Sector> = { Steen: "Bouwmaterialen" };

function normaliseer(raw: SanityVacature): Vacature {
  const { regio, regios, sector, sectoren, ...rest } = raw;
  const regioLijst = (regios?.length ? regios : regio ? [regio] : []).filter((r): r is Regio =>
    (REGIOS as readonly string[]).includes(r),
  );
  const sectorLijst = [
    ...new Set(
      (sectoren?.length ? sectoren : sector ? [sector] : [])
        .map((s) => OUDE_SECTOREN[s] ?? s)
        .filter((s): s is Sector => (SECTOREN as readonly string[]).includes(s)),
    ),
  ];
  return { ...rest, regios: regioLijst, sectoren: sectorLijst };
}

// Sanity Studio is de enige bron voor vacatures. Vacatures met de schakelaar
// "Offline zetten" aan worden in de queries al weggefilterd.
// Sanity-data wordt maximaal 60 seconden gecachet.
const SANITY_FETCH_OPTIONS = { next: { revalidate: 60, tags: ["vacature"] } };

export async function getVacatures(): Promise<Vacature[]> {
  if (!sanityClient) return [];

  try {
    // Sanity levert de vacatures al van nieuw naar oud (order(_createdAt desc)).
    const vacatures = (await sanityClient.fetch<SanityVacature[]>(vacaturesQuery, {}, SANITY_FETCH_OPTIONS)).map(
      normaliseer,
    );

    // Open opdrachten vóór vervulde; binnen elke groep blijft de volgorde (nieuwste eerst).
    return [...vacatures.filter((v) => v.status === "open"), ...vacatures.filter((v) => v.status !== "open")];
  } catch (error) {
    console.error("Vacatures ophalen uit Sanity mislukt:", error);
    return [];
  }
}

export async function getVacatureBySlug(slug: string): Promise<Vacature | null> {
  if (!sanityClient) return null;

  try {
    const vacature = await sanityClient.fetch<SanityVacature | null>(vacatureBySlugQuery, { slug }, SANITY_FETCH_OPTIONS);
    return vacature ? normaliseer(vacature) : null;
  } catch (error) {
    console.error("Vacature ophalen uit Sanity mislukt:", error);
    return null;
  }
}
