import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { sanityApiVersion, sanityDataset, sanityProjectId } from "@/lib/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "ace-flex-solutions",
  title: "Ace Flex Solutions — beheer",
  basePath: "/studio",
  projectId: sanityProjectId || "placeholder-project-id",
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool()],
});
