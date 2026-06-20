function hexToRgb(hex: string): [number, number, number] | null {
  const v = hex.replace("#", "");
  if (v.length === 3) {
    return [parseInt(v[0] + v[0], 16), parseInt(v[1] + v[1], 16), parseInt(v[2] + v[2], 16)];
  }
  if (v.length === 6) {
    return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
  }
  return null;
}

function parseColor(color: string): [number, number, number] | null {
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) return hexToRgb(color);
  const rgb = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  return null;
}

/** Gradients aren't a valid <color>, so glow/shadow derivation uses the gradient's first stop. */
export function resolveAccentColor(accent: string): string {
  if (!accent.includes("gradient")) return accent;
  const match = accent.match(/#[0-9a-fA-F]{3,6}|rgba?\([^)]+\)/);
  return match ? match[0] : "#8b7cff";
}

export function withAlpha(color: string, percent: number): string {
  const rgb = parseColor(color);
  if (!rgb) return color;
  const [r, g, b] = rgb;
  return `rgba(${r},${g},${b},${percent / 100})`;
}

/** WCAG relative luminance, used to pick readable text against an arbitrary surface/accent color. */
export function relativeLuminance(color: string): number {
  const rgb = parseColor(color);
  if (!rgb) return 0;
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
