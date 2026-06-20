/**
 * Bespoke inline SVG glyphs extracted verbatim from design/StateKit Components.dc.html.
 * Never substitute an icon library here — shapes and motion are part of the design.
 * All glyphs are aria-hidden; the component using them carries the accessible name.
 */

export function WarningTriangleIcon({ size = 56, color = "#f7768e" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path d="M28 8 L50 46 H6 Z" stroke={color} strokeWidth="2.8" strokeLinejoin="round" />
      <line x1="28" y1="23" x2="28" y2="34" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="28" cy="40" r="1.8" fill={color} />
    </svg>
  );
}

export function ErrorGlyph({ size = 56, color = "#f7768e" }: { size?: number; color?: string }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute animate-sk-pulse rounded-full"
        style={{ inset: -18, background: `radial-gradient(circle, ${color}2e, transparent 70%)` }}
      />
      <div className="relative animate-sk-pulse">
        <WarningTriangleIcon size={size} color={color} />
      </div>
    </div>
  );
}

export function RetryArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 11.5 A8 8 0 1 1 17.5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 4 V8.5 H15.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon({ size = 52, color = "#4fd6e0" }: { size?: number; color?: string }) {
  const h = (size * 58) / 52;
  return (
    <svg width={size} height={h} viewBox="0 0 52 58" fill="none" aria-hidden="true">
      <path d="M16 26 V17 a10 10 0 0 1 20 0 V26" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <rect x="10" y="26" width="32" height="26" rx="6" stroke={color} strokeWidth="2.8" />
      <circle cx="26" cy="37" r="3" fill={color} />
      <line x1="26" y1="39" x2="26" y2="45" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function LockGlyph({ size = 52, color = "#4fd6e0" }: { size?: number; color?: string }) {
  return (
    <div className="animate-sk-lock">
      <LockIcon size={size} color={color} />
    </div>
  );
}

export function ShieldIcon({ size = 52, color = "#4fd6e0" }: { size?: number; color?: string }) {
  const h = (size * 58) / 52;
  return (
    <svg width={size} height={h} viewBox="0 0 52 58" fill="none" aria-hidden="true">
      <path
        d="M26 4 L46 12 V28 C46 42 36 50 26 54 C16 50 6 42 6 28 V12 Z"
        stroke={color}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path d="M17 28 L24 35 L36 21" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SignalBarsIcon({ accent = "#4fd6e0", bar = "var(--c-bar, #33333d)", bar2 = "var(--c-bar2, #26262f)" }: {
  accent?: string;
  bar?: string;
  bar2?: string;
}) {
  return (
    <div className="flex items-end gap-1.5" style={{ height: 46 }} aria-hidden="true">
      <div className="w-2.5 animate-sk-signal rounded-sm" style={{ height: 16, background: accent }} />
      <div
        className="w-2.5 animate-sk-signal rounded-sm"
        style={{ height: 28, background: bar, animationDelay: ".3s" }}
      />
      <div
        className="w-2.5 animate-sk-signal rounded-sm"
        style={{ height: 40, background: bar2, animationDelay: ".6s" }}
      />
    </div>
  );
}

export function SuccessGlyph({ size = 64, color = "#5ec98a" }: { size?: number; color?: string }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 animate-sk-pop rounded-full" style={{ background: `${color}29` }} />
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="relative" aria-hidden="true">
        <circle cx="32" cy="32" r="23" stroke={color} strokeWidth="3" opacity="0.35" />
        <path
          d="M21 33 L29 41 L44 24"
          stroke={color}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="36"
          className="animate-sk-draw"
        />
      </svg>
    </div>
  );
}

export function GlitchDigits({ code = 404 }: { code?: number }) {
  const chars = String(code).split("");
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {chars.map((c, i) => (
        <span
          key={i}
          className="animate-sk-glitch text-[56px] font-bold"
          style={{
            color: i === 1 ? "#8b7cff" : "var(--sk-text, currentColor)",
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export function MaintenanceGlyph({ size = 60, color = "#e0c060" }: { size?: number; color?: string }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" className="animate-sk-spin-slow" aria-hidden="true">
        <circle cx="30" cy="30" r="22" stroke={color} strokeWidth="2.4" strokeDasharray="5 7" />
      </svg>
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        className="absolute inset-0 animate-sk-spin-rev-slow"
        aria-hidden="true"
      >
        <circle cx="30" cy="30" r="13" stroke={`${color}80`} strokeWidth="2.4" strokeDasharray="4 6" />
      </svg>
    </div>
  );
}

export function CountdownRingGlyph({
  size = 64,
  color = "#e0c060",
  label,
}: {
  size?: number;
  color?: string;
  label: string;
}) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
        <circle cx="32" cy="32" r="27" stroke="var(--sk-border, #2a2a35)" strokeWidth="4" />
        <circle
          cx="32"
          cy="32"
          r="27"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="170"
          className="animate-sk-ring"
        />
      </svg>
      <span className="absolute font-mono text-[15px] font-semibold" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

export function DashedBoxIcon({ size = 34, color = "var(--sk-muted, #6f6f7e)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="32" height="32" rx="7" stroke={color} strokeWidth="2" strokeDasharray="6 5" />
    </svg>
  );
}

export function InboxGlyph({ size = 58 }: { size?: number }) {
  return (
    <div className="animate-sk-float" aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 58 58" fill="none">
        <rect
          x="7"
          y="7"
          width="44"
          height="44"
          rx="10"
          stroke="var(--sk-muted, #6f6f7e)"
          strokeWidth="2.2"
          strokeDasharray="7 6"
          className="animate-sk-dash"
        />
        <line x1="29" y1="20" x2="29" y2="38" stroke="#8b7cff" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="20" y1="29" x2="38" y2="29" stroke="#8b7cff" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function ValidationWarningIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="7" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function ConversionFailIcon({ size = 22, color = "#f7768e" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 6 L44 40 H4 Z" stroke={color} strokeWidth="3" strokeLinejoin="round" />
      <line x1="24" y1="19" x2="24" y2="29" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="34" r="1.8" fill={color} />
    </svg>
  );
}
