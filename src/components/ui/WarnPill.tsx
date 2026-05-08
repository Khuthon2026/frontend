interface WarnPillProps {
  children: React.ReactNode;
  score: number;
}

function getPillStyle(score: number): { background: string; icon: string } {
  if (score >= 4)
    return { background: 'linear-gradient(180deg, #ef5b5b 0%, #d33d3d 100%)', icon: '☠️' };
  if (score >= 3)
    return { background: 'linear-gradient(180deg, #f97316 0%, #ea6a00 100%)', icon: '⚠️' };
  if (score >= 1.5)
    return { background: 'linear-gradient(180deg, #eab308 0%, #ca9a00 100%)', icon: '🔶' };
  return { background: 'linear-gradient(180deg, #84cc16 0%, #65a30d 100%)', icon: '✅' };
}

export default function WarnPill({ children, score }: WarnPillProps) {
  const { background, icon } = getPillStyle(score);

  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-[10px] px-3.5 py-1.5 text-[13px] font-semibold text-white"
      style={{
        background,
        boxShadow: '0 2px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.18)',
      }}
    >
      <span className="text-[13px] leading-none">{icon}</span>
      {children}
    </span>
  );
}
