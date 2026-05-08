import type { UrlEntry } from '../../types';

interface Props {
  items: UrlEntry[];
  onRemove: (id: string) => void;
}

export default function UrlList({ items, onRemove }: Props) {
  if (items.length === 0) return null;
  return (
    <div className="mt-3.5 flex w-full max-w-[720px] flex-col gap-2">
      {items.map((it) => (
        <div
          key={it.id}
          className="flex animate-slide-in items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.08] py-2.5 pl-4 pr-2 text-white backdrop-blur"
        >
          <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-lime-brand text-ink">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 1 0-7.07-7.07L11.5 4.5" />
              <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 1 0 7.07 7.07L12.5 19.5" />
            </svg>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-sm font-semibold">{it.name}</span>
            <span className="truncate text-xs text-white/60">{it.url}</span>
          </div>
          <button
            type="button"
            onClick={() => onRemove(it.id)}
            aria-label="삭제"
            className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-white/60 transition hover:bg-red-500/20 hover:text-red-300"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}