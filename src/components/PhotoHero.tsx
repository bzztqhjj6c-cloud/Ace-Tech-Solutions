import Image from "next/image";
import { Container } from "@/components/Container";

export function PhotoHero({
  image,
  imageAlt,
  objectPosition = "center",
  headline,
  children,
}: {
  image: string;
  imageAlt: string;
  objectPosition?: string;
  headline: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden border-b-2 border-line md:min-h-[max(400px,calc(100dvh_-_80px))]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        style={{ objectPosition }}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />

      <Container className="relative flex min-h-[100dvh] flex-col items-center justify-center py-24 text-center md:min-h-[max(400px,calc(100dvh_-_80px))] md:py-20">
        <h1
          className="font-display max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] uppercase leading-[0.88] tracking-tight text-white"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.85)" }}
        >
          {headline}
        </h1>
        {children}
      </Container>
    </div>
  );
}
