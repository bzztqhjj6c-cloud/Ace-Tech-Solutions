import type { Metadata } from "next";

export const SITE_URL = "https://www.ace-flex.nl";
export const SITE_NAME = "Ace Flex Solutions";
export const LINKEDIN_URL = "https://www.linkedin.com/company/ace-flex-solutions/";
// Logo uit /public, als absolute URL voor structured data.
export const LOGO_URL = `${SITE_URL}/ace-flex-logo-staand-bron.png`;

// Metadata per pagina: eigen title, description, canonical en Open Graph.
// `title` is de volledige titel; die wordt ongewijzigd gebruikt (absolute).
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "nl_NL",
      siteName: SITE_NAME,
    },
  };
}

// Inkorten op een woordgrens, voor descriptions uit langere tekst.
export function kortIn(tekst: string, max = 160): string {
  const schoon = tekst.replace(/\s+/g, " ").trim();
  if (schoon.length <= max) return schoon;
  const afgekapt = schoon.slice(0, max - 1);
  return `${afgekapt.slice(0, afgekapt.lastIndexOf(" ")).replace(/[,.;:]$/, "")}…`;
}
