type GearFlywheelProps = {
  angle: number;
  energyFlow: number;
};

const TOOTH_COUNT = 20;

export function GearFlywheel({ angle, energyFlow }: GearFlywheelProps) {
  const glow = 0.15 + energyFlow * 0.85;
  const plasmaOpacity = 0.35 + energyFlow * 0.65;

  return (
    <div className="pointer-events-none relative mx-auto h-56 w-full max-w-[22rem] perspective-[1100px]">
      <div
        className="relative mx-auto h-52 w-52 origin-center"
        style={{
          transform: "rotateX(62deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `rotateZ(${angle}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              filter: `drop-shadow(0 0 ${18 + energyFlow * 36}px rgba(34,211,238,${glow * 0.55})) drop-shadow(0 12px 28px rgba(0,0,0,0.65))`,
            }}
          >
            {Array.from({ length: TOOTH_COUNT }).map((_, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-0 h-[11%] w-[7.5%] -translate-x-1/2 rounded-[2px] border border-zinc-600/50 bg-gradient-to-b from-zinc-500 via-zinc-800 to-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                style={{
                  transformOrigin: "50% 450%",
                  transform: `rotateZ(${index * (360 / TOOTH_COUNT)}deg)`,
                }}
              />
            ))}

            <div className="absolute inset-[7%] rounded-full border-2 border-zinc-700/80 bg-gradient-to-b from-zinc-600 via-zinc-900 to-black shadow-[inset_0_8px_24px_rgba(0,0,0,0.75)]">
              <div className="absolute inset-[6%] rounded-full border border-amber-700/40 bg-gradient-to-br from-amber-900/90 via-amber-950/80 to-zinc-950">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="absolute left-1/2 top-1/2 h-[42%] w-[9%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-amber-400/70 via-amber-700/50 to-amber-950/90 shadow-[inset_0_0_6px_rgba(251,191,36,0.35)]"
                    style={{
                      transform: `translate(-50%, -50%) rotateZ(${index * 30}deg) translateY(-38%)`,
                    }}
                  />
                ))}
              </div>

              <div
                className="absolute inset-[22%] rounded-full border border-cyan-400/35 bg-gradient-to-b from-cyan-400/25 via-blue-950/90 to-black transition-opacity duration-150"
                style={{
                  opacity: plasmaOpacity,
                  boxShadow: `0 0 ${12 + energyFlow * 28}px rgba(34,211,238,${0.35 + energyFlow * 0.45}), inset 0 0 ${8 + energyFlow * 16}px rgba(56,189,248,${0.25 + energyFlow * 0.35})`,
                }}
              />

              <div className="absolute inset-[34%] rounded-full border border-zinc-600/60 bg-gradient-to-br from-zinc-700 via-zinc-900 to-black shadow-inner">
                <div className="absolute inset-[18%] rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-300/20 via-slate-900 to-black">
                  <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-amber-300/80 via-cyan-300/70 to-blue-500/80 shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
                </div>
              </div>
            </div>

            <div className="absolute inset-x-[12%] top-[10%] h-[22%] rounded-full bg-gradient-to-b from-white/12 to-transparent" />
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-[10%] bottom-2 h-6 rounded-full bg-cyan-400/25 blur-xl transition-opacity duration-200"
        style={{ opacity: 0.15 + energyFlow * 0.85 }}
      />
      <div
        className="absolute inset-x-[18%] bottom-5 h-3 rounded-full bg-cyan-300/20 blur-md transition-opacity duration-200"
        style={{ opacity: 0.1 + energyFlow * 0.7 }}
      />
    </div>
  );
}
