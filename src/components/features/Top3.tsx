import { TOP3 } from '../../constants/apps';

interface Props {
  onPick: (googlePlayId: string) => void;
}

export default function Top3({ onPick }: Props) {
  return (
    <div className="mt-5 flex max-w-[720px] flex-wrap justify-center gap-2.5">
      {TOP3.map((it) => (
        <button
          key={it.rank}
          onClick={() => onPick(it.google_play_id)}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-2 pl-2 pr-3.5 text-[13px] font-medium text-white transition hover:-translate-y-px hover:border-lime-brand/50 hover:bg-white/[0.12]"
        >
          <img
            src={it.icon}
            alt={it.title}
            className="h-6 w-6 rounded-full border border-white/10 object-cover"
            loading="lazy"
          />
          {it.title}
        </button>
      ))}
    </div>
  );
}
