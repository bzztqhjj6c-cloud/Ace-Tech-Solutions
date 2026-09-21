import type { Vacature } from "@/lib/types";

const ELEKTRO_BESCHRIJVING =
  "Als Elektro Monteur werk je in een moderne procesindustrieomgeving waar techniek en continuïteit centraal staan. Je houdt installaties betrouwbaar, verhelpt storingen en voert elektrotechnisch onderhoud uit aan complexe productielijnen. Je werkt zelfstandig binnen een ervaren technische dienst en schakelt snel wanneer de productie daarom vraagt. De functie is in 5-ploegendienst en past bij een vakman die verantwoordelijkheid neemt en graag in een dynamische industriële omgeving werkt.";

export const seedVacatures: Vacature[] = [
  {
    slug: "elektro-monteur-5-ploegen-procesindustrie-zuid-holland",
    titel: "Elektro Monteur (5-ploegen)",
    functiegroep: "Monteur E",
    sector: "Proces",
    brancheTitel: "Proces industrie",
    regio: "Zuid-Holland",
    ploegendiensten: ["5-Ploegen"],
    beschrijving: ELEKTRO_BESCHRIJVING,
    status: "open",
  },
  {
    slug: "elektro-monteur-5-ploegen-procesindustrie-noord-holland",
    titel: "Elektro Monteur (5-ploegen)",
    functiegroep: "Monteur E",
    sector: "Proces",
    brancheTitel: "Proces industrie",
    regio: "Noord-Holland",
    ploegendiensten: ["5-Ploegen"],
    beschrijving: ELEKTRO_BESCHRIJVING,
    status: "open",
  },
  {
    slug: "elektro-monteur-5-ploegen-procesindustrie-utrecht",
    titel: "Elektro Monteur (5-ploegen)",
    functiegroep: "Monteur E",
    sector: "Proces",
    brancheTitel: "Proces industrie",
    regio: "Utrecht",
    ploegendiensten: ["5-Ploegen"],
    beschrijving: ELEKTRO_BESCHRIJVING,
    status: "open",
  },
];
