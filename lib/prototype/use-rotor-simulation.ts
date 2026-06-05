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

type SimulationState = {
  angle: number;
  angularVelocity: number;
  energyFlow: number;
  printedCoins: number;
  rpm: string;
};

const INITIAL_STATE: SimulationState = {
  angle: 0,
  angularVelocity: 0,
  energyFlow: 0,
  printedCoins: 0,
  rpm: "0",
};

export function useRotorSimulation() {
  const stateRef = useRef(INITIAL_STATE);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [display, setDisplay] = useState<SimulationState>(INITIAL_STATE);

  const syncDisplay = useCallback(() => {
    const s = stateRef.current;
    setDisplay({
      angle: s.angle,
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
        rpm: formatRpm(angularVelocity),
      };

      setDisplay({
        angle,
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
    stateRef.current = { ...INITIAL_STATE };
    lastTimeRef.current = null;
    syncDisplay();
  }, [syncDisplay]);

  return {
    ...display,
    applySwipe,
    reset,
  };
}
