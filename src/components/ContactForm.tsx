"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/app/(site)/contact/actions";
import { PREMIUM_TILE_STYLE, PREMIUM_CTA_STYLE } from "@/lib/premiumStyle";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="border border-accent/30 p-6" style={PREMIUM_TILE_STYLE}>
        <p className="eyebrow text-accent tracking-[0.2em]">[ Verzonden ]</p>
        <p className="mt-2">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Laat dit veld leeg</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="voornaam" className="eyebrow block opacity-70">Voornaam</label>
          <input
            id="voornaam"
            name="voornaam"
            type="text"
            required
            autoComplete="given-name"
            maxLength={60}
            className="mt-1 w-full border border-line/60 bg-panel px-4 py-3 text-foreground focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="achternaam" className="eyebrow block opacity-70">Achternaam</label>
          <input
            id="achternaam"
            name="achternaam"
            type="text"
            required
            autoComplete="family-name"
            maxLength={80}
            className="mt-1 w-full border border-line/60 bg-panel px-4 py-3 text-foreground focus:border-accent focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="eyebrow block opacity-70">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full border border-line/60 bg-panel px-4 py-3 text-foreground focus:border-accent focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="telefoon" className="eyebrow block opacity-70">Telefoonnummer</label>
        <input
          id="telefoon"
          name="telefoon"
          type="tel"
          autoComplete="tel"
          required
          maxLength={40}
          className="mt-1 w-full border border-line/60 bg-panel px-4 py-3 text-foreground focus:border-accent focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="bericht" className="eyebrow block opacity-70">Bericht</label>
        <textarea
          id="bericht"
          name="bericht"
          rows={5}
          required
          className="mt-1 w-full border border-line/60 bg-panel px-4 py-3 text-foreground focus:border-accent focus:outline-none"
        />
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
        {pending ? "Versturen…" : "Verstuur bericht"}
      </button>

      <p className="text-xs opacity-60">
        Lees in onze{" "}
        <Link href="/privacyverklaring" className="underline hover:text-accent">
          privacyverklaring
        </Link>{" "}
        hoe wij met je gegevens omgaan.
      </p>
    </form>
  );
}
