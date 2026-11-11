import { SECTOR_UITLEG, type Sector, type Vacature } from "@/lib/types";

// "A", "A en B", "A, B en C"
export function opsomming(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} en ${items[items.length - 1]}`;
}

export function regioTekst(vacature: Vacature): string {
  return opsomming(vacature.regios);
}

export function brancheTekst(vacature: Vacature): string {
  return vacature.brancheTitel ?? opsomming(vacature.sectoren);
}

export function sectorMetUitleg(sector: Sector): string {
  const uitleg = SECTOR_UITLEG[sector];
  return uitleg ? `${sector} (${uitleg})` : sector;
}
