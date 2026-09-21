export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = "2025-01-01";

// Wordt pas true zodra Kay een Sanity-project heeft aangemaakt en de
// project-ID in .env.local heeft gezet. Tot die tijd draait de site op
// de fallback-content uit src/lib/content/.
export const hasSanityConfig = Boolean(sanityProjectId);
