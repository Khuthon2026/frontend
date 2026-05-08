import type { SearchResult, VerifyResult } from '@/types';

export const checkHealth = async (): Promise<boolean> => {
  try {
    const res = await fetch('/health');
    const json = await res.json();
    return json.success === true && json.data?.status === 'ok';
  } catch {
    return false;
  }
};

export const searchApps = async (q: string): Promise<SearchResult[]> => {
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error('검색 실패');
  const json = await res.json();
  return json.data.results.map((r: { title: string; google_play_id: string; developer?: string; icon?: string }) => ({
    name: r.title,
    google_play_id: r.google_play_id,
    developer: r.developer,
    icon_url: r.icon,
  }));
};

export const startVerify = async (google_play_id: string): Promise<{ job_id: string }> => {
  const res = await fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ google_play_id }),
  });
  if (!res.ok) throw new Error('분석 요청 실패');
  const json = await res.json();
  return json.data ?? json;
};

export const getVerifyStatus = async (job_id: string): Promise<{ status: string; progress: number }> => {
  const res = await fetch(`/api/verify/${job_id}/status`);
  if (!res.ok) throw new Error('상태 조회 실패');
  const json = await res.json();
  return json.data ?? json;
};

export const getVerifyResult = async (job_id: string): Promise<VerifyResult> => {
  const res = await fetch(`/api/verify/${job_id}`);
  if (!res.ok) throw new Error('결과 조회 실패');
  const json = await res.json();
  return json.data ?? json;
};
