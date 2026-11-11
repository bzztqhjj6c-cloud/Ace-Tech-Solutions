import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";

export type VraagAntwoord = { vraag: string; antwoord: string };

// Veelgestelde vragen als uitklapblokken, plus FAQPage-schema zodat zoekmachines
// en AI-zoekfuncties de antwoorden kunnen gebruiken. Antwoorden komen uit de
// bestaande teksten van de site.
export function Veelgesteld({ titel, items }: { titel: string; items: VraagAntwoord[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ vraag, antwoord }) => ({
      "@type": "Question",
      name: vraag,
      acceptedAnswer: { "@type": "Answer", text: antwoord },
    })),
  };

  return (
    <div className="border-b-2 border-line py-16 md:py-24">
      <JsonLd data={schema} />
      <Container className="max-w-3xl">
        <p className="eyebrow text-accent tracking-[0.2em]">[ Veelgestelde vragen ]</p>
        <h2 className="font-display mt-2 text-3xl uppercase leading-tight tracking-wide">{titel}</h2>
        <div className="mt-8 space-y-3">
          {items.map(({ vraag, antwoord }) => (
            <details key={vraag} className="group border border-accent/30" style={PREMIUM_TILE_STYLE}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-base uppercase leading-tight tracking-wide marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{vraag}</span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl leading-none text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed opacity-85">{antwoord}</p>
            </details>
          ))}
        </div>
      </Container>
    </div>
  );
}
