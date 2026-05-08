import type { IndexAnalysisData } from '@/types';
import ScoreGauge from './ScoreGauge';
import BarRow from './BarRow';
import WarnPill from '../ui/WarnPill';

interface IndexAnalysisProps {
  data: IndexAnalysisData;
  playKey: number | string;
}

export default function IndexAnalysis({ data, playKey }: IndexAnalysisProps) {
  return (
    <section className="mb-[22px] rounded-[22px] border border-white/[0.07] bg-white/[0.04] px-[30px] py-[26px] backdrop-blur-[4px]">
      <div className="mb-7 flex items-center gap-3.5">
        <div className="text-[18px] font-bold tracking-[-0.01em] text-[#e8eef2]">
          지수분석
        </div>
        <WarnPill>{data.warning}</WarnPill>
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
