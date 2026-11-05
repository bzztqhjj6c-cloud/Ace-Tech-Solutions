// Gedeelde controles voor Nederlandse adressen (browser en server).

export function normaliseerPostcode(postcode: string): string {
  const schoon = postcode.replace(/\s+/g, "").toUpperCase();
  return /^[1-9]\d{3}[A-Z]{2}$/.test(schoon) ? `${schoon.slice(0, 4)} ${schoon.slice(4)}` : "";
}

export function isGeldigHuisnummer(huisnummer: string): boolean {
  return /^\d{1,5}$/.test(huisnummer.trim());
}

export function formatAdres(a: {
  straat: string;
  huisnummer: string;
  toevoeging?: string;
  postcode: string;
  plaats: string;
}): string {
  const nummer = `${a.huisnummer}${a.toevoeging ? ` ${a.toevoeging}` : ""}`;
  return `${a.straat} ${nummer}, ${a.postcode} ${a.plaats}`;
}
