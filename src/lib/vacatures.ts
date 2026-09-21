import { seedVacatures } from "@/lib/content/seed-vacatures";
import { additionalVacatures } from "@/lib/content/additional-vacatures";
import { sanityClient } from "@/lib/sanity/client";
import { vacatureBySlugQuery, vacaturesQuery } from "@/lib/sanity/queries";
import type { Vacature } from "@/lib/types";

export async function getVacatures(): Promise<Vacature[]> {
  if (!sanityClient) return seedVacatures;

  try {
    const vacatures = await sanityClient.fetch<Vacature[]>(vacaturesQuery, {}, { cache: "no-store" });
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
    const vacature = await sanityClient.fetch<Vacature | null>(vacatureBySlugQuery, { slug }, { cache: "no-store" });
    return vacature ?? [...seedVacatures, ...additionalVacatures].find((v) => v.slug === slug) ?? null;
  } catch {
    return [...seedVacatures, ...additionalVacatures].find((vacature) => vacature.slug === slug) ?? null;
  }
}
