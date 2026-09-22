import { rasterizeAvatar } from "./avatar-raster";

export async function downloadPng(svg: SVGSVGElement, size: number): Promise<void> {
  const blob = await rasterizeAvatar(svg, size);
  download(blob, filename(`${size}.png`));
}

function download(blob: Blob, name: string): void {
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(anchor.href), 0);
}

function filename(kind: string): string {
  return `botforge-avatar-${new Date().toISOString().slice(0, 10)}-${kind}`;
}
