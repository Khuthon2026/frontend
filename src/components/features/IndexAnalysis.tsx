import type { IndexAnalysisData } from '@/types';
import ScoreGauge from './ScoreGauge';
import BarRow from './BarRow';
import WarnPill from '../ui/WarnPill';

interface IndexAnalysisProps {
  data: IndexAnalysisData;
  playKey: number | string;
  onCompare?: () => void;
}

export default function IndexAnalysis({ data, playKey, onCompare }: IndexAnalysisProps) {
  return (
    <section className="mb-[22px] rounded-[22px] border border-white/[0.07] bg-white/[0.04] px-[30px] py-[26px] backdrop-blur-[4px]">
      <div className="mb-7 flex items-center justify-between gap-3.5">
        <div className="flex items-center gap-3.5">
          <div className="text-[18px] font-bold tracking-[-0.01em] text-[#e8eef2]">
            지수분석
          </div>
          <WarnPill score={data.score}>{data.warning}</WarnPill>
        </div>
        {onCompare && (
          <button
            type="button"
            onClick={onCompare}
            className="inline-flex items-center gap-1.5 rounded-full bg-lime-brand px-[18px] py-2 text-[12px] font-bold text-ink shadow-[0_6px_16px_rgba(132,204,22,0.35)] transition hover:-translate-y-px hover:shadow-[0_10px_22px_rgba(132,204,22,0.45)]"
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
              <rect x={2} y={3} width={9} height={18} rx={1.5} />
              <rect x={13} y={3} width={9} height={18} rx={1.5} />
            </svg>
            광고 vs 실제 비교
          </button>
        )}
      </div>

      <div className="grid grid-cols-[340px_1fr] items-center gap-7 px-1 pb-1 pt-2">
        <ScoreGauge
          score={data.score}
          outOf={data.outOf}
          label="양산형 종합 지수"
          playKey={playKey}
        />
        <div className="flex min-w-0 flex-col gap-[18px] pr-2">
          {data.bars.map((bar, i) => (
            <BarRow key={bar.id} bar={bar} index={i} playKey={playKey} />
          ))}
        </div>
      </div>
    </section>
  );
}
