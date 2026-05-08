import { GAUGE_GRADIENT_RGB } from '@/constants/colors';

type RGB = readonly [number, number, number];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpRGB(c1: RGB, c2: RGB, t: number): string {
  const r = Math.round(lerp(c1[0], c2[0], t));
  const g = Math.round(lerp(c1[1], c2[1], t));
  const b = Math.round(lerp(c1[2], c2[2], t));
  return `rgb(${r},${g},${b})`;
}

/**
 * Returns the gauge color at position `t` in [0, 1].
 *  - t=0   → green
 *  - t=0.5 → yellow
 *  - t=1   → red
 * Smoothly interpolates between the three stops.
 */
export function gaugeColorAt(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  if (clamped < 0.5) {
    return lerpRGB(GAUGE_GRADIENT_RGB.start, GAUGE_GRADIENT_RGB.middle, clamped / 0.5);
  }
  return lerpRGB(GAUGE_GRADIENT_RGB.middle, GAUGE_GRADIENT_RGB.end, (clamped - 0.5) / 0.5);
}
