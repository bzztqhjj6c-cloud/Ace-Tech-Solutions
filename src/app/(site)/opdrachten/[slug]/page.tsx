import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Sollicitatie } from "@/components/SollicitatieForm";
import { JsonLd } from "@/components/JsonLd";
import { LOGO_URL, SITE_NAME, SITE_URL, kortIn, pageMetadata } from "@/lib/seo";
import type { Vacature } from "@/lib/types";
import { getVacatureBySlug, getVacatures } from "@/lib/vacatures";

export const revalidate = 60;

// Bekende opdrachten worden vooraf opgebouwd; nieuwe opdrachten uit Sanity
// worden bij het eerste bezoek opgebouwd en daarna gecachet.
export async function generateStaticParams() {
  const vacatures = await getVacatures();
  return vacatures.map((vacature) => ({ slug: vacature.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vacature = await getVacatureBySlug(slug);
  if (!vacature) return {};

  return pageMetadata({
    // Formaat: "[Functie] [regio] | Ace Flex Solutions"
    title: `${vacature.titel} ${vacature.regio} | ${SITE_NAME}`,
    // Begin van de vacaturetekst; zonder tekst de regel die ook op de pagina staat.
    description: vacature.beschrijving
      ? kortIn(vacature.beschrijving)
      : `${vacature.functiegroep} in ${vacature.regio}`,
    path: `/opdrachten/${vacature.slug}`,
  });
}

// JobPosting-schema met alleen gegevens die op de pagina staan. Niet opgenomen
// (want niet op de pagina): validThrough en baseSalary (er staat geen tarief).
function jobPostingSchema(vacature: Vacature) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: vacature.titel,
    ...(vacature.beschrijving ? { description: vacature.beschrijving } : {}),
    url: `${SITE_URL}/opdrachten/${vacature.slug}`,
    // "Geplaatst op" staat op de pagina (datum uit Sanity).
    ...(vacature.geplaatst ? { datePosted: vacature.geplaatst } : {}),
    employmentType: "CONTRACTOR",
    industry: vacature.brancheTitel ?? vacature.sector,
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: LOGO_URL,
    },
    jobLocation: {
      "@type": "Place",
      // Regio en land staan op de pagina: "<functiegroep> in <regio>, Nederland".
      address: { "@type": "PostalAddress", addressRegion: vacature.regio, addressCountry: "NL" },
    },
    // Er staat een sollicitatieformulier op de pagina zelf.
    directApply: true,
  };
}

// "5 november 2026", in Nederlandse tijd.
function formatDatum(iso: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Amsterdam",
  }).format(new Date(iso));
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
      {/* Google Jobs alleen voor echte, openstaande opdrachten (vinkje "Concrete
          opdracht" in de Studio). Wervingsvacatures en vervulde vacatures niet:
          Google Jobs staat alleen echte vacatures toe. */}
      {vacature.status === "open" && vacature.concreteOpdracht === true && (
        <JsonLd data={jobPostingSchema(vacature)} />
      )}

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
            {vacature.functiegroep} in {vacature.regio}, Nederland
        </p>
        {vacature.geplaatst && (
          <p className="eyebrow mt-4 opacity-70">
            Geplaatst op{" "}
            <time dateTime={vacature.geplaatst}>{formatDatum(vacature.geplaatst)}</time>
          </p>
        )}
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
