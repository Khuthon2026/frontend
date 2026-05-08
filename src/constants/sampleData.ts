import type {
  AppMeta,
  IndexAnalysisData,
  KeywordEntry,
  ReviewEntry,
} from '@/types';

export const SAMPLE_APP: AppMeta = {
  initial: 'A',
  name: '샘플 어플리케이션',
  categories: ['금융', '생활'],
};

export const INDEX_ANALYSIS: IndexAnalysisData = {
  score: 3.2,
  outOf: 5,
  warning: '광고와 실제 게임이 달라요',
  bars: [
    {
      id: 'neg-keyword-freq',
      label: '전체 리뷰 키워드 대비 부정리뷰 키워드 빈도',
      pct: 92.6,
      color: '#ec4f8d',
      trackGradient: 'linear-gradient(90deg,#f06aa1,#ec4f8d)',
    },
    {
      id: 'polarization',
      label: '리뷰 분극화 지수',
      pct: 40.3,
      color: '#e98246',
      trackGradient: 'linear-gradient(90deg,#f0995e,#e98246)',
    },
    {
      id: 'release-pattern',
      label: '개발사 양산형 출시 패턴',
      pct: 97.8,
      color: '#84CC16',
      trackGradient: 'linear-gradient(90deg,#9ddb33,#84CC16)',
    },
    {
      id: 'ad-reality-gap',
      label: '광고-실제 괴리 지수',
      pct: 66,
      color: '#5cc0b9',
      trackGradient: 'linear-gradient(90deg,#7ed4cd,#5cc0b9)',
    },
  ],
};

export const KEYWORDS: KeywordEntry[] = [
  { text: '거짓말', sentiment: 'negative', size: 46, x: 30, y: 24 },
  { text: '계약해지', sentiment: 'negative', size: 42, x: 62, y: 22 },
  { text: '기대', sentiment: 'positive', size: 50, x: 16, y: 32 },
  { text: '픽', sentiment: 'positive', size: 22, x: 78, y: 36, dim: true },
  { text: '밀응', sentiment: 'positive', size: 24, x: 50, y: 44, dim: true },
  { text: '일관성', sentiment: 'positive', size: 22, x: 18, y: 48, dim: true },
  { text: '배입', sentiment: 'negative', size: 30, x: 33, y: 55 },
  { text: '신뢰도', sentiment: 'positive', size: 34, x: 55, y: 58 },
  { text: '평판', sentiment: 'positive', size: 24, x: 78, y: 60, dim: true },
  { text: '제약', sentiment: 'negative', size: 28, x: 20, y: 68, dim: true },
  { text: '커짓', sentiment: 'negative', size: 32, x: 60, y: 74 },
  { text: '자산관', sentiment: 'positive', size: 20, x: 43, y: 78, dim: true },
  { text: '신틱', sentiment: 'positive', size: 18, x: 36, y: 88, dim: true },
  { text: '불신', sentiment: 'negative', size: 24, x: 14, y: 86, dim: true },
];

export const REVIEWS: ReviewEntry[] = [
  {
    keyword: '거짓말',
    sentiment: 'negative',
    text: '광고에서 본 것과 달리 실제로는 거짓말이 너무 많아요. 기대했던 기능들이 없습니다.',
  },
  {
    keyword: '기대',
    sentiment: 'positive',
    text: '기대하고 다운받았는데 생각보다 괜찮네요. 계속 사용하고 있습니다.',
  },
  {
    keyword: '신뢰도',
    sentiment: 'positive',
    text: '신뢰도가 떨어져요. 약속한 기능들이 제대로 작동하지 않습니다.',
  },
  {
    keyword: '계약해지',
    sentiment: 'negative',
    text: '계약해지 과정도 복잡하고, 고객센터 응대도 불친절합니다.',
  },
  {
    keyword: '일관성',
    sentiment: 'positive',
    text: '서비스 품질에 일관성이 없어요. 어떨 때는 좋고 어떨 때는 나쁘고...',
  },
];
