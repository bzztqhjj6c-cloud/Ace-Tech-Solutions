import { seedVacatures } from "@/lib/content/seed-vacatures";
import { additionalVacatures } from "@/lib/content/additional-vacatures";
import { sanityClient } from "@/lib/sanity/client";
import { vacatureBySlugQuery, vacaturesQuery } from "@/lib/sanity/queries";
import type { Vacature } from "@/lib/types";

// Sanity-data wordt maximaal 60 seconden gecachet. Zonder cache werd elke
// pagina bij ieder bezoek opnieuw opgebouwd, met een wachttijd op Sanity.
const SANITY_FETCH_OPTIONS = { next: { revalidate: 60, tags: ["vacature"] } };

export async function getVacatures(): Promise<Vacature[]> {
  if (!sanityClient) return seedVacatures;

  try {
    const vacatures = await sanityClient.fetch<Vacature[]>(vacaturesQuery, {}, SANITY_FETCH_OPTIONS);
    const vacaturesPerSlug = new Map(
      [...seedVacatures, ...additionalVacatures, ...vacatures].map((vacature) => [vacature.slug, vacature]),
    );
    return [...vacaturesPerSlug.values()];
  } catch {
    return seedVacatures;
  }
}

export async function getVacatureBySlug(slug: string): Promise<Vacature | null> {
  if (!sanityClient) {
    return [...seedVacatures, ...additionalVacatures].find((vacature) => vacature.slug === slug) ?? null;
  }

  try {
    const vacature = await sanityClient.fetch<Vacature | null>(vacatureBySlugQuery, { slug }, SANITY_FETCH_OPTIONS);
    return vacature ?? [...seedVacatures, ...additionalVacatures].find((v) => v.slug === slug) ?? null;
  } catch {
    return [...seedVacatures, ...additionalVacatures].find((vacature) => vacature.slug === slug) ?? null;
  }
}
