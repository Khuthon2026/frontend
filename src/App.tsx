import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import { checkHealth } from './lib/api/verify';
import './App.css';

export default function App() {
  useEffect(() => {
    checkHealth().then((ok) => {
      console.log(`[헬스체크] 백엔드 상태: ${ok ? '✅ 정상' : '❌ 연결 실패'}`);
    });
  }, []);

  return <HomePage />;
}
