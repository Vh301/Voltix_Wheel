type HorizontalRotorProps = {
  angle: number;
  energyFlow: number;
};

export function HorizontalRotor({ angle, energyFlow }: HorizontalRotorProps) {
  const glow = 0.25 + energyFlow * 0.75;

  return (
    <div className="pointer-events-none relative mx-auto h-36 w-[92%] max-w-sm perspective-[900px]">
      <div
        className="relative h-full w-full"
        style={{ transform: "rotateX(12deg)" }}
      >
        <div
          className="absolute inset-x-[4%] top-1/2 h-28 -translate-y-1/2"
          style={{
            transform: `rotateX(${angle}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-0 rounded-[999px] border-2 border-amber-400/40 bg-gradient-to-b from-slate-700 via-slate-900 to-black shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
            style={{
              boxShadow: `0 0 ${24 + energyFlow * 40}px rgba(34,211,238,${glow * 0.35})`,
            }}
          >
            <div className="absolute inset-[6px] rounded-[999px] border border-cyan-400/25 bg-gradient-to-b from-blue-900/80 via-slate-950 to-black" />
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 h-[88%] w-[3px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-cyan-300/10 via-amber-300/35 to-cyan-300/10"
                style={{ transform: `translate(-50%, -50%) rotateZ(${index * 22.5}deg)` }}
              />
            ))}
            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/50 bg-gradient-to-br from-amber-500/30 via-slate-800 to-slate-950 shadow-inner" />
            <div className="absolute inset-x-[8%] top-[18%] h-[18%] rounded-full bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          <div className="absolute -left-3 top-1/2 h-10 w-6 -translate-y-1/2 rounded-l-full border border-slate-500/50 bg-gradient-to-r from-slate-600 to-slate-800" />
          <div className="absolute -right-3 top-1/2 h-10 w-6 -translate-y-1/2 rounded-r-full border border-slate-500/50 bg-gradient-to-l from-slate-600 to-slate-800" />
        </div>
      </div>

      <div
        className="absolute inset-x-[8%] bottom-1 h-3 rounded-full bg-cyan-400/20 blur-md transition-opacity duration-200"
        style={{ opacity: 0.2 + energyFlow * 0.8 }}
      />
    </div>
  );
}
