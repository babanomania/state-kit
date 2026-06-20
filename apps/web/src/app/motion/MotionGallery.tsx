"use client";

import { useState } from "react";

type MotionItem = {
  key: string;
  name: string;
  tag: string;
  desc: string;
};

const ITEMS: MotionItem[] = [
  { key: "spin", name: "Spin", tag: "Loading", desc: "Continuous rotation with a gradient arc — the baseline loading primitive." },
  { key: "orbit", name: "Orbit", tag: "Loading", desc: "Counter-rotating rings at different radii and speeds create depth." },
  { key: "shimmer", name: "Shimmer", tag: "Skeleton", desc: "A light sweep travels across placeholders to imply incoming content." },
  { key: "progress", name: "Indeterminate sweep", tag: "Progress", desc: "A clipped gradient slides edge to edge on an unknown duration." },
  { key: "pulse", name: "Pulse", tag: "Loading", desc: "Opacity and scale breathe in a staggered three-dot sequence." },
  { key: "wave", name: "Wave", tag: "Loading", desc: "Equalizer bars scale on the Y axis with offset delays." },
  { key: "signal", name: "Signal degradation", tag: "Offline", desc: "Connection bars drop out in sequence as signal is lost." },
  { key: "glitch", name: "Glitch assemble", tag: "404", desc: "Digits jitter and snap into place, as if rebuilt from fragments." },
  { key: "lock", name: "Lock spring", tag: "Security", desc: "The shackle settles with a springy vertical bounce on close." },
  { key: "fail", name: "Row failure", tag: "Partial", desc: "Failed rows tint red and pulse while their siblings stay calm." },
  { key: "gears", name: "Maintenance", tag: "System", desc: "Dashed rings counter-rotate to signal work in progress." },
  { key: "countdown", name: "Retry countdown", tag: "Rate limit", desc: "A ring depletes across the retry-after window." },
  { key: "float", name: "Float", tag: "Empty", desc: "The empty glyph drifts gently — present, not idle." },
  { key: "reveal", name: "Staggered reveal", tag: "Success", desc: "Rows fade up in sequence the moment data resolves." },
  { key: "streak", name: "Aurora streak", tag: "Theme", desc: "A soft light streak sweeps across themed gradient surfaces." },
  { key: "check", name: "Checkmark draw-on", tag: "Success", desc: "The tick strokes itself on inside a popping confirmation ring." },
  { key: "ringfill", name: "Progress ring fill", tag: "Progress", desc: "A determinate ring draws to its target percentage and holds." },
  { key: "spring", name: "Spring toast", tag: "Transition", desc: "A toast overshoots and settles with springy physics on entrance." },
  { key: "shake", name: "Validation shake", tag: "Form", desc: "An invalid field shakes horizontally to draw the eye to the error." },
  { key: "confetti", name: "Confetti burst", tag: "Success", desc: "Celebratory shards arc outward when a task completes." },
  { key: "type", name: "Typewriter", tag: "Streaming", desc: "Text types in character by character with a blinking caret." },
  { key: "odometer", name: "Odometer roll", tag: "Stats", desc: "Digits roll vertically to their final value like a counter." },
];

