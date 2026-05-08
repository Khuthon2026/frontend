import { useState } from 'react';
import { startVerify, getVerifyStatus, getVerifyResult } from '@/lib/api/verify';
import type { VerifyResult } from '@/types';

type State = 'idle' | 'loading' | 'done' | 'failed';

export function useVerify() {
  const [state, setState] = useState<State>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (google_play_id: string): Promise<VerifyResult | null> => {
    setState('loading');
    setProgress(0);
    setResult(null);
    setError(null);

    try {
      const { job_id } = await startVerify(google_play_id);

      while (true) {
        const { status, progress: p } = await getVerifyStatus(job_id);
        setProgress(p);
        if (status === 'done') break;
        if (status === 'failed') throw new Error('분석에 실패했어요');
        await new Promise((r) => setTimeout(r, 1500));
      }

      const data = await getVerifyResult(job_id);
      setResult(data);
      setState('done');
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : '오류가 발생했어요');
      setState('failed');
      return null;
    }
  };

  return { state, progress, result, error, run };
}
