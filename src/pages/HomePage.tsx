import { useState } from 'react';
import Background from '../components/ui/Background';
import Header from '../components/ui/Header';
import Logo from '../components/ui/Logo';
import Footer from '../components/ui/Footer';
import Toast from '../components/ui/Toast';
import SearchBar from '../components/features/SearchBar';
import Top3 from '../components/features/Top3';
import UrlModal from '../components/features/UrlModal';
import ReportModal from '../components/features/ReportModal';
import { useToast } from '../hooks/useToast';
import type { SearchResult } from '../types';

interface Props {
  onPick: (googlePlayId: string, adUrl?: string) => void;
}

export default function HomePage({ onPick }: Props) {
  const [query, setQuery] = useState('');
  const [adUrl, setAdUrl] = useState<string | undefined>(undefined);
  const [urlOpen, setUrlOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const { message, show } = useToast();

  const handlePick = (item: SearchResult) => {
    onPick(item.google_play_id, adUrl);
  };

  const handleAdUrlSubmit = (url: string) => {
    setAdUrl(url);
    show('광고 URL이 추가됐어요. 이제 앱을 검색해서 선택하세요.');
  };

  const handleReport = () => {
    show('신고가 접수되었어요');
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Background />
      <Header onReportClick={() => setReportOpen(true)} />

      <main className="relative z-[2] flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-10">
        <div className="mb-9 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] text-white/85 backdrop-blur-md">
          <span className="h-[7px] w-[7px] animate-pulse-ring rounded-full bg-lime-brand" />
          <span>오늘 검증된 앱 7개</span>
        </div>

        <Logo />

        <SearchBar
          query={query}
          setQuery={setQuery}
          onUrlClick={() => setUrlOpen(true)}
          onPick={handlePick}
        />

        {adUrl && (
          <div className="mt-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[13px] text-white/70 backdrop-blur">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" className="text-[#ec4f8d]">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
            </svg>
            <span className="max-w-[320px] truncate">광고 URL 등록됨</span>
            <button
              type="button"
              onClick={() => setAdUrl(undefined)}
              className="ml-1 text-white/40 transition hover:text-white/80"
              aria-label="광고 URL 제거"
            >
              ✕
            </button>
          </div>
        )}

        <p className="mt-9 text-center text-sm font-medium tracking-wide text-white/70">자주 속는 앱 Top 3</p>
        <Top3 onPick={(id) => onPick(id, adUrl)} />
      </main>

      <Footer />

      <UrlModal open={urlOpen} onClose={() => setUrlOpen(false)} onSubmit={handleAdUrlSubmit} />
      <ReportModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSubmit={handleReport}
        initialName={query.trim()}
      />
      <Toast message={message} />
    </div>
  );
}
