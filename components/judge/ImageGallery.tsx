"use client";

import { useState } from "react";
import { driveImageUrl } from "@/lib/drive-image";

interface ImageGalleryProps {
  urls: string; // raw cell value (single URL or comma-separated)
}

export default function ImageGallery({ urls }: ImageGalleryProps) {
  const fileIds = urls
    .split(",")
    .map((u) => u.trim())
    .map((u) => {
      const m = u.match(/[?&]id=([^&]+)/);
      return m?.[1] ?? "";
    })
    .filter(Boolean);

  if (fileIds.length === 0) {
    return (
      <div className="text-xs text-text-muted italic">ไม่มีรูปภาพ</div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
      {fileIds.map((id) => (
        <GalleryImage key={id} fileId={id} />
      ))}
    </div>
  );
}

function GalleryImage({ fileId }: { fileId: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const src = driveImageUrl(fileId);

  if (error) {
    return (
      <div className="flex-shrink-0 w-40 h-40 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center text-xs text-text-muted">
        โหลดรูปไม่สำเร็จ
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 relative">
      {!loaded && (
        <div className="w-40 h-40 rounded-lg bg-surface-elevated animate-pulse" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-40 h-40 object-cover rounded-lg border border-border-subtle cursor-pointer hover:ring-2 hover:ring-purple-medium transition-all ${
          loaded ? "block" : "hidden"
        }`}
        onClick={() => window.open(src, "_blank")}
      />
    </div>
  );
}
