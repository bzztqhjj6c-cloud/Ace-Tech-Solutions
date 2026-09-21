import { createClient } from "next-sanity";
import { hasSanityConfig, sanityApiVersion, sanityDataset, sanityProjectId } from "./env";

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: false,
    })
  : null;
