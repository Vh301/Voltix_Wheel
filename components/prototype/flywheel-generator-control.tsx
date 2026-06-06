import type { RefObject } from "react";
import { TOOTH_BELT } from "@/lib/prototype/rotor-physics";

type SwipeHandlers = {
  onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
};

type FlywheelGeneratorControlProps = {
  toothBeltRef: RefObject<HTMLDivElement | null>;
  energyFlow: number;
  swipeHandlers: SwipeHandlers;
};

const TOOTH_REPEAT = 36;

/** One pitch: root valley + trapezoidal gear tooth (side-view rim profile). */
function GearPitch() {
  const { patternWidthPx, toothWidthPx, toothGapPx } = TOOTH_BELT;

  return (
    <div
      className="relative h-full shrink-0"
      style={{ width: patternWidthPx }}
    >
      {/* Root valley between teeth */}
      <div
        className="absolute bottom-0 top-[40%] bg-gradient-to-b from-zinc-950 via-black to-zinc-950"
        style={{ left: 0, width: toothGapPx }}
      />

      {/* Trapezoidal tooth: wide at root, narrower at crest */}
      <div
        className="absolute bottom-0 border-x border-zinc-500/40"
        style={{
          left: toothGapPx,
          width: toothWidthPx,
          top: "5%",
          clipPath:
            "polygon(14% 100%, 0% 36%, 50% 0%, 100% 36%, 86% 100%)",
          background:
            "linear-gradient(to right, #27272a 0%, #71717a 42%, #d4d4d8 50%, #71717a 58%, #27272a 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 4px rgba(0,0,0,0.45)",
        }}
      />

      {/* Flat crest line */}
      <div
        className="absolute bg-gradient-to-r from-transparent via-white/25 to-transparent"
        style={{
          left: toothGapPx + toothWidthPx * 0.22,
          width: toothWidthPx * 0.56,
          top: "6%",
          height: 2,
        }}
      />

      {/* Left flank shadow */}
      <div
        className="absolute bottom-0 bg-black/25"
        style={{
          left: toothGapPx,
          width: toothWidthPx * 0.22,
          top: "36%",
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />
    </div>
  );
}

function SideModule({
  side,
  energyFlow,
}: {
  side: "left" | "right";
  energyFlow: number;
}) {
  const glow = 0.25 + energyFlow * 0.75;

  return (
    <div
      className={`relative z-10 w-[13%] min-w-[2.4rem] shrink-0 ${
        side === "left" ? "rounded-l-md" : "rounded-r-md"
      }`}
    >
      <div className="absolute inset-y-1 inset-x-0 rounded-sm border border-zinc-600/70 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black shadow-inner" />
      <div
        className="absolute inset-y-2 left-1/2 w-[58%] -translate-x-1/2 rounded-full border border-amber-700/50 bg-gradient-to-b from-amber-500/35 via-amber-900/80 to-amber-950"
        style={{
          boxShadow: `inset 0 0 ${6 + energyFlow * 10}px rgba(251,191,36,${glow * 0.35})`,
        }}
      />
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="absolute left-1/2 w-[72%] -translate-x-1/2 rounded-full border border-amber-600/30 bg-amber-800/40"
          style={{
            top: `${14 + index * 14}%`,
            height: "7%",
          }}
        />
      ))}
      <div
        className={`absolute top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-cyan-400/70 blur-[2px] ${
          side === "left" ? "-right-0.5" : "-left-0.5"
        }`}
        style={{ opacity: 0.35 + energyFlow * 0.65 }}
      />
    </div>
  );
}

export function FlywheelGeneratorControl({
  toothBeltRef,
  energyFlow,
  swipeHandlers,
}: FlywheelGeneratorControlProps) {
  const glow = 0.2 + energyFlow * 0.8;
  const channelGlow = 0.3 + energyFlow * 0.7;

  return (
    <div className="relative w-full">
      <div
        className="generator-shell relative overflow-hidden rounded-lg border border-zinc-600/80 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
        style={{
          boxShadow: `0 0 ${10 + energyFlow * 24}px rgba(34,211,238,${glow * 0.25}), 0 10px 28px rgba(0,0,0,0.55)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-[10%] top-1.5 h-1 rounded-full bg-cyan-400/80 blur-[1px]"
          style={{ opacity: channelGlow }}
        />
        <div
          className="pointer-events-none absolute inset-x-[10%] bottom-1.5 h-0.5 rounded-full bg-cyan-400/60 blur-[1px]"
          style={{ opacity: channelGlow * 0.85 }}
        />

        {["left-[3%]", "right-[3%]"].map((position) => (
          <div
            key={position}
            className={`pointer-events-none absolute top-1/2 ${position} h-2 w-2 -translate-y-1/2 rounded-full bg-zinc-500/80 shadow-inner`}
          />
        ))}

        <div className="energy-side-modules relative flex h-[4.75rem] items-stretch px-0.5 py-2">
          <SideModule side="left" energyFlow={energyFlow} />

          <div className="flywheel-window relative mx-0.5 min-w-0 flex-[1_1_72%] overflow-hidden rounded-sm border border-zinc-600/90 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 shadow-[inset_0_4px_16px_rgba(0,0,0,0.85)]">
            <div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-cyan-400/10 via-transparent to-cyan-500/10"
              style={{ opacity: 0.15 + energyFlow * 0.55 }}
            />

            <div
              ref={toothBeltRef}
              className="moving-tooth-belt absolute inset-y-1 left-0 flex items-end will-change-transform"
              style={{ transform: "translateX(0px)" }}
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[40%] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900" />
              {Array.from({ length: TOOTH_REPEAT }).map((_, index) => (
                <GearPitch key={index} />
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-3 bg-gradient-to-r from-black/80 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-3 bg-gradient-to-r from-transparent to-black/80" />
          </div>

          <SideModule side="right" energyFlow={energyFlow} />
        </div>
      </div>

      <div
        className="swipe-hit-zone absolute inset-x-[14%] top-2 z-30 h-[3.5rem] touch-none"
        aria-label="Swipe the flywheel teeth right to left"
        {...swipeHandlers}
      />

      <div
        className="pointer-events-none absolute inset-x-[12%] -bottom-1 h-4 rounded-full bg-cyan-400/20 blur-lg"
        style={{ opacity: 0.12 + energyFlow * 0.75 }}
      />
    </div>
  );
}
