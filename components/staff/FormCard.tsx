"use client";

import { ClipboardCheck, Truck, Wrench, type LucideIcon } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  "clipboard-check": ClipboardCheck,
  wrench: Wrench,
};

interface FormCardProps {
  title: string;
  iconKey: string;
  href: string;
}

export default function FormCard({ title, iconKey, href }: FormCardProps) {
  const Icon = iconMap[iconKey];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transition-transform duration-200 hover:scale-[1.03]"
    >
      <SpotlightCard
        spotlightColor="rgba(124, 58, 237, 0.25)"
        className="flex flex-col items-center gap-4 text-center cursor-pointer"
      >
        <Icon
          className="w-12 h-12 text-purple-light group-hover:text-orange-accent transition-colors duration-200"
          strokeWidth={1.5}
        />
        <span className="text-lg font-semibold text-foreground">{title}</span>
      </SpotlightCard>
    </a>
  );
}
