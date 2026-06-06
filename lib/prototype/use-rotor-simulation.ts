"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  applySwipeImpulse,
  formatRpm,
  getEnergyFlow,
  integrateAngle,
  integrateAngularVelocity,
  integratePrintedCoins,
} from "@/lib/prototype/rotor-physics";

type HudState = {
  angularVelocity: number;
  energyFlow: number;
  printedCoins: number;
  rpm: string;
};

const INITIAL_HUD: HudState = {
  angularVelocity: 0,
  energyFlow: 0,
  printedCoins: 0,
  rpm: "0",
};

type SimulationRef = {
  angle: number;
  angularVelocity: number;
  energyFlow: number;
  printedCoins: number;
};

const INITIAL_SIM: SimulationRef = {
  angle: 0,
  angularVelocity: 0,
  energyFlow: 0,
  printedCoins: 0,
};

function applySpinTransform(element: HTMLDivElement | null, angle: number) {
  if (element) {
    element.style.transform = `rotateZ(${angle}deg)`;
  }
}

export function useRotorSimulation() {
  const stateRef = useRef<SimulationRef>(INITIAL_SIM);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState<HudState>(INITIAL_HUD);

  const syncDisplay = useCallback(() => {
    const s = stateRef.current;
    setDisplay({
      angularVelocity: s.angularVelocity,
      energyFlow: s.energyFlow,
      printedCoins: s.printedCoins,
      rpm: formatRpm(s.angularVelocity),
    });
  }, []);

  useEffect(() => {
    const tick = (timestamp: number) => {
      const last = lastTimeRef.current ?? timestamp;
      lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - last) / 1000, 0.05);

      const current = stateRef.current;
      const angularVelocity = integrateAngularVelocity(
        current.angularVelocity,
        dt,
      );
      const angle = integrateAngle(current.angle, angularVelocity, dt);
      const energyFlow = getEnergyFlow(angularVelocity);
      const printedCoins = integratePrintedCoins(
        current.printedCoins,
        energyFlow,
        dt,
      );

      stateRef.current = {
        angle,
        angularVelocity,
        energyFlow,
        printedCoins,
      };

      applySpinTransform(spinRef.current, angle);

      setDisplay({
        angularVelocity,
        energyFlow,
        printedCoins,
        rpm: formatRpm(angularVelocity),
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const applySwipe = useCallback(
    (swipeVelocityPxPerMs: number) => {
      stateRef.current = {
        ...stateRef.current,
        angularVelocity: applySwipeImpulse(
          stateRef.current.angularVelocity,
          swipeVelocityPxPerMs,
        ),
      };
      syncDisplay();
    },
    [syncDisplay],
  );

  const reset = useCallback(() => {
    stateRef.current = { ...INITIAL_SIM };
    lastTimeRef.current = null;
    applySpinTransform(spinRef.current, 0);
    syncDisplay();
  }, [syncDisplay]);

  return {
    ...display,
    spinRef,
    applySwipe,
    reset,
  };
};
