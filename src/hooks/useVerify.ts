import { useState } from 'react';
import { startVerify, getVerifyStatus, getVerifyResult } from '@/lib/api/verify';
import type { VerifyResult } from '@/types';

const SESSION_KEY = 'verify_result';

type State = 'idle' | 'loading' | 'done' | 'failed';
type Saved = { result: VerifyResult; adUrl: string | null };

function loadSaved(): Saved | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

export function useVerify() {
  const saved = loadSaved();
  const [state, setState] = useState<State>(saved ? 'done' : 'idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<VerifyResult | null>(saved?.result ?? null);
  const [error, setError] = useState<string | null>(null);
  const [adUrl, setAdUrl] = useState<string | null>(saved?.adUrl ?? null);

  const run = async (google_play_id: string, adUrlParam?: string): Promise<VerifyResult | null> => {
    setState('loading');
    setProgress(0);
    setResult(null);
    setError(null);
    setAdUrl(adUrlParam ?? null);

    try {
      const { job_id } = await startVerify(google_play_id, adUrlParam);

      while (true) {
        const { status, progress: p } = await getVerifyStatus(job_id);
        setProgress(p);
        if (status === 'done') break;
        if (status === 'failed') throw new Error('분석에 실패했어요');
        await new Promise((r) => setTimeout(r, 1500));
      }

      const data = await getVerifyResult(job_id);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ result: data, adUrl: adUrlParam ?? null }));
      setResult(data);
      setState('done');
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : '오류가 발생했어요');
      setState('failed');
      return null;
    }
  };

  return { state, progress, result, error, adUrl, run };
}
