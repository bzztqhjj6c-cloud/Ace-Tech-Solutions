import Link from "next/link";
import { Container } from "@/components/Container";
import { SECTOREN } from "@/lib/types";
import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t-2 border-accent bg-panel text-foreground">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="font-display text-lg uppercase">{settings.bedrijfsnaam}</div>
          <p className="eyebrow mt-3 max-w-xs opacity-70">{settings.tagline}</p>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest">
          <div className="eyebrow mb-3 text-accent">[ Branches ]</div>
          <ul className="space-y-1 opacity-80">
            {SECTOREN.map((sector) => (
              <li key={sector}>{sector}</li>
            ))}
          </ul>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest">
          <div className="eyebrow mb-3 text-accent">[ Contact ]</div>
          <ul className="space-y-1 opacity-80">
            <li>{settings.contact.email}</li>
            <li>{settings.contact.telefoon}</li>
            <li>{settings.contact.adres}</li>
          </ul>
          <ul className="mt-6 space-y-1 normal-case tracking-normal">
            <li>
              <Link href="/opdrachten" className="hover:text-accent">
                Bekijk opdrachten →
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent">
                Neem contact op →
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="eyebrow border-t border-line/40 py-3 text-center opacity-60">
        © {new Date().getFullYear()} {settings.bedrijfsnaam} | KVK {settings.kvk}
      </div>
    </footer>
  );
}
