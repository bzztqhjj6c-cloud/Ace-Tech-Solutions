import Link from "next/link";
import type { Vacature } from "@/lib/types";
import { PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";

export function VacatureCard({
  vacature,
  layout = "grid",
}: {
  vacature: Vacature;
  layout?: "grid" | "list";
}) {
  const brancheLabel = vacature.brancheTitel ?? vacature.sector;

  if (layout === "list") {
    return (
      <Link
        href={`/opdrachten/${vacature.slug}`}
        className="group flex flex-col gap-4 border border-accent/30 p-6 transition-all hover:-translate-y-0.5 hover:border-accent sm:flex-row sm:items-center sm:justify-between"
        style={PREMIUM_TILE_STYLE}
      >
        <div>
          <div className="eyebrow flex flex-wrap items-center gap-2 opacity-70">
            <span>{vacature.regio}</span>
            <span>|</span>
            <span>{vacature.functiegroep}</span>
          </div>
          <h3 className="font-display mt-2 text-xl uppercase leading-tight tracking-wide group-hover:text-accent">
            {vacature.titel}
          </h3>
          <p className="eyebrow mt-2 opacity-70">({brancheLabel})</p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <span className="border border-accent/30 px-4 py-2 font-mono text-xs uppercase tracking-wide group-hover:border-accent group-hover:text-accent">
            Bekijk →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/opdrachten/${vacature.slug}`}
      className="group block border border-accent/30 p-6 transition-all hover:-translate-y-0.5 hover:border-accent"
      style={PREMIUM_TILE_STYLE}
    >
      <div className="eyebrow opacity-70">
        <span>{vacature.regio}</span>
      </div>
      <h3 className="font-display mt-3 text-2xl uppercase leading-tight tracking-wide">{vacature.titel}</h3>
      <p className="eyebrow mt-3 opacity-70">({brancheLabel})</p>
    </Link>
  );
}
