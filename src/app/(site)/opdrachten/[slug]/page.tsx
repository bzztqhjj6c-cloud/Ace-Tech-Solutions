import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Sollicitatie } from "@/components/SollicitatieForm";
import { getVacatureBySlug, getVacatures } from "@/lib/vacatures";

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
      </div>

      {/* Witregels uit Sanity worden alinea's, losse enters blijven nieuwe regels. */}
      <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed opacity-80">
        {(vacature.beschrijving ?? "")
          .split(/\n\s*\n/)
          .map((alinea) => alinea.trim())
          .filter(Boolean)
          .map((alinea, i) => (
            <p key={i} className="whitespace-pre-line">
              {alinea}
            </p>
          ))}
      </div>

      {vacature.status === "open" && <Sollicitatie slug={vacature.slug} titel={vacature.titel} />}

      {vacature.status !== "open" && (
        <p className="mt-10 max-w-2xl opacity-80">
          Deze opdracht is vervuld. Bekijk de{" "}
          <Link href="/opdrachten" className="text-accent underline hover:no-underline">
            actuele opdrachten
          </Link>{" "}
          of{" "}
          <Link href="/contact" className="text-accent underline hover:no-underline">
            neem contact met ons op
          </Link>
          .
        </p>
      )}
    </Container>
  );
}
