interface HeaderProps {
  onLogoClick?: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="mb-6 flex items-center">
      <button
        type="button"
        onClick={onLogoClick}
        aria-label="DeClone 메인으로"
        className="cursor-pointer border-0 bg-transparent px-1.5 py-1 text-[40px] font-extrabold tracking-[-0.015em] transition-opacity hover:opacity-85"
        style={{ fontFamily: 'Inter, Pretendard, sans-serif' }}
      >
        <span className="text-accent">De</span>
        <span className="text-[#c4ccd2]">Clone</span>
      </button>
    </header>
  );
}
