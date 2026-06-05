"use client";

import { useCallback, useRef, type MouseEvent, type TouchEvent } from "react";

type TouchPoint = {
  x: number;
  t: number;
};

function velocityFromPoints(points: TouchPoint[]) {
  if (points.length < 2) return 0;

  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  const dt = last.t - prev.t;
  if (dt <= 0) return 0;

  return (last.x - prev.x) / dt;
}

export function useSwipeImpulse(onSwipe: (velocityPxPerMs: number) => void) {
  const pointsRef = useRef<TouchPoint[]>([]);
  const activeRef = useRef(false);

  const start = useCallback((clientX: number) => {
    activeRef.current = true;
    pointsRef.current = [{ x: clientX, t: performance.now() }];
  }, []);

  const move = useCallback((clientX: number) => {
    if (!activeRef.current) return;
    const now = performance.now();
    const points = [...pointsRef.current, { x: clientX, t: now }].slice(-6);
    pointsRef.current = points;
  }, []);

  const end = useCallback(() => {
    if (!activeRef.current) return;
    activeRef.current = false;

    const velocity = velocityFromPoints(pointsRef.current);
    pointsRef.current = [];

    if (velocity < -0.05) {
      onSwipe(velocity);
    }
  }, [onSwipe]);

  const bind = {
    onTouchStart: (event: TouchEvent<HTMLDivElement>) => {
      start(event.changedTouches[0]?.clientX ?? 0);
    },
    onTouchMove: (event: TouchEvent<HTMLDivElement>) => {
      move(event.changedTouches[0]?.clientX ?? 0);
    },
    onTouchEnd: () => end(),
    onTouchCancel: () => end(),
    onMouseDown: (event: MouseEvent<HTMLDivElement>) => {
      start(event.clientX);
    },
    onMouseMove: (event: MouseEvent<HTMLDivElement>) => {
      if (event.buttons !== 1) return;
      move(event.clientX);
    },
    onMouseUp: () => end(),
    onMouseLeave: () => end(),
  };

  return bind;
}
