"use client";

import Image from "next/image";
import { FlywheelGeneratorControl } from "@/components/prototype/flywheel-generator-control";
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
        <div className="flex-1" aria-hidden />

        <div className="relative space-y-2 px-3 pb-4 pt-1">
          <button
            type="button"
            onClick={simulation.reset}
            className="w-full rounded-xl border border-amber-400/30 bg-amber-500/15 px-4 py-2.5 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/25"
          >
            Reset
          </button>

          <div className="grid grid-cols-2 gap-1.5">
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

          <FlywheelGeneratorControl
            toothBeltRef={simulation.toothBeltRef}
            energyFlow={simulation.energyFlow}
            swipeHandlers={swipeHandlers}
          />

          <p className="pointer-events-none text-center text-[10px] leading-tight text-cyan-100/50">
            Swipe front teeth left → right · faster = stronger spin
          </p>
        </div>
      </div>
    </div>
  );
}
