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
