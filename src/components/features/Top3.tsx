import { TOP3 } from '../../constants/apps';

interface Props {
  onPick: (name: string) => void;
}

const rankColors = ['bg-lime-brand text-ink', 'bg-white text-ink', 'bg-gray-brand text-ink'];

export default function Top3({ onPick }: Props) {
  return (
    <div className="mt-5 flex max-w-[720px] flex-wrap justify-center gap-2.5">
      {TOP3.map((it, i) => (
        <button
          key={it.rank}
          onClick={() => onPick(it.name)}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-2 pl-2 pr-3.5 text-[13px] font-medium text-white transition hover:-translate-y-px hover:border-lime-brand/50 hover:bg-white/[0.12]"
        >
          <span className={`font-product grid h-[22px] w-[22px] place-items-center rounded-full text-xs font-extrabold ${rankColors[i]}`}>
            {it.rank}
          </span>
          {it.name}
        </button>
      ))}
    </div>
  );
}
