export const FUNCTIEGROEPEN = [
  "Engineer",
  "Hoofd technische dienst",
  "Monteur Allround",
  "Monteur E",
  "Monteur E&I",
  "Monteur W",
  "Teamleider",
  "Werkvoorbereider",
] as const;

export type Functiegroep = (typeof FUNCTIEGROEPEN)[number];

export const SECTOREN = [
  "Voedingsmiddelen",
  "Plastic",
  "Glas",
  "Verpakkingen",
  "Karton",
  "Energie",
  "Steen",
  "Proces",
] as const;

export type Sector = (typeof SECTOREN)[number];

export const REGIOS = [
  "Drenthe",
  "Flevoland",
  "Friesland",
  "Gelderland",
  "Groningen",
  "Limburg",
  "Noord-Brabant",
  "Noord-Holland",
  "Overijssel",
  "Utrecht",
  "Zeeland",
  "Zuid-Holland",
] as const;

export type Regio = (typeof REGIOS)[number];

export const PLOEGENDIENSTEN = ["Dagdienst", "2-Ploegen", "3-Ploegen", "4-Ploegen", "5-Ploegen"] as const;

export type Ploegendienst = (typeof PLOEGENDIENSTEN)[number];

export type VacatureStatus = "open" | "vervuld";

export interface Vacature {
  slug: string;
  titel: string;
  functiegroep: Functiegroep;
  sector: Sector;
  brancheTitel?: string;
  regio: Regio;
  regios?: Regio[];
  ploegendiensten: Ploegendienst[];
  beschrijving: string;
  status: VacatureStatus;
  // Moment waarop de vacature in de Studio is aangemaakt (ISO-datum uit Sanity).
  geplaatst?: string;
  // Echte, openstaande opdracht: alleen dan JobPosting-gegevens voor Google Jobs.
  concreteOpdracht?: boolean;
}

export interface SiteSettings {
  bedrijfsnaam: string;
  tagline: string;
  toonOfficieleBedrijfsnaam: boolean;
  kvk: string;
  logo?: {
    url?: string;
    alt?: string;
  } | null;
  contact: {
    email: string;
    telefoon: string;
    adres: string;
  };
  kleuren: {
    achtergrond: string;
    voorgrond: string;
    accent: string;
    lijn: string;
    paneel: string;
  };
}
