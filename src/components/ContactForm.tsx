"use client";

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
      <div>
        <label htmlFor="naam" className="eyebrow block opacity-70">Naam</label>
        <input
          id="naam"
          name="naam"
          type="text"
          required
          className="mt-1 w-full border border-line/60 bg-panel px-4 py-3 text-foreground focus:border-accent focus:outline-none"
        />
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
        <p className="eyebrow text-accent">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-[#0B2038] transition-opacity hover:opacity-90 disabled:opacity-50"
        style={PREMIUM_CTA_STYLE}
      >
        {pending ? "Versturen…" : "Verstuur bericht"}
      </button>
    </form>
  );
}
