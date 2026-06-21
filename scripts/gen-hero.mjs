// Generates assets/hero.svg — the README marketing banner. The full StateKit "state wall"
// (every state, full opacity) sits behind a centered glass card. Run: node scripts/gen-hero.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const W = 1200;
const H = 440;
const PAD = 36;
const COLS = 7;
const ROWS = 5;
const GAP = 10;
const tileW = (W - PAD * 2 - GAP * (COLS - 1)) / COLS;
const tileH = 64;
const gridTop = 44;
// centered glass card geometry (absolute coords)
const cardW = 680;
const cardH = 244;
const cardX = W / 2 - cardW / 2;
const cardY = H / 2 - cardH / 2;

// icon helpers — drawn around a local center (cx) with vertical center ~24 inside the tile body
const ring = (cx, c) =>
  `<circle cx="${cx}" cy="24" r="11" fill="none" stroke="rgba(255,255,255,0.13)" stroke-width="3"/><path d="M ${cx} 13 a 11 11 0 0 1 11 11" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`;
const arc = (cx, c) =>
  `<circle cx="${cx}" cy="24" r="11" fill="none" stroke="rgba(255,255,255,0.13)" stroke-width="3"/><path d="M ${cx} 13 a 11 11 0 1 1 -7.7 2.9" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`;
const alert = (cx, c) =>
  `<path d="M ${cx} 14 L ${cx + 11} 33 H ${cx - 11} Z" fill="none" stroke="${c}" stroke-width="2.4" stroke-linejoin="round"/><line x1="${cx}" y1="22" x2="${cx}" y2="27.5" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/><circle cx="${cx}" cy="30.5" r="1.3" fill="${c}"/>`;
const box = (cx) =>
  `<rect x="${cx - 11}" y="13" width="22" height="22" rx="5" fill="none" stroke="#6f6f7e" stroke-width="2.2" stroke-dasharray="5 4"/>`;
const plusbox = (cx) =>
  `${box(cx)}<line x1="${cx}" y1="19" x2="${cx}" y2="29" stroke="#8b7cff" stroke-width="2.2" stroke-linecap="round"/><line x1="${cx - 5}" y1="24" x2="${cx + 5}" y2="24" stroke="#8b7cff" stroke-width="2.2" stroke-linecap="round"/>`;
const signal = (cx, dim) =>
  `<rect x="${cx - 9}" y="26" width="5" height="8" rx="2" fill="#4fd6e0"/><rect x="${cx - 2}" y="21" width="5" height="13" rx="2" fill="${dim ? "#6f6f7e" : "#4fd6e0"}"/><rect x="${cx + 5}" y="16" width="5" height="18" rx="2" fill="#6f6f7e"/>`;
