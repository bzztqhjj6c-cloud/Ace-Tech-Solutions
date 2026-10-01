"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/Container";
import type { SiteSettings } from "@/lib/types";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/opdrachtgevers", label: "Voor opdrachtgevers" },
  { href: "/zzpers", label: "Voor ZZP'ers" },
  { href: "/opdrachten", label: "Opdrachten" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const displayName = settings.toonOfficieleBedrijfsnaam
    ? settings.bedrijfsnaam
    : settings.bedrijfsnaam;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-accent bg-panel">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex max-w-[min(14rem,48vw)] items-center font-display text-xl uppercase leading-none tracking-tight text-foreground sm:text-2xl">
          <Image
            src={settings.logo?.url || "/ace-flex-solutions-header-transparant.svg"}
            alt={settings.logo?.alt || displayName}
            width={260}
            height={86}
            unoptimized
            className="h-14 w-auto max-w-full object-contain"
          />
        </Link>

        <nav className="ml-12 hidden items-center gap-7 font-mono text-sm font-semibold uppercase tracking-wide text-foreground md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </Link>
          ))}

        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 min-h-11 cursor-pointer select-none border-2 border-line px-3 py-2 font-mono text-xs uppercase text-foreground touch-manipulation md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? "Sluit" : "Menu"}
        </button>
      </Container>

      {open && (
        <nav id="mobile-navigation" className="relative z-10 border-t-2 border-line bg-panel md:hidden">
          <Container className="flex flex-col py-2 font-mono text-base font-semibold uppercase tracking-wide text-foreground">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}

          </Container>
        </nav>
      )}
    </header>
  );
}
