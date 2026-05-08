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
  google_play_id: string;
  app_name: string;
  risk: Risk;
  risk_score?: number;
  summary?: string;
  reasons?: string[];
  clone_of?: string;
}
