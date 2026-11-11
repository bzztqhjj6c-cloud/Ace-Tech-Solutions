import { Container } from "@/components/Container";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/settings";
import { PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AANSPREEKPUNT } from "@/components/Aanspreekpunt";

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
          <div className="mt-4 flex items-center gap-4">
            <Image
              src={AANSPREEKPUNT.foto}
              alt={AANSPREEKPUNT.alt}
              width={900}
              height={1125}
              sizes="80px"
              className="h-24 w-20 shrink-0 border border-accent/30 object-cover object-top"
            />
            <div>
              <p className="font-display text-lg uppercase leading-tight tracking-wide">{AANSPREEKPUNT.naam}</p>
              <p className="mt-1 text-sm opacity-70">Jouw vaste aanspreekpunt</p>
            </div>
          </div>
          <dl className="mt-5 space-y-4 border-t border-accent/20 pt-5 text-sm">
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
