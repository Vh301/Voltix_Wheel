"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  applySwipeImpulse,
  formatRpm,
  getEnergyFlow,
  integrateAngularVelocity,
  integratePrintedCoins,
  integrateToothOffset,
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
  toothOffset: number;
  angularVelocity: number;
  energyFlow: number;
  printedCoins: number;
};

const INITIAL_SIM: SimulationRef = {
  toothOffset: 0,
  angularVelocity: 0,
  energyFlow: 0,
  printedCoins: 0,
};

function applyBeltTransform(element: HTMLDivElement | null, offset: number) {
  if (element) {
    element.style.transform = `translateX(${-offset}px)`;
  }
}

export function useRotorSimulation() {
  const stateRef = useRef<SimulationRef>(INITIAL_SIM);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const toothBeltRef = useRef<HTMLDivElement>(null);
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
      const toothOffset = integrateToothOffset(
        current.toothOffset,
        angularVelocity,
        dt,
      );
      const energyFlow = getEnergyFlow(angularVelocity);
      const printedCoins = integratePrintedCoins(
        current.printedCoins,
        energyFlow,
        dt,
      );

      stateRef.current = {
        toothOffset,
        angularVelocity,
        energyFlow,
        printedCoins,
      };

      applyBeltTransform(toothBeltRef.current, toothOffset);

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
    applyBeltTransform(toothBeltRef.current, 0);
    syncDisplay();
  }, [syncDisplay]);

  return {
    ...display,
    toothBeltRef,
    applySwipe,
    reset,
  };
};
