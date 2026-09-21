import type { CSSProperties } from "react";

// Herbruikbare "premium" tegel-behandeling: subtiele diepte-gradient + ingesneden
// lichtrand + zware slagschaduw, i.p.v. vlakke kleurvlakken. Kleuren zijn afgeleid
// van de site-eigen --panel/--background/--accent tinten, dus dit werkt met elke
// kleurenset die via CSS-variabelen wordt ingesteld.
export const PREMIUM_TILE_STYLE: CSSProperties = {
  background: "linear-gradient(160deg, #1B3F63 0%, #0B2038 100%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.4), 0 20px 45px rgba(0,0,0,0.45)",
};

export const PREMIUM_CTA_STYLE: CSSProperties = {
  background: "linear-gradient(135deg, #F0C482 0%, #B87F35 100%)",
};
