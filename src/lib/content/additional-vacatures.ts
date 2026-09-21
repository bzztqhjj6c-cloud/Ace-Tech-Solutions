import type { Regio, Sector, Vacature } from "@/lib/types";

const description = (functie: string, ploegendienst: string, branche: string) =>
  `Als ${functie} werk je in de ${branche.toLowerCase()} aan betrouwbare productie-installaties. Je voert onderhoud uit, verhelpt storingen en werkt samen met de technische dienst aan een veilige en stabiele productie. Deze opdracht is in ${ploegendienst.toLowerCase()} en past bij een zelfstandige monteur die graag verantwoordelijkheid neemt in een industriële omgeving.`;

const createVacature = (
  functie: string,
  functiegroep: Vacature["functiegroep"],
  ploegendienst: Vacature["ploegendiensten"][number],
  sector: Sector,
  brancheTitel: string,
  regio: Regio,
): Vacature => ({
  slug: `${functie.toLowerCase().replaceAll(" ", "-")}-${ploegendienst.toLowerCase().replaceAll(" ", "-")}-${sector.toLowerCase()}-${regio.toLowerCase().replaceAll(" ", "-")}`,
  titel: `${functie} (${ploegendienst.toLowerCase()})`,
  functiegroep,
  sector,
  brancheTitel,
  regio,
  ploegendiensten: [ploegendienst],
  beschrijving: description(functie, ploegendienst, brancheTitel),
  status: "open",
});

export const additionalVacatures: Vacature[] = [
  ...(["3-Ploegen", "5-Ploegen"] as const).flatMap((ploegendienst) =>
    (["Voedingsmiddelen", "Proces"] as const).flatMap((sector) =>
      (["Utrecht", "Zuid-Holland", "Noord-Holland"] as const).map((regio) =>
        createVacature("Allround monteur", "Monteur Allround", ploegendienst, sector, sector === "Proces" ? "Proces industrie" : "Voedingsmiddelen", regio),
      ),
    ),
  ),
  ...(["Voedingsmiddelen", "Verpakkingen", "Proces"] as const).flatMap((sector) =>
    (["Utrecht", "Noord-Holland", "Zuid-Holland"] as const).map((regio) =>
      createVacature("Mechanisch monteur", "Monteur W", "Dagdienst", sector, sector === "Proces" ? "Proces industrie" : sector, regio),
    ),
  ),
  createVacature("Mechanisch monteur", "Monteur W", "3-Ploegen", "Karton", "Karton", "Noord-Brabant"),
  ...(["Noord-Brabant", "Utrecht"] as const).map((regio) =>
    createVacature("Elektro monteur", "Monteur E", "3-Ploegen", "Karton", "Karton", regio),
  ),
  createVacature("Elektro monteur", "Monteur E", "2-Ploegen", "Proces", "Proces industrie", "Zuid-Holland"),
  createVacature("Mechanisch monteur", "Monteur W", "2-Ploegen", "Proces", "Proces industrie", "Zuid-Holland"),
  ...(["Engineer", "Hoofd technische dienst", "Werkvoorbereider"] as const).flatMap((functie) =>
    (["Utrecht", "Zuid-Holland", "Noord-Holland"] as const).map((regio) => ({
      ...createVacature(
        functie,
        functie,
        "Dagdienst",
        "Proces",
        "Proces industrie",
        regio,
      ),
      beschrijving: `Als ${functie} werk je in de procesindustrie aan betrouwbare installaties en een stabiele productie. Je werkt samen met de technische dienst, bewaakt de voortgang en zorgt dat onderhoud en technische projecten zorgvuldig worden uitgevoerd. Deze functie is in dagdienst en biedt ruimte voor een professional die overzicht houdt, initiatief neemt en graag werkt in een industriële omgeving.`,
    })),
  ),
];
