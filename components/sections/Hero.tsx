"use client";

import dynamic from "next/dynamic";
import { Zap } from "lucide-react";
import GradientText from "@/components/text/GradientText";
import StarBorder from "@/components/ui/StarBorder";

const Aurora = dynamic(() => import("@/components/backgrounds/Aurora"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#1a0a2e", "#7c3aed", "#f97316"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center gap-8 px-6 text-center">
        {/* Lucide Icon */}
        <Zap className="w-16 h-16 text-orange-accent" strokeWidth={1.5} />

        {/* App Name */}
        <GradientText
          colors={["#a78bfa", "#f97316", "#7c3aed", "#fb923c"]}
          animationSpeed={6}
          className="text-4xl md:text-6xl lg:text-7xl font-bold"
        >
          การแข่งขันทักษะฝีมือช่าง 2569
        </GradientText>

        {/* Login Button */}
        <StarBorder
          as="a"
          href="/login"
          color="#7c3aed"
          speed="5s"
          backgroundColor="#0a0a0a"
          textColor="#ededed"
          borderColor="#262626"
          className="mt-4"
        >
          เข้าสู่ระบบ
        </StarBorder>
      </div>
    </section>
  );
}
