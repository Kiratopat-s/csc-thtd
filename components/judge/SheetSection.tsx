"use client";

import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Truck,
  ClipboardCheck,
  Wrench,
  PackageCheck,
  PackageX,
  type LucideIcon,
} from "lucide-react";
import ImageGallery from "./ImageGallery";

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck,
  ShieldAlert,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Truck,
  ClipboardCheck,
  Wrench,
  PackageCheck,
  PackageX,
};

export type IconName = keyof typeof ICON_MAP;

interface FieldConfig {
  label: string;
  value: string;
  icon: IconName;
  colorClass: string;
  imageUrl?: string; // optional image shown beside the status
}

interface SheetSectionProps {
  title: string;
  icon: IconName;
  fields: FieldConfig[];
  imageFields: { label: string; urls: string }[];
  notes?: { label: string; value: string }[];
}

export default function SheetSection({
  title,
  icon,
  fields,
  imageFields,
  notes,
}: SheetSectionProps) {
  const SectionIcon = ICON_MAP[icon];

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border-subtle bg-surface-elevated">
        <SectionIcon className="w-5 h-5 text-purple-light" />
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>

      <div className="p-6 space-y-6">
        {fields.map((f) => {
          const FieldIcon = ICON_MAP[f.icon];
          return (
            <div key={f.label}>
              <p className="text-xs text-text-muted mb-1.5 uppercase tracking-wide">
                {f.label}
              </p>
              <div className="flex items-center gap-4">
                {f.imageUrl && <ImageGallery urls={f.imageUrl} />}
                <div className="flex items-center gap-2">
                  <FieldIcon className={`w-5 h-5 ${f.colorClass}`} />
                  <span className={`text-sm font-medium ${f.colorClass}`}>
                    {f.value || "—"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {imageFields.map((img) => (
          <div key={img.label}>
            <p className="text-xs text-text-muted mb-2 uppercase tracking-wide">
              {img.label}
            </p>
            <ImageGallery urls={img.urls} />
          </div>
        ))}

        {notes?.map((n) =>
          n.value ? (
            <div key={n.label}>
              <p className="text-xs text-text-muted mb-1.5 uppercase tracking-wide">
                {n.label}
              </p>
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {n.value}
              </p>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
