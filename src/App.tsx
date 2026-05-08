import { useEffect } from 'react';
import { checkHealth } from './lib/api/verify';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import VerifyModal from './components/features/VerifyModal';
import { useVerify } from './hooks/useVerify';
import './App.css';

export default function App() {
  const { state, progress, result, error, run } = useVerify();

  if (state === 'done' && result) {
    return <ResultPage result={result} onBack={() => window.location.reload()} />;
  }
  useEffect(() => {
    checkHealth().then((ok) => {
      console.log(`[헬스체크] 백엔드 상태: ${ok ? '✅ 정상' : '❌ 연결 실패'}`);
    });
  }, []);

  return (
    <>
      <HomePage onPick={(id) => run(id)} />
      <VerifyModal
        open={state === 'loading' || state === 'failed'}
        state={state === 'idle' ? 'loading' : state}
        progress={progress}
        result={null}
        error={error}
      />
    </>
  );
}
