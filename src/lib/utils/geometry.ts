/**
 * Convert an angle (degrees, counter-clockwise from 12 o'clock) into
 * cartesian coordinates on a circle of radius `r` centered at (cx, cy).
 */
export function polar(
  deg: number,
  cx = 150,
  cy = 150,
  r = 118,
): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180;
  return {
    x: cx - r * Math.sin(rad),
    y: cy - r * Math.cos(rad),
  };
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
