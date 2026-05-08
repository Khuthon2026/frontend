import type { KeywordEntry } from '@/types';

interface KeywordCloudProps {
  keywords: KeywordEntry[];
}

export default function KeywordCloud({ keywords }: KeywordCloudProps) {
  return (
    <div className="relative h-[460px] overflow-hidden rounded-[18px] border border-white/[0.05] bg-black/20">
      {keywords.map((k, i) => (
        <span
          key={`${k.text}-${i}`}
          className="absolute -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-bold tracking-[-0.01em]"
          style={{
            left: `${k.x}%`,
            top: `${k.y}%`,
            fontSize: k.size,
            color: k.sentiment === 'negative' ? '#ef5a5a' : '#6cb6ff',
            opacity: k.dim ? 0.78 : 1,
          }}
        >
          {k.text}
        </span>
      ))}
    </div>
  );
}
