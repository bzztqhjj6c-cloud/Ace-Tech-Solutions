import { OG_SIZE, deelAfbeelding } from "@/lib/og";
import { getVacatureBySlug } from "@/lib/vacatures";

// Deelafbeelding per vacature: titel, functiegroep en regio, zoals op de pagina.
export const alt = "Opdracht bij Ace Flex Solutions";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vacature = await getVacatureBySlug(slug);

  if (!vacature) {
    return deelAfbeelding({ label: "Ace Flex Solutions", titel: "Connecting Winners in Technology" });
  }

  return deelAfbeelding({
    label: vacature.brancheTitel ?? vacature.sector,
    titel: vacature.titel,
    ondertitel: `${vacature.functiegroep} in ${vacature.regio}`,
  });
}
