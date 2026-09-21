import { PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";

export function TechnicalFigure({
  nummer,
  label,
  children,
  className = "",
}: {
  nummer: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border border-accent/30 p-6 ${className}`} style={PREMIUM_TILE_STYLE}>
      <span className="absolute -left-[2px] -top-[2px] h-3 w-3 border-l-2 border-t-2 border-accent" />
      <span className="absolute -right-[2px] -top-[2px] h-3 w-3 border-r-2 border-t-2 border-accent" />
      <span className="absolute -bottom-[2px] -left-[2px] h-3 w-3 border-b-2 border-l-2 border-accent" />
      <span className="absolute -bottom-[2px] -right-[2px] h-3 w-3 border-b-2 border-r-2 border-accent" />

      <div className="text-line">{children}</div>

      <p className="eyebrow mt-4 text-foreground/60 tracking-[0.2em]">
        FIG. {nummer} | {label}
      </p>
    </div>
  );
}
