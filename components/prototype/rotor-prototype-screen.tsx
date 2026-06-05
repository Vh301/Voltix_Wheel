"use client";

import Image from "next/image";
import { HorizontalRotor } from "@/components/prototype/horizontal-rotor";
import { useRotorSimulation } from "@/lib/prototype/use-rotor-simulation";
import { useSwipeImpulse } from "@/lib/prototype/use-swipe-impulse";

function HudStat({
  label,
  value,
  accent = "text-cyan-200",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="glass-card rounded-xl border-blue-400/20 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wide text-blue-200/50">
        {label}
      </p>
      <p className={`mt-0.5 font-mono text-sm font-semibold ${accent}`}>
        {value}
      </p>
    </div>
  );
}

export function RotorPrototypeScreen() {
  const simulation = useRotorSimulation();
  const swipeHandlers = useSwipeImpulse(simulation.applySwipe);

  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-[#070d1a] touch-none">
      <div className="absolute inset-0">
        <Image
          src="/images/General_page.png"
          alt="Voltix Reactor prototype background"
          fill
          priority
          className="object-cover object-top"
          sizes="430px"
        />
        <div className="absolute inset-0 bg-[#070d1a]/20" />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <header className="px-4 pt-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/80">
            Voltix Wheel Prototype
          </p>
          <h1 className="mt-1 text-lg font-bold text-amber-200">
            Reactor Rotor Test
          </h1>
        </header>

        <div className="relative flex flex-1 flex-col justify-center px-3 pb-4">
          <HorizontalRotor
            angle={simulation.angle}
            energyFlow={simulation.energyFlow}
          />

          <div
            className="absolute right-3 top-1/2 z-20 h-52 w-28 -translate-y-1/2 rounded-2xl border border-cyan-400/25 bg-cyan-400/5"
            {...swipeHandlers}
          >
            <div className="flex h-full flex-col items-center justify-center gap-2 px-2 text-center">
              <span className="text-2xl text-cyan-300/80">↤</span>
              <p className="text-[11px] font-medium leading-tight text-cyan-100/75">
                Swipe right to left
              </p>
              <p className="text-[10px] leading-tight text-blue-100/45">
                Faster swipe = stronger impulse
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-3 px-4 pb-5">
          <div className="grid grid-cols-2 gap-2">
            <HudStat label="Rotor speed" value={`${simulation.rpm} RPM`} />
            <HudStat
              label="Energy flow"
              value={`${Math.round(simulation.energyFlow * 100)}%`}
              accent="text-amber-200"
            />
            <HudStat
              label="Printed coins"
              value={simulation.printedCoins.toFixed(1)}
              accent="text-amber-300"
            />
            <HudStat
              label="Angular velocity"
              value={`${simulation.angularVelocity.toFixed(2)} rad/s`}
            />
          </div>

          <button
            type="button"
            onClick={simulation.reset}
            className="w-full rounded-xl border border-amber-400/30 bg-amber-500/15 px-4 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/25"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
