import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Gedeelde opmaak voor de deelafbeeldingen (LinkedIn, WhatsApp, Facebook, X).
export const OG_SIZE = { width: 1200, height: 630 };

const NAVY = "#0B2038";
const BLAUW = "#123055";
const GOUD = "#E3A052";
const WIT = "#EAF1F8";

async function bestand(pad: string) {
  return readFile(join(process.cwd(), pad));
}

export async function deelAfbeelding({
  label,
  titel,
  ondertitel,
}: {
  label: string;
  titel: string;
  ondertitel?: string;
}) {
  const [extraBold, semiBold, logo] = await Promise.all([
    bestand("src/assets/fonts/Montserrat-ExtraBold.ttf"),
    bestand("src/assets/fonts/Montserrat-SemiBold.ttf"),
    bestand("public/ace-flex-solutions-header-transparant.svg"),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  // Lange vacaturetitels iets kleiner, zodat ze op maximaal drie regels passen.
  const titelGrootte = titel.length > 60 ? 54 : titel.length > 35 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          background: `linear-gradient(160deg, ${BLAUW} 0%, ${NAVY} 100%)`,
          borderBottom: `14px solid ${GOUD}`,
          color: WIT,
          fontFamily: "Montserrat",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={100} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: GOUD, letterSpacing: 4, textTransform: "uppercase" }}>
            {`[ ${label} ]`}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: titelGrootte,
              fontWeight: 800,
              lineHeight: 1.05,
              textTransform: "uppercase",
              maxWidth: 1050,
            }}
          >
            {titel}
          </div>
          {ondertitel && (
            <div style={{ marginTop: 22, fontSize: 30, fontWeight: 600, opacity: 0.8, textTransform: "uppercase", letterSpacing: 2 }}>
              {ondertitel}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Montserrat", data: extraBold, weight: 800, style: "normal" },
        { name: "Montserrat", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
