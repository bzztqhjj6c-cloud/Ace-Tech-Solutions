"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { AdresVelden } from "@/components/AdresVelden";
import { submitSollicitatie, type SollicitatieState } from "@/app/(site)/opdrachten/[slug]/actions";
import { CV_ACCEPT, CV_EXTENSIES, MAX_CV_BYTES } from "@/lib/sollicitatie";
import { PREMIUM_CTA_STYLE, PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";

const initialState: SollicitatieState = { status: "idle" };

const inputClass =
  "mt-1 w-full border border-line/60 bg-panel px-4 py-3 text-foreground focus:border-accent focus:outline-none";

// Knop + formulier bij een vacature. Na het versturen verdwijnen beide en komt er
// op dezelfde plek één bevestiging, zodat de pagina rustig blijft.
export function Sollicitatie({ slug, titel }: { slug: string; titel: string }) {
  const [state, formAction, pending] = useActionState(submitSollicitatie, initialState);
  const [cvFout, setCvFout] = useState<string | null>(null);
  const sectieRef = useRef<HTMLElement>(null);
  const verstuurd = state.status === "success";

  useEffect(() => {
    if (!verstuurd) return;
    // Meta Pixel: sollicitatie meten als "Lead". fbq bestaat alleen na cookietoestemming.
    window.fbq?.("track", "Lead", { content_name: titel });
    sectieRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [verstuurd, titel]);

  if (verstuurd) {
    return (
      <section
        ref={sectieRef}
        id="solliciteren"
        aria-live="polite"
        className="mt-12 max-w-2xl scroll-mt-28 border border-accent/30 p-6 md:p-10"
        style={PREMIUM_TILE_STYLE}
      >
        <div className="flex h-14 w-14 items-center justify-center bg-accent text-[#0B2038]" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <p className="eyebrow mt-6 text-accent tracking-[0.2em]">[ Sollicitatie verstuurd ]</p>
        <h2 className="font-display mt-2 text-3xl uppercase leading-tight tracking-wide">
          Bedankt{state.voornaam ? `, ${state.voornaam}` : ""}!
        </h2>
        <p className="mt-4 text-lg leading-relaxed opacity-90">
          Je sollicitatie op &ldquo;{titel}&rdquo; is goed ontvangen.
        </p>
        <ul className="mt-6 space-y-2 text-sm leading-relaxed opacity-80">
          {state.bevestigingVerstuurd !== false && <li>✓ Je ontvangt een bevestiging per e-mail. Check ook je spammap.</li>}
          <li>✓ We bekijken je gegevens en nemen zo snel mogelijk persoonlijk contact met je op.</li>
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/opdrachten"
            className="border-2 border-transparent px-6 py-3 text-center font-mono text-sm font-bold uppercase tracking-[0.1em] text-[#0B2038] transition-opacity hover:opacity-90"
            style={PREMIUM_CTA_STYLE}
          >
            Bekijk andere opdrachten
          </Link>
          <Link
            href="/"
            className="border-2 border-accent px-6 py-3 text-center font-mono text-sm font-bold uppercase tracking-[0.1em] text-foreground transition-colors hover:bg-accent/10"
          >
            Naar de homepage
          </Link>
        </div>
      </section>
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
    <>
      <a
        href="#solliciteren"
        className="mt-10 inline-block px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-[#0B2038] transition-opacity hover:opacity-90"
        style={PREMIUM_CTA_STYLE}
      >
        Solliciteer op deze opdracht
      </a>

      <section
        ref={sectieRef}
        id="solliciteren"
        className="mt-16 max-w-2xl scroll-mt-28 border border-accent/30 p-6 md:p-8"
        style={PREMIUM_TILE_STYLE}
      >
        <p className="eyebrow text-accent tracking-[0.2em]">[ Solliciteren ]</p>
        <h2 className="font-display mt-2 text-2xl uppercase leading-tight tracking-wide">
          Solliciteer op deze opdracht
        </h2>
        <p className="mt-3 text-sm leading-relaxed opacity-80">
          Laat je gegevens achter, dan nemen we snel persoonlijk contact met je op. Een cv
          meesturen mag, maar hoeft niet.
        </p>
        <form action={formAction} className="mt-6 space-y-4">
          <input type="hidden" name="slug" value={slug} />
          <div className="hidden" aria-hidden="true">
            <label htmlFor="sollicitatie-website">Laat dit veld leeg</label>
            <input id="sollicitatie-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sollicitatie-voornaam" className="eyebrow block opacity-70">Voornaam</label>
              <input id="sollicitatie-voornaam" name="voornaam" type="text" required autoComplete="given-name" maxLength={60} className={inputClass} />
            </div>
            <div>
              <label htmlFor="sollicitatie-achternaam" className="eyebrow block opacity-70">Achternaam</label>
              <input id="sollicitatie-achternaam" name="achternaam" type="text" required autoComplete="family-name" maxLength={80} className={inputClass} />
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
      </section>
    </>
  );
}
