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
