const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Gear({ cx, cy, r, teeth = 10 }: { cx: number; cy: number; r: number; teeth?: number }) {
  const points: string[] = [];
  const inner = r * 0.82;
  const toothLen = r * 0.16;
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2;
    const a1 = a0 + (Math.PI * 2) / teeth / 2;
    const ax = cx + Math.cos(a0) * inner;
    const ay = cy + Math.sin(a0) * inner;
    const bx = cx + Math.cos(a0) * (inner + toothLen);
    const by = cy + Math.sin(a0) * (inner + toothLen);
    const cx2 = cx + Math.cos(a1) * (inner + toothLen);
    const cy2 = cy + Math.sin(a1) * (inner + toothLen);
    const dx = cx + Math.cos(a1) * inner;
    const dy = cy + Math.sin(a1) * inner;
    points.push(`${ax},${ay} ${bx},${by} ${cx2},${cy2} ${dx},${dy}`);
  }
  return (
    <>
      <polygon points={points.join(" ")} {...common} />
      <circle cx={cx} cy={cy} r={r * 0.32} {...common} />
      <circle cx={cx} cy={cy} r={r * 0.08} fill="currentColor" stroke="none" />
    </>
  );
}

// Home — aandrijfsysteem (gears + valve)
export function GearValveIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 300" className={className} aria-hidden="true">
      <Gear cx={140} cy={150} r={62} teeth={12} />
      <Gear cx={244} cy={104} r={34} teeth={9} />
      <circle cx={344} cy={190} r={38} {...common} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={344 + Math.cos(a) * 38}
            y1={190 + Math.sin(a) * 38}
            x2={344 + Math.cos(a) * 50}
            y2={190 + Math.sin(a) * 50}
            {...common}
          />
        );
      })}
      <line x1={280} y1={130} x2={310} y2={168} {...common} />
      <line x1={20} y1={150} x2={78} y2={150} strokeDasharray="2 5" {...common} />
      <line x1={140} y1={230} x2={140} y2={266} strokeDasharray="2 5" {...common} />
      <text x={20} y={280} className="font-mono" fontSize="9" fill="currentColor" letterSpacing="1">
        Ø124MM | REV.03
      </text>
    </svg>
  );
}

// Opdrachtgevers — bedieningspaneel / meters
export function ControlPanelIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 260" className={className} aria-hidden="true">
      <rect x={20} y={20} width={380} height={220} {...common} />
      {[100, 210, 320].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={100} r={46} {...common} />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={i}
                x1={cx + Math.cos(a) * 38}
                y1={100 + Math.sin(a) * 38}
                x2={cx + Math.cos(a) * 44}
                y2={100 + Math.sin(a) * 44}
                {...common}
              />
            );
          })}
          <line x1={cx} y1={100} x2={cx + 24} y2={78} {...common} />
          <circle cx={cx} cy={100} r={3} fill="currentColor" stroke="none" />
        </g>
      ))}
      {[100, 150, 200, 250, 300].map((x) => (
        <rect key={x} x={x} y={180} width={20} height={34} {...common} />
      ))}
      <line x1={45} y1={197} x2={45} y2={197} {...common} />
      <text x={45} y={202} className="font-mono" fontSize="9" fill="currentColor" letterSpacing="1">
        PANEL / TD 01
      </text>
    </svg>
  );
}

// Over ons — leidingsysteem
export function PipeSystemIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 220" className={className} aria-hidden="true">
      <line x1={20} y1={80} x2={180} y2={80} strokeWidth={5} stroke="currentColor" strokeLinecap="butt" />
      <circle cx={40} cy={80} r={12} {...common} />
      <circle cx={160} cy={80} r={12} {...common} />
      <rect x={182} y={62} width={36} height={36} {...common} />
      <line x1={182} y1={62} x2={218} y2={98} {...common} />
      <line x1={218} y1={62} x2={182} y2={98} {...common} />
      <line x1={218} y1={80} x2={320} y2={80} strokeWidth={5} stroke="currentColor" />
      <path d="M320 80 Q360 80 360 120 L360 170" strokeWidth={5} stroke="currentColor" fill="none" strokeLinecap="round" />
      <circle cx={360} cy={190} r={12} {...common} />
      {[30, 60, 90].map((x) => (
        <line key={x} x1={x} y1={130} x2={x} y2={150} {...common} />
      ))}
      <line x1={20} y1={140} x2={100} y2={140} {...common} />
      <polygon points="95,136 105,140 95,144" fill="currentColor" stroke="none" />
      <text x={20} y={175} className="font-mono" fontSize="9" fill="currentColor" letterSpacing="1">
        LEIDING DN80 | FLOW
      </text>
    </svg>
  );
}

// ZZP'ers — gereedschap
export function ToolSetIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 220" className={className} aria-hidden="true">
      <g transform="translate(60,40) rotate(20)">
        <path
          d="M0 20 a20 20 0 1 1 0.1 0 Z M40 8 L200 8 L200 32 L40 32 Z M200 8 a20 20 0 1 1 0 24 Z"
          {...common}
        />
        <circle cx={0} cy={20} r={9} {...common} />
        <circle cx={200} cy={20} r={9} {...common} />
      </g>
      <g transform="translate(230,150) rotate(-15)">
        <polygon points="0,0 22,-22 44,0 22,22" {...common} />
        <line x1={22} y1={0} x2={140} y2={0} strokeWidth={7} stroke="currentColor" />
        <polygon points="140,-16 172,0 140,16" {...common} />
      </g>
      <text x={20} y={200} className="font-mono" fontSize="9" fill="currentColor" letterSpacing="1">
        SET / M10 / M24
      </text>
    </svg>
  );
}

// Home hero — grote, stoere turbine/aandrijfrig als achtergrondbeeld
export function HeroRigIllustration({ className = "" }: { className?: string }) {
  const cx = 260;
  const cy = 260;
  return (
    <svg viewBox="0 0 520 520" className={className} aria-hidden="true">
      <circle cx={cx} cy={cy} r={230} strokeOpacity={0.35} {...common} />
      <Gear cx={cx} cy={cy} r={190} teeth={20} />
      <circle cx={cx} cy={cy} r={130} {...common} />
      <circle cx={cx} cy={cy} r={92} strokeOpacity={0.6} {...common} />

      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * 92}
            y1={cy + Math.sin(a) * 92}
            x2={cx + Math.cos(a) * 128}
            y2={cy + Math.sin(a) * 128}
            {...common}
          />
        );
      })}

      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={cx + Math.cos(a) * 150}
            cy={cy + Math.sin(a) * 150}
            r={3}
            fill="currentColor"
            stroke="none"
          />
        );
      })}

      <circle cx={cx} cy={cy} r={26} {...common} />
      <circle cx={cx} cy={cy} r={5} fill="currentColor" stroke="none" />

      <line x1={cx} y1={30} x2={cx} y2={cy - 236} strokeDasharray="2 6" strokeOpacity={0.5} {...common} />
      <line x1={30} y1={cy} x2={cx - 236} y2={cy} strokeDasharray="2 6" strokeOpacity={0.5} {...common} />

      <text x={30} y={50} className="font-mono" fontSize="11" fill="currentColor" letterSpacing="1.5" opacity={0.7}>
        RIG / UNIT 01
      </text>
      <text x={30} y={68} className="font-mono" fontSize="11" fill="currentColor" letterSpacing="1.5" opacity={0.5}>
        Ø460MM | REV.07
      </text>
    </svg>
  );
}
