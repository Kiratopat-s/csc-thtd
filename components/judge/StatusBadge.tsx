"use client";

import { CheckCircle2, Clock } from "lucide-react";

interface StatusBadgeProps {
  submitted: boolean;
}

export default function StatusBadge({ submitted }: StatusBadgeProps) {
  if (submitted) {
    return (
      <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400">
        <CheckCircle2 className="w-4 h-4" />
        <span className="text-xs font-medium">ส่งแล้ว</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-text-muted">
      <Clock className="w-4 h-4" />
      <span className="text-xs font-medium">รอส่ง</span>
    </span>
  );
}
