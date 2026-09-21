"use client";

import { useMemo, useState } from "react";
import { VacatureCard } from "@/components/VacatureCard";
import { FUNCTIEGROEPEN, PLOEGENDIENSTEN, REGIOS } from "@/lib/types";
import type { Vacature } from "@/lib/types";
import { PREMIUM_TILE_STYLE } from "@/lib/premiumStyle";
import { ScrollReveal } from "@/components/ScrollReveal";

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  initialVisible = options.length,
}: {
  title: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  initialVisible?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? options : options.slice(0, initialVisible);
  const hasMore = options.length > initialVisible;

  return (
    <div className="border-b border-line/60 py-6 first:pt-0 last:border-none">
      <p className="eyebrow text-accent">[ {title} ]</p>
      <ul className="mt-3 space-y-2.5">
        {visible.map((option) => (
          <li key={option}>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="h-4 w-4 accent-accent"
              />
              <span>{option}</span>
            </label>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="eyebrow mt-3 text-accent hover:underline"
        >
          {expanded ? "Toon minder" : "Toon meer"}
        </button>
      )}
    </div>
  );
}

export function OpdrachtenBrowser({ vacatures }: { vacatures: Vacature[] }) {
  const opdrachtenPerPagina = 10;
  const [regios, setRegios] = useState<string[]>([]);
  const [diensten, setDiensten] = useState<string[]>([]);
  const [functies, setFuncties] = useState<string[]>([]);
  const [pagina, setPagina] = useState(1);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setPagina(1);
  };

  const filtered = useMemo(() => {
    return vacatures.filter((v) => {
      if (regios.length && !regios.includes(v.regio)) return false;
      if (diensten.length && !v.ploegendiensten?.some((d) => diensten.includes(d))) return false;
      if (functies.length && !functies.includes(v.functiegroep)) return false;
      return true;
    });
  }, [vacatures, regios, diensten, functies]);

  const aantalPaginaS = Math.max(1, Math.ceil(filtered.length / opdrachtenPerPagina));
  const zichtbareVacatures = filtered.slice(
    (pagina - 1) * opdrachtenPerPagina,
    pagina * opdrachtenPerPagina,
  );

  const aantalActief = regios.length + diensten.length + functies.length;

  return (
    <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
      <ScrollReveal className="h-fit">
        <aside className="border border-accent/30 p-6" style={PREMIUM_TILE_STYLE}>
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-xl uppercase tracking-wide">Vind je opdracht</h2>
        </div>
        {aantalActief > 0 && (
          <button
            type="button"
            onClick={() => {
              setRegios([]);
              setDiensten([]);
              setFuncties([]);
              setPagina(1);
            }}
            className="eyebrow mt-2 text-accent hover:underline"
          >
            Filters wissen ({aantalActief})
          </button>
        )}

        <div className="mt-6 border-t border-line/60">
          <FilterGroup
            title="Regio"
            options={REGIOS}
            selected={regios}
            onToggle={(v) => toggle(regios, setRegios, v)}
            initialVisible={5}
          />
          <FilterGroup
            title="Ploegendienst"
            options={PLOEGENDIENSTEN}
            selected={diensten}
            onToggle={(v) => toggle(diensten, setDiensten, v)}
          />
          <FilterGroup
            title="Functie"
            options={FUNCTIEGROEPEN}
            selected={functies}
            onToggle={(v) => toggle(functies, setFuncties, v)}
            initialVisible={5}
          />
        </div>
        </aside>
      </ScrollReveal>

      <div>
        {filtered.length === 0 ? (
          <p className="opacity-70">Geen opdrachten gevonden met deze filters.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {zichtbareVacatures.map((v) => (
              <ScrollReveal key={v.slug}>
                <VacatureCard vacature={v} layout="list" />
              </ScrollReveal>
            ))}
          </div>
        )}

        {filtered.length > opdrachtenPerPagina && (
          <nav className="mt-8 flex items-center justify-between gap-4" aria-label="Paginering opdrachten">
            <button
              type="button"
              onClick={() => setPagina((current) => Math.max(1, current - 1))}
              disabled={pagina === 1}
              className="border border-accent/30 px-4 py-3 font-mono text-xs uppercase tracking-wide transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
            >
              Vorige
            </button>
            <span className="eyebrow text-center opacity-70">
              Pagina {pagina} van {aantalPaginaS}
            </span>
            <button
              type="button"
              onClick={() => setPagina((current) => Math.min(aantalPaginaS, current + 1))}
              disabled={pagina === aantalPaginaS}
              className="border border-accent/30 px-4 py-3 font-mono text-xs uppercase tracking-wide transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
            >
              Volgende
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
