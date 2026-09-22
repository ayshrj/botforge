/** Mix flat color regions without introducing gradients or changing the hue family. */
export function mixColor(base: string, target: string, amount: number): string {
  const a = parseInt(base.slice(1), 16);
  const b = parseInt(target.slice(1), 16);
  return `#${[16, 8, 0].map((shift) => {
    const channel = (a >> shift) & 255;
    return Math.round(channel + (((b >> shift) & 255) - channel) * amount)
      .toString(16).padStart(2, "0");
  }).join("")}`;
}

export function getHairPalette(base: string) {
  return {
    base,
    shadow: mixColor(base, "#17131e", 0.22),
    light: mixColor(base, "#eadbcc", 0.18),
  };
}
