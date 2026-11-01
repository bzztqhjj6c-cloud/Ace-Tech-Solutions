import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacyverklaring | Ace Flex Solutions",
  description: "Hoe Ace Flex Solutions omgaat met je persoonsgegevens.",
};

const EMAIL = "info@ace-flex.nl";

function Mail() {
  return (
    <a href={`mailto:${EMAIL}`} className="text-accent underline hover:no-underline">
      {EMAIL}
    </a>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line/40 pt-8">
      <h2 className="font-display text-xl uppercase tracking-wide">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed opacity-90">{children}</div>
    </section>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1 pl-6 marker:text-accent">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyverklaringPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacyverklaring"
        intro="Ace Flex Solutions, gevestigd aan Rietbaan 2 4, 2908 LP Capelle aan den IJssel, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring."
      />

      <Container className="max-w-3xl space-y-10 py-16 md:py-24">
        <Section title="Contactgegevens">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            <dt className="opacity-60">Website</dt>
            <dd>
              <a href="https://www.ace-flex.nl" className="text-accent underline hover:no-underline">
                https://www.ace-flex.nl
              </a>
            </dd>
            <dt className="opacity-60">Adres</dt>
            <dd>Rietbaan 2 4, 2908 LP Capelle aan den IJssel</dd>
            <dt className="opacity-60">KvK nummer</dt>
            <dd>42164139</dd>
            <dt className="opacity-60">Telefoon</dt>
            <dd>
              <a href="tel:+31615151606" className="hover:text-accent">
                +31 6 15151606
              </a>
            </dd>
            <dt className="opacity-60">Mail</dt>
            <dd>
              <Mail />
            </dd>
          </dl>
        </Section>

        <Section title="Persoonsgegevens die wij verwerken">
          <p>
            Ace Flex Solutions verwerkt je persoonsgegevens omdat je gebruik maakt van onze
            dienstverlening en omdat je ze zelf aan ons geeft, bijvoorbeeld via een formulier op
            Facebook of Instagram, via WhatsApp, per mail of telefonisch. Dit zijn de gegevens die
            wij verwerken:
          </p>
          <List
            items={[
              "Voor en achternaam",
              "Telefoonnummer",
              "Mailadres",
              "Je antwoorden op de vragen in ons formulier: of je als ZZP'er werkt, in welke sector je de meeste ervaring hebt, wat je vakgebied is en wat je belangrijk vindt in een opdracht",
            ]}
          />
        </Section>

        <Section title="Bijzondere en of gevoelige persoonsgegevens die wij verwerken">
          <p>
            Wij vragen niet om bijzondere persoonsgegevens en onze advertenties zijn niet bedoeld
            voor mensen jonger dan 18 jaar. Als je er van overtuigd bent dat wij zonder toestemming
            persoonlijke gegevens hebben verzameld over een minderjarige, neem dan contact met ons op
            via <Mail />, dan verwijderen wij deze informatie.
          </p>
        </Section>

        <Section title="Met welk doel en op basis waarvan wij persoonsgegevens verwerken">
          <p>Ace Flex Solutions verwerkt jouw persoonsgegevens voor de volgende doelen:</p>
          <List
            items={[
              "Om je te bellen of te mailen over opdrachten die bij je passen",
              "Om je op te nemen in ons netwerk van ZZP'ers",
              "Om je, met jouw toestemming, voor te stellen aan opdrachtgevers",
            ]}
          />
          <p>
            Wij verwerken je gegevens op basis van jouw toestemming, die je geeft door het formulier
            in te vullen, en om onze bemiddeling uit te voeren. Je kunt je toestemming op elk moment
            intrekken.
          </p>
        </Section>

        <Section title="Geautomatiseerde besluitvorming">
          <p>Ace Flex Solutions maakt geen gebruik van geautomatiseerde besluitvorming.</p>
        </Section>

        <Section title="Hoe lang we persoonsgegevens bewaren">
          <p>
            Ace Flex Solutions bewaart je persoonsgegevens niet langer dan strikt nodig is om de
            doelen te realiseren waarvoor je gegevens worden verzameld. Wij hanteren een
            bewaartermijn van 24 maanden na ons laatste contact. Daarna verwijderen wij je gegevens,
            tenzij je ons vraagt ze langer te bewaren of een wettelijke plicht dat vereist.
          </p>
        </Section>

        <Section title="Delen van persoonsgegevens met derden">
          <p>
            Ace Flex Solutions verkoopt jouw gegevens niet aan derden en verstrekt deze uitsluitend
            als dit nodig is voor de uitvoering van onze overeenkomst met jou of om te voldoen aan
            een wettelijke verplichting. Met bedrijven die jouw gegevens verwerken in onze opdracht
            sluiten wij een verwerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging
            en vertrouwelijkheid van jouw gegevens. Ace Flex Solutions blijft verantwoordelijk voor
            deze verwerkingen.
          </p>
          <p>
            Partijen die wij hiervoor inschakelen zijn: Meta (Facebook en Instagram, voor het
            formulier), WhatsApp, Carerix via Step2Go (ons kandidatenbestand), Mijndomein (website en
            mail) en e-boekhouden.nl (administratie).
          </p>
          <p>Aan opdrachtgevers geven wij je gegevens alleen door met jouw toestemming.</p>
        </Section>

        <Section title="Cookies, of vergelijkbare technieken, die wij gebruiken">
          <p>
            Ace Flex Solutions gebruikt alleen technische en functionele cookies. Wij gebruiken geen
            analytische cookies, geen advertentiecookies en geen trackingtools. Een cookie is een
            klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen op jouw
            computer, tablet of smartphone. De cookies die wij gebruiken zijn noodzakelijk voor de
            technische werking van de website en jouw gebruiksgemak. Je kunt je afmelden voor
            cookies door je internetbrowser zo in te stellen dat deze geen cookies meer opslaat.
            Daarnaast kun je alle informatie die eerder is opgeslagen via de instellingen van je
            browser verwijderen.
          </p>
        </Section>

        <Section title="Gegevens inzien, aanpassen of verwijderen">
          <p>
            Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen.
            Daarnaast heb je het recht om je toestemming voor de gegevensverwerking in te trekken of
            bezwaar te maken tegen de verwerking van jouw persoonsgegevens door Ace Flex Solutions en
            heb je het recht op gegevensoverdraagbaarheid. Dat betekent dat je bij ons een verzoek
            kunt indienen om de persoonsgegevens die wij van jou hebben in een computerbestand naar
            jou of een andere, door jou genoemde organisatie te sturen.
          </p>
          <p>
            Je kunt een verzoek tot inzage, correctie, verwijdering, gegevensoverdracht, intrekking
            van je toestemming of bezwaar sturen naar <Mail />.
          </p>
          <p>
            Om er zeker van te zijn dat het verzoek tot inzage door jou is gedaan, vragen wij jou een
            kopie van je identiteitsbewijs met het verzoek mee te sturen. Maak in deze kopie je
            pasfoto, MRZ (machine readable zone, de strook met nummers onderaan het paspoort),
            paspoortnummer en Burgerservicenummer (BSN) zwart. Dit ter bescherming van je privacy.
            We reageren zo snel mogelijk, maar binnen vier weken, op jouw verzoek.
          </p>
          <p>
            Ace Flex Solutions wil je er tevens op wijzen dat je de mogelijkheid hebt om een klacht
            in te dienen bij de nationale toezichthouder, de Autoriteit Persoonsgegevens. Dat kan via
            de volgende link:{" "}
            <a
              href="https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons"
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-accent underline hover:no-underline"
            >
              https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons
            </a>
          </p>
        </Section>

        <Section title="Hoe wij persoonsgegevens beveiligen">
          <p>
            Ace Flex Solutions neemt de bescherming van jouw gegevens serieus en neemt passende
            maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en
            ongeoorloofde wijziging tegen te gaan. Als jij het idee hebt dat jouw gegevens toch niet
            goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op met <Mail />.
          </p>
        </Section>
      </Container>
    </>
  );
}
