export type BlinkFrame = "open" | "half" | "closed";

/**
 * Rasterize a detached copy. Preview animation never mutates the canonical
 * source ref used for downloads, even if Export is clicked during a blink.
 */
export async function rasterizeAvatar(
  svg: SVGSVGElement,
  size: number,
  frame: BlinkFrame = "open",
  signal?: AbortSignal,
): Promise<Blob> {
  signal?.throwIfAborted();
  const copy = svg.cloneNode(true) as SVGSVGElement;
  copy.setAttribute("width", String(size));
  copy.setAttribute("height", String(size));
  copy.removeAttribute("class");
  copy.removeAttribute("style");

  if (frame !== "open") {
    for (const eye of copy.querySelectorAll('[data-avatar-layer="eyes"] rect')) {
      const height = Number(eye.getAttribute("height"));
      const y = Number(eye.getAttribute("y"));
      const compressed = height * (frame === "half" ? 0.45 : 0.09);
      eye.setAttribute("y", String(y + (height - compressed) / 2));
      eye.setAttribute("height", String(compressed));
      eye.setAttribute("rx", String(compressed / 2));
    }
  }

  const source = new XMLSerializer().serializeToString(copy);
  const sourceUrl = URL.createObjectURL(new Blob([source], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      const abort = () => {
        image.src = "";
        reject(new DOMException("Rasterization cancelled.", "AbortError"));
      };
      const cleanup = () => signal?.removeEventListener("abort", abort);
      signal?.addEventListener("abort", abort, { once: true });
      image.onload = () => { cleanup(); resolve(image); };
      image.onerror = () => { cleanup(); reject(new Error("Could not render the avatar.")); };
      image.src = sourceUrl;
    });
    signal?.throwIfAborted();
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is unavailable.");
    context.drawImage(image, 0, 0, size, size);
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("PNG encoding failed.")), "image/png"),
    );
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}
