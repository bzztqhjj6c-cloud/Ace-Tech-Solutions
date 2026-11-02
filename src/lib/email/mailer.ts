import nodemailer from "nodemailer";
import { Resend } from "resend";
import { formatSender } from "@/lib/email/confirmation";

export type OutgoingMail = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type Mailer = {
  via: "smtp" | "resend";
  send: (mail: OutgoingMail) => Promise<{ error?: unknown }>;
};

// Voorkeur: de mailserver van Mijndomein (SMTP), met de reputatie van de gewone
// mailbox. Valt terug op Resend zolang de SMTP-gegevens niet in Vercel staan.
//
// SMTP_HOST, SMTP_PORT (587 of 465), SMTP_USER, SMTP_PASSWORD, optioneel SMTP_FROM.
// Het afzenderadres moet de mailbox zijn waarmee wordt ingelogd (bijv. info@ace-flex.nl).
export function getMailer(): Mailer | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (host && user && password) {
    const port = Number(process.env.SMTP_PORT || 587);
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass: password },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
    const from = formatSender(process.env.SMTP_FROM || user);

    return {
      via: "smtp",
      async send(mail) {
        try {
          await transport.sendMail({ from, ...mail });
          return {};
        } catch (error) {
          return { error };
        }
      },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;
  if (apiKey && resendFrom) {
    const resend = new Resend(apiKey);
    const from = formatSender(resendFrom);

    return {
      via: "resend",
      async send(mail) {
        try {
          const { error } = await resend.emails.send({ from, ...mail });
          return error ? { error } : {};
        } catch (error) {
          return { error };
        }
      },
    };
  }

  return null;
}
