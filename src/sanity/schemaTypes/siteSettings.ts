import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site-instellingen",
  type: "document",
  fields: [
    defineField({
      name: "bedrijfsnaam",
      title: "Bedrijfsnaam op de site",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "toonOfficieleBedrijfsnaam",
      title: "Officiële bedrijfsnaam publiekelijk tonen",
      description:
        "Zet dit pas aan zodra de KvK-registratie definitief bevestigd is. Check dit bij een adviseur of jurist voordat de site live gaat.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "kvk",
      title: "KVK-nummer",
      type: "string",
    }),
    defineField({
      name: "contact",
      title: "Contactgegevens",
      type: "object",
      fields: [
        defineField({ name: "email", title: "E-mail", type: "string" }),
        defineField({ name: "telefoon", title: "Telefoon", type: "string" }),
        defineField({ name: "adres", title: "Adres / regio", type: "string" }),
      ],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "kleuren",
      title: "Kleuren",
      type: "object",
      fields: [
        defineField({ name: "achtergrond", title: "Achtergrondkleur", type: "string", description: "Hex-code, bv. #123055" }),
        defineField({ name: "voorgrond", title: "Tekstkleur", type: "string", description: "Hex-code, bv. #EAF1F8" }),
        defineField({ name: "accent", title: "Accentkleur", type: "string", description: "Hex-code, bv. #E3A052" }),
        defineField({ name: "lijn", title: "Lijnkleur (dividers/randen)", type: "string", description: "Hex-code, bv. #3E6690" }),
        defineField({ name: "paneel", title: "Paneelkleur (header/footer/hover-vlakken)", type: "string", description: "Hex-code, bv. #0B2038" }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site-instellingen" }),
  },
});
