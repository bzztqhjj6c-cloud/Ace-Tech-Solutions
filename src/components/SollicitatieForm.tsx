"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { AdresVelden } from "@/components/AdresVelden";
import { submitSollicitatie, type SollicitatieState } from "@/app/(site)/opdrachten/[slug]/actions";
import { CV_ACCEPT, CV_EXTENSIES, MAX_CV_BYTES } from "@/lib/sollicitatie";
import { PREMIUM_CTA_STYLE, PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";

const initialState: SollicitatieState = { status: "idle" };

const inputClass =
  "mt-1 w-full border border-line/60 bg-panel px-4 py-3 text-foreground focus:border-accent focus:outline-none";

export function SollicitatieForm({ slug, titel }: { slug: string; titel: string }) {
  const [state, formAction, pending] = useActionState(submitSollicitatie, initialState);
  const [cvFout, setCvFout] = useState<string | null>(null);

  // Meta Pixel: sollicitatie meten als "Lead". fbq bestaat alleen na cookietoestemming.
  useEffect(() => {
    if (state.status === "success") window.fbq?.("track", "Lead", { content_name: titel });
  }, [state.status, titel]);

  if (state.status === "success") {
    return (
      <div className="border border-accent/30 p-6" style={PREMIUM_TILE_STYLE}>
        <p className="eyebrow text-accent tracking-[0.2em]">[ Sollicitatie verstuurd ]</p>
        <p className="mt-2">{state.message}</p>
      </div>
    );
  }

  function controleerCv(event: React.ChangeEvent<HTMLInputElement>) {
    const bestand = event.target.files?.[0];
    if (!bestand) return setCvFout(null);
    const extensie = bestand.name.split(".").pop()?.toLowerCase() ?? "";
    if (!CV_EXTENSIES.includes(extensie)) {
      setCvFout("Kies een PDF- of Word-bestand (.pdf, .doc of .docx).");
      event.target.value = "";
    } else if (bestand.size > MAX_CV_BYTES) {
      setCvFout("Dit bestand is groter dan 4 MB. Kies een kleiner bestand.");
      event.target.value = "";
    } else {
      setCvFout(null);
    }
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="slug" value={slug} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="sollicitatie-website">Laat dit veld leeg</label>
        <input id="sollicitatie-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="sollicitatie-naam" className="eyebrow block opacity-70">Naam</label>
          <input id="sollicitatie-naam" name="naam" type="text" required autoComplete="name" maxLength={120} className={inputClass} />
        </div>
        <div>
          <label htmlFor="sollicitatie-email" className="eyebrow block opacity-70">E-mail</label>
          <input id="sollicitatie-email" name="email" type="email" required autoComplete="email" maxLength={254} className={inputClass} />
        </div>
        <div>
          <label htmlFor="sollicitatie-telefoon" className="eyebrow block opacity-70">Telefoonnummer</label>
          <input id="sollicitatie-telefoon" name="telefoon" type="tel" required autoComplete="tel" maxLength={40} className={inputClass} />
        </div>
      </div>

      <AdresVelden />

      <div>
        <label htmlFor="sollicitatie-toelichting" className="eyebrow block opacity-70">
          Toelichting <span className="normal-case tracking-normal opacity-70">(optioneel)</span>
        </label>
        <textarea
          id="sollicitatie-toelichting"
          name="toelichting"
          rows={4}
          maxLength={5000}
          placeholder="Vertel kort iets over je ervaring en beschikbaarheid."
          className={`${inputClass} placeholder:text-foreground/40`}
        />
      </div>

      <div>
        <label htmlFor="sollicitatie-cv" className="eyebrow block opacity-70">
          Cv <span className="normal-case tracking-normal opacity-70">(optioneel, PDF of Word, max. 4 MB)</span>
        </label>
        <input
          id="sollicitatie-cv"
          name="cv"
          type="file"
          accept={CV_ACCEPT}
          onChange={controleerCv}
          className="mt-1 block w-full cursor-pointer border border-line/60 bg-panel px-4 py-3 text-sm text-foreground file:mr-4 file:cursor-pointer file:border-0 file:bg-accent file:px-4 file:py-2 file:font-mono file:text-xs file:font-bold file:uppercase file:tracking-[0.1em] file:text-[#0B2038]"
        />
        {cvFout && <p role="alert" className="eyebrow mt-2 text-accent">{cvFout}</p>}
      </div>

      {state.status === "error" && (
        <p role="alert" className="eyebrow text-accent">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-[#0B2038] transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto md:text-base"
        style={PREMIUM_CTA_STYLE}
      >
        {pending ? "Versturen…" : "Verstuur sollicitatie"}
      </button>

      <p className="text-xs opacity-60">
        Lees in onze{" "}
        <Link href="/privacyverklaring" className="underline hover:text-accent">
          privacyverklaring
        </Link>{" "}
        hoe wij met je gegevens en je cv omgaan.
      </p>
    </form>
  );
}
