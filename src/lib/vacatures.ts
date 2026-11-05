import { sanityClient } from "@/lib/sanity/client";
import { vacatureBySlugQuery, vacaturesQuery } from "@/lib/sanity/queries";
import type { Vacature } from "@/lib/types";

// Sanity Studio is de enige bron voor vacatures. Vacatures met de schakelaar
// "Offline zetten" aan worden in de queries al weggefilterd.
// Sanity-data wordt maximaal 60 seconden gecachet.
const SANITY_FETCH_OPTIONS = { next: { revalidate: 60, tags: ["vacature"] } };

export async function getVacatures(): Promise<Vacature[]> {
  if (!sanityClient) return [];

  try {
    // Sanity levert de vacatures al van nieuw naar oud (order(_createdAt desc)).
    const vacatures = await sanityClient.fetch<Vacature[]>(vacaturesQuery, {}, SANITY_FETCH_OPTIONS);

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
    return await sanityClient.fetch<Vacature | null>(vacatureBySlugQuery, { slug }, SANITY_FETCH_OPTIONS);
  } catch (error) {
    console.error("Vacature ophalen uit Sanity mislukt:", error);
    return null;
  }
}
