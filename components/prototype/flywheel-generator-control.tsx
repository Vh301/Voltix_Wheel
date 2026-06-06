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

function RotorLed({
  energyFlow,
  side,
}: {
  energyFlow: number;
  side: "left" | "right";
}) {
  const active = energyFlow > 0.01;
  const blinkDuration = `${Math.max(0.1, 1.05 - energyFlow * 0.92)}s`;
  const isLeft = side === "left";

  return (
    <div
      className={`pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 rounded-sm border border-zinc-600/70 bg-gradient-to-b from-zinc-800 to-zinc-950 p-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.65)] ${
        isLeft ? "right-1" : "left-1"
      }`}
    >
      <div
        className="h-3 w-3 rounded-full ring-1 ring-emerald-400/30"
        style={{
          animation: active
            ? `rotor-led-pulse ${blinkDuration} ease-in-out infinite`
            : "none",
          animationDelay: isLeft ? "0s" : `calc(${blinkDuration} / 2)`,
          opacity: active ? 0.55 + energyFlow * 0.45 : 0.18,
          background: active
            ? `radial-gradient(circle at 32% 28%, rgba(167,243,208,${0.95}) 0%, rgba(52,211,153,${0.85 + energyFlow * 0.15}) 38%, rgba(5,150,105,${0.75 + energyFlow * 0.2}) 72%, rgba(6,78,59,0.95) 100%)`
            : "radial-gradient(circle, rgba(6,78,59,0.55) 0%, rgba(2,44,34,0.9) 100%)",
          boxShadow: active
            ? `0 0 ${6 + energyFlow * 16}px rgba(52,211,153,${0.65 + energyFlow * 0.35}), 0 0 ${2 + energyFlow * 6}px rgba(167,243,208,${0.5 + energyFlow * 0.4})`
            : "inset 0 0 4px rgba(0,0,0,0.6)",
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
  const isLeft = side === "left";

  return (
    <div
      className={`relative z-10 w-[14%] min-w-[2.5rem] shrink-0 ${
        isLeft ? "rounded-l-lg" : "rounded-r-lg"
      }`}
    >
      <div className="absolute inset-y-0.5 inset-x-0 overflow-hidden rounded-[inherit] border border-zinc-500/50 bg-gradient-to-br from-zinc-600/90 via-zinc-900 to-black shadow-[inset_0_2px_8px_rgba(255,255,255,0.06),inset_0_-6px_12px_rgba(0,0,0,0.65)]" />

      <RotorLed energyFlow={energyFlow} side={side} />

      <div
        className={`pointer-events-none absolute inset-y-2 ${isLeft ? "left-1" : "right-1"} w-px bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent`}
        style={{ opacity: 0.35 + energyFlow * 0.55 }}
      />

      <div className="absolute inset-y-2.5 left-1/2 w-[52%] -translate-x-1/2 overflow-hidden rounded-md border border-amber-600/40 bg-gradient-to-b from-amber-400/20 via-amber-950/90 to-zinc-950 shadow-inner">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="absolute left-0 right-0 border-t border-amber-500/25"
            style={{ top: `${8 + index * 12}%` }}
          />
        ))}
        <div
          className="absolute inset-1 rounded-sm border border-amber-300/15"
          style={{
            boxShadow: `inset 0 0 ${8 + energyFlow * 14}px rgba(251,191,36,${glow * 0.4})`,
          }}
        />
      </div>

      <div
        className={`absolute top-2 ${isLeft ? "right-1.5" : "left-1.5"} h-1.5 w-1.5 rounded-full bg-zinc-400/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]`}
      />
      <div
        className={`absolute bottom-2 ${isLeft ? "right-1.5" : "left-1.5"} h-1.5 w-1.5 rounded-full bg-zinc-400/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]`}
      />

      <div
        className={`absolute top-1/2 ${isLeft ? "-right-px" : "-left-px"} h-10 w-1 -translate-y-1/2 rounded-full bg-cyan-300 blur-[3px]`}
        style={{ opacity: 0.25 + energyFlow * 0.75 }}
      />
      <div
        className={`absolute top-1/2 ${isLeft ? "-right-0.5" : "-left-0.5"} h-6 w-0.5 -translate-y-1/2 rounded-full bg-cyan-200/90`}
        style={{ opacity: 0.4 + energyFlow * 0.6 }}
      />
    </div>
  );
}

