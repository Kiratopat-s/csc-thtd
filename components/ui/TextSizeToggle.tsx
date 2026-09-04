"use client";

import { useTextSize, type TextSize } from "@/lib/text-size-context";

const SIZES: { value: TextSize; label: string }[] = [
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "2xl", label: "2XL" },
];

export default function TextSizeToggle() {
  const { size, setSize } = useTextSize();

  return (
    <div
      role="radiogroup"
      aria-label="ขนาดตัวอักษร"
      className="flex items-center gap-0.5 rounded-lg bg-surface-elevated p-0.5"
    >
      {SIZES.map(({ value, label }) => (
        <button
          key={value}
          role="radio"
          aria-checked={size === value}
          aria-label={`ขนาด ${label}`}
          onClick={() => setSize(value)}
          className={`px-2 py-1 rounded-md text-xs font-semibold transition-colors duration-200 ${
            size === value
              ? "bg-purple-medium/30 text-purple-light"
              : "text-text-muted hover:text-foreground hover:bg-surface/50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
