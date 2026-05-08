interface Props {
  onReportClick: () => void;
}

export default function Header({ onReportClick }: Props) {
  return (
    <header className="relative z-[2] flex items-center justify-between px-9 py-[22px] text-sm text-white/85">
      <div className="flex items-center gap-2.5">
        <a
          href="/"
          className="font-product text-xl font-bold tracking-wide select-none"
        >
          <span style={{ color: '#84CC16' }}>De</span><span style={{ color: '#D4D4D4' }}>Clone</span>
        </a>
      </div>
      <nav>
        <button
          type="button"
          onClick={onReportClick}
          className="rounded-full bg-lime-brand px-[18px] py-2 font-bold text-ink shadow-[0_6px_16px_rgba(132,204,22,0.35)] transition hover:-translate-y-px hover:shadow-[0_10px_22px_rgba(132,204,22,0.45)]"
        >
          신고하기
        </button>
      </nav>
    </header>
  );
}