function ShellBolt({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full border border-zinc-500/60 bg-gradient-to-br from-zinc-400/70 to-zinc-800 shadow-inner ${className}`}
    />
  );
}

function VentGrille({ className }: { className: string }) {
  return (
    <div className={`pointer-events-none absolute flex gap-0.5 ${className}`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-2 w-0.5 rounded-full bg-zinc-800/90 shadow-[inset_0_0_2px_rgba(0,0,0,0.8)]"
        />
      ))}
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
        className="generator-shell relative overflow-hidden rounded-xl border border-zinc-500/40 bg-gradient-to-b from-zinc-600/95 via-zinc-900 to-black p-[3px] shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
        style={{
          boxShadow: `0 0 ${12 + energyFlow * 28}px rgba(34,211,238,${glow * 0.22}), 0 12px 32px rgba(0,0,0,0.6)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.07] via-transparent to-black/30" />

        <div className="relative overflow-hidden rounded-[10px] border border-zinc-700/80 bg-gradient-to-b from-zinc-800 via-zinc-950 to-black">
          {/* Top energy rail */}
          <div className="pointer-events-none relative mx-3 mt-2 h-2 overflow-hidden rounded-full border border-cyan-500/30 bg-zinc-950/80">
            <div
              className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-gradient-to-r from-cyan-500/10 via-cyan-400/70 to-cyan-300/20 blur-[0.5px]"
              style={{ opacity: channelGlow }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
              style={{ opacity: 0.2 + energyFlow * 0.5 }}
            />
          </div>

          {/* Bottom energy rail */}
          <div
            className="pointer-events-none absolute inset-x-[12%] bottom-2 h-1 overflow-hidden rounded-full bg-cyan-950/80"
            style={{ opacity: 0.5 + energyFlow * 0.5 }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-cyan-400/60 to-cyan-500/20"
              style={{ opacity: channelGlow * 0.85 }}
            />
          </div>

          <ShellBolt className="left-2 top-2" />
          <ShellBolt className="right-2 top-2" />
          <ShellBolt className="bottom-2 left-2" />
          <ShellBolt className="bottom-2 right-2" />

          <VentGrille className="bottom-2.5 left-1/2 -translate-x-1/2" />

          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[7px] font-bold uppercase tracking-[0.25em] text-cyan-300/25 [writing-mode:vertical-rl] rotate-180">
            VX
          </div>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[7px] font-bold uppercase tracking-[0.25em] text-cyan-300/25 [writing-mode:vertical-rl]">
            CORE
          </div>

          <div className="energy-side-modules relative flex h-[4.85rem] items-stretch px-1.5 pb-2.5 pt-3">
            <SideModule side="left" energyFlow={energyFlow} />

            <div className="flywheel-window relative mx-1 min-w-0 flex-[1_1_72%] overflow-hidden rounded-md border-2 border-zinc-600/80 bg-black shadow-[inset_0_0_0_1px_rgba(34,211,238,0.12),inset_0_6px_20px_rgba(0,0,0,0.9)]">
              <div className="pointer-events-none absolute inset-0 z-[15] overflow-hidden rounded-[inherit] ring-1 ring-inset ring-cyan-400/15" />
              <div
                className="pointer-events-none absolute left-1.5 top-1.5 z-[15] h-1 w-1 rounded-full bg-cyan-400/80"
                style={{ opacity: 0.35 + energyFlow * 0.65 }}
              />
              <div
                className="pointer-events-none absolute right-1.5 top-1.5 z-[15] h-1 w-1 rounded-full bg-cyan-400/80"
                style={{ opacity: 0.35 + energyFlow * 0.65 }}
              />

              <div
                className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit] bg-gradient-to-b from-cyan-400/10 via-transparent to-cyan-500/10"
                style={{ opacity: 0.15 + energyFlow * 0.55 }}
              />

              <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
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
            </div>

            <SideModule side="right" energyFlow={energyFlow} />
          </div>
        </div>
      </div>

      <div
        className="swipe-hit-zone absolute inset-x-[14%] top-[18px] z-30 h-[3.5rem] touch-none"
        aria-label="Swipe the flywheel teeth left to right"
        {...swipeHandlers}
      />

      <div
        className="pointer-events-none absolute inset-x-[10%] -bottom-1.5 h-5 rounded-full bg-cyan-400/25 blur-xl"
        style={{ opacity: 0.1 + energyFlow * 0.8 }}
      />
      <div
        className="pointer-events-none absolute inset-x-[22%] -bottom-0.5 h-2 rounded-full bg-cyan-300/30 blur-md"
        style={{ opacity: 0.08 + energyFlow * 0.65 }}
      />
    </div>
  );
}
