import ModalShell from '@/components/ui/ModalShell';
import type { VerifyResult } from '@/types';

const RISK_CONFIG = {
  high: { label: '위험', bg: 'bg-red-500',    card: 'bg-red-50 border-red-200',       text: 'text-red-500' },
  mid:  { label: '주의', bg: 'bg-yellow-400', card: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-500' },
  safe: { label: '안전', bg: 'bg-lime-brand', card: 'bg-green-50 border-green-200',   text: 'text-lime-brand' },
};

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

      {state === 'done' && result && (() => {
        const cfg = RISK_CONFIG[result.risk];
        return (
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F1F3F4] text-xl font-bold text-ink">
                {result.app_name?.charAt(0) ?? '?'}
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="verifyTitle" className="truncate text-lg font-bold text-ink">{result.app_name}</h2>
                <p className="truncate text-xs text-[#80868b]">{result.google_play_id}</p>
              </div>
              <span className={`shrink-0 rounded-full ${cfg.bg} px-3 py-1 text-sm font-bold text-white`}>
                {cfg.label}
              </span>
            </div>

            {result.risk_score !== undefined && (
              <div className="mb-4">
                <div className="mb-1 flex justify-between text-xs font-semibold text-[#80868b]">
                  <span>위험 점수</span>
                  <span className={cfg.text}>{result.risk_score}점</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F3F4]">
                  <div className={`h-full rounded-full ${cfg.bg} transition-all duration-700`} style={{ width: `${result.risk_score}%` }} />
                </div>
              </div>
            )}

            <div className={`mb-4 rounded-2xl border p-4 ${cfg.card}`}>
              <p className="text-sm leading-relaxed text-ink">
                {result.summary ?? (result.risk === 'high' ? '클론 앱으로 의심됩니다. 설치를 권장하지 않아요.' : result.risk === 'mid' ? '일부 위험 요소가 감지되었어요. 주의가 필요해요.' : '정상 앱으로 확인되었어요.')}
              </p>
            </div>

            {result.clone_of && (
              <div className="mb-4 rounded-xl bg-[#F1F3F4] px-4 py-3 text-sm text-ink">
                <span className="font-semibold">원본 앱: </span>{result.clone_of}
              </div>
            )}

            {result.reasons && result.reasons.length > 0 && (
              <ul className="mb-4 space-y-1.5">
                {result.reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3c4043]">
                    <span className="mt-0.5 shrink-0 text-[#80868b]">•</span>{r}
                  </li>
                ))}
              </ul>
            )}

            <button type="button" onClick={handleClose} className="w-full rounded-full bg-lime-brand py-3 text-sm font-bold text-ink shadow-[0_4px_12px_rgba(132,204,22,0.35)] transition hover:-translate-y-px">
              확인
            </button>
          </div>
        );
      })()}

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
