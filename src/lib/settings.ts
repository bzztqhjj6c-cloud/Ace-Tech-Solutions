import { defaultSettings } from "@/lib/content/default-settings";
import { sanityClient } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/types";
import { CONTACT_EMAIL } from "@/lib/contact";

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityClient) return defaultSettings;

  try {
    const settings = await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery);
    if (!settings) return defaultSettings;
    return {
      ...defaultSettings,
      ...settings,
      contact: { ...defaultSettings.contact, ...settings.contact, email: CONTACT_EMAIL },
      kleuren: { ...defaultSettings.kleuren, ...settings.kleuren },
    };
  } catch {
    return defaultSettings;
  }
}
