import { defineField, defineType } from "sanity";
import { FUNCTIEGROEPEN, PLOEGENDIENSTEN, REGIOS, SECTOREN } from "@/lib/types";

export const vacature = defineType({
  name: "vacature",
  title: "Vacature / Opdracht",
  type: "document",
  fields: [
    defineField({
      name: "titel",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      options: { source: "titel", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "functiegroep",
      title: "Functiegroep",
      type: "string",
      options: { list: [...FUNCTIEGROEPEN] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sector",
      title: "Sector",
      type: "string",
      options: { list: [...SECTOREN] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brancheTitel",
      title: "Branche titel",
      type: "string",
      description: "De naam die onder de vacaturetitel op de website verschijnt.",
    }),
    defineField({
      name: "regio",
      title: "Regio",
      type: "string",
      options: { list: [...REGIOS] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ploegendiensten",
      title: "Ploegendiensten",
      type: "array",
      of: [{ type: "string" }],
      options: { list: [...PLOEGENDIENSTEN] },
    }),
    defineField({
      name: "beschrijving",
      title: "Beschrijving",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: [{ title: "Open", value: "open" }, { title: "Vervuld", value: "vervuld" }] },
      initialValue: "open",
    }),
  ],
  preview: {
    select: { title: "titel", subtitle: "sector" },
  },
});
