import { REGIOS, type Vacature } from "@/lib/types";

// "A", "A en B", "A, B en C"
export function opsomming(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} en ${items[items.length - 1]}`;
}

// Alle provincies aangevinkt: toon "heel Nederland" in plaats van twaalf namen.
export function heelNederland(vacature: Vacature): boolean {
  return REGIOS.every((r) => vacature.regios.includes(r));
}

export function regioTekst(vacature: Vacature): string {
  return heelNederland(vacature) ? "heel Nederland" : opsomming(vacature.regios);
}

export function brancheTekst(vacature: Vacature): string {
  return vacature.brancheTitel ?? opsomming(vacature.sectoren);
}
