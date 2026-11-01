import { CONTACT_EMAIL } from "@/lib/contact";

export function UnderConstruction() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#123055] px-6 text-[#EAF1F8]">
      <section className="max-w-xl text-center">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-[#E3A052]">
          Ace Flex Solutions
        </p>

        <h1 className="mt-6 font-display text-5xl uppercase leading-tight sm:text-7xl">
          Binnenkort online
        </h1>

        <p className="mt-6 text-lg leading-relaxed opacity-80">
          Onze nieuwe website is momenteel in aanbouw. Neem voor vragen rechtstreeks contact
          met ons op.
        </p>

        <div className="mt-8 space-y-2 font-mono text-sm">
          <a href={`mailto:${CONTACT_EMAIL}`} className="block hover:text-[#E3A052]">
            {CONTACT_EMAIL}
          </a>
          <a href="tel:0615151606" className="block hover:text-[#E3A052]">
            0615151606
          </a>
          <p>Rietbaan 2-4, 2908 LP Capelle a/d IJssel</p>
        </div>
      </section>
    </main>
  );
}
