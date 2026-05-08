export type Risk = 'high' | 'mid' | 'safe';

export interface AppItem {
  name: string;
  cat: string;
  risk: Risk;
  users: string;
}

export interface UrlEntry {
  id: string;
  url: string;
  name: string;
}

export interface SearchResult {
  name: string;
  google_play_id: string;
  developer?: string;
  icon_url?: string;
}

export type VerifyJobStatus = 'pending' | 'running' | 'done' | 'failed';

export interface VerifyResult {
  job_id: string;
  mode: string;
  spam_score: number | null;
  ad_score: number | null;
  app: {
    name: string;
    developer: string;
    google_play_id: string;
    icon_url: string;
    category: string;
  };
  ratings: {
    google_play: number;
  };
  review_stats: {
    negative_ratio: number;
    polarization_index: number;
    trust_keywords: Record<string, number>;
  };
  reviews: {
    negative: { score: number; text: string; date: string }[];
    positive: { score: number; text: string; date: string }[];
  };
  developer_stats: {
    app_count: number;
    category_overlap: number;
    pattern_score: number;
  };
  developer_apps: {
    name: string;
    google_play_id: string;
    released_at: string;
  }[];
}
