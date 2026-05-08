/**
 * Stub for future API client. The current build uses static sample data
 * from `@/constants/sampleData`. When a backend lands, replace these with
 * real fetch calls.
 */

import { INDEX_ANALYSIS, KEYWORDS, REVIEWS, SAMPLE_APP } from '@/constants/sampleData';
import type { AppMeta, IndexAnalysisData, KeywordEntry, ReviewEntry } from '@/types';

export async function fetchAppMeta(): Promise<AppMeta> {
  return SAMPLE_APP;
}

export async function fetchIndexAnalysis(): Promise<IndexAnalysisData> {
  return INDEX_ANALYSIS;
}

export async function fetchKeywords(): Promise<KeywordEntry[]> {
  return KEYWORDS;
}

export async function fetchReviews(): Promise<ReviewEntry[]> {
  return REVIEWS;
}
