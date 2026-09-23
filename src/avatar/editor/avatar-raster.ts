export type AvatarFrameVariant =
  | "open"
  | "blink-half"
  | "blink-closed"
  | "wink-left-half"
  | "wink-left-closed"
  | "wink-right-half"
  | "wink-right-closed";

type EyeSide = "left" | "right";

/**
 * Rasterize a detached copy of the canonical SVG.
 *
 * Preview animation never mutates the source SVG used by
 * export, even if an export occurs while a blink or wink
 * is playing.
 */
export async function rasterizeAvatar(
  svg: SVGSVGElement,
  size: number,
  frame: AvatarFrameVariant = "open",
  signal?: AbortSignal,
): Promise<Blob> {
  signal?.throwIfAborted();

  const copy = svg.cloneNode(true) as SVGSVGElement;

  copy.setAttribute("width", String(size));

  copy.setAttribute("height", String(size));

  copy.removeAttribute("class");

  copy.removeAttribute("style");

  applyFrameVariant(copy, frame);

  const source = new XMLSerializer().serializeToString(copy);

  const sourceUrl = URL.createObjectURL(
    new Blob([source], {
      type: "image/svg+xml;charset=utf-8",
    }),
  );

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();

      const abort = () => {
        image.src = "";

        reject(new DOMException("Rasterization cancelled.", "AbortError"));
      };

      const cleanup = () => {
        signal?.removeEventListener("abort", abort);
      };

      signal?.addEventListener("abort", abort, {
        once: true,
      });

      image.onload = () => {
        cleanup();
        resolve(image);
      };

      image.onerror = () => {
        cleanup();

        reject(new Error("Could not render the avatar."));
      };

      image.src = sourceUrl;
    });

    signal?.throwIfAborted();

    const canvas = document.createElement("canvas");

    canvas.width = size;

    canvas.height = size;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas is unavailable.");
    }

    context.drawImage(image, 0, 0, size, size);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("PNG encoding failed."));
      }, "image/png");
    });
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

function applyFrameVariant(
  svg: SVGSVGElement,
  frame: AvatarFrameVariant,
): void {
  switch (frame) {
    case "open":
      return;

    case "blink-half":
      compressEye(svg, "left", 0.45);

      compressEye(svg, "right", 0.45);

      return;

    case "blink-closed":
      compressEye(svg, "left", 0.09);

      compressEye(svg, "right", 0.09);

      return;

    case "wink-left-half":
      compressEye(svg, "left", 0.45);

      return;

    case "wink-left-closed":
      compressEye(svg, "left", 0.09);

      return;

    case "wink-right-half":
      compressEye(svg, "right", 0.45);

      return;

    case "wink-right-closed":
      compressEye(svg, "right", 0.09);

      return;
  }
}

function compressEye(svg: SVGSVGElement, side: EyeSide, factor: number): void {
  const eye = svg.querySelector<SVGRectElement>(`[data-avatar-eye="${side}"]`);

  if (!eye) {
    return;
  }

  const height = Number(eye.getAttribute("height"));

  const y = Number(eye.getAttribute("y"));

  if (!Number.isFinite(height) || !Number.isFinite(y)) {
    return;
  }

  const compressedHeight = height * factor;

  eye.setAttribute("y", String(y + (height - compressedHeight) / 2));

  eye.setAttribute("height", String(compressedHeight));

  eye.setAttribute("rx", String(compressedHeight / 2));
}
