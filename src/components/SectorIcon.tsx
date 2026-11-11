import type { Sector } from "@/lib/types";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinejoin: "miter" as const,
} as const;

// Abstracte, geometrische merktekens per sector — bewust niet illustratief/figuratief,
// zodat dit professioneel oogt naast de rest van de blueprint-achtige, strakke stijl.
const ICONS: Record<Sector, React.ReactNode> = {
  Voedingsmiddelen: (
    <svg {...ICON_PROPS}>
      <line x1="8" y1="3" x2="8" y2="11" />
      <line x1="12" y1="3" x2="12" y2="11" />
      <line x1="16" y1="3" x2="16" y2="11" />
      <path d="M8 11 L8 13 L16 13 L16 11" />
      <line x1="12" y1="13" x2="12" y2="21" />
    </svg>
  ),
  Plastic: (
    <svg {...ICON_PROPS}>
      <polygon points="12,3 19,7.5 19,16.5 12,21 5,16.5 5,7.5" />
    </svg>
  ),
  Glas: (
    <svg {...ICON_PROPS}>
      <polygon points="12,3 20,19 4,19" />
      <line x1="8" y1="13" x2="16" y2="13" />
    </svg>
  ),
  Verpakkingen: (
    <svg {...ICON_PROPS}>
      <polygon points="12,3 19,7 19,17 12,21 5,17 5,7" />
      <line x1="12" y1="12" x2="12" y2="3" />
      <line x1="12" y1="12" x2="19" y2="17" />
      <line x1="12" y1="12" x2="5" y2="17" />
    </svg>
  ),
  Karton: (
    <svg {...ICON_PROPS}>
      <rect x="4" y="15" width="16" height="4" />
      <rect x="6" y="10" width="12" height="4" />
      <rect x="8" y="5" width="8" height="4" />
    </svg>
  ),
  Energie: (
    <svg {...ICON_PROPS}>
      <rect x="5" y="5" width="14" height="14" />
      <line x1="8" y1="16" x2="16" y2="8" />
      <polyline points="10,8 16,8 16,14" />
    </svg>
  ),
  Steen: (
    <svg {...ICON_PROPS}>
      <polygon points="12,3 18,9 15,21 9,21 6,9" />
      <line x1="6" y1="9" x2="18" y2="9" />
    </svg>
  ),
  Proces: (
    <svg {...ICON_PROPS}>
      <circle cx="7" cy="12" r="3" />
      <circle cx="17" cy="7" r="3" />
      <circle cx="17" cy="17" r="3" />
      <line x1="9.5" y1="10.5" x2="14.5" y2="8.5" />
      <line x1="9.5" y1="13.5" x2="14.5" y2="15.5" />
    </svg>
  ),
};

export function SectorIcon({ sector, className }: { sector: Sector; className?: string }) {
  return <span className={className}>{ICONS[sector]}</span>;
}
