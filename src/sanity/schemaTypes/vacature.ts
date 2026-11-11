import { defineField, defineType } from "sanity";
import { FUNCTIEGROEPEN, PLOEGENDIENSTEN, REGIOS, SECTOREN } from "@/lib/types";

// Oude vacatures hebben één regio/sector; die velden blijven zichtbaar zolang ze
// gevuld zijn. Nieuwe vacatures gebruiken "Regio's" en "Sectoren".
type DocMetLocatie = { regio?: string; regios?: string[]; sector?: string; sectoren?: string[] };

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
      name: "sectoren",
      title: "Sectoren",
      description: "Eén of meer sectoren. Bij een wervingspagina vink je alle sectoren aan waarin je deze functie plaatst.",
      type: "array",
      of: [{ type: "string" }],
      options: { list: [...SECTOREN], layout: "grid" },
      validation: (rule) =>
        rule.custom((value, context) =>
          (value as string[] | undefined)?.length || (context.document as DocMetLocatie)?.sector
            ? true
            : "Kies minstens één sector.",
        ),
    }),
    defineField({
      name: "sector",
      title: "Sector (oud veld)",
      description: "Oud veld met één sector. Gebruik bij voorkeur Sectoren hierboven en maak dit veld daarna leeg.",
      type: "string",
      options: { list: [...SECTOREN] },
      hidden: ({ value }) => !value,
    }),
    defineField({
      name: "brancheTitel",
      title: "Branche titel",
      type: "string",
      description: "De naam die onder de vacaturetitel op de website verschijnt.",
    }),
    defineField({
      name: "regios",
      title: "Regio's",
      description: "Eén of meer regio's. Bij een concrete opdracht alleen de regio waar het werk is.",
      type: "array",
      of: [{ type: "string" }],
      options: { list: [...REGIOS], layout: "grid" },
      validation: (rule) =>
        rule.custom((value, context) =>
          (value as string[] | undefined)?.length || (context.document as DocMetLocatie)?.regio
            ? true
            : "Kies minstens één regio.",
        ),
    }),
    defineField({
      name: "regio",
      title: "Regio (oud veld)",
      description: "Oud veld met één regio. Gebruik bij voorkeur Regio's hierboven en maak dit veld daarna leeg.",
      type: "string",
      options: { list: [...REGIOS] },
      hidden: ({ value }) => !value,
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
    select: {
      title: "titel",
      sector: "sector",
      sectoren: "sectoren",
      regio: "regio",
      regios: "regios",
      offline: "offline",
      status: "status",
      concreet: "concreteOpdracht",
    },
    prepare({ title, sector, sectoren, regio, regios, offline, status, concreet }) {
      const sectorTekst = (sectoren as string[] | undefined)?.length ? (sectoren as string[]).join(", ") : sector;
      const regioTekst = (regios as string[] | undefined)?.length ? (regios as string[]).join(", ") : regio;
      const labels = [
        offline === true ? "OFFLINE" : null,
        status === "vervuld" ? "Vervuld" : null,
        concreet === true ? "Google Jobs" : null,
      ].filter(Boolean);
      return {
        title,
        subtitle: [labels.join(" · "), [sectorTekst, regioTekst].filter(Boolean).join(" · ")].filter(Boolean).join(" | "),
      };
    },
  },
});
