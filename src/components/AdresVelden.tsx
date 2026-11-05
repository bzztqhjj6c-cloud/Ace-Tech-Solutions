"use client";

import { useEffect, useState } from "react";
import { isGeldigHuisnummer, normaliseerPostcode } from "@/lib/adres";

type Status = "idle" | "zoeken" | "gevonden" | "niet-gevonden" | "fout";

const inputClass =
  "mt-1 w-full border border-line/60 bg-panel px-4 py-3 text-foreground focus:border-accent focus:outline-none";

// Postcode + huisnummer invullen; straat en plaats worden automatisch opgezocht.
// Lukt dat niet, dan kan de bezoeker ze zelf invullen.
export function AdresVelden() {
  const [postcode, setPostcode] = useState("");
  const [huisnummer, setHuisnummer] = useState("");
  const [straat, setStraat] = useState("");
  const [plaats, setPlaats] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const pc = normaliseerPostcode(postcode);
    const nr = huisnummer.trim();
    if (!pc || !isGeldigHuisnummer(nr)) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus("zoeken");
      try {
        const response = await fetch(
          `/api/adres?postcode=${encodeURIComponent(pc)}&huisnummer=${encodeURIComponent(nr)}`,
          { signal: controller.signal },
        );
        if (response.status === 404) return setStatus("niet-gevonden");
        if (!response.ok) return setStatus("fout");
        const data = (await response.json()) as { straat: string; plaats: string };
        setStraat(data.straat);
        setPlaats(data.plaats);
        setStatus("gevonden");
      } catch (error) {
        if ((error as Error).name !== "AbortError") setStatus("fout");
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [postcode, huisnummer]);

  const melding = {
    idle: null,
    zoeken: "Adres zoeken…",
    gevonden: null,
    "niet-gevonden": "We vinden dit adres niet. Controleer je postcode en huisnummer, of vul straat en plaats zelf in.",
    fout: "Automatisch aanvullen lukt nu niet. Vul straat en plaats zelf in.",
  }[status];

  return (
    <fieldset className="space-y-4">
      <legend className="eyebrow block opacity-70">Adres</legend>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="sollicitatie-postcode" className="eyebrow block opacity-70">Postcode</label>
          <input
            id="sollicitatie-postcode"
            name="postcode"
            type="text"
            required
            autoComplete="postal-code"
            inputMode="text"
            maxLength={7}
            placeholder="1234 AB"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            onBlur={() => setPostcode((pc) => normaliseerPostcode(pc) || pc)}
            className={`${inputClass} uppercase placeholder:normal-case placeholder:text-foreground/40`}
          />
        </div>
        <div>
          <label htmlFor="sollicitatie-huisnummer" className="eyebrow block opacity-70">Huisnummer</label>
          <input
            id="sollicitatie-huisnummer"
            name="huisnummer"
            type="text"
            required
            inputMode="numeric"
            pattern="\d{1,5}"
            maxLength={5}
            value={huisnummer}
            onChange={(e) => setHuisnummer(e.target.value.replace(/\D/g, ""))}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="sollicitatie-toevoeging" className="eyebrow block opacity-70">
            Toevoeging <span className="normal-case tracking-normal opacity-70">(opt.)</span>
          </label>
          <input id="sollicitatie-toevoeging" name="toevoeging" type="text" maxLength={10} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sollicitatie-straat" className="eyebrow block opacity-70">Straat</label>
          <input
            id="sollicitatie-straat"
            name="straat"
            type="text"
            required
            autoComplete="address-line1"
            maxLength={120}
            value={straat}
            onChange={(e) => setStraat(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="sollicitatie-plaats" className="eyebrow block opacity-70">Plaats</label>
          <input
            id="sollicitatie-plaats"
            name="plaats"
            type="text"
            required
            autoComplete="address-level2"
            maxLength={80}
            value={plaats}
            onChange={(e) => setPlaats(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {melding && (
        <p aria-live="polite" className="text-sm opacity-80">
          {melding}
        </p>
      )}
    </fieldset>
  );
}
