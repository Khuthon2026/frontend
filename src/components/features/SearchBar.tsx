import { useEffect, useRef, useState } from 'react';
import { searchApps } from '@/lib/api/verify';
import { colorFor, escapeHtml, highlight } from '@/lib/utils/text';
import type { SearchResult } from '@/types';

interface Props {
  query: string;
  setQuery: (s: string) => void;
  onUrlClick: () => void;
  onPick: (item: SearchResult) => void;
}

export default function SearchBar({ query, setQuery, onUrlClick, onPick }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const q = query.trim();

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!q) {
        setResults([]);
        setOpen(false);
        return;
      }
      setSearching(true);
      try {
        const data = await searchApps(q);
        setResults(data.slice(0, 6));
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, q ? 300 : 0);

    return () => clearTimeout(timer);
  }, [q]);

  const pick = (item: SearchResult) => {
    setQuery(item.name);
    setOpen(false);
    onPick(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0 && results.length > 0) {
        pick(results[activeIdx]);
      } else if (results.length > 0) {
        pick(results[0]);
      }
      return;
    }
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative w-full max-w-[720px]">
      <form
        className="flex items-center gap-3.5 rounded-full bg-white/[0.97] py-3.5 pl-6 pr-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_20px_60px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.08)] transition focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_24px_70px_rgba(0,0,0,0.45),0_0_0_3px_rgba(132,204,22,0.45)]"
        onSubmit={(e) => e.preventDefault()}
      >
        {searching ? (
          <svg className="h-[22px] w-[22px] flex-shrink-0 animate-spin text-[#5f6368]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <svg className="h-[22px] w-[22px] flex-shrink-0 text-[#5f6368]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <circle cx={11} cy={11} r={7} />
            <path d="m21 21-4.3-4.3" />
          </svg>
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveIdx(-1); }}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="궁금한 app 이름 입력"
          autoComplete="off"
          className="flex-1 border-0 bg-transparent py-1.5 font-sans text-[17px] text-ink outline-none placeholder:font-normal placeholder:text-[#80868b]"
        />
        <button
          type="button"
          onClick={onUrlClick}
          className="inline-flex items-center gap-2 rounded-full bg-lime-brand px-[18px] py-2.5 text-sm font-bold text-ink shadow-[0_4px_12px_rgba(132,204,22,0.35)] transition hover:-translate-y-px hover:shadow-[0_8px_18px_rgba(132,204,22,0.45)]"
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 1 0-7.07-7.07L11.5 4.5" />
            <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 1 0 7.07 7.07L12.5 19.5" />
          </svg>
          <span className="hidden sm:inline">URL 추가하기</span>
        </button>
      </form>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-10 max-h-[380px] animate-drop-in overflow-y-auto rounded-[22px] bg-white/[0.98] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_24px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur">
          <div className="px-3.5 pb-1.5 pt-2 text-[11px] font-bold uppercase tracking-wider text-[#80868b]">
            검색 결과 · {results.length}개
          </div>
          {results.map((a, i) => (
            <div
              key={a.google_play_id}
              role="option"
              aria-selected={i === activeIdx}
              className={`flex cursor-pointer items-center gap-3.5 rounded-2xl px-3.5 py-2.5 transition ${i === activeIdx ? 'bg-[#F1F3F4]' : 'hover:bg-[#F1F3F4]'}`}
              onMouseDown={() => pick(a)}
            >
              <div
                className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[10px] text-lg font-bold text-white"
                style={{ background: colorFor(a.name) }}
              >
                {a.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className="truncate text-[15px] font-semibold text-ink"
                  dangerouslySetInnerHTML={{ __html: highlight(a.name, q) }}
                />
                {a.developer && (
                  <div className="truncate text-[12px] text-[#80868b]">{a.developer}</div>
                )}
              </div>
              <span className="flex-shrink-0 text-[11px] text-[#80868b]">분석하기 →</span>
            </div>
          ))}
        </div>
      )}

      {open && q && !searching && results.length === 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-10 animate-drop-in rounded-[22px] bg-white/[0.98] p-5 text-center shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur">
          <div className="text-sm text-[#5f6368]">
            "<strong className="text-ink" dangerouslySetInnerHTML={{ __html: escapeHtml(query) }} />" 에 대한 결과가 없어요
          </div>
          <button
            onClick={onUrlClick}
            type="button"
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-lime-brand px-3 py-1.5 text-xs font-bold text-ink"
          >
            + 이 앱 URL 추가하기
          </button>
        </div>
      )}
    </div>
  );
}
