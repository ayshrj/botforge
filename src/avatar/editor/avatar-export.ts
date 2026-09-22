export function downloadSvg(svg: SVGSVGElement): void {
  const source = new XMLSerializer().serializeToString(svg);
  download(new Blob([source], { type: "image/svg+xml;charset=utf-8" }), filename("avatar.svg"));
}

export async function downloadPng(svg: SVGSVGElement, size: number): Promise<void> {
  const source = new XMLSerializer().serializeToString(svg);
  const url = URL.createObjectURL(new Blob([source], { type: "image/svg+xml" }));
  try {
    const image = await loadImage(url);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is unavailable.");
    context.drawImage(image, 0, 0, size, size);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((result) => result ? resolve(result) : reject(new Error("PNG export failed.")), "image/png"),
    );
    download(blob, filename(`${size}.png`));
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not render the avatar image."));
    image.src = source;
  });
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
