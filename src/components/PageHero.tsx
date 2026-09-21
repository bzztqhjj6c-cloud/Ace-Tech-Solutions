import { Container } from "@/components/Container";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b-2 border-line bg-background py-16 md:py-24">
      <Container>
        <p className="eyebrow text-accent tracking-[0.25em]">[ {eyebrow} ]</p>
        <h1 className="font-display mt-4 text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-[0.9] tracking-tight">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed opacity-80">{intro}</p>}
      </Container>
    </div>
  );
}
