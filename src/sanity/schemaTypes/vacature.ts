import { defineField, defineType } from "sanity";
import { FUNCTIEGROEPEN, PLOEGENDIENSTEN, REGIOS, SECTOREN } from "@/lib/types";

export const vacature = defineType({
  name: "vacature",
  title: "Vacature / Opdracht",
  type: "document",
  fields: [
    defineField({
      name: "offline",
      title: "Offline zetten",
      description:
        "Zet aan en klik op Publish om deze vacature van de website te halen. Zet uit en klik op Publish om hem weer te tonen.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "concreteOpdracht",
      title: "Concrete opdracht (tonen in Google Jobs)",
      description:
        "Alleen aanzetten bij een echte, openstaande opdracht. Dan wordt deze vacature aangeboden aan Google Jobs. Uit laten bij wervingsvacatures voor je netwerk: die blijven gewoon op de site en in de gewone zoekresultaten.",
      type: "boolean",
      initialValue: false,
    }),
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
    select: { title: "titel", sector: "sector", regio: "regio", offline: "offline", status: "status", concreet: "concreteOpdracht" },
    prepare({ title, sector, regio, offline, status, concreet }) {
      const labels = [
        offline === true ? "OFFLINE" : null,
        status === "vervuld" ? "Vervuld" : null,
        concreet === true ? "Google Jobs" : null,
      ].filter(Boolean);
      return {
        title,
        subtitle: [labels.join(" · "), [sector, regio].filter(Boolean).join(" · ")].filter(Boolean).join(" | "),
      };
    },
  },
});
