import type { KeywordEntry, ReviewEntry } from '@/types';
import KeywordCloud from './KeywordCloud';
import ReviewList from './ReviewList';

interface KeywordsProps {
  keywords: KeywordEntry[];
  reviews: ReviewEntry[];
}

export default function Keywords({ keywords, reviews }: KeywordsProps) {
  return (
    <section className="mb-[22px] rounded-[22px] border border-white/[0.07] bg-white/[0.04] px-[30px] py-[26px] backdrop-blur-[4px]">
      <div className="text-[18px] font-bold tracking-[-0.01em] text-[#e8eef2]">
        주요 키워드
      </div>
      <div className="mt-5 grid grid-cols-[1.1fr_1fr] gap-[26px]">
        <KeywordCloud keywords={keywords} />
        <ReviewList reviews={reviews} />
      </div>
    </section>
  );
}
