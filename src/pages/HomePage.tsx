import { useState } from 'react';
import Background from '../components/ui/Background';
import Header from '../components/ui/Header';
import Logo from '../components/ui/Logo';
import Footer from '../components/ui/Footer';
import Toast from '../components/ui/Toast';
import SearchBar from '../components/features/SearchBar';
import UrlList from '../components/features/UrlList';
import Top3 from '../components/features/Top3';
import UrlModal from '../components/features/UrlModal';
import ReportModal from '../components/features/ReportModal';
import { useToast } from '../hooks/useToast';
import type { UrlEntry } from '../types';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [urls, setUrls] = useState<UrlEntry[]>([]);
  const [urlOpen, setUrlOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const { message, show } = useToast();

  const handleAddUrl = (url: string) => {
    let name = url;
    try {
      name = new URL(url).hostname.replace(/^www\./, '');
    } catch {
      /* ignore — fall back to raw url */
    }
    setUrls((u) => [...u, { id: crypto.randomUUID(), url, name }]);
    show('URL이 추가되었어요');
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

        <SearchBar query={query} setQuery={setQuery} onUrlClick={() => setUrlOpen(true)} />

        <UrlList items={urls} onRemove={(id) => setUrls((u) => u.filter((x) => x.id !== id))} />

        <p className="mt-9 text-center text-sm font-medium tracking-wide text-white/70">자주 속는 앱 Top 3</p>
        <Top3 onPick={(name) => setQuery(name)} />
      </main>

      <Footer />

      <UrlModal open={urlOpen} onClose={() => setUrlOpen(false)} onSubmit={handleAddUrl} />
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