const check = (cx) =>
  `<circle cx="${cx}" cy="24" r="11" fill="none" stroke="#5ec98a" stroke-width="2.2" opacity="0.45"/><path d="M ${cx - 5} 24 l 4 4 l 7.5 -8.5" fill="none" stroke="#5ec98a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
const lock = (cx, c) =>
  `<rect x="${cx - 9}" y="22" width="18" height="14" rx="3.5" fill="none" stroke="${c}" stroke-width="2.4"/><path d="M ${cx - 5} 22 v-4 a5 5 0 0 1 10 0 v4" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>`;
const search = (cx) =>
  `<circle cx="${cx - 3}" cy="21" r="8" fill="none" stroke="#e9e9ef" stroke-width="2.4"/><line x1="${cx + 2.7}" y1="26.7" x2="${cx + 9}" y2="33" stroke="#e9e9ef" stroke-width="2.4" stroke-linecap="round"/>`;
const text404 = (cx) =>
  `<text x="${cx}" y="30" text-anchor="middle" font-family="ui-monospace,monospace" font-size="16" font-weight="700" fill="#8b7cff">404</text>`;
const gear = (cx, c) => `<circle cx="${cx}" cy="24" r="11" fill="none" stroke="${c}" stroke-width="2.6" stroke-dasharray="4 5"/>`;
const dots = (cx, n, c = "#8b7cff") => {
  const xs = n === 3 ? [cx - 7, cx, cx + 7] : [cx - 4, cx + 4];
  return xs.map((x) => `<circle cx="${x}" cy="24" r="3" fill="${c}"/>`).join("");
};
const eq = (cx) => {
  const hs = [12, 18, 14, 18];
  return hs.map((h, i) => `<rect x="${cx - 9 + i * 5.3}" y="${32 - h}" width="3" height="${h}" rx="1.5" fill="#4fd6e0"/>`).join("");
};
const dashbars = (cx) => {
  const hs = [9, 14, 18];
  return hs.map((h, i) => `<rect x="${cx - 9 + i * 7}" y="${32 - h}" width="5" height="${h}" rx="1.5" fill="#e0c060"/>`).join("");
};
const progress = (cx) =>
  `<rect x="${cx - 16}" y="21.5" width="32" height="5" rx="2.5" fill="rgba(255,255,255,0.12)"/><rect x="${cx - 16}" y="21.5" width="13" height="5" rx="2.5" fill="url(#brand)"/>`;
const shimmer = (cx) =>
  `<rect x="${cx - 15}" y="20" width="30" height="4.5" rx="2" fill="rgba(255,255,255,0.14)"/><rect x="${cx - 15}" y="28" width="20" height="4.5" rx="2" fill="rgba(255,255,255,0.09)"/>`;
const valrect = (cx) =>
  `<rect x="${cx - 12}" y="18" width="24" height="13" rx="3" fill="rgba(247,118,142,0.08)" stroke="#f7768e" stroke-width="1.5"/>`;

// 35 states, mirroring the live StateWall order
const TILES = [
  ["Loading", ring, "#8b7cff"], ["Error", alert, "#f7768e"], ["Empty", plusbox], ["Offline", signal, false],
  ["Retry", arc, "#8b7cff"], ["Success", check], ["Search", search],
  ["Not Found", text404], ["Access", lock, "#4fd6e0"], ["Skeleton", shimmer], ["Rate Limit", arc, "#e0c060"],
  ["Maintenance", gear, "#e0c060"], ["Typing", (c) => dots(c, 3)], ["Wave", eq],
  ["Reconnect", ring, "#4fd6e0"], ["Server 500", alert, "#e0c060"], ["Sync", ring, "#8b7cff"], ["Timeout", arc, "#4fd6e0"],
  ["No Results", box], ["Session", lock, "#5ec98a"], ["Stale Data", shimmer],
  ["Completed", check], ["Forbidden", lock, "#f7768e"], ["Quota", arc, "#e0c060"], ["Orbit", (c) => dots(c, 2, "#4fd6e0")],
  ["No Signal", signal, true], ["Validation", valrect], ["Progress", progress],
  ["Inbox Zero", box], ["Dashboard", dashbars], ["Partial Fail", alert, "#f7768e"], ["Expired", lock, "#4fd6e0"],
  ["Pending", (c) => dots(c, 2)], ["Uploading", arc, "#8b7cff"], ["Done", check],
];

const tiles = TILES.map(([label, fn, arg], i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = PAD + col * (tileW + GAP);
  const y = gridTop + row * (tileH + GAP);
  const cx = tileW / 2;
  const icon = arg === undefined ? fn(cx) : fn(cx, arg);
  return `<g transform="translate(${x.toFixed(1)},${y})">
    <rect width="${tileW.toFixed(1)}" height="${tileH}" rx="11" fill="#0d0d12" stroke="rgba(255,255,255,0.07)"/>
    ${icon}
    <text x="${cx.toFixed(1)}" y="50" text-anchor="middle" font-family="'JetBrains Mono',ui-monospace,monospace" font-size="9.5" fill="#6f6f7e">${label}</text>
  </g>`;
}).join("\n  ");

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="StateKit — Build Better States. 50+ states, one package.">
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b7cff"/><stop offset="1" stop-color="#4fd6e0"/></linearGradient>
    <linearGradient id="headline" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#b8b8c6"/></linearGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.66"><stop offset="0" stop-color="#07070a" stop-opacity="0"/><stop offset="0.66" stop-color="#07070a" stop-opacity="0.28"/><stop offset="1" stop-color="#07070a" stop-opacity="0.72"/></radialGradient>
    <clipPath id="cardClip"><rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="26"/></clipPath>
    <filter id="frost" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="22" stdDeviation="34" flood-color="#000000" flood-opacity="0.5"/></filter>
  </defs>

  <rect x="0" y="0" width="${W}" height="${H}" rx="24" fill="#07070a"/>

  <!-- full state wall -->
  <g id="wall">
  ${tiles}
  </g>

  <!-- vignette to focus the center -->
  <rect x="0" y="0" width="${W}" height="${H}" rx="24" fill="url(#vignette)"/>

  <!-- frosted-glass card: real backdrop blur of the wall behind the card region -->
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="26" fill="rgba(8,8,11,0.5)" filter="url(#cardShadow)"/>
  <use href="#wall" clip-path="url(#cardClip)" filter="url(#frost)" opacity="0.55"/>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="26" fill="rgba(10,11,16,0.34)"/>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="26" fill="none" stroke="rgba(255,255,255,0.2)"/>
  <rect x="${cardX + 1.2}" y="${cardY + 1.2}" width="${cardW - 2.4}" height="${cardH - 2.4}" rx="25" fill="none" stroke="rgba(255,255,255,0.08)"/>

  <!-- card content -->
  <g transform="translate(${W / 2},${H / 2})">
    <g transform="translate(0,-80)">
      <rect x="-66" y="-9" width="18" height="18" rx="4" fill="url(#brand)" transform="rotate(45 -57 0)"/>
      <text x="-42" y="5" font-family="'Space Grotesk',sans-serif" font-size="20" font-weight="600" fill="url(#brand)">StateKit</text>
    </g>
    <text x="0" y="-20" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-size="56" font-weight="700" letter-spacing="-2" fill="url(#headline)">Build Better States.</text>
    <text x="0" y="22" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-size="16" fill="#9c9caa">Every state your app can hit — loading, empty, error, offline —</text>
    <text x="0" y="44" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-size="16" fill="#9c9caa">animated, themeable, production-ready.</text>
    <g transform="translate(0,86)">
      <rect x="-150" y="-19" width="300" height="38" rx="10" fill="rgba(139,124,255,0.10)" stroke="rgba(139,124,255,0.30)"/>
      <text x="0" y="5" text-anchor="middle" font-family="'JetBrains Mono',ui-monospace,monospace" font-size="14" fill="#b9adff">npm i @babanomania/statekit</text>
    </g>
  </g>
</svg>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "assets", "hero.svg");
writeFileSync(out, svg);
console.log("wrote", out);
