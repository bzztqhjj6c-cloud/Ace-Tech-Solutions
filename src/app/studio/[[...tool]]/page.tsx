"use client";

import dynamic from "next/dynamic";
import { hasSanityConfig } from "@/lib/sanity/env";
import config from "../../../../sanity.config";

const NextStudio = dynamic(() => import("next-sanity/studio").then((module) => module.NextStudio), {
  ssr: false,
});

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main style={{ padding: "3rem", fontFamily: "sans-serif", maxWidth: 640 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>CMS nog niet gekoppeld</h1>
        <p style={{ marginTop: "1rem", lineHeight: 1.6 }}>
          Er is nog geen Sanity-project gekoppeld aan deze site. Maak een gratis account
          aan op sanity.io, maak een project aan, en zet het project-ID in{" "}
          <code>.env.local</code> als <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>. Herstart
          Daarna verschijnt hier het beheerscherm wanneer je <code>npm run dev</code> opnieuw start.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
