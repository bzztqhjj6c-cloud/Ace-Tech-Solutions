import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getVacatures } from "@/lib/vacatures";

// Elk uur opnieuw opbouwen, zodat nieuwe vacatures uit Sanity vanzelf meekomen.
export const revalidate = 3600;

const PAGINAS = ["", "/opdrachtgevers", "/zzpers", "/opdrachten", "/over-ons", "/contact", "/privacyverklaring"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Zelfde bron als de site: alleen vacatures die online staan in de Studio.
  const vacatures = await getVacatures();

  return [
    ...PAGINAS.map((pad) => ({ url: `${SITE_URL}${pad}` })),
    ...vacatures.map((vacature) => ({ url: `${SITE_URL}/opdrachten/${vacature.slug}` })),
  ];
}
