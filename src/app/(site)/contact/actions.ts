"use server";

import { Resend } from "resend";
import { CONTACT_EMAIL, FORM_RECIPIENT_EMAIL } from "@/lib/contact";
import {
  CONFIRMATION_SUBJECT,
  confirmationHtml,
  confirmationText,
  formatSender,
} from "@/lib/email/confirmation";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const voornaam = formData.get("voornaam")?.toString().trim() ?? "";
  const achternaam = formData.get("achternaam")?.toString().trim() ?? "";
  const naam = `${voornaam} ${achternaam}`.trim();
  const email = formData.get("email")?.toString().trim() ?? "";
  const telefoon = formData.get("telefoon")?.toString().trim() ?? "";
  const bericht = formData.get("bericht")?.toString().trim() ?? "";
  const website = formData.get("website")?.toString().trim() ?? "";

  if (website) return { status: "success", message: "Bedankt voor je bericht." };
  if (!voornaam || !achternaam || !email || !telefoon || !bericht) {
    return { status: "error", message: "Vul alle velden in." };
  }
  const telefoonDigits = telefoon.replace(/\D/g, "");
  if (
    voornaam.length > 60 ||
    achternaam.length > 80 ||
    email.length > 254 ||
    telefoon.length > 40 ||
    bericht.length > 10000
  ) {
    return { status: "error", message: "Een of meer velden zijn te lang." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Vul een geldig e-mailadres in." };
  }
  if (!/^\+?[\d\s().-]+$/.test(telefoon) || telefoonDigits.length < 8 || telefoonDigits.length > 15) {
    return { status: "error", message: "Vul een geldig telefoonnummer in." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !fromAddress) {
    return {
      status: "error",
      message: `Online versturen is nog niet ingesteld. Mail ons rechtstreeks via ${CONTACT_EMAIL}.`,
    };
  }

  const from = formatSender(fromAddress);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: FORM_RECIPIENT_EMAIL,
      // Geen replyTo naar het adres van de bezoeker: een Reply-To op een ander domein
      // (bijv. hotmail.com) laat de spamfilter van de mailhost deze mail als spam markeren
      // (SPOOF_REPLYTO). Het adres staat daarom bovenaan in de tekst.
      subject: `Websitebericht van ${naam}`,
      text: `Reageren? Mail naar ${email} of bel ${telefoon}.\n\nVoornaam: ${voornaam}\nAchternaam: ${achternaam}\nE-mail: ${email}\nTelefoon: ${telefoon}\n\nBericht:\n${bericht}`,
    });

    if (error) {
      console.error("Contactmail kon niet worden verstuurd:", error);
      return {
        status: "error",
        message: "Versturen is niet gelukt. Probeer het later opnieuw of mail ons rechtstreeks.",
      };
    }

    const { error: confirmationError } = await resend.emails.send({
      from,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: CONFIRMATION_SUBJECT,
      // Persoonlijke aanhef met alleen de voornaam: "Beste Jan,".
      text: confirmationText(voornaam),
      html: confirmationHtml(voornaam),
    });

    if (confirmationError) {
      console.error("Bevestigingsmail kon niet worden verstuurd:", confirmationError);
      return {
        status: "success",
        message: "Je aanvraag is ontvangen. De bevestigingsmail kon niet worden verstuurd, maar we nemen snel contact met je op.",
      };
    }

    return {
      status: "success",
      message: "Bedankt, je aanvraag is ontvangen. Je krijgt een bevestiging per e-mail; we nemen snel contact met je op.",
    };
  } catch (error) {
    console.error("Contactmail kon niet worden verstuurd:", error);
    return {
      status: "error",
      message: "Versturen is niet gelukt. Probeer het later opnieuw of mail ons rechtstreeks.",
    };
  }
}