import type { SiteSettings } from "@/lib/types";
import { CONTACT_EMAIL } from "@/lib/contact";

// Fallback content, gebruikt zolang er geen (of geen bereikbare) Sanity-CMS-koppeling is.
// Kay kan al deze waarden straks zelf overschrijven via /studio.
export const defaultSettings: SiteSettings = {
  bedrijfsnaam: "Ace Flex Solutions",
  tagline: "Technische ZZP opdrachten in jouw regio",
  toonOfficieleBedrijfsnaam: false,
  kvk: "42164139",
  contact: {
    email: CONTACT_EMAIL,
    telefoon: "0615151606",
    adres: "Rietbaan 2-4, 2908 LP Capelle a/d IJssel",
  },
  kleuren: {
    // Blueprint-blauw: donkere technische-tekening-achtergrond, koper accent
    achtergrond: "#123055",
    voorgrond: "#EAF1F8",
    accent: "#E3A052",
    lijn: "#3E6690",
    paneel: "#0B2038",
  },
};
