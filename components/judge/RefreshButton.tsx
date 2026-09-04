"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  function handleClick() {
    setSpinning(true);
    router.refresh();
    // Reset spin after animation completes
    setTimeout(() => setSpinning(false), 750);
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-elevated border border-border-subtle text-text-muted hover:text-foreground hover:border-purple-medium/50 transition-colors"
    >
      <RefreshCw
        className={`w-3.5 h-3.5 ${spinning ? "animate-spin" : ""}`}
      />
      รีเฟรช
    </button>
  );
}
