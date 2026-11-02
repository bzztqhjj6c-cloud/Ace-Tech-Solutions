import { CONTACT_EMAIL } from "@/lib/contact";

const SITE_URL = "https://www.ace-flex.nl";
const TELEFOON_WEERGAVE = "06 15 15 16 06";
const TELEFOON_LINK = "+31615151606";
const ADRES = "Rietbaan 2-4, 2908 LP Capelle aan den IJssel";
const KVK = "42164139";

const NAVY = "#0B2038";
const ACCENT = "#E3A052";
const TEXT = "#1F2937";
const MUTED = "#6B7280";

// Afzender met bedrijfsnaam ervoor, zodat ontvangers (en spamfilters) een herkenbare
// afzender zien. RESEND_FROM_EMAIL mag een kaal adres zijn of al een naam bevatten.
export function formatSender(from: string): string {
  return from.includes("<") ? from : `Ace Flex Solutions <${from}>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const CONFIRMATION_SUBJECT = "We hebben je bericht ontvangen | Ace Flex Solutions";

// Bewust zonder het bericht van de bezoeker: zo kan het formulier niet misbruikt
// worden om willekeurige tekst naar willekeurige adressen te sturen.
export function confirmationText(naam: string): string {
  return [
    `Beste ${naam},`,
    "",
    "Bedankt voor je bericht aan Ace Flex Solutions. We hebben je gegevens goed ontvangen.",
    "",
    "Wat gebeurt er nu?",
    "We lezen je bericht en nemen zo snel mogelijk persoonlijk contact met je op, telefonisch of per e-mail.",
    "",
    `Heb je in de tussentijd een vraag? Bel ons op ${TELEFOON_WEERGAVE} of mail naar ${CONTACT_EMAIL}.`,
    "",
    `Bekijk ook de actuele opdrachten: ${SITE_URL}/opdrachten`,
    "",
    "Met vriendelijke groet,",
    "",
    "Ace Flex Solutions",
    "Connecting Winners in Technology",
    "",
    "--",
    `Ace Flex Solutions | ${ADRES} | KvK ${KVK}`,
    SITE_URL.replace("https://", ""),
    "Je ontvangt deze e-mail omdat je het contactformulier op onze website hebt ingevuld.",
  ].join("\n");
}

export function confirmationHtml(naam: string): string {
  const veiligeNaam = escapeHtml(naam);
  const link = `color:${NAVY};text-decoration:underline;`;

  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${CONFIRMATION_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background:#F3F4F6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:8px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
<tr><td style="background:${NAVY};padding:20px 32px;border-bottom:3px solid ${ACCENT};">
<a href="${SITE_URL}"><img src="${SITE_URL}/email-logo.png" width="200" height="75" alt="Ace Flex Solutions" style="display:block;border:0;"></a>
</td></tr>
<tr><td style="padding:32px;color:${TEXT};font-size:16px;line-height:1.6;">
<p style="margin:0 0 16px;">Beste ${veiligeNaam},</p>
<p style="margin:0 0 16px;">Bedankt voor je bericht aan Ace Flex Solutions. We hebben je gegevens goed ontvangen.</p>
<p style="margin:0 0 4px;font-weight:bold;color:${NAVY};">Wat gebeurt er nu?</p>
<p style="margin:0 0 16px;">We lezen je bericht en nemen zo snel mogelijk persoonlijk contact met je op, telefonisch of per e-mail.</p>
<p style="margin:0 0 24px;">Heb je in de tussentijd een vraag? Bel ons op <a href="tel:${TELEFOON_LINK}" style="${link}">${TELEFOON_WEERGAVE}</a> of mail naar <a href="mailto:${CONTACT_EMAIL}" style="${link}">${CONTACT_EMAIL}</a>.</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:${ACCENT};border-radius:6px;">
<a href="${SITE_URL}/opdrachten" style="display:inline-block;padding:12px 24px;color:${NAVY};font-weight:bold;text-decoration:none;">Bekijk actuele opdrachten</a>
</td></tr></table>
<p style="margin:24px 0 0;">Met vriendelijke groet,</p>
<p style="margin:8px 0 0;font-weight:bold;color:${NAVY};">Ace Flex Solutions</p>
<p style="margin:0;color:${MUTED};font-size:14px;">Connecting Winners in Technology</p>
</td></tr>
<tr><td style="padding:20px 32px;background:#F9FAFB;border-top:1px solid #E5E7EB;color:${MUTED};font-size:12px;line-height:1.5;">
Ace Flex Solutions | ${ADRES} | KvK ${KVK}<br>
<a href="${SITE_URL}" style="color:${MUTED};">www.ace-flex.nl</a> | <a href="${SITE_URL}/privacyverklaring" style="color:${MUTED};">Privacyverklaring</a><br>
Je ontvangt deze e-mail omdat je het contactformulier op onze website hebt ingevuld.
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
