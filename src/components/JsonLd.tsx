// Structured data (JSON-LD) als <script>, zoals de Next.js-docs aanraden.
// "<" wordt vervangen zodat tekst uit Sanity de script-tag niet kan afbreken.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
