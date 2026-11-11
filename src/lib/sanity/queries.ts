import groq from "groq";

export const vacaturesQuery = groq`*[_type == "vacature" && offline != true] | order(_createdAt desc){
  "slug": slug.current,
  titel,
  functiegroep,
  sector,
  brancheTitel,
  regio,
  ploegendiensten,
  beschrijving,
  status,
  concreteOpdracht,
  "geplaatst": _createdAt
}`;

export const vacatureBySlugQuery = groq`*[_type == "vacature" && offline != true && slug.current == $slug][0]{
  "slug": slug.current,
  titel,
  functiegroep,
  sector,
  brancheTitel,
  regio,
  ploegendiensten,
  beschrijving,
  status,
  concreteOpdracht,
  "geplaatst": _createdAt
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  bedrijfsnaam,
  tagline,
  toonOfficieleBedrijfsnaam,
  logo { "url": asset->url, alt },
  contact,
  kleuren
}`;
