import { Container } from "@/components/Container";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/settings";
import { PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = pageMetadata({
  title: "Contact | Ace Flex Solutions",
  description:
    "Een opdracht, een vraag, of gewoon even sparren of we iets voor elkaar kunnen betekenen. Stuur een bericht of neem direct contact op.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Laten we praten"
        intro="Een opdracht, een vraag, of gewoon even sparren of we iets voor elkaar kunnen betekenen. Stuur een bericht of neem direct contact op."
      />

      <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-24">
        <ContactForm />

        <ScrollReveal className="self-start md:mt-[1.375rem]">
          <aside className="border border-accent/30 p-5" style={PREMIUM_TILE_STYLE}>
          <p className="eyebrow text-accent tracking-[0.2em]">[ Direct contact ]</p>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="eyebrow opacity-60">E-mail</dt>
              <dd className="mt-1">
                <a href={`mailto:${settings.contact.email}`} className="hover:text-accent">
                  {settings.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow opacity-60">Telefoon</dt>
              <dd className="mt-1">
                <a href={`tel:${settings.contact.telefoon}`} className="hover:text-accent">
                  {settings.contact.telefoon}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow opacity-60">Regio</dt>
              <dd className="mt-1">{settings.contact.adres}</dd>
            </div>
          </dl>
          </aside>
        </ScrollReveal>
      </Container>
    </>
  );
}