function MotionVisual({ motionKey }: { motionKey: string }) {
  switch (motionKey) {
    case "spin":
      return (
        <svg width="52" height="52" viewBox="0 0 56 56" fill="none" className="animate-sk-spin">
          <circle cx="28" cy="28" r="22" stroke="#2a2a35" strokeWidth="3.5" />
          <path d="M28 6 a22 22 0 0 1 22 22" stroke="#8b7cff" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "orbit":
      return (
        <div className="relative h-[82px] w-[82px]">
          <div className="absolute inset-0 animate-sk-orbit-a">
            <div className="absolute left-1/2 top-[-3px] h-[11px] w-[11px] -translate-x-1/2 rounded-full bg-[#8b7cff] shadow-[0_0_12px_#8b7cff]" />
          </div>
          <div className="absolute inset-4 animate-sk-orbit-a-rev">
            <div className="absolute left-1/2 top-[-3px] h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[#4fd6e0] shadow-[0_0_10px_#4fd6e0]" />
          </div>
          <div className="absolute inset-[34px] rounded-full bg-[#2a2a35]" />
        </div>
      );
    case "shimmer":
      return (
        <div className="flex w-[200px] flex-col gap-[11px]">
          {["80%", "100%", "60%"].map((w, i) => (
            <div
              key={w}
              style={{ width: w, animationDelay: `${i * 0.15}s` }}
              className="h-3 rounded bg-gradient-to-r from-[#15151c] via-[#2a2a35] to-[#15151c] bg-[length:200%_100%] animate-sk-shimmer"
            />
          ))}
        </div>
      );
    case "progress":
      return (
        <div className="relative h-2 w-[200px] overflow-hidden rounded-full bg-[#15151c]">
          <div className="absolute left-0 top-0 h-full w-[32%] rounded-full bg-gradient-to-r from-[#8b7cff] to-[#4fd6e0] animate-sk-prog" />
        </div>
      );
    case "pulse":
      return (
        <div className="flex gap-3">
          {[0, 0.2, 0.4].map((delay) => (
            <div
              key={delay}
              style={{ animationDelay: `${delay}s` }}
              className="h-4 w-4 rounded-full bg-[#8b7cff] animate-sk-pulse"
            />
          ))}
        </div>
      );
    case "wave":
      return (
        <div className="flex h-[52px] items-center gap-[7px]">
          {[0, 0.12, 0.24, 0.36, 0.48].map((delay) => (
            <div
              key={delay}
              style={{ animationDelay: `${delay}s` }}
              className="h-full w-2 rounded-full bg-[#4fd6e0] animate-sk-bar"
            />
          ))}
        </div>
      );
    case "signal":
      return (
        <div className="flex h-[46px] items-end gap-1.5">
          {[16, 26, 36, 46].map((h, i) => (
            <div
              key={h}
              style={{ height: h, animationDelay: `${i * 0.3}s` }}
              className="w-[11px] rounded-sm bg-[#4fd6e0] animate-sk-signal"
            />
          ))}
        </div>
      );
    case "glitch":
      return (
        <div className="flex gap-1">
          {["4", "0", "4"].map((ch, i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.3}s` }}
              className={`text-[46px] font-bold animate-sk-glitch ${i === 1 ? "text-[#8b7cff]" : "text-[#e9e9ef]"}`}
            >
              {ch}
            </span>
          ))}
        </div>
      );
    case "lock":
      return (
        <div className="animate-sk-lock">
          <svg width="48" height="54" viewBox="0 0 52 58" fill="none">
            <path d="M16 26 V17 a10 10 0 0 1 20 0 V26" stroke="#4fd6e0" strokeWidth="2.8" strokeLinecap="round" />
            <rect x="10" y="26" width="32" height="26" rx="6" stroke="#4fd6e0" strokeWidth="2.8" />
            <circle cx="26" cy="37" r="3" fill="#4fd6e0" />
            <line x1="26" y1="39" x2="26" y2="45" stroke="#4fd6e0" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>
      );
    case "fail":
      return (
        <div className="flex w-[200px] flex-col gap-2">
          <div className="h-3.5 rounded-md bg-[#13131a]" />
          <div className="h-3.5 rounded-md border border-[#f7768e]/[35%] bg-[#f7768e]/[10%] animate-sk-failpulse" />
          <div className="h-3.5 rounded-md bg-[#13131a]" />
          <div
            style={{ animationDelay: "0.9s" }}
            className="h-3.5 rounded-md border border-[#f7768e]/[35%] bg-[#f7768e]/[10%] animate-sk-failpulse"
          />
        </div>
      );
    case "gears":
      return (
        <div className="relative h-[60px] w-[60px]">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="animate-sk-spin-slow">
            <circle cx="30" cy="30" r="22" stroke="#e0c060" strokeWidth="2.4" strokeDasharray="5 7" />
          </svg>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            className="absolute inset-0 animate-sk-spin-rev-slow"
          >
            <circle cx="30" cy="30" r="13" stroke="#e0c06080" strokeWidth="2.4" strokeDasharray="4 6" />
          </svg>
        </div>
      );
    case "countdown":
      return (
        <div className="relative flex h-[62px] w-[62px] items-center justify-center">
          <svg width="62" height="62" viewBox="0 0 64 64" fill="none" className="-rotate-90">
            <circle cx="32" cy="32" r="27" stroke="#2a2a35" strokeWidth="4" />
            <circle
              cx="32"
              cy="32"
              r="27"
              stroke="#e0c060"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="170"
              className="animate-sk-ring"
            />
          </svg>
          <span className="absolute font-mono text-sm font-semibold text-[#e0c060]">429</span>
        </div>
      );
    case "float":
      return (
        <div className="animate-sk-float">
          <svg width="56" height="56" viewBox="0 0 58 58" fill="none">
            <rect x="7" y="7" width="44" height="44" rx="10" stroke="#6f6f7e" strokeWidth="2.2" strokeDasharray="7 6" className="animate-sk-dash" />
            <line x1="29" y1="20" x2="29" y2="38" stroke="#8b7cff" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="20" y1="29" x2="38" y2="29" stroke="#8b7cff" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </div>
      );
    case "reveal":
      return (
        <div className="flex w-[200px] flex-col gap-[9px]">
          {[0, 0.25, 0.5].map((delay) => (
            <div key={delay} style={{ animationDelay: `${delay}s` }} className="flex items-center gap-2.5 animate-sk-fadeloop">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#8b7cff] to-[#4fd6e0]" />
              <div className="h-[9px] flex-1 rounded bg-[#33333d]" />
            </div>
          ))}
        </div>
      );
    case "streak":
      return (
        <div className="relative h-24 w-[200px] overflow-hidden rounded-xl border border-[#8b7cff]/25 bg-gradient-to-br from-[#8b7cff]/[18%] to-[#4fd6e0]/[12%]">
          <div className="absolute left-0 top-0 h-full w-1/2 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[45%] to-transparent animate-sk-streak" />
        </div>
      );
    case "check":
      return (
        <div className="relative h-[62px] w-[62px]">
          <div className="absolute inset-0 rounded-full bg-[#5ec98a]/[16%] animate-sk-pop" />
          <svg width="62" height="62" viewBox="0 0 62 62" fill="none" className="relative">
            <circle cx="31" cy="31" r="22" stroke="#5ec98a" strokeWidth="3" strokeDasharray="138" opacity="0.35" />
            <path
              d="M21 32 L28 39 L42 24"
              stroke="#5ec98a"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="36"
              className="animate-sk-draw"
            />
          </svg>
        </div>
      );
    case "ringfill":
      return (
        <div className="relative flex h-16 w-16 items-center justify-center">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="-rotate-90">
            <circle cx="32" cy="32" r="27" stroke="#2a2a35" strokeWidth="5" />
            <circle
              cx="32"
              cy="32"
              r="27"
              stroke="#8b7cff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="170"
              className="animate-sk-ringfill"
            />
          </svg>
          <span className="absolute font-mono text-sm font-semibold text-[#8b7cff]">75%</span>
        </div>
      );
    case "spring":
      return (
        <div className="flex items-center gap-[11px] rounded-xl border border-white/10 bg-[#13131a] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.22)] animate-sk-spring">
          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#5ec98a]/[18%]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13 L10 18 L19 7" stroke="#5ec98a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[13px] font-medium text-[#e9e9ef]">Changes saved</span>
        </div>
      );
    case "shake":
      return (
        <div className="w-[208px] animate-sk-shake">
          <div className="flex h-[38px] items-center rounded-lg border-[1.5px] border-[#f7768e] bg-[#f7768e]/[8%] px-3 font-mono text-xs text-[#f7768e]">
            invalid@
          </div>
          <div className="mt-[7px] text-[11px] text-[#f7768e]">Enter a valid email address</div>
        </div>
      );
    case "confetti":
      return (
        <div className="relative flex h-24 w-[120px] items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b7cff]/[16%]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 13 L10 18 L19 7" stroke="#8b7cff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {[
            { top: 8, left: 24, color: "#8b7cff", delay: 0 },
            { top: 6, left: 60, color: "#4fd6e0", delay: 0.25 },
            { top: 10, left: 84, color: "#f7768e", delay: 0.5 },
            { top: 4, left: 44, color: "#e0c060", delay: 0.75 },
          ].map((c) => (
            <div
              key={c.left}
              style={{ top: c.top, left: c.left, background: c.color, animationDelay: `${c.delay}s` }}
              className="absolute h-[11px] w-[7px] rounded-sm animate-sk-confetti"
            />
          ))}
        </div>
      );
    case "type":
      return (
        <div className="flex items-center font-mono text-[15px] text-[#e9e9ef]">
          <div className="animate-sk-type overflow-hidden whitespace-nowrap">Generating answer</div>
          <span className="ml-[3px] h-[18px] w-2 bg-[#8b7cff] animate-sk-caret" />
        </div>
      );
    case "odometer":
      return (
        <div className="flex items-end gap-0.5 font-mono font-bold">
          <span className="text-3xl text-[#e9e9ef]">$</span>
          <div className="h-[30px] overflow-hidden">
            <div className="animate-sk-roll">
              {["0", "3", "8"].map((d) => (
                <div key={d} className="h-[30px] text-3xl leading-[30px] text-[#e9e9ef]">
                  {d}
                </div>
              ))}
            </div>
          </div>
          <span className="text-3xl text-[#e9e9ef]">,200</span>
        </div>
      );
    default:
      return null;
  }
}

export function MotionGallery() {
  const [paused, setPaused] = useState(false);

  return (
    <main className="min-h-screen bg-[#07070a] px-10 py-16 font-sans text-[#e9e9ef]">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">StateKit — Motion Gallery</h1>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="rounded-lg border border-white/10 bg-[#101016] px-3.5 py-2 text-[13px]"
        >
          {paused ? "Play all" : "Pause all"}
        </button>
      </header>

      <section className={`grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 ${paused ? "sk-paused" : ""}`}>
        {ITEMS.map((item) => (
          <div key={item.key} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d12]">
            <div
              className="flex h-[184px] items-center justify-center overflow-hidden border-b border-white/[0.06] p-6"
              style={{ background: "radial-gradient(ellipse at 50% 38%, #131319, #0a0a0e)" }}
            >
              <MotionVisual motionKey={item.key} />
            </div>
            <div className="p-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[15px] font-semibold">{item.name}</span>
                <span className="rounded-md border border-white/[0.07] px-2 py-1 font-mono text-[10px] text-[#6f6f7e]">
                  {item.tag}
                </span>
              </div>
              <div className="text-[12.5px] leading-relaxed text-[#9c9caa]">{item.desc}</div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
