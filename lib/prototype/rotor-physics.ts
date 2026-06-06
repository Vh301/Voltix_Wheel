export const ROTOR_PHYSICS = {
  maxAngularVelocity: 18,
  minAngularVelocity: 0.04,
  impulseScale: 0.022,
  frictionPerSecond: 0.88,
  printRate: 42,
} as const;

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Swipe right→left (negative px/ms) adds positive angular velocity. */
export function applySwipeImpulse(
  currentVelocity: number,
  swipeVelocityPxPerMs: number,
) {
  const impulse = -swipeVelocityPxPerMs * ROTOR_PHYSICS.impulseScale * 1000;
  return clamp(
    currentVelocity + impulse,
    -ROTOR_PHYSICS.maxAngularVelocity,
    ROTOR_PHYSICS.maxAngularVelocity,
  );
}

export function integrateAngularVelocity(velocity: number, dtSeconds: number) {
  if (Math.abs(velocity) < ROTOR_PHYSICS.minAngularVelocity) {
    return 0;
  }

  const next =
    velocity * Math.pow(ROTOR_PHYSICS.frictionPerSecond, dtSeconds);

  return Math.abs(next) < ROTOR_PHYSICS.minAngularVelocity ? 0 : next;
}

export function integrateAngle(angle: number, velocity: number, dtSeconds: number) {
  const next = angle + velocity * dtSeconds * (180 / Math.PI);
  return wrapDisplayAngle(next);
}

/** Keeps CSS angle in a small range without visible discontinuity. */
export function wrapDisplayAngle(angle: number) {
  const wrapped = angle % 360;
  return wrapped < 0 ? wrapped + 360 : wrapped;
}

export function getEnergyFlow(angularVelocity: number) {
  return clamp(
    Math.abs(angularVelocity) / ROTOR_PHYSICS.maxAngularVelocity,
    0,
    1,
  );
}

export function integratePrintedCoins(
  current: number,
  energyFlow: number,
  dtSeconds: number,
) {
  if (energyFlow <= 0) return current;
  return current + energyFlow * ROTOR_PHYSICS.printRate * dtSeconds;
}

export function formatRpm(angularVelocity: number) {
  const rpm = (Math.abs(angularVelocity) * 60) / (2 * Math.PI);
  return rpm.toFixed(0);
}
