export default function Background() {
  return (
    <div className="bg-stage bg-grid bg-noise pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute h-[380px] w-[380px] rounded-full opacity-35 blur-[80px]" style={{ background: '#84CC16', top: '-120px', left: '-100px' }} />
      <div className="absolute h-[520px] w-[520px] rounded-full opacity-55 blur-[80px]" style={{ background: '#1B16CC', bottom: '-180px', right: '-120px' }} />
      <div className="absolute h-[280px] w-[280px] rounded-full opacity-[0.12] blur-[80px]" style={{ background: '#B0B0B0', top: '60%', left: '8%' }} />
    </div>
  );
}
