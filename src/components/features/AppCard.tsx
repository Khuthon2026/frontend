import type { AppMeta } from '@/types';

interface AppCardProps {
  app: AppMeta;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <section className="mb-[22px] rounded-[22px] border border-white/[0.07] bg-white/[0.04] px-[30px] py-[26px] backdrop-blur-[4px]">
      <div className="flex items-center gap-[22px]">
        {app.icon_url ? (
          <img
            src={app.icon_url}
            alt={app.name}
            style={{ width: 64, height: 64, borderRadius: 16, objectFit: 'cover' }}
          />
        ) : (
          <div
            className="grid place-items-center font-extrabold"
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              fontSize: 28,
              color: '#1d3a14',
              fontFamily: 'Inter, sans-serif',
              background: 'linear-gradient(180deg, #9ddb33 0%, #84CC16 100%)',
              boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.1)',
            }}
          >
            {app.initial}
          </div>
        )}
        <div>
          <span className="text-[30px] font-bold tracking-[-0.01em]">{app.name}</span>
          <span className="ml-3.5 inline-flex gap-2 align-middle">
            {app.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border px-3 py-1 text-[13px] font-medium"
                style={{
                  color: '#d3eba4',
                  background: 'rgba(132, 204, 22, 0.16)',
                  borderColor: 'rgba(132, 204, 22, 0.32)',
                }}
              >
                {c}
              </span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
