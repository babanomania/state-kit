"use client";

import { useEffect, useRef } from "react";

/** Bespoke mini-icons for the hero state wall — decorative only, distinct scale from the real icon set. */

function SpinIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 46 46" fill="none" className="animate-sk-spin">
      <circle cx="23" cy="23" r="18" className="stroke-[#e7e7e2] dark:stroke-[var(--sw-bordersoft)]" strokeWidth="3.2" />
      <path d="M23 5 a18 18 0 0 1 18 18" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" className="animate-sk-pulse">
      <path d="M24 6 L44 40 H4 Z" stroke={color} strokeWidth="2.8" strokeLinejoin="round" />
      <line x1="24" y1="19" x2="24" y2="29" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="24" cy="34" r="1.8" fill={color} />
    </svg>
  );
}

function EmptyBoxIcon({ withLines = true, float2 = false }: { withLines?: boolean; float2?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 50 50" fill="none" className={float2 ? "animate-sk-float2" : "animate-sk-float"}>
      <rect x="6" y="6" width="38" height="38" rx="8" className="stroke-[#9a9aa2] dark:stroke-[var(--sw-faint)]" strokeWidth="2.2" strokeDasharray="6 5" />
      {withLines && (
        <>
          <line x1="25" y1="18" x2="25" y2="32" stroke="#8b7cff" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="18" y1="25" x2="32" y2="25" stroke="#8b7cff" strokeWidth="2.4" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function SignalIcon({ heights, dim }: { heights: [number, number, number]; dim: [boolean, boolean, boolean] }) {
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 22 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[5px] animate-sk-signal rounded-sm"
          style={{
            height: h,
            background: dim[i] ? "var(--sw-bar)" : "#4fd6e0",
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

function RetryIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 46 46" fill="none" className="animate-sk-spin" style={{ animationDuration: "2.4s" }}>
      <path d="M38 23 a15 15 0 1 1 -4.4 -10.6" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
      <path d="M38 8 V16 H30" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckPopIcon() {
  return (
    <div className="relative h-6 w-6">
      <div className="absolute inset-0 animate-sk-pop rounded-full bg-[#5ec98a]/[0.16]" />
      <svg width="24" height="24" viewBox="0 0 54 54" fill="none" className="relative">
        <circle cx="27" cy="27" r="20" stroke="#5ec98a" strokeWidth="3" opacity="0.35" />
        <path d="M18 28 L25 35 L37 21" stroke="#5ec98a" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" className="animate-sk-draw" />
      </svg>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
      <circle cx="19" cy="19" r="12" className="stroke-[#1a1a1d] dark:stroke-[var(--sw-text)]" strokeWidth="2.8" />
      <line x1="28" y1="28" x2="38" y2="38" className="stroke-[#1a1a1d] dark:stroke-[var(--sw-text)]" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

function GlitchIcon() {
  return (
    <div className="flex gap-px">
      {["4", "0", "4"].map((c, i) => (
        <span
          key={i}
          className="animate-sk-glitch text-[19px] font-bold"
          style={{ color: i === 1 ? "#8b7cff" : "var(--sw-text)", animationDelay: `${i * 0.3}s` }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function LockIcon({ withFill = true, float2 = false }: { withFill?: boolean; float2?: boolean }) {
  return (
    <svg width="22" height="24" viewBox="0 0 52 58" fill="none" className={float2 ? "animate-sk-float2" : "animate-sk-lock"}>
      <path d="M16 26 V17 a10 10 0 0 1 20 0 V26" stroke="#4fd6e0" strokeWidth="3" strokeLinecap="round" />
      <rect x="10" y="26" width="32" height="26" rx="6" stroke="#4fd6e0" strokeWidth="3" />
      {withFill && <circle cx="26" cy="37" r="3" fill="#4fd6e0" />}
    </svg>
  );
}

function ForbiddenLockIcon() {
  return (
    <svg width="22" height="24" viewBox="0 0 52 58" fill="none">
      <path d="M16 26 V17 a10 10 0 0 1 20 0 V26" stroke="#f7768e" strokeWidth="3" strokeLinecap="round" />
      <rect x="10" y="26" width="32" height="26" rx="6" stroke="#f7768e" strokeWidth="3" />
    </svg>
  );
}

function ShimmerIcon({ secondDelay }: { secondDelay: number }) {
  const grad = {
    background: "linear-gradient(90deg,var(--sw-elev),var(--sw-bar),var(--sw-elev))",
    backgroundSize: "200% 100%",
  };
  return (
    <div className="flex w-full flex-col gap-1 px-3">
      <div className="h-[5px] animate-sk-shimmer rounded-sm" style={grad} />
      <div className="h-[5px] w-[70%] animate-sk-shimmer rounded-sm" style={{ ...grad, animationDelay: `${secondDelay}s` }} />
    </div>
  );
}

function RingIcon({ color, animated, dashoffset }: { color: string; animated: boolean; dashoffset?: number }) {
  return (
    <svg width="24" height="24" viewBox="0 0 64 64" fill="none" className="-rotate-90">
      <circle cx="32" cy="32" r="27" stroke="var(--sw-bar)" strokeWidth="5" />
      <circle
        cx="32"
        cy="32"
        r="27"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="170"
        strokeDashoffset={animated ? undefined : dashoffset}
        className={animated ? "animate-sk-ring" : undefined}
      />
    </svg>
  );
}

function DualGearIcon({ outerColor, innerColor, outerDuration, innerDuration }: { outerColor: string; innerColor: string; outerDuration: string; innerDuration: string }) {
  return (
    <div className="relative h-[26px] w-[26px]">
      <svg width="26" height="26" viewBox="0 0 60 60" fill="none" style={{ animation: `sk-spin ${outerDuration} linear infinite` }}>
        <circle cx="30" cy="30" r="22" stroke={outerColor} strokeWidth="3" strokeDasharray="5 7" />
      </svg>
      <svg width="26" height="26" viewBox="0 0 60 60" fill="none" className="absolute inset-0" style={{ animation: `sk-spin ${innerDuration} linear infinite reverse` }}>
        <circle cx="30" cy="30" r="12" stroke={`${innerColor}80`} strokeWidth="3" strokeDasharray="4 6" />
      </svg>
    </div>
  );
}

function DualOrbitDotsIcon() {
  return (
    <div className="relative h-6 w-6">
      <div className="absolute inset-0 animate-sk-spin" style={{ animationDuration: "1.6s" }}>
        <div className="absolute left-1/2 top-[-1px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#8b7cff]" />
      </div>
      <div className="absolute inset-1.5 animate-sk-spin-rev" style={{ animationDuration: "1.1s" }}>
        <div className="absolute left-1/2 top-[-1px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#4fd6e0]" />
      </div>
    </div>
  );
}

function TypingIcon({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-[7px] w-[7px] animate-sk-pulse rounded-full bg-[#8b7cff]" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  );
}

function WaveIcon() {
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 22 }}>
      {[0, 0.12, 0.24, 0.36].map((delay, i) => (
        <div key={i} className="w-1 animate-sk-bar rounded-full bg-[#4fd6e0]" style={{ height: "100%", animationDelay: `${delay}s` }} />
      ))}
    </div>
  );
}

function ValidationIcon() {
  return (
    <div className="w-9 animate-sk-glitch" style={{ animationDuration: "2.8s" }}>
      <div className="h-[18px] rounded-[5px] border-[1.5px] border-[#f7768e] bg-[#f7768e]/[0.08]" />
    </div>
  );
}

function ProgressIcon() {
  return (
    <div className="h-[5px] w-full overflow-hidden rounded-full" style={{ background: "var(--sw-elev)" }}>
      <div className="h-full w-[35%] animate-sk-bar rounded-full bg-gradient-to-r from-[#8b7cff] to-[#4fd6e0]" />
    </div>
  );
}

function DashboardBarsIcon() {
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 20, width: 46 }}>
      {[40, 75, 90].map((h, i) => (
        <div key={i} className="flex-1 animate-sk-bar rounded-sm" style={{ height: `${h}%`, background: "var(--sw-bar2)", animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  );
}

const TILES: { label: string; icon: React.ReactNode }[] = [
  { label: "Loading", icon: <SpinIcon color="#8b7cff" /> },
  { label: "Error", icon: <AlertIcon color="#f7768e" /> },
  { label: "Empty", icon: <EmptyBoxIcon /> },
  { label: "Offline", icon: <SignalIcon heights={[9, 15, 21]} dim={[false, false, true]} /> },
  { label: "Retry", icon: <RetryIcon color="#8b7cff" /> },
  { label: "Success", icon: <CheckPopIcon /> },
  { label: "Search", icon: <SearchIcon /> },
  { label: "Not Found", icon: <GlitchIcon /> },
  { label: "Access", icon: <LockIcon /> },
  { label: "Skeleton", icon: <ShimmerIcon secondDelay={0.2} /> },
  { label: "Rate Limit", icon: <RingIcon color="#e0c060" animated /> },
  { label: "Maintenance", icon: <DualGearIcon outerColor="#e0c060" innerColor="#e0c060" outerDuration="6s" innerDuration="4s" /> },
  { label: "Typing", icon: <TypingIcon count={3} /> },
  { label: "Wave", icon: <WaveIcon /> },
  { label: "Reconnect", icon: <SpinIcon color="#4fd6e0" /> },
  { label: "Server 500", icon: <AlertIcon color="#e0c060" /> },
  { label: "Sync", icon: <SpinIcon color="#8b7cff" /> },
  { label: "Timeout", icon: <RetryIcon color="#4fd6e0" /> },
  { label: "No Results", icon: <EmptyBoxIcon withLines={false} /> },
  { label: "Session", icon: <LockIcon withFill={false} float2 /> },
  { label: "Stale Data", icon: <ShimmerIcon secondDelay={0.3} /> },
  { label: "Completed", icon: <CheckPopIcon /> },
  { label: "Forbidden", icon: <ForbiddenLockIcon /> },
  { label: "Quota", icon: <RingIcon color="#e0c060" animated={false} dashoffset={120} /> },
  { label: "Orbit", icon: <DualOrbitDotsIcon /> },
  { label: "No Signal", icon: <SignalIcon heights={[8, 14, 20]} dim={[false, true, true]} /> },
  { label: "Validation", icon: <ValidationIcon /> },
  { label: "Progress", icon: <ProgressIcon /> },
  { label: "Inbox Zero", icon: <EmptyBoxIcon withLines={false} /> },
  { label: "Dashboard", icon: <DashboardBarsIcon /> },
  { label: "Partial Fail", icon: <AlertIcon color="#f7768e" /> },
  { label: "Expired", icon: <LockIcon float2 /> },
  { label: "Pending", icon: <TypingIcon count={2} /> },
  { label: "Uploading", icon: <RingIcon color="#8b7cff" animated /> },
  { label: "Done", icon: <CheckPopIcon /> },
];

export function StateWall() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiles = ref.current?.querySelectorAll<HTMLElement>("[data-flicker]");
    tiles?.forEach((el) => {
      const dur = (3.4 + Math.random() * 4.2).toFixed(2);
      const delay = (-Math.random() * 8).toFixed(2);
      el.style.animation = `sk-flicker ${dur}s ease-in-out ${delay}s infinite`;
      el.style.willChange = "opacity";
    });
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 grid grid-cols-7 auto-rows-fr gap-2.5 p-4 [--sw-bar:#d2d2cd] [--sw-bordersoft:rgba(0,0,0,0.13)] [--sw-elev:#eceae6] [--sw-faint:#9a9aa2] [--sw-text:#1a1a1d] dark:[--sw-bar:#33333d] dark:[--sw-bordersoft:rgba(255,255,255,0.1)] dark:[--sw-elev:#15151d] dark:[--sw-faint:#6f6f7e] dark:[--sw-text:#e9e9ef] [--sw-bar2:#e4e4df] dark:[--sw-bar2:#26262f]"
    >
      {TILES.map((tile, i) => (
        <div
          key={i}
          data-flicker
          className="flex flex-col items-center justify-center gap-1.5 rounded-[10px] border border-black/[0.08] bg-white dark:border-white/[0.07] dark:bg-[#0d0d12]"
        >
          {tile.icon}
          <span className="font-mono text-[9px] text-[#9a9aa2] dark:text-[#6f6f7e]">{tile.label}</span>
        </div>
      ))}
    </div>
  );
}
