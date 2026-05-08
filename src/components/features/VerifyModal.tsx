import ModalShell from '@/components/ui/ModalShell';
import type { VerifyResult } from '@/types';


const MESSAGES = ['앱 정보 수집 중...', '패턴 분석 중...', '유사 앱 비교 중...', '리스크 평가 중...', '결과 정리 중...'];

type Props = {
  open: boolean;
  state: 'loading' | 'done' | 'failed';
  progress: number;
  result: VerifyResult | null;
  error: string | null;
};

export default function VerifyModal({ open, state, progress, result, error }: Props) {
  const msgIdx = Math.min(Math.floor(progress / 20), MESSAGES.length - 1);

  const handleClose = () => {
    if (state === 'loading') return;
    window.location.reload();
  };

  return (
    <ModalShell open={open} onClose={handleClose} labelledBy="verifyTitle">

      {state === 'loading' && (
        <div className="flex flex-col items-center py-4 text-center">
          <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-lime-brand">
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2.2} strokeLinecap="round" className="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
          <h2 id="verifyTitle" className="mb-1 text-xl font-bold text-ink">앱 분석 중</h2>
          <p className="mb-6 text-sm text-[#5f6368]">{MESSAGES[msgIdx]}</p>
          <div className="w-full">
            <div className="mb-1.5 flex justify-between text-xs font-semibold text-[#80868b]">
              <span>진행률</span><span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F3F4]">
              <div
                className="h-full rounded-full bg-lime-brand transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="mt-5 text-xs text-[#80868b]">분석에 10~20초 정도 소요돼요</p>
        </div>
      )}

      {state === 'done' && result && (
        <div className="flex flex-col items-center py-4 text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-lime-brand">
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth={2.2} strokeLinecap="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 id="verifyTitle" className="mb-2 text-xl font-bold text-ink">분석 완료</h2>
          <p className="text-sm text-[#5f6368]">{result.app.name}</p>
        </div>
      )}

      {state === 'failed' && (
        <div className="flex flex-col items-center py-4 text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-red-100">
            <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2.2} strokeLinecap="round">
              <circle cx={12} cy={12} r={10} /><path d="M12 8v4m0 4h.01" />
            </svg>
          </div>
          <h2 id="verifyTitle" className="mb-2 text-lg font-bold text-ink">분석 실패</h2>
          <p className="mb-6 text-sm text-[#5f6368]">{error ?? '알 수 없는 오류가 발생했어요'}</p>
          <button type="button" onClick={handleClose} className="w-full rounded-full bg-[#F1F3F4] py-3 text-sm font-bold text-ink transition hover:bg-[#E4E6E8]">
            닫기
          </button>
        </div>
      )}

    </ModalShell>
  );
}
