export function extractDriveFileIds(urls: string): string[] {
  if (!urls) return [];
  return urls
    .split(",")
    .map((u) => u.trim())
    .map((u) => {
      const match = u.match(/[?&]id=([^&]+)/);
      return match?.[1] ?? "";
    })
    .filter(Boolean);
}

export function driveImageUrl(fileId: string): string {
  return `/api/drive/image/${fileId}`;
}
