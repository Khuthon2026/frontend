import { useEffect, useRef, useState } from 'react';
import ModalShell from '../ui/ModalShell';
import { APPS } from '../../constants/apps';
import { colorFor, highlight } from '../../lib/utils/text';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { name: string; text: string }) => void;
  initialName?: string;
}

export default function ReportModal({ open, onClose, onSubmit, initialName = '' }: Props) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [acOpen, setAcOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const acWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setName(initialName);
      setText('');
      setError(null);
      setAcOpen(false);
      setTimeout(() => (initialName ? textRef.current : nameRef.current)?.focus(), 50);
    }
  }, [open, initialName]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!acWrapRef.current?.contains(e.target as Node)) setAcOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const q = name.trim().toLowerCase();
  const results = q ? APPS.filter((a) => a.name.toLowerCase().includes(q)).slice(0, 5) : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!acOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      setName(results[activeIdx].name);
      setAcOpen(false);
      textRef.current?.focus();
    } else if (e.key === 'Escape') {
      setAcOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError('앱 이름과 신고 내용을 모두 입력해 주세요.');
      return;
    }
    onSubmit({ name: name.trim(), text: text.trim() });
    onClose();
  };

  return (
    <ModalShell open={open} onClose={onClose} labelledBy="reportModalTitle">
      <div className="mb-[18px] grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-[#FEE4E2] text-[#B42318]">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>
      </div>
      <h2 id="reportModalTitle" className="mb-2 text-[22px] font-bold tracking-tight">
        앱 신고하기
      </h2>
      <p className="mb-[22px] text-sm leading-relaxed text-[#5f6368]">
        피해 사례를 공유해 주세요. 검토 후 다른 사용자들이 따라서 속지 않도록 돕습니다.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4 flex flex-col gap-1.5">
          <label htmlFor="reportName" className="text-[13px] font-semibold text-ink">
            앱 이름
          </label>
          <div ref={acWrapRef} className="relative">
            <input
              id="reportName"
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setAcOpen(true);
                setActiveIdx(-1);
              }}
              onFocus={() => name && setAcOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="예: 무료 VPN Pro"
              autoComplete="off"
              required
              className="w-full rounded-xl border-[1.5px] border-[#E4E6E8] px-3.5 py-3 text-sm text-ink outline-none transition focus:border-lime-brand focus:shadow-[0_0_0_3px_rgba(132,204,22,0.2)]"
            />
            {acOpen && results.length > 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-[240px] animate-drop-in overflow-y-auto rounded-[14px] bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)]">
                {results.map((a, i) => (
                  <div
                    key={a.name}
                    role="option"
                    aria-selected={i === activeIdx}
                    onMouseDown={() => {
                      setName(a.name);
                      setAcOpen(false);
                      textRef.current?.focus();
                    }}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl p-2 transition ${i === activeIdx ? 'bg-[#F1F3F4]' : 'hover:bg-[#F1F3F4]'}`}
                  >
                    <div className="font-product grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-[15px] font-bold text-white" style={{ background: colorFor(a.name) }}>
                      {a.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-ink" dangerouslySetInnerHTML={{ __html: highlight(a.name, name.trim()) }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-1.5">
          <label htmlFor="reportText" className="text-[13px] font-semibold text-ink">
            신고 내용
          </label>
          <textarea
            id="reportText"
            ref={textRef}
            rows={5}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
            }}
            placeholder="어떤 부분이 문제였는지 자세히 적어주세요."
            required
            className="min-h-[100px] w-full resize-y rounded-xl border-[1.5px] border-[#E4E6E8] px-3.5 py-3 text-sm text-ink outline-none transition focus:border-lime-brand focus:shadow-[0_0_0_3px_rgba(132,204,22,0.2)]"
          />
          <span className={`text-xs ${error ? 'text-[#B42318]' : 'text-[#80868b]'}`}>
            {error ?? '주제, 증상, 결제 이력 등을 구체적으로 적어주세요.'}
          </span>
        </div>
        <div className="mt-2 flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full bg-[#F1F3F4] px-[18px] py-3 text-sm font-bold text-ink transition hover:bg-[#E4E6E8]"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 rounded-full bg-[#B42318] px-[18px] py-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(180,35,24,0.3)] transition hover:-translate-y-px"
          >
            제출하기
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
