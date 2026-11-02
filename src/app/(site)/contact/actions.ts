"use server";

import { CONTACT_EMAIL, FORM_RECIPIENT_EMAIL } from "@/lib/contact";
import { CONFIRMATION_SUBJECT, confirmationHtml, confirmationText } from "@/lib/email/confirmation";
import { getMailer } from "@/lib/email/mailer";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const naam = formData.get("naam")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const telefoon = formData.get("telefoon")?.toString().trim() ?? "";
  const bericht = formData.get("bericht")?.toString().trim() ?? "";
  const website = formData.get("website")?.toString().trim() ?? "";

  if (website) return { status: "success", message: "Bedankt voor je bericht." };
  if (!naam || !email || !telefoon || !bericht) {
    return { status: "error", message: "Vul alle velden in." };
  }
  const telefoonDigits = telefoon.replace(/\D/g, "");
  if (
    naam.length > 120 ||
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

  const mailer = getMailer();
  if (!mailer) {
    return {
      status: "error",
      message: `Online versturen is nog niet ingesteld. Mail ons rechtstreeks via ${CONTACT_EMAIL}.`,
    };
  }

  try {
    const { error } = await mailer.send({
      to: FORM_RECIPIENT_EMAIL,
      // Geen replyTo naar het adres van de bezoeker: een Reply-To op een ander domein
      // (bijv. hotmail.com) laat de spamfilter van de mailhost deze mail als spam markeren
      // (SPOOF_REPLYTO). Het adres staat daarom bovenaan in de tekst.
      subject: `Websitebericht van ${naam}`,
      text: `Reageren? Mail naar ${email} of bel ${telefoon}.\n\nNaam: ${naam}\nE-mail: ${email}\nTelefoon: ${telefoon}\n\nBericht:\n${bericht}`,
    });

    if (error) {
      console.error(`Contactmail kon niet worden verstuurd (${mailer.via}):`, error);
      return {
        status: "error",
        message: "Versturen is niet gelukt. Probeer het later opnieuw of mail ons rechtstreeks.",
      };
    }

    const { error: confirmationError } = await mailer.send({
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: CONFIRMATION_SUBJECT,
      text: confirmationText(naam),
      html: confirmationHtml(naam),
    });

    if (confirmationError) {
      console.error(`Bevestigingsmail kon niet worden verstuurd (${mailer.via}):`, confirmationError);
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