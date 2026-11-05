// Het Sanity-project met de echte content (organisatie Revolve Technology).
// Bewust vast in de code: de Sanity-koppeling in Vercel zet NEXT_PUBLIC_SANITY_*
// naar een ander project ("project-byzantium-coin"), waardoor de live site en de
// online Studio niet de vacatures lieten zien die in dit project staan.
// Project-ID en datasetnaam zijn niet geheim; ze staan ook in de browsercode.
export const sanityProjectId = "kdtyf0uw";
export const sanityDataset = "production";
export const sanityApiVersion = "2025-01-01";

export const hasSanityConfig = Boolean(sanityProjectId);
