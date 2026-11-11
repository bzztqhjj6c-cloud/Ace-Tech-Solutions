import { OG_SIZE, deelAfbeelding } from "@/lib/og";

// Standaard deelafbeelding voor alle pagina's (tenzij een pagina een eigen heeft).
export const alt = "Ace Flex Solutions | Connecting Winners in Technology";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return deelAfbeelding({
    label: "Ace Flex Solutions",
    titel: "Connecting Winners in Technology",
    ondertitel: "Technische ZZP opdrachten in jouw regio",
  });
}
