import groq from "groq";

export const vacaturesQuery = groq`*[_type == "vacature"] | order(_createdAt desc){
  "slug": slug.current,
  titel,
  functiegroep,
  sector,
  brancheTitel,
  regio,
  ploegendiensten,
  beschrijving,
  status
}`;

export const vacatureBySlugQuery = groq`*[_type == "vacature" && slug.current == $slug][0]{
  "slug": slug.current,
  titel,
  functiegroep,
  sector,
  brancheTitel,
  regio,
  ploegendiensten,
  beschrijving,
  status
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  bedrijfsnaam,
  tagline,
  toonOfficieleBedrijfsnaam,
  contact,
  kleuren
}`;
