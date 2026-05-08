import { useEffect, useRef, useState } from 'react';
import ModalShell from '../ui/ModalShell';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
}

export default function UrlModal({ open, onClose, onSubmit }: Props) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUrl('');
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const u = new URL(url.trim());
      if (!/^https?:$/.test(u.protocol)) throw new Error('protocol');
    } catch {
      setError('올바른 URL 형식이 아니에요. https:// 로 시작하는지 확인해 주세요.');
      inputRef.current?.focus();
      return;
    }
    onSubmit(url.trim());
    onClose();
  };

  return (
    <ModalShell open={open} onClose={onClose} labelledBy="urlModalTitle">
      <div className="mb-[18px] grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-lime-brand text-ink">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 1 0-7.07-7.07L11.5 4.5" />
          <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 1 0 7.07 7.07L12.5 19.5" />
        </svg>
      </div>
      <h2 id="urlModalTitle" className="mb-2 text-[22px] font-bold tracking-tight">
        앱 URL 추가하기
      </h2>
      <p className="mb-[22px] text-sm leading-relaxed text-[#5f6368]">
        등록되지 않은 앱이라면 스토어 URL을 넣어 주세요. 검증 후 데이터베이스에 추가됩니다.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4 flex flex-col gap-1.5">
          <label htmlFor="appUrl" className="text-[13px] font-semibold text-ink">
            스토어 URL
          </label>
          <input
            id="appUrl"
            ref={inputRef}
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            placeholder="https://apps.apple.com/..."
            autoComplete="off"
            required
            className="w-full rounded-xl border-[1.5px] border-[#E4E6E8] px-3.5 py-3 text-sm text-ink outline-none transition focus:border-lime-brand focus:shadow-[0_0_0_3px_rgba(132,204,22,0.2)]"
          />
          <span className={`text-xs ${error ? 'text-[#B42318]' : 'text-[#80868b]'}`}>
            {error ?? 'App Store 또는 Google Play 링크를 붙여넣어 주세요.'}
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
            className="flex-1 rounded-full bg-lime-brand px-[18px] py-3 text-sm font-bold text-ink shadow-[0_4px_12px_rgba(132,204,22,0.35)] transition hover:-translate-y-px hover:shadow-[0_8px_18px_rgba(132,204,22,0.45)]"
          >
            추가하기
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
