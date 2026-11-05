import { isGeldigHuisnummer, normaliseerPostcode } from "@/lib/adres";

// Zoekt straat en plaats bij postcode + huisnummer via de gratis Locatieserver
// van PDOK (Kadaster). Alleen postcode en huisnummer gaan naar PDOK, geen naam.
const PDOK_URL = "https://api.pdok.nl/bzk/locatieserver/search/v3_1/free";

type PdokDoc = { straatnaam?: string; woonplaatsnaam?: string };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postcode = normaliseerPostcode(searchParams.get("postcode") ?? "");
  const huisnummer = (searchParams.get("huisnummer") ?? "").trim();

  if (!postcode || !isGeldigHuisnummer(huisnummer)) {
    return Response.json({ error: "Ongeldige postcode of huisnummer" }, { status: 400 });
  }

  const url = new URL(PDOK_URL);
  url.searchParams.append("fq", `postcode:${postcode.replace(" ", "")}`);
  url.searchParams.append("fq", `huisnummer:${huisnummer}`);
  url.searchParams.append("fq", "type:adres");
  url.searchParams.set("fl", "straatnaam,woonplaatsnaam");
  url.searchParams.set("rows", "1");

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5_000),
      // Adressen veranderen zelden: een dag cachen scheelt verzoeken.
      next: { revalidate: 86_400 },
    });
    if (!response.ok) throw new Error(`PDOK ${response.status}`);

    const data = (await response.json()) as { response?: { docs?: PdokDoc[] } };
    const doc = data.response?.docs?.[0];
    if (!doc?.straatnaam || !doc.woonplaatsnaam) {
      return Response.json({ error: "Adres niet gevonden" }, { status: 404 });
    }
    return Response.json({ straat: doc.straatnaam, plaats: doc.woonplaatsnaam });
  } catch (error) {
    console.error("Adres opzoeken mislukt:", error);
    return Response.json({ error: "Adres opzoeken is nu niet beschikbaar" }, { status: 502 });
  }
}
