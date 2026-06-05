import type { Metadata } from "next";
import { RotorPrototypeScreen } from "@/components/prototype/rotor-prototype-screen";

export const metadata: Metadata = {
  title: "Voltix Wheel — Rotor Prototype",
  description: "Technical prototype for Voltix Reactor rotor mechanics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrototypePage() {
  return <RotorPrototypeScreen />;
}
