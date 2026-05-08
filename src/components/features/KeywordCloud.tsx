import { useMemo } from 'react';
import type { KeywordEntry } from '@/types';

const VW = 420;
const VH = 340;
const GAP = 10;

function hits(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number,
) {
  return (
    Math.abs(ax - bx) < (aw + bw) / 2 + GAP &&
    Math.abs(ay - by) < (ah + bh) / 2 + GAP
  );
}

function spiral(
  w: number,
  h: number,
  placed: { x: number; y: number; w: number; h: number }[],
): { x: number; y: number } | null {
  const cx = VW / 2;
  const cy = VH / 2;

  for (let t = 0; t < 1200; t++) {
    const angle = t * 0.25;
    const radius = t * 2.0;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle) * 1.0; // 수평으로 약간 납작하게

    if (x - w / 2 < 4 || x + w / 2 > VW - 4) continue;
    if (y - h / 2 < 4 || y + h / 2 > VH - 4) continue;

    if (!placed.some(p => hits(x, y, w, h, p.x, p.y, p.w, p.h))) {
      placed.push({ x, y, w, h });
      return { x, y };
    }
  }
  return null;
}

interface KeywordCloudProps {
  keywords: KeywordEntry[];
}

export default function KeywordCloud({ keywords }: KeywordCloudProps) {
  const positions = useMemo(() => {
    const placed: { x: number; y: number; w: number; h: number }[] = [];
    return keywords.map((k) => {
      const w = k.text.length * k.size * 0.92;
      const h = k.size * 1.4;
      return spiral(w, h, placed);
    });
  }, [keywords]);

  return (
    <div
      className="relative overflow-hidden rounded-[18px] border border-white/5 bg-black/20"
      style={{ height: VH }}
    >
      {keywords.map((k, i) => {
        const pos = positions[i];
        if (!pos) return null;
        return (
          <span
            key={`${k.text}-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-bold tracking-[-0.01em]"
            style={{
              left: `${(pos.x / VW) * 100}%`,
              top: `${(pos.y / VH) * 100}%`,
              fontSize: k.size,
              color: k.sentiment === 'negative' ? '#ef5a5a' : '#6cb6ff',
            }}
          >
            {k.text}
          </span>
        );
      })}
    </div>
  );
}
