"use server";

import { Resend } from "resend";
import { CONTACT_EMAIL, FORM_RECIPIENT_EMAIL } from "@/lib/contact";
import {
  APPLICATION_CONFIRMATION_SUBJECT,
  confirmationHtml,
  confirmationText,
  formatSender,
} from "@/lib/email/confirmation";
import { formatAdres, isGeldigHuisnummer, normaliseerPostcode } from "@/lib/adres";
import { CV_EXTENSIES, MAX_CV_BYTES } from "@/lib/sollicitatie";
import { getVacatureBySlug } from "@/lib/vacatures";
import { brancheTekst, regioTekst } from "@/lib/vacature-weergave";

export type SollicitatieState = {
  status: "idle" | "success" | "error";
  message?: string;
  // Alleen bij succes: voor een persoonlijke bevestiging op het scherm.
  voornaam?: string;
  bevestigingVerstuurd?: boolean;
};

const SITE_URL = "https://www.ace-flex.nl";

function veiligeBestandsnaam(naam: string): string {
  const schoon = naam.replace(/[^\w.\- ]+/g, "_").trim().slice(0, 100);
  return schoon || "cv";
}

export async function submitSollicitatie(
  _previousState: SollicitatieState,
  formData: FormData,
): Promise<SollicitatieState> {
  const slug = formData.get("slug")?.toString() ?? "";
  const voornaam = formData.get("voornaam")?.toString().trim() ?? "";
  const achternaam = formData.get("achternaam")?.toString().trim() ?? "";
  const naam = `${voornaam} ${achternaam}`.trim();
  const email = formData.get("email")?.toString().trim() ?? "";
  const telefoon = formData.get("telefoon")?.toString().trim() ?? "";
  const toelichting = formData.get("toelichting")?.toString().trim() ?? "";
  const postcode = normaliseerPostcode(formData.get("postcode")?.toString() ?? "");
  const huisnummer = formData.get("huisnummer")?.toString().trim() ?? "";
  const toevoeging = formData.get("toevoeging")?.toString().trim() ?? "";
  const straat = formData.get("straat")?.toString().trim() ?? "";
  const plaats = formData.get("plaats")?.toString().trim() ?? "";
  const website = formData.get("website")?.toString().trim() ?? "";
  const cv = formData.get("cv");

  // Honeypot: bots vullen dit verborgen veld in.
  if (website) return { status: "success", message: "Bedankt voor je sollicitatie." };

  if (!voornaam || !achternaam || !email || !telefoon) {
    return { status: "error", message: "Vul je voornaam, achternaam, e-mailadres en telefoonnummer in." };
  }
  if (voornaam.length > 60 || achternaam.length > 80 || email.length > 254 || telefoon.length > 40 || toelichting.length > 5000) {
    return { status: "error", message: "Een of meer velden zijn te lang." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Vul een geldig e-mailadres in." };
  }
  if (!postcode || !isGeldigHuisnummer(huisnummer) || !straat || !plaats) {
    return { status: "error", message: "Vul je volledige adres in (postcode, huisnummer, straat en plaats)." };
  }
  if (toevoeging.length > 10 || straat.length > 120 || plaats.length > 80) {
    return { status: "error", message: "Een of meer adresvelden zijn te lang." };
  }
  const adres = formatAdres({ straat, huisnummer, toevoeging, postcode, plaats });
  const telefoonDigits = telefoon.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(telefoon) || telefoonDigits.length < 8 || telefoonDigits.length > 15) {
    return { status: "error", message: "Vul een geldig telefoonnummer in." };
  }

  // De vacature altijd zelf opzoeken: titel en status komen niet uit het formulier.
  const vacature = slug ? await getVacatureBySlug(slug) : null;
  if (!vacature || vacature.status !== "open") {
    return { status: "error", message: "Deze opdracht is niet meer beschikbaar. Neem gerust contact met ons op." };
  }

  let bijlage: { filename: string; content: Buffer } | undefined;
  if (cv instanceof File && cv.size > 0) {
    const extensie = cv.name.split(".").pop()?.toLowerCase() ?? "";
    if (!CV_EXTENSIES.includes(extensie)) {
      return { status: "error", message: "Je cv moet een PDF- of Word-bestand zijn (.pdf, .doc of .docx)." };
    }
    if (cv.size > MAX_CV_BYTES) {
      return { status: "error", message: "Je cv is te groot. Het mag maximaal 4 MB zijn." };
    }
    bijlage = { filename: veiligeBestandsnaam(cv.name), content: Buffer.from(await cv.arrayBuffer()) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !fromAddress) {
    return {
      status: "error",
      message: `Online solliciteren is nog niet ingesteld. Mail ons rechtstreeks via ${CONTACT_EMAIL}.`,
    };
  }
  const from = formatSender(fromAddress);
  const link = `${SITE_URL}/opdrachten/${vacature.slug}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: FORM_RECIPIENT_EMAIL,
      // Geen replyTo naar de sollicitant: een Reply-To op een ander domein laat de
      // spamfilter van de mailhost deze mail als spam markeren (SPOOF_REPLYTO).
      subject: `Sollicitatie: ${vacature.titel} (${regioTekst(vacature)}) - ${naam}`,
      text: [
        `Reageren? Mail naar ${email} of bel ${telefoon}.`,
        "",
        `Opdracht: ${vacature.titel}`,
        `Sector: ${brancheTekst(vacature)}`,
        `Regio: ${regioTekst(vacature)}`,
        `Link: ${link}`,
        "",
        `Voornaam: ${voornaam}`,
        `Achternaam: ${achternaam}`,
        `E-mail: ${email}`,
        `Telefoon: ${telefoon}`,
        `Adres: ${adres}`,
        `Cv: ${bijlage ? `bijgevoegd (${bijlage.filename})` : "niet meegestuurd"}`,
        "",
        "Toelichting:",
        toelichting || "(geen toelichting)",
      ].join("\n"),
      attachments: bijlage ? [bijlage] : undefined,
    });

    if (error) {
      console.error("Sollicitatie kon niet worden verstuurd:", error);
      return {
        status: "error",
        message: "Versturen is niet gelukt. Probeer het later opnieuw of mail ons rechtstreeks.",
      };
    }

    const { error: confirmationError } = await resend.emails.send({
      from,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: APPLICATION_CONFIRMATION_SUBJECT,
      // Persoonlijke aanhef met alleen de voornaam: "Beste Jan,".
      text: confirmationText(voornaam, vacature.titel),
      html: confirmationHtml(voornaam, vacature.titel),
    });

    if (confirmationError) {
      console.error("Bevestiging sollicitatie kon niet worden verstuurd:", confirmationError);
      return {
        status: "success",
        voornaam,
        bevestigingVerstuurd: false,
        message: "Je sollicitatie is ontvangen. De bevestigingsmail kon niet worden verstuurd, maar we nemen snel contact met je op.",
      };
    }

    return {
      status: "success",
      voornaam,
      bevestigingVerstuurd: true,
      message: "Bedankt voor je sollicitatie! Je krijgt een bevestiging per e-mail en we nemen snel contact met je op.",
    };
  } catch (error) {
    console.error("Sollicitatie kon niet worden verstuurd:", error);
    return {
      status: "error",
      message: "Versturen is niet gelukt. Probeer het later opnieuw of mail ons rechtstreeks.",
    };
  }
}
