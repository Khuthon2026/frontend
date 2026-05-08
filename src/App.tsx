import { useEffect } from 'react';
import { checkHealth } from './lib/api/verify';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import VerifyModal from './components/features/VerifyModal';
import { useVerify } from './hooks/useVerify';
import './App.css';

export default function App() {
  const { state, progress, result, error, adUrl, run } = useVerify();

  useEffect(() => {
    checkHealth().then((ok) => {
      console.log(`[헬스체크] 백엔드 상태: ${ok ? '✅ 정상' : '❌ 연결 실패'}`);
    });
  }, []);

  if (state === 'done' && result) {
    return <ResultPage result={result} adUrl={adUrl} onBack={() => { sessionStorage.removeItem('verify_result'); window.location.reload(); }} />;
  }

  return (
    <>
      <HomePage onPick={(id, adUrl) => run(id, adUrl)} />
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
