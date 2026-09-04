import { getDriveClient } from "@/lib/google-sheets";

// Simple in-memory LRU cache for Drive image buffers
const CACHE_MAX = 200; // max images cached
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  buffer: Buffer;
  contentType: string;
  cachedAt: number;
}

const cache = new Map<string, CacheEntry>();

function getCached(fileId: string): CacheEntry | null {
  const entry = cache.get(fileId);
  if (!entry) return null;
  if (Date.now() - entry.cachedAt > CACHE_TTL) {
    cache.delete(fileId);
    return null;
  }
  // Move to end (most recently used)
  cache.delete(fileId);
  cache.set(fileId, entry);
  return entry;
}

function setCache(fileId: string, buffer: Buffer, contentType: string) {
  // Evict oldest if at capacity
  if (cache.size >= CACHE_MAX) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
  cache.set(fileId, { buffer, contentType, cachedAt: Date.now() });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await params;

  if (!fileId || !/^[a-zA-Z0-9_-]+$/.test(fileId)) {
    return new Response("Invalid file ID", { status: 400 });
  }

  // Check cache first
  const cached = getCached(fileId);
  if (cached) {
    return new Response(new Uint8Array(cached.buffer), {
      headers: {
        "Content-Type": cached.contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  try {
    const drive = getDriveClient();
    const res = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" },
    );

    const contentType =
      (res.headers["content-type"] as string) ?? "image/jpeg";
    const buffer = Buffer.from(res.data as ArrayBuffer);

    setCache(fileId, buffer, contentType);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("Image not found", { status: 404 });
  }
}
