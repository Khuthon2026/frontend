import { useState } from 'react';
import Background from '@/components/ui/Background';
import Footer from '@/components/ui/Footer';
import AppCard from '@/components/features/AppCard';
import IndexAnalysis from '@/components/features/IndexAnalysis';
import Keywords from '@/components/features/Keywords';
import CompareModal from '@/components/features/CompareModal';
import type { VerifyResult, AppMeta, IndexAnalysisData, KeywordEntry, ReviewEntry } from '@/types';

interface Props {
  result: VerifyResult;
  adUrl?: string | null;
  onBack: () => void;
}

function toRisk(spam: number) {
  if (spam >= 4) return '광고와 실제 게임이 완전히 달라요';
  if (spam >= 3) return '광고와 다소 차이가 있을 수 있어요';
  if (spam >= 1.5) return '광고와 실제가 대체로 일치해요';
  return '광고에 과장이 없는 앱이에요';
}

function buildKeywords(trust: { positive: Record<string, number>; negative: Record<string, number> }): KeywordEntry[] {
  const pos = Object.entries(trust.positive ?? {}).map(([text, count]) => ({ text, count, sentiment: 'positive' as const }));
  const neg = Object.entries(trust.negative ?? {}).map(([text, count]) => ({ text, count, sentiment: 'negative' as const }));
  const all = [...pos, ...neg].sort((a, b) => b.count - a.count);
  const maxCount = all[0]?.count ?? 1;
  const positions = [
    [35, 22], [62, 18], [72, 34], [22, 36], [48, 28],
    [65, 52], [28, 56], [50, 66], [24, 70], [74, 62],
    [42, 78], [65, 74], [22, 50], [76, 44],
  ];
  return all.map(({ text, count, sentiment }, i) => ({
    text,
    sentiment,
    size: Math.round(18 + (count / maxCount) * 32),
    x: positions[i % positions.length][0],
    y: positions[i % positions.length][1],
    dim: i >= 7,
  }));
}

function buildReviews(result: VerifyResult): ReviewEntry[] {
  const neg: ReviewEntry[] = result.reviews.negative.slice(0, 3).map((r) => ({
    keyword: '부정 리뷰',
    sentiment: 'negative',
    text: r.text,
  }));
  const pos: ReviewEntry[] = result.reviews.positive.slice(0, 2).map((r) => ({
    keyword: '긍정 리뷰',
    sentiment: 'positive',
    text: r.text,
  }));
  return [...neg, ...pos];
}

export default function ResultPage({ result, adUrl, onBack }: Props) {
  const [playKey] = useState(0);
  const [compareOpen, setCompareOpen] = useState(false);

  const app: AppMeta = {
    initial: result.app.name.charAt(0),
    name: result.app.name,
    categories: [result.app.category, result.app.developer].filter(Boolean),
    icon_url: result.app.icon_url,
  };

  const negPct = Math.round(100 - result.signal_scores.negative_keyword_score);
  const polPct = Math.round(100 - result.signal_scores.polarization_score);
  const ratingRiskPct = Math.round(100 - result.signal_scores.avg_rating_score);
  const patternPct = Math.min(Math.round(result.developer_stats.pattern_score * 20), 100);

  const indexData: IndexAnalysisData = {
    score: result.spam_score,
    outOf: 5,
    warning: toRisk(result.spam_score),
    bars: [
      { id: 'neg', label: '부정 리뷰 비율', pct: negPct, color: '#ec4f8d', trackGradient: 'linear-gradient(90deg,#f06aa1,#ec4f8d)' },
      { id: 'pol', label: '리뷰 분극화 지수', pct: polPct, color: '#e98246', trackGradient: 'linear-gradient(90deg,#f0995e,#e98246)' },
      { id: 'rat', label: '구글플레이 저평점 비율', pct: ratingRiskPct, color: '#84CC16', trackGradient: 'linear-gradient(90deg,#9ddb33,#84CC16)' },
      { id: 'pat', label: '개발사 양산형 패턴', pct: patternPct, color: '#5cc0b9', trackGradient: 'linear-gradient(90deg,#7ed4cd,#5cc0b9)' },
    ],
  };

  const keywords: KeywordEntry[] = buildKeywords(result.review_stats.trust_keywords);
  const reviews: ReviewEntry[] = buildReviews(result);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Background />

      <header className="relative z-2 flex items-center justify-between px-8 py-5">
        <button
          type="button"
          onClick={onBack}
          className="font-product select-none text-xl font-bold tracking-wide transition hover:opacity-80"
        >
          <span style={{ color: '#84CC16' }}>De</span>
          <span style={{ color: '#D4D4D4' }}>Clone</span>
        </button>
      </header>

      <main className="relative z-2 mx-auto w-full max-w-225 flex-1 px-6 pb-20 pt-4">
        <AppCard app={app} />
        <IndexAnalysis data={indexData} playKey={playKey} onCompare={() => setCompareOpen(true)} />
        {keywords.length > 0 && <Keywords keywords={keywords} reviews={reviews} />}
      </main>

      <Footer />

      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        adUrl={adUrl ?? result.ad_thumbnail ?? null}
        screenshots={result.screenshots ?? []}
      />
    </div>
  );
}
