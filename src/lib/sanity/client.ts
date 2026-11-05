import "server-only";
import { createClient } from "next-sanity";
import { hasSanityConfig, sanityApiVersion, sanityDataset, sanityProjectId } from "./env";

// Leessleutel (Viewer) uit het Sanity-project kdtyf0uw, ingesteld in Vercel als
// SANITY_READ_TOKEN. Nodig omdat de geïmporteerde vacatures een document-ID met
// punten hebben (bijv. "vacature.engineer..."): die zijn zonder sleutel niet
// openbaar leesbaar. "server-only" voorkomt dat de sleutel ooit in de browser komt.
const token = process.env.SANITY_READ_TOKEN;

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
      token,
      // Alleen gepubliceerde versies, nooit concepten (ook niet mét sleutel).
      perspective: "published",
    })
  : null;
