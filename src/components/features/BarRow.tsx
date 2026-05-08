import { useBarFill } from '@/hooks/useBarFill';
import type { BarMetric } from '@/types';

interface BarRowProps {
  bar: BarMetric;
  index: number;
  playKey: number | string;
}

export default function BarRow({ bar, index, playKey }: BarRowProps) {
  const width = useBarFill(bar.pct, 120 + index * 90, playKey);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-[9px] whitespace-nowrap text-[13.5px] font-semibold text-[#d6e0e7]">
          <span
            className="h-[9px] w-[9px] flex-none rounded-full"
            style={{ background: bar.color }}
          />
          {bar.label}
        </span>
        <span
          className="text-[13px] font-semibold text-[#c8d3db]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {Number.isInteger(bar.pct) ? bar.pct : bar.pct.toFixed(1)}%
        </span>
      </div>
      <div className="relative h-[10px] overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 origin-left rounded-full"
          style={{
            width,
            background: bar.trackGradient,
            transition: 'width 1.1s cubic-bezier(.22,.9,.3,1)',
          }}
        />
      </div>
    </div>
  );
}
