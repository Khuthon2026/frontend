import { useState } from 'react';
import Background from '@/components/ui/Background';
import Footer from '@/components/ui/Footer';
import AppCard from '@/components/features/AppCard';
import IndexAnalysis from '@/components/features/IndexAnalysis';
import Keywords from '@/components/features/Keywords';
import type { VerifyResult, AppMeta, IndexAnalysisData, KeywordEntry, ReviewEntry } from '@/types';

interface Props {
  result: VerifyResult;
  onBack: () => void;
}

function toRisk(spam: number) {
  if (spam >= 7) return '고위험 앱으로 분류되었어요. 주의하세요.';
  if (spam >= 4) return '일부 위험 요소가 발견되었어요.';
  return '비교적 안전한 앱으로 확인되었어요.';
}

function buildKeywords(trust: Record<string, number>): KeywordEntry[] {
  const entries = Object.entries(trust).sort((a, b) => b[1] - a[1]);
  const maxCount = entries[0]?.[1] ?? 1;
  const positions = [
    [22, 18], [58, 14], [76, 30], [10, 38], [42, 32],
    [65, 52], [28, 58], [50, 68], [15, 72], [80, 65],
    [38, 82], [68, 78], [5, 55], [90, 45],
  ];
  return entries.map(([text, count], i) => ({
    text,
    sentiment: 'negative' as const,
    size: Math.round(18 + (count / maxCount) * 32),
    x: positions[i % positions.length][0],
    y: positions[i % positions.length][1],
    dim: i >= 5,
  }));
}

function buildReviews(result: VerifyResult): ReviewEntry[] {
  const keywords = Object.keys(result.review_stats.trust_keywords);
  const neg: ReviewEntry[] = result.reviews.negative.slice(0, 3).map((r) => {
    const kw = keywords.find((k) => r.text.includes(k)) ?? '부정 리뷰';
    return { keyword: kw, sentiment: 'negative', text: r.text };
  });
  const pos: ReviewEntry[] = result.reviews.positive.slice(0, 2).map((r) => ({
    keyword: '긍정 리뷰',
    sentiment: 'positive',
    text: r.text,
  }));
  return [...neg, ...pos];
}

export default function ResultPage({ result, onBack }: Props) {
  const [playKey] = useState(0);

  const app: AppMeta = {
    initial: result.app.name.charAt(0),
    name: result.app.name,
    categories: [result.app.category, result.app.developer].filter(Boolean),
  };

  const negPct = Math.round(result.signal_scores.avg_rating_score);
  const polPct = Math.round(result.signal_scores.polarization_score);
  const ratingRiskPct = Math.round(result.signal_scores.negative_keyword_score);
  const patternPct = Math.round(result.signal_scores.review_ratio_score);

  const indexData: IndexAnalysisData = {
    score: result.spam_score,
    outOf: 10,
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
          className="font-product select-none text-[28px] font-bold leading-none tracking-tight transition hover:opacity-80"
        >
          <span style={{ color: '#84CC16' }}>De</span>
          <span style={{ color: '#D4D4D4' }}>Clone</span>
        </button>
      </header>

      <main className="relative z-2 mx-auto w-full max-w-225 flex-1 px-6 pb-20 pt-4">
        <AppCard app={app} />
        <IndexAnalysis data={indexData} playKey={playKey} />
        {keywords.length > 0 && <Keywords keywords={keywords} reviews={reviews} />}
      </main>

      <Footer />
    </div>
  );
}
