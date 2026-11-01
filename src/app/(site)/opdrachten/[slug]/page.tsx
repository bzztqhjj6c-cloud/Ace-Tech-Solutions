import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getVacatureBySlug, getVacatures } from "@/lib/vacatures";
import { PREMIUM_CTA_STYLE } from "@/lib/premiumStyle";

export const revalidate = 60;

// Bekende opdrachten worden vooraf opgebouwd; nieuwe opdrachten uit Sanity
// worden bij het eerste bezoek opgebouwd en daarna gecachet.
export async function generateStaticParams() {
  const vacatures = await getVacatures();
  return vacatures.map((vacature) => ({ slug: vacature.slug }));
}

export default async function VacatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vacature = await getVacatureBySlug(slug);

  if (!vacature) notFound();

    const brancheLabel = vacature.brancheTitel ?? vacature.sector;

  return (
    <Container className="py-16 md:py-24">
      <Link href="/opdrachten" className="eyebrow hover:text-accent">
        ← Alle opdrachten
      </Link>

      <div className="mt-6 border-b-2 border-line pb-8">
        <p className="eyebrow text-accent tracking-[0.2em]">
          [ {vacature.sector} ]
        </p>
        <h1 className="font-display mt-4 text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.95]">
          {vacature.titel}
        </h1>
          <p className="eyebrow mt-4 opacity-70">({brancheLabel})</p>
          <p className="eyebrow mt-4 opacity-70">
            {vacature.functiegroep} in {vacature.regio}
        </p>
        {vacature.isVoorbeeld && (
          <p className="eyebrow mt-3 text-accent">[ voorbeeldvacature. Nog geen echte opdracht ]</p>
        )}
      </div>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed opacity-80">{vacature.beschrijving}</p>

      {vacature.status === "open" && (
        <Link
          href="/contact"
          className="mt-10 inline-block px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-[#0B2038] transition-opacity hover:opacity-90"
          style={PREMIUM_CTA_STYLE}
        >
          Solliciteer op deze opdracht
        </Link>
      )}
    </Container>
  );
}
