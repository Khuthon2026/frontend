import { useEffect, useMemo, useRef } from 'react';
import { gaugeColorAt } from '@/lib/utils/color';
import { polar } from '@/lib/utils/geometry';

export interface GaugeSegment {
  d: string;
  color: string;
}

export interface UseGaugeRevealOptions {
  /** Number of micro-arcs that make up the ring */
  count?: number;
  /** Degree overlap on each side of every arc to mask seams */
  overlapDeg?: number;
  /** Total reveal duration in ms (for the visible portion) */
  durationMs?: number;
}

export interface UseGaugeRevealResult {
  segments: GaugeSegment[];
  segRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
  startCapRef: React.MutableRefObject<SVGCircleElement | null>;
  endCapRef: React.MutableRefObject<SVGCircleElement | null>;
  endCap: { x: number; y: number; color: string };
}

/**
 * Builds the circular gauge as N micro-arcs colored along a green→yellow→red
 * gradient, then animates them in CCW order from 12 o'clock up to the given
 * `ratio` (0..1) of the full circle. Round caps are placed at the start and
 * the dynamic end of the revealed portion.
 */
export function useGaugeReveal(
  ratio: number,
  playKey: number | string,
  {
    count = 96,
    overlapDeg = 0.45,
    durationMs = 1700,
  }: UseGaugeRevealOptions = {},
): UseGaugeRevealResult {
  const segments = useMemo<GaugeSegment[]>(() => {
    const arcDeg = 360 / count;
    const arr: GaugeSegment[] = [];
    for (let i = 0; i < count; i++) {
      const a1 = i * arcDeg - overlapDeg;
      const a2 = (i + 1) * arcDeg + overlapDeg;
      const p1 = polar(a1);
      const p2 = polar(a2);
      arr.push({
        d: `M ${p1.x.toFixed(3)} ${p1.y.toFixed(3)} A 118 118 0 0 0 ${p2.x.toFixed(3)} ${p2.y.toFixed(3)}`,
        color: gaugeColorAt(i / (count - 1)),
      });
    }
    return arr;
  }, [count, overlapDeg]);

  const endCap = useMemo(() => {
    const angle = ratio * 360;
    const pt = polar(angle);
    return { x: pt.x, y: pt.y, color: gaugeColorAt(ratio) };
  }, [ratio]);

  const segRefs = useRef<(SVGPathElement | null)[]>([]);
  const startCapRef = useRef<SVGCircleElement | null>(null);
  const endCapRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const visible = ratio * count;
    const intCount = Math.floor(visible);
    const partial = visible - intCount;
    const interval = visible > 0 ? durationMs / visible : 0;

    // reset
    segRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transition = 'none';
      el.style.opacity = '0';
    });
    if (startCapRef.current) {
      startCapRef.current.style.transition = 'none';
      startCapRef.current.style.opacity = '0';
    }
    if (endCapRef.current) {
      endCapRef.current.style.transition = 'none';
      endCapRef.current.style.opacity = '0';
    }

    // force reflow
    void segRefs.current[0]?.getBoundingClientRect();

    const timers: number[] = [];

    // start cap fades in immediately
    if (startCapRef.current) {
      startCapRef.current.style.transition = 'opacity 160ms ease-out';
      startCapRef.current.style.opacity = '1';
    }

    for (let i = 0; i < intCount; i++) {
      const el = segRefs.current[i];
      if (!el) continue;
      const t = window.setTimeout(() => {
        el.style.transition = 'opacity 110ms ease-out';
        el.style.opacity = '1';
      }, i * interval);
      timers.push(t);
    }

    if (partial > 0 && intCount < count) {
      const el = segRefs.current[intCount];
      if (el) {
        const t = window.setTimeout(() => {
          el.style.transition = 'opacity 160ms ease-out';
          el.style.opacity = String(partial);
        }, intCount * interval);
        timers.push(t);
      }
    }

    if (endCapRef.current) {
      const t = window.setTimeout(() => {
        if (!endCapRef.current) return;
        endCapRef.current.style.transition = 'opacity 200ms ease-out';
        endCapRef.current.style.opacity = '1';
      }, Math.max(0, visible * interval - 60));
      timers.push(t);
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [ratio, count, durationMs, playKey, segments]);

  return { segments, segRefs, startCapRef, endCapRef, endCap };
}
