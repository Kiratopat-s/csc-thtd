"use client";

import dynamic from "next/dynamic";

const Aurora = dynamic(() => import("@/components/backgrounds/Aurora"), {
  ssr: false,
});

export default function AuroraBackground() {
  return (
    <Aurora
      colorStops={["#1a0a2e", "#7c3aed", "#f97316"]}
      amplitude={1.0}
      blend={0.5}
      speed={0.6}
    />
  );
}
