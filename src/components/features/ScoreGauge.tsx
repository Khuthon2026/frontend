import { useGaugeReveal } from '@/hooks/useGaugeReveal';
import { useCountUp } from '@/hooks/useCountUp';

interface ScoreGaugeProps {
  score: number;
  outOf?: number;
  label: string;
  /** Bumping this re-plays the animation */
  playKey: number | string;
}

export default function ScoreGauge({ score, outOf = 5, label, playKey }: ScoreGaugeProps) {
  const ratio = score / outOf;
  const { segments, segRefs, startCapRef, endCapRef, endCap } = useGaugeReveal(
    ratio,
    playKey,
  );
  const display = useCountUp(score, 1700, playKey);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-[280px] w-[280px]">
        <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
          {/* Track */}
          <circle
            cx={150}
            cy={150}
            r={118}
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={22}
          />
          {/* Smooth gradient ring */}
          <g>
            {segments.map((seg, i) => (
              <path
                key={i}
                ref={(el) => {
                  segRefs.current[i] = el;
                }}
                d={seg.d}
                fill="none"
                stroke={seg.color}
                strokeWidth={22}
                strokeLinecap="butt"
                style={{ opacity: 0 }}
              />
            ))}
          </g>
          {/* Round caps overlaid on top */}
          <circle
            ref={startCapRef}
            cx={150}
            cy={32}
            r={11}
            fill={segments[0]?.color ?? '#84CC16'}
            style={{ opacity: 0 }}
          />
          <circle
            ref={endCapRef}
            cx={endCap.x}
            cy={endCap.y}
            r={11}
            fill={endCap.color}
            style={{ opacity: 0 }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="font-bold leading-none tracking-[-0.02em] text-white"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 60 }}
          >
            {display.toFixed(1)}
          </div>
          <div className="mt-1.5 text-[14px] text-text-mute">/ {outOf}점</div>
        </div>
      </div>
      <div className="whitespace-nowrap text-[16px] font-bold tracking-[-0.01em] text-[#e6eef3]">
        {label}
      </div>
    </div>
  );
}
