import ModalShell from '@/components/ui/ModalShell';
import type { VerifyResult } from '@/types';

const MESSAGES = ['앱 정보 수집 중...', '패턴 분석 중...', '유사 앱 비교 중...', '리스크 평가 중...', '결과 정리 중...'];

function getRiskLevel(spam_score: number | null): 'high' | 'mid' | 'safe' {
  if (spam_score === null) return 'safe';
  if (spam_score >= 3.1) return 'high';
  if (spam_score >= 1.6) return 'mid';
  return 'safe';
}

const RISK_CONFIG = {
  high: { label: '위험', bg: 'bg-red-500',    bar: 'bg-red-500',    card: 'bg-red-50 border-red-200',       text: 'text-red-500' },
  mid:  { label: '주의', bg: 'bg-yellow-400', bar: 'bg-yellow-400', card: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-500' },
  safe: { label: '안전', bg: 'bg-lime-brand', bar: 'bg-lime-brand', card: 'bg-green-50 border-green-200',   text: 'text-lime-brand' },
};

type Props = {
  open: boolean;
  state: 'loading' | 'done' | 'failed';
  progress: number;
  result: VerifyResult | null;
  error: string | null;
};

export default function VerifyModal({ open, state, progress, result, error }: Props) {
  const msgIdx = Math.min(Math.floor(progress / 20), MESSAGES.length - 1);
  const risk = result ? getRiskLevel(result.spam_score) : 'safe';
  const cfg = RISK_CONFIG[risk];
  const keywords = result ? Object.entries(result.review_stats?.trust_keywords ?? {}) : [];

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
              <div className="h-full rounded-full bg-lime-brand transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <p className="mt-5 text-xs text-[#80868b]">분석에 10~20초 정도 소요돼요</p>
        </div>
      )}

      {state === 'done' && result && (
          <div className="max-h-[70vh] overflow-y-auto">
            {/* 앱 헤더 */}
            <div className="mb-4 flex items-center gap-3">
              {result.app.icon_url ? (
                <img src={result.app.icon_url} alt={result.app.name} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
              ) : (
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F1F3F4] text-xl font-bold text-ink">
                  {result.app.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 id="verifyTitle" className="truncate text-lg font-bold text-ink">{result.app.name}</h2>
                <p className="truncate text-xs text-[#80868b]">{result.app.developer} · {result.app.category}</p>
              </div>
              <span className={`shrink-0 rounded-full ${cfg.bg} px-3 py-1 text-sm font-bold text-white`}>
                {cfg.label}
              </span>
            </div>

            {/* 스팸 점수 */}
            {result.spam_score !== null && (
              <div className="mb-4">
                <div className="mb-1 flex justify-between text-xs font-semibold text-[#80868b]">
                  <span>스팸 점수</span>
                  <span className={cfg.text}>{result.spam_score.toFixed(1)}점</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F3F4]">
                  <div className={`h-full rounded-full ${cfg.bar} transition-all duration-700`} style={{ width: `${(result.spam_score / 5) * 100}%` }} />
                </div>
              </div>
            )}

            {/* 리뷰 통계 */}
            {result.review_stats && (
              <div className={`mb-4 rounded-2xl border p-4 ${cfg.card}`}>
                <div className="mb-2 flex gap-4 text-sm">
                  <span className="text-ink">
                    부정 리뷰 비율 <strong>{(result.review_stats.negative_ratio * 100).toFixed(0)}%</strong>
                  </span>
                  <span className="text-ink">
                    양극화 지수 <strong>{result.review_stats.polarization_index.toFixed(2)}</strong>
                  </span>
                </div>
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {keywords.map(([kw, cnt]) => (
                      <span key={kw} className="rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium text-ink">
                        {kw} {cnt}건
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 부정 리뷰 */}
            {result.reviews?.negative?.length > 0 && (
              <div className="mb-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#80868b]">부정 리뷰</p>
                <ul className="space-y-2">
                  {result.reviews.negative.slice(0, 2).map((r, i) => (
                    <li key={i} className="rounded-xl bg-[#F1F3F4] px-3.5 py-2.5 text-sm text-ink">
                      {r.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 구글 플레이 평점 */}
            {result.ratings?.google_play && (
              <p className="mb-4 text-xs text-[#80868b]">
                Google Play 평점 <strong className="text-ink">{result.ratings.google_play}</strong>
              </p>
            )}

            <button type="button" onClick={handleClose} className="w-full rounded-full bg-lime-brand py-3 text-sm font-bold text-ink shadow-[0_4px_12px_rgba(132,204,22,0.35)] transition hover:-translate-y-px">
              확인
            </button>
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
